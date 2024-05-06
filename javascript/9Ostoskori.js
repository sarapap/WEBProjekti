
let tuote_id = null;

const fetchAndDisplayTuotteet = async () => {
  const userId = getUserId();
  const tuoteList = document.getElementById('tuoteList');
  tuoteList.innerHTML = '';
  const tuoteIdList = await findTuoteIdByUserId(userId);

  if (!Array.isArray(tuoteIdList)) {
    tuote_id = tuoteIdList;
    await getTuoteByTuoteId(tuote_id);

  } else {
    for (const tuoteId of tuoteIdList) {
      await getTuoteByTuoteId(tuoteId);
    }
  }
};

const findTuoteIdByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteiden hakemisessa');
    }

    const result = await response.json();
    const tuoteIdList = result.map((item) => item.tuote_id);
    console.log('Tuote id:', tuoteIdList);

    return tuoteIdList;

  } catch (error) {
    console.error('Virhe tuotteiden hakemisessa:', error.message);
  }
};

const tilauksenTuoteList = [];
const getTuoteByTuoteId = async (tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteen hakemisessa');
    }
    const tuote = await response.json();
    tilauksenTuoteList.push(tuote);
    console.log('Tilauksen tuotelista:', tilauksenTuoteList);
    console.log('tuoteLista lenght:', tilauksenTuoteList.length);
    console.log('Tuote:', tuote);

    const kieli = document.getElementById('kieli');
    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

    let tuoteNimiTeksti = '';
    let tuoteKuvaTeksti = '';
    let tuoteKuvausTeksti = '';
    let tuoteHintaTeksti = '';
    let tuoteMaaraTeksti = '';

    switch (selectedLanguage) {
      case 'EN':

        tuoteNimiTeksti = 'Product name';
        tuoteKuvaTeksti = 'Product image';
        tuoteKuvausTeksti = 'Product description';
        tuoteHintaTeksti = 'Price';
        tuoteMaaraTeksti = 'Amount';
        break;

      case 'CN':

        tuoteNimiTeksti = '产品名称';
        tuoteKuvaTeksti = '产品图片';
        tuoteKuvausTeksti = '产品描述';
        tuoteHintaTeksti = '价格';
        tuoteMaaraTeksti = '数量';
        break;
      case 'ET':
        tuoteNimiTeksti = 'Toote nimi';
        tuoteKuvaTeksti = 'Toote pilt';
        tuoteKuvausTeksti = 'Toote kirjeldus';
        tuoteHintaTeksti = 'Hind ';
        tuoteMaaraTeksti = 'Kogus';
        break;
      case 'SV':
        tuoteNimiTeksti = 'Produktnamn';
        tuoteKuvaTeksti = 'Produktbild ';
        tuoteKuvausTeksti = 'Produktbeskrivning';
        tuoteHintaTeksti = 'Pris';
        tuoteMaaraTeksti = 'Mängd';
        break;
      case 'FI':
      default:
        valintaTeksti = 'Valitse';
        tuoteNimiTeksti = 'Tuotteen nimi';

        tuoteKuvausTeksti = 'Tuote kuvaus';
        tuoteHintaTeksti = 'Hinta';
        tuoteMaaraTeksti = 'Määrä';
        break;
    }

   // Etsitään taulukko, johon tuotteet lisätään
const tuoteList = document.getElementById('tuoteList');

// Luodaan uusi rivi (tr) taulukkoon
const tuoteElement = document.createElement('tr');
tuoteElement.classList.add('cake-item');

const imgElement = document.createElement('img');
imgElement.src = `../../../uploads/${tuote.tuote_kuva}`;
imgElement.style.maxWidth = '200px'; // Asetetaan maksimileveys 100px

// imgElement.addEventListener('click', () => {
//   window.location.href = `http://127.0.0.1:5501/uploads/tuote_kuva-1714649302841.png`;
// });

tuoteElement.appendChild(imgElement);

// Lisätään soluun tuotteen kuvaus
// Luodaan solu tuotteen nimen ja kuvauksen tallentamista varten
const tdElement = document.createElement('td');
tdElement.innerHTML = `${tuote.tuote_nimi}<br><br>${tuote.tuote_kuvaus}<br><br>${tuoteHintaTeksti}: ${tuote.tuote_hinta} €
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`;
tdElement.style
tuoteElement.appendChild(tdElement);

