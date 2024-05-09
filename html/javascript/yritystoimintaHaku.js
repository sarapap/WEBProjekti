
window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("haeRaport");

  if (button) {
    button.addEventListener("click", async () => {

      const startDateElement = document.getElementById("aloituspvm1");
      const endDateElement = document.getElementById("lopetuspvm1");

      const startDate = startDateElement.value;
      const endDate = endDateElement.value;

      try {
        const response = await fetch(`http://localhost:3000/api/v1/yritystoiminta/${startDate}/${endDate}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Virhe raportin hakemisessa');
        }

        const raports = await response.json();
        const raportList = document.getElementById('raportList');

        raportList.innerHTML = "";
        await displayRaportit2();

        if (Array.isArray(raports)) {
          raports.forEach(async (r) => {
            await displayRaportit(r);
          });
        } else {
          await displayRaportit(raports);
        }

      } catch (error) {
      };
    });

    const displayRaportit = async (raport) => {

      console.log('raport:', raport);
      console.log('raport.tilaus_pvm:', raport.tapahtu_pvm);

      const tilaus_pvm = raport.tapahtu_pvm;
      const date = new Date(tilaus_pvm);
      const pvmIlmanAikaa = date.toISOString().split('T')[0]

      try {
        const raportList = document.getElementById('raportList');

        const tuoteElement = document.createElement('tr');
        tuoteElement.classList.add('raport-item');


        const pElement2 = document.createElement('td');
        pElement2.textContent = raport.tilaus_id;
        tuoteElement.appendChild(pElement2);

        const pElement3 = document.createElement('td');
        pElement3.textContent = raport.myynti_hinta + '€' + "  ";
        tuoteElement.appendChild(pElement3);

        const pElement4 = document.createElement('td');
        pElement4.textContent = raport.kustannus + '€';
        tuoteElement.appendChild(pElement4);

        const pElement5 = document.createElement('td');
        pElement5.textContent = raport.voitto + '€';
        tuoteElement.appendChild(pElement5);
        raportList.appendChild(tuoteElement);

        const pElement1 = document.createElement('td');
        pElement1.textContent = pvmIlmanAikaa;
        pElement1.style.minWidth = '100px';
        tuoteElement.appendChild(pElement1);
        raportList.appendChild(tuoteElement);

      } catch (error) {
      }
      return;
    };

  }

  const displayRaportit2 = async (th) => {
    try {
      const kieli = document.getElementById('kieli');
      const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

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

      const raportList = document.getElementById('raportList');

      const tuoteElement = document.createElement('tr');
      tuoteElement.classList.add('raport-item');

      const thElement1 = document.createElement('th');
      thElement1.textContent = tilausPvmTeksti;
      tuoteElement.appendChild(thElement1);

      const thElement2 = document.createElement('th');
      thElement2.textContent = tilausIdTeksti;
      tuoteElement.appendChild(thElement2);

      const thElement3 = document.createElement('th');
      thElement3.textContent = myynttiHintaTeksti;
      tuoteElement.appendChild(thElement3);

      const thElement4 = document.createElement('th');
      thElement4.textContent = kustannusTeksti;
      tuoteElement.appendChild(thElement4);

      const thElement5 = document.createElement('th');
      thElement5.textContent = voittoTeksti;
      tuoteElement.appendChild(thElement5);


      raportList.appendChild(tuoteElement);
    } catch (error) {
    }
  }
});