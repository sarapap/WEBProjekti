'use strict';

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
      const response = await fetch(`http://localhost:3000/api/v1/tuote/tyyppi_id/${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Virhe tuote hakemisessa');
      }

      const tuote= await response.json();

      //console.log('TuoteKuva:', tuote.tuote_kuva);
      const tuoteKuva = tuote.tuote_kuva;
      const tuoteNimi = tuote.tuote_nimi;
      const tuoteKuvaus = tuote.tuote_kuvaus;
      const tuoteHinta = tuote.tuote_hinta;
;

      const cakeList = document.querySelector('cake-list');

      const tuoteElement = document.createElement('div');
      tuoteElement.classList.add('cake-item');

      // Lisää kuvakehys
      const imgElement = document.createElement('img');
      console.log('Kuva:', tuoteKuva);
      imgElement.src = `../../../uploads/${tuoteKuva}`; // Olettaen, että tuotteella on kuvaattribuutti
      tuoteElement.appendChild(imgElement);

      // Lisää tuotteen nimi
      const h3Element = document.createElement('h3');
      h3Element.textContent = tuoteNimi;
      tuoteElement.appendChild(h3Element);

      // Lisää tuotteen kuvaus
      const pElement = document.createElement('p');
      console.log('Kuvaus:', tuoteKuvaus);
      pElement.textContent = tuoteKuvaus;
      tuoteElement.appendChild(pElement);

      // Lisää tuotteen hinta
      const spanElement = document.createElement('span');
      console.log('Hinta:', tuoteHinta);
      spanElement.textContent = tuoteHinta + ' €';
      tuoteElement.appendChild(spanElement);

      // Lisää "Lisää ostoskoriin" -painike
      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'Lisää ostoskoriin';
      tuoteElement.appendChild(buttonElement);

      // Lisää tuoteElementti listaan
      cakeList.appendChild(tuoteElement);


      // Luo uusi div-elementti tuotteelle

    } catch (error) {
      console.error('Virhe tuotteen hakemisessa:', error.message);
    }
  }
};

fetchAndDisplayTuotteet();



// /Users/anna/WEBProjekti/uploads/tuote_kuva-1714648665056.png
