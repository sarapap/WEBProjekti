/**
 * @file This script handles a shopping cart system with multiple functionalities including fetching products, 
 *       adding them to a cart, updating quantities, removing items, and placing orders. It also includes
 *       support for different languages with error messages and status texts tailored to each language.
 */

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

/**
 * Sets error and status messages based on the selected language.
 * 
 * @returns {void}
 */
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

/**
 * Fetches products and displays them in the shopping cart.
 * 
 * @async
 * @function fetchAndDisplayTuotteet
 * @returns {Promise<void>} A promise that resolves when products are fetched and displayed.
 */
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

/**
 * Finds product IDs based on user ID.
 * 
 * @async
 * @function findTuoteIdByUserId
 * @param {number} userId - The ID of the user.
 * @returns {Promise<number[]>} A list of product IDs.
 * @throws Will throw an error if there's an issue with fetching the data.
 */
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

/**
 * Gets product details based on product ID.
 * 
 * @async
 * @function getTuoteByTuoteId
 * @param {number} tuote_id - The ID of the product.
 * @param {number} tuoteMaara - The quantity of the product.
 * @returns {Promise<void>} A promise that resolves when the product details are fetched.
 * @throws Will throw an error if there's an issue with fetching the product.
 */
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
    imgElement.src = `../../uploads/${tuote.tuote_kuva}`;

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
      /**
 * Updates the displayed number of items in the cart.
 * 
 * @function paivitaOstoskorinNumero
 * @returns {void}
 */
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

/**
 * Deletes a product from the cart based on its ID.
 * 
 * @async
 * @function deleteTuoteFromCart
 * @param {number} userId - The ID of the user.
 * @param {number} tuote_id - The ID of the product.
 * @returns {Promise<void>} A promise that resolves when the product is removed from the cart.
 * @throws Will throw an error if there's an issue with removing the product.
 */
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

/**
 * Updates the quantity of a product in the cart.
 * 
 * @async
 * @function updateCart
 * @param {number} userId - The ID of the user.
 * @param {number} tuote_id - The ID of the product.
 * @param {number} uusiMaara - The new quantity of the product.
 * @returns {Promise<void>} A promise that resolves when the cart is updated.
 * @throws Will throw an error if there's an issue with updating the cart.
 */
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

/**
 * Gets the quantity of a product in the cart.
 * 
 * @async
 * @function getTuoteMaaraFromOstoskori
 * @param {number} userId - The ID of the user.
 * @param {number} tuote_id - The ID of the product.
 * @returns {Promise<number>} The quantity of the product in the cart.
 * @throws Will throw an error if there's an issue with fetching the quantity.
 */
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

/**
 * Deletes a product from the order list.
 * 
 * @function deleteTuoteFromTilauksenTuotelist
 * @param {number} tuote_id - The ID of the product to delete.
 * @returns {void}
 */
const deleteTuoteFromTilauksenTuotelist = (tuote_id) => {
  const index = tilauksenTuoteList.findIndex((tuote) => tuote.tuote_id === tuote_id);
  if (index !== -1) {
    tilauksenTuoteList.splice(index, 1);
  } else {
  }
};

/**
 * Checks if an order ID is valid.
 * 
 * @async
 * @function tarkistaTilausId
 * @param {number} tilaus_id - The ID of the order.
 * @returns {Promise<boolean>} True if the order ID is valid, otherwise false.
 * @throws Will throw an error if there's an issue with fetching the order ID.
 */
