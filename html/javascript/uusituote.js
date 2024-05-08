"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('tuoteModal');
  const openButton = document.getElementById('openButton');
  const closeButton = document.getElementById('closeButton');

  if (openButton) {
    openButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (modal) {
        modal.showModal(); // Tarkistetaan, onko showModal tuettu
      } else {
        console.error('Modaali-elementtiä ei löydetty');
      }
    });
  }

  if (closeButton && modal) {
    closeButton.addEventListener('click', function (event) {
      event.preventDefault();
      modal.close();
    });
  }

  const handleNewValue = async () => {
    const tyyppi = getTyyppiValue();
    await updateSubtypes(tyyppi);
  };

  const getSubtypes = async (tyyppi) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tyyppi/paatyyppi/${tyyppi}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Virhe alatyyppien hakemisessa');
      }

      const subtypes = await response.json();
      console.log('Alatyypit:', subtypes);
      return subtypes.map((subtype) => subtype.alatyyppi);

    } catch (error) {
      console.error('Virhe alatyyppien hakemisessa:', error.message);
      return [];
    }
  };

  document.getElementById("tyyppi").addEventListener("change", handleNewValue);
  handleNewValue();

  const updateSubtypes = async (tyyppi) => {
    const subtypes = await getSubtypes(tyyppi);
    const subtypeElement = document.getElementById('subtype');
    subtypeElement.innerHTML = '';

    subtypes.forEach((subtype) => {
      const option = document.createElement('option');
      option.value = subtype;
      option.textContent = subtype;
      subtypeElement.appendChild(option);
    });

    subtypeElement.addEventListener('change', async () => {
      const selectedSubtype = subtypeElement.value;
      console.log('Valittu alatyyppi:', selectedSubtype);

      try {
        const response = await fetch(`http://localhost:3000/api/v1/paatyypi/${tyyppi}/${selectedSubtype}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Hae tyyppi-id', data);
        const typeId = data[0];
        return typeId;
      } catch (error) {
        console.error('Virhe tyyppi-id:n hakemisessa:', error.message);
        return null;
      }
    });
  };

  const tuoteForm = document.getElementById('tuoteForm');

  if (tuoteForm) {
    tuoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const requiredFields = ['tuote_nimi', 'tuote_kuvaus', 'tuote_hinta', 'tuote_kustannus', 'tyyppi_id', 'tuote_kuva'];
      const tyyppi_id = await getTyypeId();

      const formData = new FormData();

      requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
          formData.append(field, element.value);
        }
      });

      formData.append('tyyppi_id', tyyppi_id);

      try {
        const response = await fetch('http://localhost:3000/api/v1/tuote', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          const tuoteId = responseData.tuote_id;
          console.log('Tuote ID:', tuoteId);
        } else {
          console.error('Tuotteen lisääminen epäonnistui');
        }
      } catch (error) {
        console.error('Virhe tapahtui:', error.message);
      }
    });
  }
});

const getTyyppiValue = () => {
  var selectedTyyppi = document.getElementById("tyyppi").value;
  console.log("Valittu arvo: " + selectedTyyppi);
  return selectedTyyppi;
};

const getTyypeId = async () => {
  const tyyppi = getTyyppiValue();
  const selectedSubtype = updateSelectAlatyyppi();

  try {
    const response = await fetch(`http://localhost:3000/api/v1/paatyypi/${tyyppi}/${selectedSubtype}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Hae tyyppi-id', data);
    const typeId = data[0];
    return typeId;
  } catch (error) {
    console.error('Virhe tyyppi-id:n hakemisessa:', error.message);
    return null;
  }
};

const updateSelectAlatyyppi = () => {
  const subtypeElement = document.getElementById('subtype');
  const selectedSubtype = subtypeElement.value;
  console.log('Valittu alatyyppi:', selectedSubtype);
  return selectedSubtype;
};
