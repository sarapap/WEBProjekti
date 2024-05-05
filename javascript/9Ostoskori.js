'use strict';

<!DOCTYPE html>
<html lang="fi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="../../css/9Ostoskori.css" rel="stylesheet">
  <title>S&A CAFE</title>
  <link rel="shortcut icon" type="image" href="../../css/kuvat/cake.png">

  <style>
    /* footer */

    .changecontent2::after {
      content: "Tervetuloa kakkukahveille!";
      color: rgb(192, 160, 122);
      animation: changetext2 10s infinite linear;
      margin: 10px;
      font-weight: bold;
    }

    @keyframes changetext2 {
      20% {
        content: "Liity kanta-asiakkaaksi, niin saat 15 %:n alennuksen ensimmäisestä tilauksestasi!";
      }

      40% {
        content: "Liittyminen on maksutonta";
      }

      60% {
        content: "Luo unelmiesi kakku!";
      }

      80% {
        content: "Kotiinkuljetus alkaen 2,95€";
      }

      100% {
        content: "Tervetuloa kakkukahveille!";
      }
    }
  </style>
  <script src="/javascript/default.js" defer></script>
  <script src="/javascript/9Ostoskori.js" defer></script>
</head>


<body>
  <header>
    <div>
      <nav class="icons">
        <ul>
          <li class="kieli">
            <label for="kieli">Valitse kieli: </label>
            <select id="kieli" onchange="changeLanguage(this.value)">
              <option value="FI" selected>Suomi</option>
              <option value="EN">Englanti</option>
              <option value="CN">Kiina</option>
              <option value="ET">Viro</option>
              <option value="SV">Ruotsi</option>
            </select>
          </li>
          <li>
            <a href="11Login.html">
              <div class = "käyttäjä" id="profiili-icon" class="icon">👤</div>

            </a>
        </li>
        <li>
            <a href="8Suosikit.html">
              <div class ="suosikit" id="sydan-icon" class="icon"> ❤️ <span id="suosikki-lkm">0</span></div>
            </a>
        </li>
        <li>
            <a href="9Ostoskori.html">
              <div class = "ostoskori" id="ostoskori-icon">🛒 <span id="ostoskori-lkm">0</span></div>
            </a>
        </li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <nav id="navbar">
      <a href="1Etusivu.html" class="navItem">Etusivu</a>
      <a href="2AboutUs.html" class="navItem">About Us</a>
      <div class="dropdown">
        <a class="dropdown-toggle" id="menuButton" href="3MenuPage.html">
          Menu
        </a>
        <div class="dropdown-menu" id="menuDropdown">
          <a class="dropdown-item" href="3MenuPage1.html">Kakut</a>
          <a class="dropdown-item" href="3MenuPage2.html">Suolaista</a>
          <a class="dropdown-item" href="3MenuPage3.html">Makeaa</a>
          <a class="dropdown-item" href="3MenuPage4.html">Lämmintä ruokaa</a>
          <a class="dropdown-item" href="3MenuPage5.html">Juotavaa</a>
        </div>
      </div>
      <a href="5Yhteydenotto.html" class="navItem">Ota yhteyttä</a>
      <a href="6Poytavaraus.html" class="navItem">Varaa tila</a>
    </nav>
let tuote_id = null;
const fetchAndDisplayTuotteet = async () => {
  const userId = getUserId();
  const tuoteIdList = await findTuoteIdByUserId(userId);

  if (!Array.isArray(tuoteIdList)) {
    tuote_id = tuoteIdList;
    await getTuoteByTuoteId(tuote_id);
  } else {
    for (tuote_id of tuoteIdList) {
      await getTuoteByTuoteId(tuote_id);
    }
  }
};

const findTuoteIdByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }

    const result = await response.json();
    const tuoteIdList = result.map((item) => item.tuote_id);
    console.log('Tuote id:', tuoteIdList);
    return tuoteIdList;

  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const getTuoteByTuoteId = async (tuote_id) => {

  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    const tuote = await response.json();
    console.log('Tuote:', tuote);

    const kieli = document.getElementById('kieli');
    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

    let addCartText = '';
    let addFavoriteText = '';
    let unfavorateText = '';
    let hintaTeksti = '';

    switch (selectedLanguage) {
      case 'EN':
        addCartText = 'Add to cart';
        addFavoriteText = 'Add to favorites';
        unfavorateText = 'Unlike';
        hintaTeksti = 'Price: ';

        break;
      case 'CN':
        addCartText = '添加到购物车';
        addFavoriteText = '添加收藏';
        unfavorateText = '删除收藏';
        hintaTeksti = '价格: ';

        break;
      case 'ET':
        addCartText = 'Lisa ostukorvi';
        addFavoriteText = 'Lisa lemmikutesse';
        unfavorateText = 'Eemalda';
        hintaTeksti = 'Hind: ';

        break;
      case 'SV':
        addCartText = 'Lägg till i kundvagnen';
        addFavoriteText = 'Lägg till i favoriter';
        unfavorateText = 'Olikt';
        hintaTeksti = 'Pris: ';

        break;
      case 'FI':
      default:
        addCartText = 'Lisää ostoskoriin';
        addFavoriteText = 'Tallenna suosikkeihin';
        unfavorateText = 'Poista suosikkeista';
        hintaTeksti = 'Hinta: ';

        break;
    }
    console.log('tuote:', tuote);
    const tuote_nimi = tuote.tuote_nimi;
    const tuote_kuva = tuote.tuote_kuva;
    const tuote_kuvaus = tuote.tuote_kuvaus;
    const tuote_hinta = tuote.tuote_hinta;

    console.log('Tuote nimi:', tuote_nimi);
    console.log('Tuote kuva:', tuote_kuva);
    console.log('Tuote kuvaus:', tuote_kuvaus);
    console.log('Tuote hinta:', tuote_hinta);


    const cakeList = document.getElementById('cakeList');

    const tuoteElement = document.createElement('div');
    tuoteElement.classList.add('cake-item');

    // const h2Element = document.createElement('h2');
    // h2Element.textContent = 'Suosikit';
    // tuoteElement.appendChild(h2Element);


    // Lisää kuvakehys
    const imgElement = document.createElement('img');
    imgElement.src = `../../../uploads/${tuote_kuva}`;
    tuoteElement.appendChild(imgElement);


    // Lisää tuotteen nimi
    const h3Element = document.createElement('h3');
    h3Element.textContent = tuote_nimi;
    tuoteElement.appendChild(h3Element);

    // Lisää tuotteen kuvaus
    const pElement = document.createElement('p');
    pElement.textContent = tuote_kuvaus;
    tuoteElement.appendChild(pElement);

    //Lisää kategoria
    const pElement2 = document.createElement('p');
    const kategoriaIdResult = await getKategoriaIdByTuoteId(tuote_id);

    console.log('Kaikki kategoria-id:t:', kategoriaIdResult);
    if (kategoriaIdResult.length > 1) {
      for (const kategoria of kategoriaIdResult) {
        console.log('Kategorian id-silmukka:', kategoria);
        const kategoriaNimi = await getKategoriaById(kategoria);
        pElement2.textContent += kategoriaNimi + ', ';
      }
    } else if (kategoriaIdResult.length === 1) {
      const kategoriaNimi = await getKategoriaById(kategoriaIdResult[0]);
      pElement2.textContent = kategoriaNimi;
    } else {
      pElement2.textContent = "Kategoriaa ei löytynyt.";
    }
    tuoteElement.appendChild(pElement2);

    // Lisää hinta
    const pElement3 = document.createElement('p');
    const hintaElement = document.createElement('span');
    hintaElement.textContent = hintaTeksti + tuote_hinta + '€';

    pElement3.appendChild(hintaElement);
    tuoteElement.appendChild(pElement3);

    // // Lisää "Lisää ostoskoriin" -painike
    // const buttonElement = document.createElement('button');
    // buttonElement.textContent = addCartText;
    // buttonElement.style.backgroundColor = 'rgb(192, 160, 122)';
    // tuoteElement.appendChild(buttonElement);

    // //lisää "tallenna suosikkeihin" -painike
    // const buttonElement2 = document.createElement('button');
    // buttonElement2.textContent = addFavoriteText;
    // buttonElement2.style.backgroundColor = 'rgb(192, 160, 122)';
    // tuoteElement.appendChild(buttonElement2);

    // Lisää "Lisää ostoskoriin" -painike
    // Luodaan "Lisää ostoskoriin" -painike
const buttonElement = document.createElement('button');
buttonElement.innerHTML = '<i class="fas fa-shopping-cart"></i>'; // Ostoskori-kuvake
buttonElement.classList.add('cart-button'); // Lisää luokka tarvittaessa

// Luodaan "Tallenna suosikkeihin" -painike
const buttonElement2 = document.createElement('button');
buttonElement2.innerHTML = '<i class="far fa-heart"></i>'; // Sydän-kuvake
buttonElement2.classList.add('favorite-button'); // Lisää luokka tarvittaessa

// Luodaan div-elementti kuvakkeille ja lisätään kuvakkeet siihen
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
buttonContainer.appendChild(buttonElement);
buttonContainer.appendChild(buttonElement2);

// Lisätään kuvake-container tuoteElementin loppuun
tuoteElement.appendChild(buttonContainer);



    buttonElement.addEventListener('click', async () => {
      // const lisaaTuoteMaara = numberInput.value;
      // console.log('Tuote maara:', lisaaTuoteMaara);

      const tarkista = await ostoskoriTarkistus(userId, tuote_id);
      console.log('Tarkista ostoskori:', tarkista);

      if (tarkista === false) {
        await addToCart(userId, tuote_id, lisaaTuoteMaara);
        console.log('Tuote lisätty ostoskoriin');

      } else {
        //const ostoskoriTuoteId = getTuoteIdFromCart(userId);

        await updateCart(userId, tuote_id);
        console.log('Ostoskorisi päivitetty');
      }
    });

    // Lisää tapahtumankäsittelijä "Tallenna suosikkeihin" -painikkeelle
buttonElement2.addEventListener('click', async () => {
  let isFavorite = await favorateTarkistus(userId);

  if (isFavorite) {
    console.log('Tuote on jo suosikeissa');
  } else {
    console.log('Tuote ei ole suosikeissa');
  }

  // Tarkistetaan nykyinen tila ja vaihdetaan tarvittaessa
  if (buttonElement2.querySelector('i').classList.contains('far')) {
    buttonElement2.querySelector('i').classList.remove('far');
    buttonElement2.querySelector('i').classList.add('fas');
    await addFavorite(userId, tuote_id);
  } else {
    buttonElement2.querySelector('i').classList.remove('fas');
    buttonElement2.querySelector('i').classList.add('far');
    await removeSuosikista(userId, tuote_id);
  }
});

    // Lisää tuoteElementti listaan
    cakeList.appendChild(tuoteElement);
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const favorateTarkistus = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
      return false;
    }

    const favortateList = await response.json();
    const userIds = favortateList.map((item) => item.asiakas_id);
    const tuoteIds = favortateList.map((item) => item.tuote_id);

    if (!userIds.includes(userId) || !tuoteIds.includes(tuote_id)) {
      console.log('Suosikkeja ei löytynyt');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    return false;
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
      throw new Error('Virhe tuote hakemisessa');
    } else {
      console.log('Tuote lisätty suosikkeihin');
    }
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const addToCart = async (userId, tuote_id, tuote_maara) => {
  const maaraKorissa = await geTuoteMaaraFromCart(userId, tuote_id);
  const uusimaara = tuote_maara + maaraKorissa;
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
        tuote_id: tuote_id,
        tuote_maara: uusimaara,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    console.log('Tuote lisätty ostoskoriin');
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const getTuoteIdFromFavorates = async (userID) => {
  console.log('userID get suosikki id:', userID);

  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userID}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    const suosikitTuoteId = await response.json();

    // if suosikitTuoteId is notfound return empty array
    if (!suosikitTuoteId) {
      console.log('Suosikkeja ei löytynyt');
      return [];
    } else {
      return suosikitTuoteId;
    }

  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    return [];
  }
}

