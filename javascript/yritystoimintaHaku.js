// GET http://localhost:3000/api/v1/yritystoiminta/2021-01-19/2021-01-29

const raportButton = document.getElementById('raportButton');

raportButton.addEventListener('click', fetchAndDisplayRaportit);

const fetchAndDisplayRaportit = async () => {
const starDay = document.getElementById('aloituspvm1').value;
const endDate = document.getElementById('lopetuspvm1').value;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/yritystoiminta/${starDay}/${endDate}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe raportin hakemisessa');
    }

    const data = await response.json();
    console.log('Raportti:', data);

    const raporttiList = document.getElementById('raporttiList');
    raporttiList.innerHTML = '';

    for (const raportti of data) {
      const raporttiElement = document.createElement('tr');
      raporttiElement.classList.add('raportti-item');

      const tdElement = document.createElement('td');
      tdElement.innerHTML = `${raportti.tuote_nimi}<br><br>${raportti.tuote_kuvaus}<br><br>${raportti.tuote_hinta} €

      <br><br>${raportti.tuote_kustannus} €<br><br>${raportti.tuote_maara}<br><br>${raportti.myynti_summa} €<br><br>${raportti.kustannus_summa} €<br><br>${raportti.voitto} €<br><br>${raportti.tilaus_pvm}<br><br>${raportti.status}`;
      raporttiElement.appendChild(tdElement);

      raporttiList.appendChild(raporttiElement);
    }
  } catch (error) {
    console.error('Virhe raportin hakemisessa:', error.message);
  }
};

fetchAndDisplayRaportit();


