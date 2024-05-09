// function logOut() {
//   localStorage.removeItem('authToken');
// }


const userId = 69;

const tilausIdList = [];
const allIdFromTs = [];
const uusiIdList = [];

// // const userId = getUserId() || addVierasUser();
// const userId = getUserId();
// console.log('userId:', userId);
// logOut();

const tilausList = document.getElementById('tilaus-list');

console.log('userId:', userId);


const fetchAndDisplayTuotteet = async () => {
  const tilausIdList = await findTilausIdByUserId(userId);

  const allIdFromTs = await getAllTilausIdFromTilaus();
  console.log('allIdFromTs:', allIdFromTs);


  allIdFromTs.forEach(id => {
    if (tilausIdList.includes(id)) {
      uusiIdList.push(id);
    }
  });

  uusiIdList.forEach(async (id) => {
    const tuotteet = await getTuoteListFromTsByTilausId(id);
    await displayTuotteet(tuotteet);

  });
  console.log("Uusi ID-lista:", uusiIdList);
};


const findTilausIdByUserId = async (userId) => {
  console.log('userId:', userId);
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus/asiakas/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tilausten hakemisessa');
    }
    const result = await response.json();
    if (!Array.isArray(result)) {
      const tilausId = result.tilaus_id;
      console.log('tilaus id:', tilausId);
      return tilausId;

    } else {
      const tilausIdList = result.map((item) => item.tilaus_id);
      console.log('tilauksen list:', tilausIdList);
      return tilausIdList;
    }
  } catch (error) {
    console.error('Virhe tilausten hakemisessa:', error.message);
  }
  return [];
};


const getAllTilausIdFromTilaus = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus_sisalto/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tilauksen hakemisessa');
    }

    const result = await response.json();
    const allTilausIdFronTilausSisalto = result.map((item) => item.tilaus_id);
    console.log('all id tilaus_sisalto:', allTilausIdFronTilausSisalto);

    allTilausIdFronTilausSisalto.forEach(async (tilaus_id) => {
      allIdFromTs.push(tilaus_id);

      console.log('allIdFromTs: 81', allIdFromTs);
    });
    return allIdFromTs;

  } catch (error) {

    console.error('Virhe tilauksen hakemisessa:', error.message);
  }
};

const getTuoteListFromTsByTilausId = async (tilaus_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus_sisalto//tilaus/${tilaus_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Tilaus sisältöä tilaus_id:lle ${tilaus_id} ei löydy. Jatketaan seuraavaan tilaus_id:hen.`);
        return; // Palauta tyhjä arvo, jotta funktion suoritus jatkuu seuraavalla tilaus_id:llä
      }
      throw new Error('Virhe tuotteen hakemisessa');
    }

    const tuotteet = await response.json();
    console.log('tuotteet:', tuotteet);
    return tuotteet;

  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
}

const displayTuotteet = async (tuotteet) => {

  if (tuotteet.length > 0) {
    tuotteet.forEach(async (tuote) => {
      console.log('Tuote 139:', tuote);

      const nimi_hinta = await getTuoteNimiJaHintaByTuoteId(tuote.tuote_id);
      const tuote_nimi = nimi_hinta.tuote_nimi;
      const tuote_hinta = nimi_hinta.tuote_hinta;
      const tilaus_pvm = tuote.tilaus_pvm;
      const date = new Date(tilaus_pvm);
      const pvmIlmanAikaa = date.toISOString().split('T')[0]

      // Luodaan uusi rivi (tr) taulukkoon
      const tilausList = document.getElementById('tilaus-list');
      const tuoteElement = document.createElement('td');
      tuoteElement.classList.add('tilaus-item');

      tilausList.appendChild(tuoteElement);
      const tdElement = document.createElement('td');
      tdElement.innerHTML = pvmIlmanAikaa;
      tuoteElement.appendChild(tdElement);

      const tdElement2 = document.createElement('td');
      tdElement2.innerHTML = 'Nro: ' + tuote.tilaus_id;
      tuoteElement.appendChild(tdElement2);

      const tdElement3 = document.createElement('td');
      tdElement3.innerHTML = tuote_nimi;
      tuoteElement.appendChild(tdElement3);

      const tdElement4 = document.createElement('td');
      tdElement4.innerHTML = tuote_hinta + ' €';
      tuoteElement.appendChild(tdElement4);

      const tdElement5 = document.createElement('td');
      tdElement5.innerHTML = tuote.maara + ' kpl';
      tuoteElement.appendChild(tdElement5);

      const tdElement6 = document.createElement('td');
      tdElement6.innerHTML = tuote.myynti_summa + ' €';
      tuoteElement.appendChild(tdElement6);

      tilausList.appendChild(tuoteElement);

    });
  };
};

