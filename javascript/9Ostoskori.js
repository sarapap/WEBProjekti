let statusText = '';
let virhesuosikit = '';
let virhesuosikit2 = '';
let virhesuosikit3 = '';
let virhetuote = '';
let virhetuote2 = '';
let virheostoskori = '';
let virheostoskori2 = '';
let virheostoskori3 = '';
let virheTilaus = '';
let tyhjaOstoskori = '';
let yritystoimintavirhe = '';
let tilausvirhe = '';
let lisattytoiminta = '';
const selectedLanguage = getSelectedLanguage();
switch (selectedLanguage) {
  case 'EN':
    virhesuosikit = 'Error fetching favorites!';
    virhesuosikit2 = 'Error adding favorite!';
    virhesuosikit3 = 'Error removing favorite!';
    virhetuote = 'Error fetching product!';
    virhetuote2 = 'Error removing product';
    virheostoskori = 'Error fetching cart!';
    virheostoskori2 = 'Error adding product to cart!';
    virheostoskori3 = 'Error updating product in cart!';
    statusText = 'Order received';
    virheTilaus = 'Error making order';
    tyhjaOstoskori = 'Your cart is empty';
    yritystoimintavirhe = 'Error adding business activity';
    tilausvirhe = 'Error fetching order';
    lisattytoiminta = 'Business activity added';
    break;
  case 'CN':
    virhesuosikit = '获取收藏夹时出错！';
    virhesuosikit2 = '添加收藏夹时出错！';
    virhesuosikit3 = '删除收藏夹时出错！';
    virhetuote = '获取产品时出错！';
    virhetuote2 = '删除产品时出错';
    virheostoskori = '获取购物车时出错！';
    virheostoskori2 = '将产品添加到购物车时出错！';
    virheostoskori3 = '在购物车中更新产品时出错！';
    statusText = '订单已接收';
    virheTilaus = '下订单时出错';
    tyhjaOstoskori = '您的购物车是空的';
    yritystoimintavirhe = '添加企业活动时出错';
    tilausvirhe = '获取订单时出错';
    lisattytoiminta = '企业活动已添加';
    break;
  case 'ET':
    virhesuosikit = 'Viga lemmikute laadimisel!';
    virhesuosikit2 = 'Viga lemmiku lisamisel!';
    virhesuosikit3 = 'Viga lemmiku eemaldamisel!';
    virhetuote = 'Viga toote laadimisel!';
    virhetuote2 = 'Viga toote eemaldamisel';
    virheostoskori = 'Viga ostukorvi laadimisel!';
    virheostoskori2 = 'Viga toote lisamisel ostukorvi!';
    virheostoskori3 = 'Viga toote uuendamisel ostukorvis!';
    statusText = 'Tellimus vastu võetud';
    virheTilaus = 'Viga tellimuse tegemisel';
    tyhjaOstoskori = 'Teie ostukorv on tühi';
    yritystoimintavirhe = 'Viga ettevõtluse lisamisel';
    tilausvirhe = 'Viga tellimuse hankimisel';
    lisattytoiminta = 'Ettevõtlus lisatud';
    break;
  case 'SV':
    virhesuosikit = 'Fel vid hämtning av favoriter!';
    virhesuosikit2 = 'Fel vid lägg till favorit!';
    virhesuosikit3 = 'Fel vid borttagning av favorit!';
    virhetuote = 'Fel vid hämtning av produkt!';
    virhetuote2 = 'Fel vid borttagning av produkt';
    virheostoskori = 'Fel vid hämtning av kundvagn!';
    virheostoskori2 = 'Fel vid lägg till produkt i kundvagn!';
    virheostoskori3 = 'Fel vid uppdatering av produkt i kundvagn!';
    statusText = 'Order mottagen';
    virheTilaus = 'Fel vid beställning';
    tyhjaOstoskori = 'Din varukorg är tom';
    yritystoimintavirhe = 'Fel vid läggning av företagsverksamhet';
    tilausvirhe = 'Fel vid hämtning av beställning';
    lisattytoiminta = 'Företagsverksamhet tillagd';
    break;
  case 'FI':
  default:
    virhesuosikit = 'Virhe suosikkien hakemisessa!';
    virhesuosikit2 = 'Virhe suosikin lisäämisessä!';
    virhesuosikit3 = 'Virhe suosikin poistamisessa!';
    virhetuote = 'Virhe tuotteen hakemisessa!';
    virhetuote2 = 'Virhe tuotteen poistamisessa'
    virheostoskori = 'Virhe ostoskorin hakemisessa!';
    virheostoskori2 = 'Virhe tuotteen lisäämisessä ostoskoriin!';
    virheostoskori3 = 'Virhe tuotteen päivittämisessä ostoskoriin!';
    statusText = 'Tilaus vastaanotettu';
    virheTilaus = 'Virhe tilauksen tekemisessä';
    tyhjaOstoskori = 'Ostoskorisi on tyhjä';
    yritystoimintavirhe = 'Virhe yritystoiminnan lisäämisessä';
    tilausvirhe = 'Virhe tilauksen hakemisessa';
    lisattytoiminta = 'Yritystoiminta lisätty';
    break;
}

