'use strict';

const handleNewValue = async () => {
  const alatyyppi = getSelectedAlaTyyppi();
  await updateSubtypes(alatyyppi);
};

const updateSelectedAlatyyppi = () => {
  const selectedAlatyyppi = document.getElementById('cakeType').value;
  cakeList.innerHTML = '';
  console.log('Valittu tyyppi:', selectedAlatyyppi);
  return selectedAlatyyppi;
}

// Lisää tapahtumankäsittelijä select-elementille
document.getElementById('cakeType').addEventListener('change', async () => {
  // Päivitä selectedAlatyyppi aina, kun vaihtoehtoa muutetaan
  //await updateSelectedAlatyyppi();
  await fetchAndDisplayTuotteet();
});

const getSelectedAlaTyyppi = async() => {
  const selectedAlatyyppi = await updateSelectedAlatyyppi('cakeType').value;
  console.log('selectedAlatyyppi:', selectedAlatyyppi);
  return selectedAlatyyppi;
};

const getTyyppiIdLista = async () => {
  try {
    const selectedAlatyyppi = await updateSelectedAlatyyppi();
    console.log('Valittu alatyyppi get id listassa:', selectedAlatyyppi);

    let url;
    if (selectedAlatyyppi === '全部') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/蛋糕';
    } else if (selectedAlatyyppi === '节日蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/节日蛋糕';
    } else if (selectedAlatyyppi === '咸味蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/咸味蛋糕';
    } else if (selectedAlatyyppi === '甜味蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/甜味蛋糕';
    }

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe alatyyppien hakemisessa');
    }

    const tyyppiList = await response.json();

    if (Array.isArray(tyyppiList)) {
    const tyyppiIdList = tyyppiList.map((tyyppi) => tyyppi.tyyppi_id);
    console.log('Tyyppi id list:', tyyppiIdList);
    return tyyppiIdList;

    } else if (tyyppiList.tyyppi_id) {
      console.log('Tyyppi id:', tyyppiList.tyyppi_id);
      return tyyppiList.tyyppi_id;
    }

  } catch (error) {
    console.error('Virhe tuote_id hakemisessa:', error.message);
    return [];
  }
};

const fetchAndDisplayTuotteet = async () => {

    const IdResult = await getTyyppiIdLista();

    if (!Array.isArray(IdResult)) {
      const tyyppiId = IdResult;
      console.log('Tyyppi id_ not list:', tyyppiId);

      await fetchAndDisplayByTyyppiId(tyyppiId);
    } else {
      for (const tyyppiId of IdResult) {

        await fetchAndDisplayByTyyppiId(tyyppiId);
    }
  }
};

const fetchAndDisplayByTyyppiId = async (tyyppiId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/tyyppi_id/${tyyppiId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    const tuote = await response.json();
    console.log('Tuote:', tuote);

      const cakeList = document.getElementById('cakeList');

      const tuoteElement = document.createElement('div');
      tuoteElement.classList.add('cake-item');

      // Lisää kuvakehys
      const imgElement = document.createElement('img');
      imgElement.src = `../../../uploads/${tuote.tuote_kuva}`; // Olettaen, että tuotteella on kuvaattribuutti
      tuoteElement.appendChild(imgElement);

      // Lisää tuotteen nimi
      const h3Element = document.createElement('h3');
      h3Element.textContent = tuote.tuote_nimi;
      tuoteElement.appendChild(h3Element);

      // Lisää tuotteen kuvaus
      const pElement = document.createElement('p');
      pElement.textContent = tuote.tuote_kuvaus;
      tuoteElement.appendChild(pElement);

      //lisää hinta
      const pElement2 = document.createElement('p');
      const hintaElement = document.createElement('strong'); // tai käytä <b>-elementtiä
      hintaElement.textContent = '价格: ';
      pElement2.appendChild(hintaElement);

      const hintaTeksti = document.createTextNode(tuote.tuote_hinta + ' €');
      pElement2.appendChild(hintaTeksti);
      tuoteElement.appendChild(pElement2);

      // Lisää "Lisää ostoskoriin" -painike
      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'Lisää ostoskoriin';
      tuoteElement.appendChild(buttonElement);
      buttonElement.addEventListener('click', () => {
        console.log('Tuote id laitamaan koriin:', tuote.tuote_id);
        addToCart(3, tuote.tuote_id);

      });

      //lisää "tallenna suosikkeihin" -painike
      const buttonElement2 = document.createElement('button');
      buttonElement2.textContent = 'Tallenna suosikkeihin';
      tuoteElement.appendChild(buttonElement2);
      buttonElement2.addEventListener('click', () => {
        addFavorite(3, tuote.tuote_id);
      });

      // Lisää tuoteElementti listaan
      cakeList.appendChild(tuoteElement);
    } catch (error) {
      console.error('Virhe tuotteen hakemisessa:', error.message);
    }
};

const addFavorite = async (asiakas_id, tuote_id) => {
  const suosikit = await getFavoriteList(asiakas_id);
  console.log('Suosikit list käymään läpi:', suosikit);

  for (const suosikki of suosikit) {
    console.log('Suosikki:', suosikki);
    if (suosikki.tuote_id === tuote_id) {
      console.log('Tuote on jo suosikeissa');
      return;
    } else {
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
        }
        console.log('Tuote lisätty suosikkeihin');
      } catch (error) {
        console.error('Virhe tuotteen hakemisessa:', error.message);
      }
    }
  }
};

let tuote_maara = 0;

const addToCart = async (asiakas_id, tuote_id) => {
  tuote_maara = tuote_maara + 1;
  console.log('Tuote määrä:', tuote_maara);
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: asiakas_id,
        tuote_id: tuote_id,
        tuote_maara: tuote_maara,
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

const getFavoriteList = async (asiakas_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${asiakas_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }
    const suosikit = await response.json();
    console.log('Suosikit:', suosikit);
    return suosikit;

  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    console.log('Suosikit:', suosikit);
  }
}

fetchAndDisplayTuotteet();
