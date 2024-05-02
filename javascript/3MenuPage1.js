'use strict';

const cakeList = document.getElementById('cakeLista');

const getTyyppiIdLista = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tyyppi/paatyyppi/kakut`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe alatyyppien hakemisessa');
    }

    const tyyppiList = await response.json();
    console.log('Tuote lista:', tyyppiList);
    const tyyppiIdList = tyyppiList.map((tyyppi) => tyyppi.tyyppi_id);
    console.log('Tyyppi id list:', tyyppiIdList);
    return tyyppiIdList;

  } catch (error) {
    console.error('Virhe tuote_id hakemisessa:', error.message);
    return [];
  }
};

const fetchAndDisplayTuotteet = async () => {
  const tyyppiIdList = await getTyyppiIdLista();
  for (const id of tyyppiIdList) {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tuote/${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Virhe tuote hakemisessa');
      }

      const tuote = await response.json();



      console.log('Tuotteet:', tuote);
      // Luo uusi div-elementti
      // const tuoteElement = document.createElement('div');
      // // Aseta tuotteen tiedot luotuun div-elementtiin
      // tuoteElement.textContent = `Tuote: ${tuote.nimi}, Hinta: ${tuote.hinta}`;
      // // Lisää tuoteElement listaan
      // cakeList.appendChild(tuoteElement);

    } catch (error) {
      console.error('Virhe tuotteen hakemisessa:', error.message);
    }
  }
};

fetchAndDisplayTuotteet();