let tuote_id = null;

const fetchAndDisplayTuotteet = async () => {
  const userId = getUserId();
  const tuoteList = document.getElementById('tuoteList');
  tuoteList.innerHTML = '';

  const tuoteIdList = await findTuoteIdByUserId(userId);

  for (const tuoteId of tuoteIdList) {
    const tuoteMaara = await getTuoteMaaraFromOstoskori(userId, tuoteId);
    await getTuoteByTuoteId(tuoteId, tuoteMaara);
  }
};

const findTuoteIdByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virhetuote);
    }

    const result = await response.json();
    const tuoteIdList = result.map((item) => item.tuote_id);
    return tuoteIdList;
  } catch (error) {
  }
};

const tilauksenTuoteList = [];
const getTuoteByTuoteId = async (tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virhetuote);
    }

    const tuote = await response.json();
    tilauksenTuoteList.push(tuote);
    console.log('Tilauksen tuotelista:', tilauksenTuoteList);
    console.log('tuoteLista lenght:', tilauksenTuoteList.length);
    console.log('Tuote:', tuote);

    let tuoteHintaTeksti = '';
    let tuoteMaaraTeksti = '';
    let paivitys = '';

    switch (selectedLanguage) {
      case 'EN':
        paivitys = 'Update';
        tuoteHintaTeksti = 'Price';
        tuoteMaaraTeksti = 'Amount';
        break;
      case 'CN':
        paivitys = '更新';
        tuoteHintaTeksti = '价格';
        tuoteMaaraTeksti = '数量';
        break;
      case 'ET':
        paivitys = 'Uuenda';
        tuoteHintaTeksti = 'Hind ';
        tuoteMaaraTeksti = 'Kogus';
        break;
      case 'SV':
        paivitys = 'Uppdatera';
        tuoteHintaTeksti = 'Pris';
        tuoteMaaraTeksti = 'Mängd';
        break;
      case 'FI':
      default:
        paivitys = 'Päivitä';
        tuoteHintaTeksti = 'Hinta';
        tuoteMaaraTeksti = 'Määrä';
        break;
    }

    const tuoteMaara = await getTuoteMaaraFromOstoskori(userId, tuote_id);

    const tuoteElement = document.createElement('tr');
    tuoteElement.classList.add('cake-item');

    const imgElement = document.createElement('img');
    imgElement.src = `../../../uploads/${tuote.tuote_kuva}`;

    imgElement.style.maxWidth = '200px';

    tuoteElement.appendChild(imgElement);

    const tdElement = document.createElement('td');
    tdElement.innerHTML = `${tuote.tuote_nimi}<br><br>${tuote.tuote_kuvaus}<br><br>${tuoteHintaTeksti}: ${tuote.tuote_hinta} €
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`;
    tuoteElement.appendChild(tdElement);

    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.min = '1';
    numberInput.max = '100';
    numberInput.value = tuoteMaara;

    numberInput.addEventListener('blur', async (event) => {
      const uusiMaara = parseInt(event.target.value, 10);

      if (uusiMaara < 1) {
        numberInput.value = '1';
      } else {
        await paivitaOstoskorinNumero();
        await updateCart(getUserId(), tuote_id, uusiMaara);
      }
    });
    numberInput.addEventListener('blur', paivitaLoppusumma);

    const updateButton = document.createElement('button');
    updateButton.textContent = paivitys;
    updateButton.classList.add('update-button');

    updateButton.addEventListener('click', async () => {
      const uusiMaara = parseInt(numberInput.value, 10);

      if (isNaN(uusiMaara) || uusiMaara < 1) {
        numberInput.value = '1';
        return;
      }

      await updateCart(getUserId(), tuote_id, uusiMaara);
      await paivitaOstoskorinNumero();
    });

    const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
    const tuotteet = await getTuotteenMaaraByUserId(userId);
    ostoskoriLkmElement.textContent = tuotteet.reduce((sum, tuote) => sum + tuote.tuote_maara, 0);

    const maaraElement = document.createElement('span');
    maaraElement.textContent = tuoteMaaraTeksti + ': ';

    tdElement.appendChild(maaraElement);
    tdElement.appendChild(numberInput);
    tdElement.appendChild(updateButton);

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerHTML = '<i class="fas fa-trash-alt" style="cursor:pointer;"></i>';
    deleteButtonElement.classList.add('delete-button');

    deleteButtonElement.addEventListener('click', async () => {
      await deleteTuoteFromCart(userId, tuote_id);
      deleteTuoteFromTilauksenTuotelist(tuote_id);
      paivitaLoppusumma();
    });


    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(deleteButtonElement);

    tuoteElement.appendChild(buttonContainer);

    tuoteList.appendChild(tuoteElement);
    const hrElement = document.createElement('hr');
    tuoteList.appendChild(hrElement);

  } catch (error) {
  }
};


