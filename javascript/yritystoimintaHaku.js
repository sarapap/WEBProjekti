document.addEventListener('DOMContentLoaded', () => {
  const raportButton = document.getElementById('raportButton');

  raportButton.addEventListener('click', async () => {
    const startDate = document.getElementById('aloituspvm1').value;
    const endDate = document.getElementById('lopetuspvm1').value;
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    await fetchAndDisplayRaportit(startDate, endDate);
  });
});

const fetchAndDisplayRaportit = async (startDate, endDate) => {

  try {
    const response = await fetch(`http://localhost:3000/api/v1/yritystoiminta/${startDate}/${endDate}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe raportin hakemisessa');
    }

    const data = await response.json();
    console.log('Raportti:', data);

  const selectedLanguage = 'FI'; // Oletuskieli, koska "kieli" elementtiä ei ole

  let tilausPvmTeksti = '';
  let tilausIdTeksti = '';
  let myynttiHintaTeksti = '';
  let kustannusTeksti = '';
  let voittoTeksti = '';

  switch (selectedLanguage) {
    case 'EN':
      tilausPvmTeksti = 'Order date';
      tilausIdTeksti = 'Order number';
      myynttiHintaTeksti = 'Sales price';
      kustannusTeksti = 'Cost';
      voittoTeksti = 'Profit';
      break;
    case 'CN':
      tilausPvmTeksti = '订单日期';
      tilausIdTeksti = '订单号';
      myynttiHintaTeksti = '销售价格';
      kustannusTeksti = '成本';
      voittoTeksti = '利润';
      break;
    case 'SE':
      tilausPvmTeksti = 'Orderdatum';
      tilausIdTeksti = 'Ordernummer';
      myynttiHintaTeksti = 'Försäljningspris';
      kustannusTeksti = 'Kostnad';
      voittoTeksti = 'Vinst';
      break;
    case 'FI':
    default:
      tilausPvmTeksti = 'Tilauspäivä';
      tilausIdTeksti = 'Tilausnumero';
      myynttiHintaTeksti = 'Myyntihinta';
      kustannusTeksti = 'Kustannus';
      voittoTeksti = 'Voitto';
      break;
  }



    const raporttiList = document.getElementById('raporttiList');
    raporttiList.innerHTML = '';

    if (data.length === 0) {
      alert('Raporttia ei löytynyt.');
    } else {
      for (const raportti of data) {
        const tuoteElement = document.createElement('div');
        tuoteElement.classList.add('raport-item');

        const h3Element = document.createElement('th');
        h3Element.textContent = tilausPvmTeksti;
        tuoteElement.appendChild(h3Element);

        const h3Element2 = document.createElement('th');
        h3Element2.textContent = tilausIdTeksti;
        tuoteElement.appendChild(h3Element2);

        const h3Element3 = document.createElement('th');
        h3Element3.textContent = myynttiHintaTeksti;
        tuoteElement.appendChild(h3Element3);

        const h3Element4 = document.createElement('th');
        h3Element4.textContent = kustannusTeksti;
        tuoteElement.appendChild(h3Element4);

        const h3Element5 = document.createElement('th');
        h3Element5.textContent = voittoTeksti;
        tuoteElement.appendChild(h3Element5);

        const pElement = document.createElement('td');
        pElement.textContent = raportti.tilaus_pvm;
        tuoteElement.appendChild(pElement);

        const pElement2 = document.createElement('td');
        pElement2.textContent = raportti.tilaus_id;
        tuoteElement.appendChild(pElement2);

        const pElement3 = document.createElement('td');
        pElement3.textContent = raportti.myyntihinta;
        tuoteElement.appendChild(pElement3);

        const pElement4 = document.createElement('td');
        pElement4.textContent = raportti.kustannus;
        tuoteElement.appendChild(pElement4);

        const pElement5 = document.createElement('td');
        pElement5.textContent = raportti.voitto;
        tuoteElement.appendChild(pElement5);

        raporttiList.appendChild(tuoteElement);
      }
    }
  } catch (error) {
    console.error('Virhe raportin hakemisessa:', error.message);
  }
};