// Luodaan numero input ja määräelementti samalle riville

const numberInput = document.createElement('input');

numberInput.classList.add('maara-input'); // Lisätään luokka
numberInput.type = 'number';
numberInput.name = 'maara';
numberInput.value = '1';
numberInput.min = '1';
numberInput.max = '100';

numberInput.addEventListener('input', async () => {
  const tarkistus = await ostoskoriTarkistus(userId, tuote_id);
  if (tarkistus) {
    const tuoteMaara = await getTuoteMaaraFromOstoskori(userId, tuote_id);
    numberInput.value = tuoteMaara;
  } else {
    const tuote_maara = parseInt(numberInput.value);
  }
});

numberInput.addEventListener('click', async () => {
  const tuote_maara = parseInt(numberInput.value);
  await updateCart(userId, tuote_id, tuote_maara);
});


const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
const tuotteet = await getTuotteenMaaraByUserId(userId);
ostoskoriLkmElement.textContent = tuotteet.length.toString();

const maaraElement = document.createElement('span');
maaraElement.textContent = tuoteMaaraTeksti + ': ';

tdElement.appendChild(maaraElement);
tdElement.appendChild(numberInput);

// Luodaan painike poistoa varten
const deleteButtonElement = document.createElement('button');
deleteButtonElement.innerHTML = '<i class="fas fa-trash-alt"></i>';
deleteButtonElement.classList.add('delete-button');

// Lisätään tapahtumankuuntelija poistopainikkeelle
deleteButtonElement.addEventListener('click', async () => {
  await deleteTuoteFromCart(userId, tuote_id);
  deleteTuoteFromTilauksenTuotelist(tuote_id);
});

// Luodaan div, johon poistopainike lisätään
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
buttonContainer.appendChild(deleteButtonElement);

// Lisätään poistopainike ja sen sisältävä div soluun
tuoteElement.appendChild(buttonContainer);

// Lisätään rivit taulukkoon
tuoteList.appendChild(tuoteElement);
const hrElement = document.createElement('hr');
tuoteList.appendChild(hrElement);

  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const ostoskoriTarkistus = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin hakemisessa');
    }
    const ostoskoriList = await response.json();
    const tuoteIdList = ostoskoriList.map((tuote) => tuote.tuote_id);
    const asiakasIdList = ostoskoriList.map((asiakas) => asiakas.asiakas_id);

    if (!asiakasIdList.includes(userId) || !tuoteIdList.includes(tuote_id)) {
      return false;
    } else {
      return true;
    }

  } catch (error) {
    console.error('Virhe ostoskorin hakemisessa:', error.message);
  }
};

const deleteTuoteFromCart = async (userId, tuote_id) => {
  const onTuoteKorissa = await ostoskoriTarkistus(userId, tuote_id);
  if (onTuoteKorissa) {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Virhe tuotteen poistamisessa');
      }
      //päivitä sivu
      fetchAndDisplayTuotteet();
      console.log('Tuote poistettu ostoskorista');
    } catch (error) {
      console.error('Virhe tuotteen poistamisessa:', error.message);
    }
  }
};

const updateCart = async (userId, tuote_id, uusimaara) => {
  const tuoteMaaraKorissa = await getTuoteMaaraFromOstoskori(userId, tuote_id);
  console.log('Korissa oleva määrä:', tuoteMaaraKorissa);
  console.log('Tuotteen uusi määrä:', uusimaara);

  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
        tuote_id: tuote_id,
        tuote_maara: uusimaara,
      }),
    });
    if (!response.ok) {
      throw new Error('Virhe tuotteen päivittämisessä');
    }
    console.log('Tuote päivitetty ostoskoriin');
  } catch (error) {
    console.error('Virhe tuotteen päivittämisessä:', error.message);
  }
};

const getTuoteMaaraFromOstoskori = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Virhe tuotteen hakemisessa');
      return 0;
    }
    const data = await response.json();
    const maara = data.tuote_maara;
    console.log('Tuotteen määrä:', maara);
    return maara;
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const deleteTuoteFromTilauksenTuotelist = (tuote_id) => {
  const index = tilauksenTuoteList.findIndex((tuote) => tuote.tuote_id === tuote_id);
  if (index !== -1) {
    tilauksenTuoteList.splice(index, 1);
    console.log('Tuote poistettu tilaukslistasta:', tilauksenTuoteList);
  }
};

