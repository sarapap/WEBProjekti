const imageContainer = document.querySelector('.image-container');
const images = imageContainer.querySelectorAll('img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;
const totalImages = images.length;
const maxForwardPresses = 3;

function updateCarousel() {
  const imageWidth = images[0].clientWidth;
  const offset = -currentIndex * imageWidth;
  imageContainer.style.transform = `translateX(${offset}px)`;
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
    nextButton.disabled = false;
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < totalImages - 1 && currentIndex < maxForwardPresses) {
    currentIndex++;
    updateCarousel();
  }

  if (currentIndex >= maxForwardPresses) {
    nextButton.disabled = true;
  }
});

updateCarousel();


let tuote_id = null;
const fetchAndDisplayTuotteet = async () => {
  const userId = getUserId();
  const tuoteIdList = await findTuoteIdByUserId(userId);

  if (!Array.isArray(tuoteIdList)) {
    tuote_id = tuoteIdList;
    await getTuoteByTuoteId(tuote_id, userId);
  } else {
    for (tuote_id of tuoteIdList) {
      await getTuoteByTuoteId(tuote_id, userId);
    }
  }
};

const findTuoteIdByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    const result = await response.json();
    const tuoteIdList = result.map((item) => item.tuote_id);
    return tuoteIdList;
  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    return [];
  }
};

const getTuoteByTuoteId = async (tuote_id, userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteen hakemisessa');
    }
    const tuote = await response.json();

    const cakeList = document.getElementById('cakeList');
    const tuoteElement = document.createElement('div');
    tuoteElement.classList.add('cake-item');

    const imgElement = document.createElement('img');
    imgElement.src = `../../../uploads/${tuote.tuote_kuva}`;
    tuoteElement.appendChild(imgElement);

    const h3Element = document.createElement('h3');
    h3Element.textContent = tuote.tuote_nimi;
    tuoteElement.appendChild(h3Element);

    const pElement = document.createElement('p');
    pElement.textContent = tuote.tuote_kuvaus;
    tuoteElement.appendChild(pElement);

    // lisää ostoskori- ja suosikkipainikkeet
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    buttonElement.classList.add('cart-button');

    const buttonElement2 = document.createElement('button');
    const isAlreadyFavorite = await isFavorite(userId, tuote_id);
    if (isAlreadyFavorite) {
      buttonElement2.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      buttonElement2.innerHTML = '<i class="far fa-heart"></i>';
    }
    buttonElement2.classList.add('favorite-button');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(buttonElement);
    buttonContainer.appendChild(buttonElement2);

    tuoteElement.appendChild(buttonContainer);
    cakeList.appendChild(tuoteElement);

    buttonElement.addEventListener('click', async () => {
      const tarkista = await ostoskoriTarkistus(userId, tuote_id);
      if (tarkista === false) {
        await addToCart(userId, tuote_id, 1);
      } else {
        await updateCart(userId, tuote_id, 1);
      }
    });

    buttonElement2.addEventListener('click', async () => {
      const currentlyFavorite = await isFavorite(userId, tuote_id);
      if (currentlyFavorite) {
        await removeSuosikista(userId, tuote_id);
        const parentElement = buttonElement2.closest('.cake-item');
        if (parentElement) {
          parentElement.remove();
        }
      } else {
        await addFavorite(userId, tuote_id);
        buttonElement2.querySelector('i').classList.replace('far', 'fas');
      }
    });
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const isFavorite = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    const favorites = await response.json();
    const favoriteTuoteIds = favorites.map((item) => item.tuote_id);

    return favoriteTuoteIds.includes(tuote_id);
  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    return false;
  }
};

const toggleFavorite = async (userId, tuote_id, buttonElement) => {
  const currentlyFavorite = await isFavorite(userId, tuote_id);

  if (currentlyFavorite) {
    await removeSuosikista(userId, tuote_id);
    buttonElement.querySelector('i').classList.replace('fas', 'far');
  } else {
    await addFavorite(userId, tuote_id);
    buttonElement.querySelector('i').classList.replace('far', 'fas');
  }
};

const addFavorite = async (asiakas_id, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: asiakas_id,
        tuote_id: tuote_id,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien lisäämisessä');
    }
    console.log('Tuote lisätty suosikkeihin');
  } catch (error) {
    console.error('Virhe suosikkien lisäämisessä:', error.message);
  }
};

const removeSuosikista = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}/${tuote_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteen poistamisessa suosikeista');
    }
    console.log('Tuote poistettu suosikkeista');
  } catch (error) {
    console.error('Virhe tuotteen poistamisessa suosikeista:', error.message);
  }
};

const ostoskoriTarkistus = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin hakemisessa');
    }
    const ostoskoriList = await response.json();
    const tuoteIdList = ostoskoriList.map((tuote) => tuote.tuote_id);

    return tuoteIdList.includes(tuote_id);
  } catch (error) {
    console.error('Virhe ostoskorin hakemisessa:', error.message);
    return false;
  }
};

const addToCart = async (userId, tuote_id, tuote_maara) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
        tuote_id: tuote_id,
        tuote_maara: tuote_maara,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteen lisäämisessä ostoskoriin');
    }
    console.log('Tuote lisätty ostoskoriin');
  } catch (error) {
    console.error('Virhe tuotteen lisäämisessä ostoskoriin:', error.message);
  }
};

const updateCart = async (userId, tuote_id, tuote_maara) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
        tuote_id: tuote_id,
        tuote_maara: tuote_maara,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteen päivittämisessä ostoskoriin');
    }
    console.log('Tuote päivitetty ostoskoriin');
  } catch (error) {
    console.error('Virhe tuotteen päivittämisessä ostoskoriin:', error.message);
  }
};

fetchAndDisplayTuotteet();
