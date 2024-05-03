'use strict';
// get asiakas id from local storage

const getUserId = () => {

  const token = localStorage.getItem('authToken');
  const base64Payload = token.split('.')[1];
  const payload = atob(base64Payload);
  const parsedPayload = JSON.parse(payload);
  let userID = parsedPayload.asiakas_id;
  console.log('asiakas id:', userID);
  console.log('token:', token);
  return userID;
}


const handleNewValue = async () => {
  const alatyyppi = getSelectedAlaTyyppi();
  await updateSubtypes(alatyyppi);
};

const updateSelectedAlatyyppi = () => {
  const selectedAlatyyppi = document.getElementById('cakeType').value;
  cakeList.innerHTML = '';
  console.log('Valittu tyyppi:', selectedAlatyyppi);
  return selectedAlatyyppi;
}

// Lisää tapahtumankäsittelijä select-elementille
document.getElementById('cakeType').addEventListener('change', async () => {
  // Päivitä selectedAlatyyppi aina, kun vaihtoehtoa muutetaan
  //await updateSelectedAlatyyppi();
  await fetchAndDisplayTuotteet();
});

const getSelectedAlaTyyppi = async() => {
  const selectedAlatyyppi = await updateSelectedAlatyyppi('cakeType').value;
  console.log('selectedAlatyyppi:', selectedAlatyyppi);
  return selectedAlatyyppi;
};

const getTyyppiIdLista = async () => {
  try {
    const selectedAlatyyppi = await updateSelectedAlatyyppi();
    console.log('Valittu alatyyppi get id listassa:', selectedAlatyyppi);

    let url;
    if (selectedAlatyyppi === 'kaikki') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakut';
    } else if (selectedAlatyyppi === 'juhlakakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/juhlakakut';
    } else if (selectedAlatyyppi === 'suolaiset kakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/suolaiset%20kakut';
    } else if (selectedAlatyyppi === 'makeat kakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/makeat%20kakut';
    } else if (selectedAlatyyppi === '全部') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/蛋糕';
    } else if (selectedAlatyyppi === '节日蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/节日蛋糕';
    } else if (selectedAlatyyppi === '咸味蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/咸味蛋糕';
    } else if (selectedAlatyyppi === '甜味蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/甜味蛋糕';
    }

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe alatyyppien hakemisessa');
    }

    const tyyppiList = await response.json();

    if (Array.isArray(tyyppiList)) {
    const tyyppiIdList = tyyppiList.map((tyyppi) => tyyppi.tyyppi_id);
    console.log('Tyyppi id list:', tyyppiIdList);
    return tyyppiIdList;

    } else if (tyyppiList.tyyppi_id) {
      console.log('Tyyppi id:', tyyppiList.tyyppi_id);
      return tyyppiList.tyyppi_id;
    }

  } catch (error) {
    console.error('Virhe tuote_id hakemisessa:', error.message);
    return [];
  }
};

const fetchAndDisplayTuotteet = async () => {

  const IdResult = await getTyyppiIdLista();

  if (!Array.isArray(IdResult)) {
    const tyyppiId = IdResult;
    console.log('Tyyppi id_ not list:', tyyppiId);

    await fetchAndDisplayByTyyppiId(tyyppiId);
  } else {
    for (const tyyppiId of IdResult) {

      await fetchAndDisplayByTyyppiId(tyyppiId);
  }
}
};

