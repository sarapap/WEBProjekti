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
      buttonElement.textContent = '加入购物车';
      tuoteElement.appendChild(buttonElement);

      //lisää "tallenna suosikkeihin" -painike
      const buttonElement2 = document.createElement('button');
      buttonElement2.textContent = '加入收藏';
      tuoteElement.appendChild(buttonElement2);

      // Lisää tuoteElementti listaan
      cakeList.appendChild(tuoteElement);
    } catch (error) {
      console.error('Virhe tuotteen hakemisessa:', error.message);
    }
};
fetchAndDisplayTuotteet();