const tarkistaTilausId = async (tilaus_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus/${tilaus_id}`);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data && data.tilaus_id === tilaus_id;
  } catch (error) {
    return false;
  }
};

/**
 * Adds order content to an order.
 * 
 * @async
 * @function lisaaTilausSisalto
 * @param {number} tilaus_id - The ID of the order.
 * @param {number} tuote_id - The ID of the product.
 * @param {number} tuote_hinta - The price of the product.
 * @param {number} tuote_kustannus - The cost of the product.
 * @param {number} maara - The quantity of the product.
 * @returns {Promise<void>} A promise that resolves when the order content is added.
 * @throws Will throw an error if there's an issue with adding the order content.
 */
const lisaaTilausSisalto = async (tilaus_id, tuote_id, tuote_hinta, tuote_kustannus, maara) => {
  const myynti_summa = maara * tuote_hinta;
  const kustannus_summa = maara * tuote_kustannus;
  const voitto = myynti_summa - kustannus_summa;
  const tilaus_pvm = new Date().toISOString().slice(0, 10);
  const statusTeksti = statusText;

  try {
    const tilausIdKelvollinen = await tarkistaTilausId(tilaus_id);
    if (!tilausIdKelvollinen) {
      return;
    }

    const response = await fetch(`http://localhost:3000/api/v1/tilaus_sisalto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tilaus_id,
        tuote_id,
        maara,
        myynti_summa,
        kustannus_summa,
        tilaus_pvm,
        status: statusTeksti,
        voitto,
      }),
    });

    if (!response.ok) {
      throw new Error(virheTilaus);
    }

    const data = await response.json();
    console.log('Tilaus_sisalto lisätty:', data);
    const kieli = getSelectedLanguage();
    const targetPage = getPaymentPageUrl(kieli);

    window.location.href = targetPage;

  } catch (error) {
    alert(virheTilaus);
  }
};

/**
 * Creates a new order for a given user.
 * 
 * @async
 * @function lisaaTilaus
 * @param {number} userId - The ID of the user.
 * @param {number} tuote_id - The ID of the product.
 * @returns {Promise<number | null>} The order ID, or null if an error occurs.
 */
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
      throw new Error(virheTilaus);
    }

  } catch (error) {
    return null;
  }
};

/**
 * Gets the last order ID for a given user, creating a new one if necessary.
 * 
 * @async
 * @function getLastTilausId
 * @param {number} userId - The ID of the user.
 * @returns {Promise<number | null>} The last order ID, or null if an error occurs.
 */
const getLastTilausId = async (userId) => {
  const fetchLastTilausId = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/tilaus`, {
      method: 'GET',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const tilaus_id = data[data.length - 1].tilaus_id;
      return tilaus_id;
    }

    return null;
  };

  const createNewTilaus = async (asiakas_id) => {
    const response = await fetch('http://localhost:3000/api/v1/tilaus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ asiakas_id }),
    });

    if (!response.ok) {
      return null;
    }

    const newData = await response.json();
    if (newData && newData.tilaus_id) {
      return newData.tilaus_id;
    }

    return null;
  };

  try {
    let tilaus_id = await fetchLastTilausId();

    if (!tilaus_id) {
      tilaus_id = await createNewTilaus(userId);
    }

    return tilaus_id;

  } catch (error) {
    return null;
  }
};

/**
 * Adds business activity details to an order.
 * 
 * @async
 * @function lisaaYritystoiminta
 * @param {string} tilais_pvm - The date of the business activity.
 * @param {number} tilaus_id - The ID of the order.
 * @param {number} myynti_hinta - The total sales price.
 * @param {number} kustannus - The total cost.
 * @param {number} voitto - The total profit.
 * @returns {Promise<void>} A promise that resolves when business activity details are added.
 * @throws Will throw an error if there's an issue with adding business activity.
 */
const lisaaYritystoiminta = async (tilais_pvm, tilaus_id, myynti_hinta, kustannus, voitto) => {

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
      throw new Error(yritystoimintavirhe);
    }

    fetchAndDisplayYritystoiminta();
  } catch (error) {
  }
}

payButton.addEventListener('click', async () => {

  try {
    if (tilauksenTuoteList.length < 1) {
      alert(tyhjaOstoskori);
      return;

    } else {
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
    }
  } catch (error) {
  }

});

/**
 * Redirects to the appropriate payment page based on the selected language.
 * 
 * @function getPaymentPageUrl
 * @param {string} kieli - The selected language.
 * @returns {string} The URL of the payment page.
 */
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


fetchAndDisplayTuotteet();