const tilausTarkistus = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Ei tilauksia');
    }

    const tilaukset = await response.json();

    if (tilaukset.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Virhe ostoskorin hakemisessa:', error.message);
  }
};

const findTuoteIdByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus/${userId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Virhe tuotteiden hakemisessa');
    }
    const result = await response.json();
    const tilausIdList = result.map((item) => item.tuote_id);
    console.log('tilaus id:', tilausIdList);
    return tilausIdList;

  } catch (error) {
    console.error('Virhe tuotteiden hakemisessa:', error.message);
  }
};

const getTuoteNimiJaHintaByTuoteId = async (tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteen hakemisessa');
    }

    const result = await response.json();
    if (!Array.isArray(result)) {
      const nimi_hinta = {
        tuote_nimi: result.tuote_nimi,
        tuote_hinta: result.tuote_hinta
      };
      console.log('nimi ja hinta:', nimi_hinta);
      return nimi_hinta;
    } else {
      const tuote_nimi = result.map((item) => item.tuote_nimi);
      console.log('tuote nimi:', tuote_nimi);
      return tuote_nimi;
    }

  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const fetchAndDisplayTuotteet2 = async () => {
  try {
    const kieli = document.getElementById('kieli');
    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

    let tilausPVMTeksti = '';
    let tilausIDTeksti = '';
    let tuoteNimiTeksti = '';
    let tuoteHintaTeksti = '';
    let tuoteMaaraTeksti = '';
    let summaTeksti = '';

    switch (selectedLanguage) {
      case 'EN':
        tilausPVMTeksti = 'Order date';
        tilausIDTeksti = 'Order ID';
        tuoteNimiTeksti = 'Product name';
        tuoteHintaTeksti = 'Price';
        tuoteMaaraTeksti = 'Amount';
        summaTeksti = 'Sum';
        break;
      case 'CN':
        tilausPVMTeksti = '订单日期';
        tilausIDTeksti = '订单编号';
        tuoteNimiTeksti = '产品名称';
        tuoteHintaTeksti = '价格';
        tuoteMaaraTeksti = '数量';
        summaTeksti = '总计';
        break;
      case 'ET':
        tilausPVMTeksti = 'Tellimuse kuupäev';
        tilausIDTeksti = 'Tellimuse ID';
        tuoteNimiTeksti = 'Toote nimi';
        tuoteHintaTeksti = 'Hind';
        tuoteMaaraTeksti = 'Kogus';
        summaTeksti = 'Summa';
        break;
      case 'SV':
        tilausPVMTeksti = 'Beställningsdatum';
        tilausIDTeksti = 'Beställningsnummer';
        tuoteNimiTeksti = 'Produktnamn';
        tuoteHintaTeksti = 'Pris';
        tuoteMaaraTeksti = 'Mängd';
        summaTeksti = 'Summa';
        break;
      case 'FI':
      default:
        tilausPVMTeksti = 'Tilauspäivämäärä';
        tilausIDTeksti = 'Tilaus ID';
        tuoteNimiTeksti = 'Tuotteen nimi';
        tuoteHintaTeksti = 'Hinta';
        tuoteMaaraTeksti = 'Määrä';
        summaTeksti = 'Summa';
        break;
    }


    const tilausList = document.getElementById('tilaus-list');
    const tuoteElement = document.createElement('tr');
    tuoteElement.classList.add('tilaus-item');

    const thElmet = document.createElement('th');
    thElmet.textContent = tilausPVMTeksti;
    tuoteElement.appendChild(thElmet);

    const thElmet2 = document.createElement('th');
    thElmet2.textContent = tilausIDTeksti;
    tuoteElement.appendChild(thElmet2);

    const thElmet3 = document.createElement('th');
    thElmet3.textContent = tuoteNimiTeksti;
    tuoteElement.appendChild(thElmet3);

    const thElmet4 = document.createElement('th');
    thElmet4.textContent = tuoteHintaTeksti;
    tuoteElement.appendChild(thElmet4);

    const thElmet5 = document.createElement('th');
    thElmet5.textContent = tuoteMaaraTeksti;
    tuoteElement.appendChild(thElmet5);

    const thElmet6 = document.createElement('th');
    thElmet6.textContent = summaTeksti;
    tuoteElement.appendChild(thElmet6);

    tilausList.appendChild(tuoteElement);


  } catch (error) {
    console.error('Virhe raportin hakemisessa:', error);
  };
};

fetchAndDisplayTuotteet2();
fetchAndDisplayTuotteet();