const removeSuosikista = async (userId, tuote_id) => {
  console.log('RemoveTuote id:', tuote_id);
  console.log('RemoveAsiakas id:', userId);
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}/${tuote_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    console.log('Tuote poistettu suosikeista');
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const getTuoteIdFromCart = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin hakemisessa');
    }
    const data = await response.json();
    const ostoskoriTuoteId = data.map((tuote) => tuote.tuote_id);

    if (!ostoskoriTuoteId) {
      console.log('Ostoskorissa ei ole tuotteita');
      return [];
    } else {
      return ostoskoriTuoteId;
    }
  } catch (error) {
    onsole.error('Virhe ostoskorin hakemisessa:', error.message);
    console.log('Ostoskorin tuotteet:', ostoskoriTuoteId);
  }
}

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
    const asiakasIdList = ostoskoriList.map((asiakas) => asiakas.asiakas_id);

    if (!asiakasIdList.includes(userId) || !tuoteIdList.includes(tuote_id)) {
      return false;
    } else {
      return true
    }

  } catch (error) {
    console.error('Virhe ostoskorin hakemisessa:', error.message);
  }
};

const updateCart = async (userID, tuote_id, lisaamaara) => {
  const tuoteMaaraKorissa = await getTuoteMaaraFromCart(userID, tuote_id);

  const uusimaara = parseInt(tuoteMaaraKorissa) + parseInt(lisaamaara);
  console.log('korissa oleva määrä11:', tuoteMaaraKorissa);
  console.log('Tuote maara:11', lisaamaara);
  console.log('Tuote uusi määrä  id11:', uusimaara);

  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
        tuote_id: tuote_id,
        tuote_maara: uusimaara,
      }),
    });
    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    console.log('Tuote päivitetty ostoskoriin');
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const getTuoteMaaraFromCart = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Virhe tuotteen hakemisessa');
      return 0;
    }
    const data = await response.json();
    const maara = data.tuote_maara;
    console.log('Tuote maara5, oikein :', maara);
    return maara;
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const getKategoriaIdByTuoteId = async (tuoteId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/kategoria_tuote/tuote/${tuoteId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Virhe kategorian hakemisessa');
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      const kategoriaIdList = data.map((item) => item.kategoria_id);
      return kategoriaIdList;
    } else {
      const kategoriaId = data.kategoria_id;
      return kategoriaId;
    }
  } catch (error) {
    console.error('Virhe kategorian hakemisessa:', error.message);
    return [];
  }
}