const lisaaTilausSisalto = async ( tilaus_id, tuote_id, tuote_hinta, tuote_kustannus, maara) => {

    const myynti_summa = maara * tuote_hinta;
    const kustannus_summa = maara * tuote_kustannus;
    const voitto = myynti_summa - kustannus_summa;
    const tilaus_pvm = new Date().toISOString().slice(0, 10);
    const statusTeksti= 'Tilaus vastaanotettu';

    await lisaaYritystoiminta(tilaus_pvm, tilaus_id, myynti_summa, kustannus_summa, voitto);


  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus_sisalto`, {
      method: 'POST', // Käytä POST-kutsua uuden tilauksen lisäämiseen
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tilaus_id: tilaus_id,
        tuote_id: tuote_id,
        maara: maara,
        myynti_summa: myynti_summa,
        kustannus_summa: kustannus_summa,
        tilaus_pvm: tilaus_pvm,
        status: statusTeksti,
        voitto: voitto

      }),
    });

    if (!response.ok) {
      throw new Error('Virhe tilauksen tekemisessä');
    }
    const data = await response.json();
   console.log('data', data);
    console.log('Tilaus tehty');
    alert('Kiitos! Tilaus tehty');

  } catch (error) {
    console.error('Virhe tilauksen tekemisessä:', error.message);
  }
};

const lisaaTilaus = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe tilauksen tekemisessä');
    }

  } catch (error) {
    console.error('Virhe tilauksen tekemisessä:', error.message);
    return null;
  }
};

const getLastTilausId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tilauksen hakemisessa');
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length < 1) {
    const tilaus_id = data.tilaus_id;
    } else if (Array.isArray(data)) {
      const tilaus_id = data[data.length - 1].tilaus_id;

    console.log('Tilaus id:', tilaus_id);
    return tilaus_id;

    }
  } catch (error) {
    console.error('Virhe tilauksen hakemisessa:', error.message);
  }
}

const lisaaYritystoiminta = async ( tilais_pvm, tilaus_id, myynti_hinta, kustannus, voitto) => {
  console.log('tilais_pvm:', tilais_pvm, 'tilaus_id:', tilaus_id, 'myynti_hinta:', myynti_hinta, 'kustannus:', kustannus, 'voitto:', voitto);

  try {
    const response = await fetch('http://localhost:3000/api/v1/yritystoiminta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tapahtu_pvm: tilais_pvm,
        tilaus_id: tilaus_id,
        myynti_hinta: myynti_hinta,
        kustannus: kustannus,
        voitto: voitto
      }),
    });
    if (!response.ok) {
      throw new Error('Virhe yritystoiminnan lisäämisessä');
    }
    alert('Yritystoiminta lisätty');
    fetchAndDisplayYritystoiminta();
  } catch (error) {
    console.error('Virhe yritystoiminnan lisäämisessä:', error.message);
  }
}

const payButton = document.getElementById('payButton');
payButton.addEventListener('click', async () => {
  console.log('Tilauksen tuotelista:', tilauksenTuoteList);
  try {
    if (tilauksenTuoteList.length < 1) {
      alert('Ostoskori on tyhjä');
      return;
    } else {
      for (const tuote of tilauksenTuoteList) {
        const tuote_id = tuote.tuote_id;
        const tuote_hinta = tuote.tuote_hinta;
        const tuote_kustannus = tuote.tuote_kustannus;
        const tilaus_id = await getLastTilausId(userId);

        console .log(userId, tuote_id, 'tuote_hinta:', tuote_hinta, 'tuote_kustannus:', tuote_kustannus);//ok
        console.log('tilaus_id:', tilaus_id);//ok

        const maara = await getTuoteMaaraFromOstoskori(userId, tuote_id);
        console.log('Tuotteen määrä: 412', maara);

        await lisaaTilausSisalto(tilaus_id, tuote_id, tuote_hinta, tuote_kustannus, maara);
        await lisaaTilaus(userId, tuote_id);
        await deleteTuoteFromCart(userId, tuote_id);
        await paivitaOstoskorinNumero();
      }
    }
  } catch (error) {
    console.error('Virhe tilauksen tekemisessä:', error.message);
  }
});

fetchAndDisplayTuotteet();
