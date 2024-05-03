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
    if (selectedAlatyyppi === 'kaikki') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakut';
    } else if (selectedAlatyyppi === 'juhlakakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/juhlakakut';
    } else if (selectedAlatyyppi === 'suolaiset kakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/suolaiset%20kakut';
    } else if (selectedAlatyyppi === 'makeat kakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/makeat%20kakut';
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

const findTuote = async (tyyppiId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/tyyppi_id/${tyyppiId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    const tuote = await response.json();
    console.log('Tuote:', tuote);

  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
    return tuote;
  }
  const fetchAndDisplayByTyyppiId

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
      hintaElement.textContent = 'Hinta: ';
      pElement2.appendChild(hintaElement);

      const hintaTeksti = document.createTextNode(tuote.tuote_hinta + ' €');
      pElement2.appendChild(hintaTeksti);
      tuoteElement.appendChild(pElement2);

      // Lisää "Lisää ostoskoriin" -painike
      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'Lisää ostoskoriin';
      tuoteElement.appendChild(buttonElement);
      buttonElement.id = 'addToCart';

      //lisää "tallenna suosikkeihin" -painike
      const buttonElement2 = document.createElement('button');
      buttonElement2.textContent = 'Tallenna suosikkeihin';
      tuoteElement.appendChild(buttonElement2);
      buttonElement2.id = 'saveFavorite';

      // Lisää tuoteElementti listaan
      cakeList.appendChild(tuoteElement);



  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }

  const addToCart = document.getElementById('addToCart');
  addToCartButton.addEventListener('click', async () => {
    const tuoteId = tuote.tuote_id;
    console.log('Tuote id:', tuoteId);
    const asiakas_id = localStorage.getItem('asiakas_id');
    console.log('Tuote id:', tuoteId);
    console.log('Asiakas id:', asiakas_id);

    console.log('Ostoskoriin lisätty');

  });



 };
 fetchAndDisplayTuotteet();
















if (document.getElementById('addToCart')) {
  addToCart();
}