const getKategoriaById = async (kategoriaId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/kategoria/${kategoriaId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Virhe kategorian hakemisessa');
    }
    const data = await response.json();
    console.log('Kategoria nimet:', data.kategoria_nimi);
    return data.kategoria_nimi;

  } catch (error) {
    console.error('Virhe kategorian hakemisessa:', error.message);
  }
};

fetchAndDisplayTuotteet();

    <div>
      <h1>
        <div class="changetext"></div>
      </h1>
    </div>

    <div class="table">
      <h1>Ostoskori</h1>
      <table>
        <tr>
          <th>Valitse</th>
          <th>Tuote kuva</th>
          <th>Tuote nimi</th>
          <th>Hinta</th>
          <th>Määrä</th>
          <th class="delete-btn"><img src="../../css/kuvat/roskakori.png" alt="Roskakori"></th>
        </tr>
        <tr>
          <td><input type="checkbox" name="valinta" value="kakku"></td>
          <td><img src="" alt="">Tuote kuva</td>
          <td>Kakku</td>
          <td>5€</td>
          <td><input type="number" name="maara" value="1" min="1" max="10"></td>
          <td class="delete-btn"><img src="../../css/kuvat/roskakori.png" alt="Roskakori"></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="valinta" value="leivos"></td>
          <td><img src="" alt="">Tuote kuva</td>
          <td>Leivos</td>
          <td>3€</td>
          <td><input type="number" name="maara" value="1" min="1" max="10"></td>
          <td class="delete-btn"><img src="../../css/kuvat/roskakori.png" alt="Roskakori"></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="valinta" value="juoma"></td>
          <td><img src="" alt="">Tuote kuva</td>
          <td>Juoma</td>
          <td>2€</td>
          <td><input type="number" name="maara" value="1" min="1" max="10"></td>
          <td class="delete-btn"><img src="../../css/kuvat/roskakori.png" alt="Roskakori"></td>
        </tr>
        <tr>
          <td>
          <td></td>
          </td>
          <td>Yhteensä</td>
          <td>10€</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="div-class">
      <button type="submit" class="pay_btn">Maksa</button>
    </div>

    <footer class="footer-container">
      <p class="footerP">&copy; S&A CAFE 2024</p>
      <div class="changecontent2">
      </div>
    </footer>

  </main>
</body>

</html>