const fetchAndDisplayByTyyppiId = async (tyyppiId) => {
try {
  const response = await fetch(`http://localhost:3000/api/v1/tuote/tyyppi_id/${tyyppiId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Virhe tuote hakemisessa');
  }
  const tuote = await response.json();
  console.log('Tuote:', tuote);

  const kieli = document.getElementById('kieli');

  const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

  let addCartText = '';
  let addFavoriteText = '';
  let hintaTeksti = '';
  let maaraTeksti = '';
  switch (selectedLanguage) {
      case 'EN':
          addCartText = 'Addto cart';
          addFavoriteText = 'Add to favorites';
          hintaTeksti = 'Price: ';
          break;
      case 'CN':
          addCartText = '添加到购物车';
          addFavoriteText = '添加到收藏夹';
          hintaTeksti = '价格: ';
          maaraTeksti = '数量: ';
          break;
      case 'ET':
          addCartText = 'Lisa ostukorvi';
          addFavoriteText = 'Lisa lemmikutesse';
          hintaTeksti = 'Hind: ';
          hintaTeksti = 'Kogus: ';
          maaraTeksti = 'Kogus: ';


          break;
      case 'SV':
          addCartText = 'Lägg till i kundvagnen';
          addFavoriteText = 'Lägg till i favoriter';
          hintaTeksti = 'Pris: ';
          maaraTeksti = 'Mängd: ';

          break;
      case 'FI':
      default:
          addCartText = 'Lisää ostoskoriin';
          addFavoriteText = 'Tallenna suosikkeihin';
          hintaTeksti = 'Hinta: ';
          maaraTeksti = 'Määrä: ';
          break;
      }

    const cakeList = document.getElementById('cakeList');
    const userId = getUserId();

    const tuoteElement = document.createElement('div');
    tuoteElement.classList.add('cake-item');

    // Lisää kuvakehys
    const imgElement = document.createElement('img');
    imgElement.src = `../../../uploads/${tuote.tuote_kuva}`; // Olettaen, että tuotteella on kuvaattribuutti
    tuoteElement.appendChild(imgElement);

    // Lisää tuotteen nimi
    const h3Element = document.createElement('h3');
    h3Element.textContent = tuote.tuote_nimi;
    tuoteElement.appendChild(h3Element);

    // Lisää tuotteen kuvaus
    const pElement = document.createElement('p');
    pElement.textContent = tuote.tuote_kuvaus;
    tuoteElement.appendChild(pElement);

   // Lisää hinta
  const h4Element = document.createElement('h4');
  const hintaElement = document.createElement('span'); // Luo uusi elementti hintatekstille
  hintaElement.textContent = hintaTeksti;
  h4Element.appendChild(hintaElement); // Lisää hintateksti h4-elementtiin
  tuoteElement.appendChild(h4Element); // Lisää h4-elementti tuoteElementtiin

  // Luodaan <input>-elementti numeron syöttämiseksi
const numberInput = document.createElement('input');
numberInput.type = 'number';
numberInput.name = 'maara';
numberInput.value = '1';
numberInput.min = '1';
numberInput.max = '100';

// Luodaan määräelementti
const maaraElement = document.createElement('span');
maaraElement.textContent = maaraTeksti;

// Lisätään määräelementti ja numeron syöttöelementti tuoteElementtiin
tuoteElement.appendChild(maaraElement);
tuoteElement.appendChild(numberInput);


    // Lisää "Lisää ostoskoriin" -painike
    const buttonElement = document.createElement('button');
    buttonElement.textContent = addCartText;
    tuoteElement.appendChild(buttonElement);

     //lisää "tallenna suosikkeihin" -painike
     const buttonElement2 = document.createElement('button');
     buttonElement2.textContent =  addFavoriteText;
     tuoteElement.appendChild(buttonElement2);

    buttonElement.addEventListener('click', async() => {
      const ostoskoriTuoteId = getTuoteIdFromCart(userId);
      console.log('Tuote id laitamaan koriin:', tuote.tuote_id);
      if (!ostoskoriTuoteId || !ostoskoriTuoteId.includes(tuote.tuote_id)) {
        await addToCart(userId, tuote.tuote_id);
      } else {
        console.log('Tuote on jo ostoskorissa');
        tuoteElement.style.backgroundColor = 'red';
        tuote_maara = tuote_maara + 1;
       await updateCart(userId, tuote.tuote_id, tuote_maara);
      }
    });

    buttonElement.addEventListener('click', async () => {
      const ostoskoriTuoteId = await getTuoteIdFromCart(userId);
      console.log('Tuote id laitamaan koriin:', tuote.tuote_id);
      if (!ostoskoriTuoteId || !ostoskoriTuoteId.includes(tuote.tuote_id)) {
        await addToCart(userId, tuote.tuote_id);
        // Vaihda painikkeen teksti ja väri, jos tuotetta ei ole jo ostoskorissa
        buttonElement.textContent = 'Tuote on ostoskorissa';
      } else {
        console.log('Tuote on jo ostoskorissa');
        tuote_maara = tuote_maara + 1;
        await updateCart(userId, tuote.tuote_id, tuote_maara);
      }
    });


    // Lisää tuoteElementti listaan
    cakeList.appendChild(tuoteElement);
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const favorateTarkistus = async (userID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }
    const ids = await response.json();
    const asiakasId= ids.map((id) => id.asiakas_id);
     if (!asiakasId.includes(userID)) {
      console.log('Suosikkeja ei löytynyt');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    return [];
  }
};


const addFavorite = async (asiakas_id, tuote_id) => {

    try {
      const response = await fetch(`http://localhost:3000/api/v1/suosikit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asiakas_id: asiakas_id,
          tuote_id: tuote_id,
        }),
      });

      if (!response.ok) {
        throw new Error('Virhe tuote hakemisessa');
      }
      console.log('Tuote lisätty suosikkeihin');
    } catch (error) {
      console.error('Virhe tuotteen hakemisessa:', error.message);
    }
  }

let tuote_maara = 0;

const addToCart = async (asiakas_id, tuote_id) => {
  tuote_maara = tuote_maara + 1;
  console.log('Tuote määrä:', tuote_maara);
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: asiakas_id,
        tuote_id: tuote_id,
        tuote_maara: tuote_maara,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    console.log('Tuote lisätty ostoskoriin');
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const getTuoteIdFromFavorates = async (userID) => {
console.log('userID get suosikki id:', userID);

  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userID}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    const suosikitTuoteId = await response.json();

    // if suosikitTuoteId is notfound return empty array
    if (!suosikitTuoteId) {
      console.log('Suosikkeja ei löytynyt');
      return [];
    } else {
      return suosikitTuoteId;
    }



  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    return [];
  }
}


const getTuoteIdFromCart= async (userID) => {

    try {
      const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userID}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Virhe ostoskorin hakemisessa');
      }
      const ostoskoriTuoteId = await response.json();

      if (!ostoskoriTuoteId) {
        console.log('Ostoskorissa ei ole tuotteita');
        return [];
      } else {
        return ostoskoriTuoteId;
      }

    } catch (error) {
        onsole.error('Virhe ostoskorin hakemisessa:', error.message);
      console.log('Ostoskorin tuotteet:', ostoskoriTuoteId);
    }
  }


const updateCart = async (asiakas_id, tuote_id, tuote_maara) => {

  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${asiakas_id}/${tuote_id}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: asiakas_id,
        tuote_id: tuote_id,
        tuote_maara: tuote_maara,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
    console.log('Tuote päivitetty ostoskoriin');
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};


fetchAndDisplayTuotteet();