//TODO
const laskeLoppusumma = (tuotteet) => {

  const kokonaissumma = tuotteet.reduce((summa, tuote) => {
    const tuote_hinta = Number(tuote.tuote_hinta);
    const tuote_maara = Number(tuote.tuote_maara);

    if (isNaN(tuote_hinta) || isNaN(tuote_maara)) {
      throw new Error("Tuotteen hinta tai määrä ei ole kelvollinen numero.");
    }

    return summa + (tuote_hinta * tuote_maara);
  }, 0);

  const alv = kokonaissumma * 0.24;
  const loppusumma = kokonaissumma + alv;

  return loppusumma.toFixed(2);
};



//TODO
const paivitaLoppusumma = async () => {
  const tuotteet = await getTuotteenMaaraByUserId(userId);
  const loppusummaElement = document.getElementById('loppusumma');

  if (loppusummaElement) {
    const loppusumma = laskeLoppusumma(tuotteet);
    console.log('Loppusumma:', loppusumma);
    loppusummaElement.textContent = `Loppusumma: ${loppusumma} €`;
  }
};

const ostoskoriTarkistus = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virheostoskori);
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
        throw new Error(virhetuote2);
      }

      fetchAndDisplayTuotteet();
    } catch (error) {
    }
  }
};

const updateCart = async (userId, tuote_id, uusiMaara) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
        tuote_id: tuote_id,
        tuote_maara: uusiMaara,
      }),
    });

    if (!response.ok) {
      throw new Error(virheostoskori3);
    }

  } catch (error) {
  }
};

const getTuoteMaaraFromOstoskori = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virhetuote);
    }

    const data = await response.json();
    return data.tuote_maara;
  } catch (error) {
    return 0;
  }
};

const deleteTuoteFromTilauksenTuotelist = (tuote_id) => {
  const index = tilauksenTuoteList.findIndex((tuote) => tuote.tuote_id === tuote_id);
  if (index !== -1) {
    tilauksenTuoteList.splice(index, 1);
    console.log('Tuote poistettu tilaukslistasta:', tilauksenTuoteList);
  }
};

const lisaaTilausSisalto = async (tilaus_id, tuote_id, tuote_hinta, tuote_kustannus, maara) => {

  const myynti_summa = maara * tuote_hinta;
  const kustannus_summa = maara * tuote_kustannus;
  const voitto = myynti_summa - kustannus_summa;
  const tilaus_pvm = new Date().toISOString().slice(0, 10);
  const statusTeksti = 'Tilaus vastaanotettu';

  await lisaaYritystoiminta(tilaus_pvm, tilaus_id, myynti_summa, kustannus_summa, voitto);


  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus_sisalto`, {

      method: 'POST',

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

const lisaaYritystoiminta = async (tilais_pvm, tilaus_id, myynti_hinta, kustannus, voitto) => {
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

function getPaymentPageUrl(kieli) {
  switch (kieli) {
    case 'EN':
      return '../../html/en/9Maksu_en.html';
    case 'CN':
      return '../../html/cn/9Maksu_cn.html';
    case 'ET':
      return '../../html/et/9Maksu_et.html';
    case 'SV':
      return '../../html/sv/9Maksu_sv.html';
    case 'FI':
    default:
      return '../../html/fi/9Maksu.html';
  }
}

payButton.addEventListener('click', async () => {
  if (tilauksenTuoteList.length < 1) {
    alert('Ostoskori on tyhjä');
    return;
  }

  const kieli = getSelectedLanguage();
  const targetPage = getPaymentPageUrl(kieli);

  window.location.href = targetPage;

  try {
    for (const tuote of tilauksenTuoteList) {
      const tuote_id = tuote.tuote_id;
      const tuote_hinta = tuote.tuote_hinta;
      const tuote_kustannus = tuote.tuote_kustannus;
      const tilaus_id = await getLastTilausId(userId);

      const maara = await getTuoteMaaraFromOstoskori(userId, tuote_id);

      await lisaaTilausSisalto(tilaus_id, tuote_id, tuote_hinta, tuote_kustannus, maara);
      await lisaaTilaus(userId, tuote_id);
      await deleteTuoteFromCart(userId, tuote_id);
      await paivitaOstoskorinNumero();
    }

  } catch (error) {
  }
});

fetchAndDisplayTuotteet();

