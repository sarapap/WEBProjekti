
'use strict';


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('tuoteModal');
  const openButton = document.getElementById('openButton');
  const closeButton = document.getElementById('closeButton');

  if (openButton) {
    openButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (modal) {
        modal.showModal(); // Check if showModal is supported
      } else {
        console.error('Modal element not found');
      }
    });
  }

  if (closeButton && modal) {
    closeButton.addEventListener('click', function (event) {
      event.preventDefault();
      modal.close();
    });
  }
  const getSubtypes = async () => {
    const selectedTyyppi = document.getElementById('tyyppi').value;
    let tyypi;

    if (selectedTyyppi === 'kakut') {
      tyypi = "kakut";
    } else if (selectedTyyppi === 'suolaset ruuat') {
      tyypi = "suolaiset ruuat";
    } else if (selectedTyyppi === 'makeaa') {
      tyypi = "makeaa";
    } else if (selectedTyyppi === 'lämmintä ruuat') {
      tyypi = "lämpimät ruuat";
    } else if (selectedTyyppi === 'juotavaa') {
      tyypi = "juotavaa";
    }

    console.log("SelectedTyyppi", selectedTyyppi); // Tulostaa valitun tuotetyypin arvon konsoliin

    const response = await fetch(`http://localhost:3000/api/v1/paatyypi/${tyypi}`, {
      method: 'GET',

    });

    const subtypes = await response.json();
    console.log('Subtypes: ', subtypes);
    return subtypes;
  };

  const typeElement = document.getElementById('tyyppi');
        const subtypeElement = document.getElementById('subtype');

        getSubtypes().then((subtypes) => {
          subtypes.forEach((subtype) => {
            const option = document.createElement('option');
            option.value = subtype;
            option.textContent = subtype;
            subtypeElement.appendChild(option);
          });
        });
  const tuoteForm = document.getElementById('tuoteForm');


  if (tuoteForm) {
    tuoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // const name = document.getElementById('name').value;
        // const image = document.getElementById('image').value;
        // const price = document.getElementById('hinta').value;
        // const cost = document.getElementById('kustannus').value;
        // const typeId = getTyypeId();
        // const type = document.getElementById('tyyppi').value;
        // const subtype = document.getElementById('subtype').value;
         //Asetetaan alatyyppi valinnan mukaan





        const requiredFields = ['tuote_nimi', 'tuote_kuvaus', 'tuote_hinta', 'tuote_kustannus', 'tyyppi_id', 'tuote_kuva'];

        const tuoteForm = {
            tuote_nimi: document.getElementById('tuote_nimi') ? document.getElementById('name').value : '',
            tuote_kuvaus: document.getElementById('tuote_kuvaus') ? document.getElementById('kuvaus').value : '',
            tuote_hinta: document.getElementById('tuote_hinta') ? document.getElementById('hinta').value : '',
            tuote_kustannus: document.getElementById('tuote_kustannus') ? document.getElementById('kustannus').value:'',
            tyyppi_id: getTyypeId(),
            tuote_kuva: document.getElementById('tuote_kuva') ? document.getElementById('image').value : '',
        };

        const response1 = await fetch('http://localhost:3000/api/v1/tuote', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/form-data',
          },
          body: FormData(tuoteForm),
      });

      if (response1.ok) {
          const responseData = await response1.json();
          const tuoteId = responseData.tuote_id;
          console.log('Tuote ID:', tuoteId);

          // Tässä voit käsitellä tuote_id:ta ja tehdä sen kanssa mitä tarvitset
          // Esimerkiksi voit lähettää sen toiseen API-pyyntöön tai käyttää sitä muulla tavalla.
      } else {
          // Käsittely epäonnistui
          console.error('Tuotteen lisääminen epäonnistui');
      }

    });
  }
});


  // add kategpria_tuote
  const kategoriat = document.getElementById('kategoriat');
  if (kategoriat) {
    kategoriat.addEventListener('submit', async (e) => {
        e.preventDefault();

        const kategoriaIds = getKategoriaIds();
        kategoriaIds.forEach(async (kategoriaId) => {

          const data = {
              tuote_id: tuoteId,
              kategoria_id: kategoriaId,
          };

          try {
            const response = await fetch('http://localhost:3000/api/v1/kategoria_tuote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Uusi kategoria tallennettu:', responseData);
                modal.close();
            } else {
                alert('Kategorian tallennus epäonnistui');
            }
        } catch (error) {

            console.error('Virhe tallennettaessa kategoriaa:', error);
        }
      });
    }
  );
}





// const openPopup = () => {
//   modal.showModal();
// };

// const closePopup = () => {
//   modal.close();
// };



const getTyypeId = async () => {
  const selectedTyyppi = document.getElementById('tyyppi').value;
  const subtype = document.getElementById('subtype').value;
  const response = await fetch(`http://localhost:3000/api/v1/paatyypi/${selectedTyyppi}/${subtype}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
  const typeId = data[0];
    return typeId;
};

const getKategoriaIds = async () => {
  ids = [];

  const selectedCategories = findSelectedCategories();

  for (const category of selectedCategories) {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/kategoria/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch category ID');
      }

      const data = await response.json();
      const kategoriaId = data[0].kategoria_id;
      console.log(kategoriaId);
      return kategoriaId;
    } catch (error) {
      console.error(error);
    }
    response.ok ? console.log('Kategoria ID haettu onnistuneesti') : console.error('Kategorian ID:n haku epäonnistui');
    ids.push(kategoriaId);

  }
  console.log('Ids:', ids);
  return ids;
};

const findSelectedCategories = () => {
  const selectedCategories = [];

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
          const label = document.querySelector(`label[for="${checkbox.id}"]`).textContent;
          if (checkbox.checked) {
              // Lisätään valittu kategoria listaan
              selectedCategories.push(label);
          } else {
              // Poistetaan valittu kategoria listalta, jos ruutua ei ole valittu
              const index = selectedCategories.indexOf(label);
              if (index !== -1) {
                  selectedCategories.splice(index, 1);
              }
          }
        }
      );
    }
  );
};



