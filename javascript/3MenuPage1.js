
// const generateUniqueIdentifier = () => {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//   const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
//   const randomNumber = Math.floor(Math.random() * 1000);
//   return randomLetter + randomNumber;
// };

// const addVierasUser = async () => {
//   const tunnusNumero = generateUniqueIdentifier();
//   try {
//     const response = await fetch('http://localhost:3000/api/v1/asiakas', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         etunimi: 'vierasUser',
//         sukunimi: 'vieras',
//         tunnus: tunnusNumero,
//         salasana: '123',
//         rooli: 'vieras',
//         email: ' ',
//         puhelin: '123',
//         syntymapaiva: '1923-02-25',
//         ehdot_hyvaksytty: '0',
//         allennus_ryhma: ''
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Virhe vierasasiakkaan lisäämisessä');
//     }

//     const data = await response.json();
//     const userId = data.asiakas_id;
//     console.log('Vierasasiakas lisätty onnistuneesti:', data);

//     console.log('Vierasasiakas lisätty onnistuneesti:', userId);
//     localStorage.setItem('userId', userId);

//     const token = localStorage.getItem('authToken');
//     setTimeout(() => {
//       removeOstoskoristaById(userId);
//     }, 2 * 60 * 60 * 1000); // 2 tuntia * 60 minuuttia * 60 sekuntia * 1000 millisekuntia
//     return userId;
//   } catch (error) {
//     console.error('Virhe vierasasiakkaan lisäämisessä:', error.message);
//     return 0;
//   }
// };

// let userId = getUserId() || addVierasUser();
// console.log('userId:', userId);

// const removeOstoskoristaById = async (userId) => {
//   try {
//     const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${UserId}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Virhe ostoskorin poistamisessa');
//     }

//     console.log('Ostoskori poistettu onnistuneesti');
//   } catch (error) {
//     console.error('Virhe ostoskorin poistamisessa:', error.message);
//   }
// }

// const kirjautuUlos = () => {
//   localStorage.removeItem('authToken');
//   localStorage.removeItem('userId');
//   window.location.href = '11Login.html';
// };

const handleNewValue = async () => {
  const alatyyppi = getSelectedAlaTyyppi();
  await updateSubtypes(alatyyppi);
};

const updateSelectedAlatyyppi = () => {
  const selectedAlatyyppi = document.getElementById('cakeType').value;
  cakeList.innerHTML = '';
  return selectedAlatyyppi;
}

document.getElementById('cakeType').addEventListener('change', async () => {
  await fetchAndDisplayTuotteet();
});

const getSelectedAlaTyyppi = async () => {
  const selectedAlatyyppi = await updateSelectedAlatyyppi('cakeType').value;
  return selectedAlatyyppi;
};

const getTyyppiIdLista = async () => {
  try {
    const selectedAlatyyppi = await updateSelectedAlatyyppi();

    let url;
    if (selectedAlatyyppi === 'kaikki') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakut';
    } else if (selectedAlatyyppi === 'juhlakakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/juhlakakut';
    } else if (selectedAlatyyppi === 'suolaiset kakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/suolaiset%20kakut';
    } else if (selectedAlatyyppi === 'makeat kakut') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakut/makeat%20kakut';
    } else if (selectedAlatyyppi === 'all') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/cakes';
    } else if (selectedAlatyyppi === 'celebrationCakes') {
      url = 'http://localhost:3000/api/v1/tyyppi/cakes/celebrationCakes';
    } else if (selectedAlatyyppi === 'savoryCakes') {
      url = 'http://localhost:3000/api/v1/tyyppi/cakes/savoryCakes';
    } else if (selectedAlatyyppi === 'sweetCakes') {
      url = 'http://localhost:3000/api/v1/tyyppi/cakes/sweetCakes';
    } else if (selectedAlatyyppi === '全部') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/蛋糕';
    } else if (selectedAlatyyppi === '节日蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/节日蛋糕';
    } else if (selectedAlatyyppi === '咸味蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/咸味蛋糕';
    } else if (selectedAlatyyppi === '甜味蛋糕') {
      url = 'http://localhost:3000/api/v1/tyyppi/蛋糕/甜味蛋糕';
    } else if (selectedAlatyyppi === '全部') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/热食';
    } else if (selectedAlatyyppi === '鸡肉食品') {
      url = 'http://localhost:3000/api/v1/tyyppi/热食/鸡肉类';
    } else if (selectedAlatyyppi === '其他热食') {
      url = 'http://localhost:3000/api/v1/tyyppi/热食/其他热食';
    } else if (selectedAlatyyppi === 'alla') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/tårtor';
    } else if (selectedAlatyyppi === 'festtårtor') {
      url = 'http://localhost:3000/api/v1/tyyppi/tårtor/festtårtor';
    } else if (selectedAlatyyppi === 'saltatårtor') {
      url = 'http://localhost:3000/api/v1/tyyppi/tårtor/saltatårtor';
    } else if (selectedAlatyyppi === 'sötatårtor') {
      url = 'http://localhost:3000/api/v1/tyyppi/tårtor/sötatårtor';
    } else if (selectedAlatyyppi === 'koik') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/koogid';
    } else if (selectedAlatyyppi === 'pidukoogid') {
      url = 'http://localhost:3000/api/v1/tyyppi/koogid/pidukoogid';
    } else if (selectedAlatyyppi === 'soolasedkoogid') {
      url = 'http://localhost:3000/api/v1/tyyppi/koogid/soolasedkoogid';
    } else if (selectedAlatyyppi === 'magusadkoogid') {
      url = 'http://localhost:3000/api/v1/tyyppi/koogid/magusadkoogid';
    } else if (selectedAlatyyppi === 'kaikkicn') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakutcn';
    } else if (selectedAlatyyppi === 'juhlakakutcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakutcn/juhlakakutcn';
    } else if (selectedAlatyyppi === 'suolaisetkakutcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakutcn/suolaisetkakutcn';
    } else if (selectedAlatyyppi === 'makeatkakutcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/kakutcn/makeatkakutcn';
    }

    else if (selectedAlatyyppi === 'kaikki2') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/lammintaruokaa';
    } else if (selectedAlatyyppi === 'kanaruuat') {
      url = 'http://localhost:3000/api/v1/tyyppi/lammintaruokaa/kanaruuat';
    } else if (selectedAlatyyppi === 'muutlampimmatruuat') {
      url = 'http://localhost:3000/api/v1/tyyppi/lammintaruokaa/muutlampimmatruuat';
    } else if (selectedAlatyyppi === 'all2') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/hotmeals';
    } else if (selectedAlatyyppi === 'chickendishes') {
      url = 'http://localhost:3000/api/v1/tyyppi/hotmeals/chickendishes';
    } else if (selectedAlatyyppi === 'otherhotdishes') {
      url = 'http://localhost:3000/api/v1/tyyppi/hotmeals/otherhotdishes';
    } else if (selectedAlatyyppi === 'alla2') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/varmarätter';
    } else if (selectedAlatyyppi === 'kycklingrätter') {
      url = 'http://localhost:3000/api/v1/tyyppi/varmarätter/kycklingrätter';
    } else if (selectedAlatyyppi === 'andravarmarätter') {
      url = 'http://localhost:3000/api/v1/tyyppi/varmarätter/andravarmarätter';
    } else if (selectedAlatyyppi === 'koik2') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kuumtoit';
    } else if (selectedAlatyyppi === 'kanaroad') {
      url = 'http://localhost:3000/api/v1/tyyppi/kuumtoit/kanaroad';
    } else if (selectedAlatyyppi === 'muudkuumadtoidud') {
      url = 'http://localhost:3000/api/v1/tyyppi/kuumtoit/muudkuumadtoidud';
    } else if (selectedAlatyyppi === 'kaikkicn4') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/lammintaruokaacn';
    } else if (selectedAlatyyppi === 'kanaruuatcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/lammintaruokaacn/kanaruuatcn';
    } else if (selectedAlatyyppi === 'muutlampimatruuatcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/lammintaruokaacn/muutlampimatruuatcn';


    } else if (selectedAlatyyppi === 'kaikki3') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/juotavaa';
    } else if (selectedAlatyyppi === 'lämmintä juotavaa') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaa/lämmintä%20juotavaa';
    } else if (selectedAlatyyppi === 'jääkahvit') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaa/jääkahvit';
    } else if (selectedAlatyyppi === 'teet') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaa/teet';
    } else if (selectedAlatyyppi === 'virvoitusjuomat') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaa/virvoitusjuomat';
    } else if (selectedAlatyyppi === 'all3') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/drinks';
    } else if (selectedAlatyyppi === 'hotdrinks') {
      url = 'http://localhost:3000/api/v1/tyyppi/drinks/hotdrinks';
    } else if (selectedAlatyyppi === 'iceddrinks') {
      url = 'http://localhost:3000/api/v1/tyyppi/drinks/iceddrinks';
    } else if (selectedAlatyyppi === 'teas') {
      url = 'http://localhost:3000/api/v1/tyyppi/drinks/teas';
    } else if (selectedAlatyyppi === 'refreshments') {
      url = 'http://localhost:3000/api/v1/tyyppi/drinks/refreshments';
    } else if (selectedAlatyyppi === 'alla3') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/drycker';
    } else if (selectedAlatyyppi === 'varmadrycker') {
      url = 'http://localhost:3000/api/v1/tyyppi/drycker/varmadrycker';
    } else if (selectedAlatyyppi === 'iskaffe') {
      url = 'http://localhost:3000/api/v1/tyyppi/drycker/iskaffe';
    } else if (selectedAlatyyppi === 'teer') {
      url = 'http://localhost:3000/api/v1/tyyppi/drycker/teer';
    } else if (selectedAlatyyppi === 'läskedrycker') {
      url = 'http://localhost:3000/api/v1/tyyppi/drycker/läskedrycker';
    } else if (selectedAlatyyppi === 'koik3') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/joogid';
    } else if (selectedAlatyyppi === 'kuumadjoogid') {
      url = 'http://localhost:3000/api/v1/tyyppi/joogid/kuumadjoogid';
    } else if (selectedAlatyyppi === 'jääkohv') {
      url = 'http://localhost:3000/api/v1/tyyppi/joogid/jääkohv';
    } else if (selectedAlatyyppi === 'teed') {
      url = 'http://localhost:3000/api/v1/tyyppi/joogid/teed';
    } else if (selectedAlatyyppi === 'karastusjoogid') {
      url = 'http://localhost:3000/api/v1/tyyppi/joogid/karastusjoogid';
    } else if (selectedAlatyyppi === 'kaikkicn5') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/juotavaacn';
    } else if (selectedAlatyyppi === 'lammintajuotavaacn') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaacn/lammintajuotavaacn';
    } else if (selectedAlatyyppi === 'jääkahvitcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaacn/jääkahvitcn';
    } else if (selectedAlatyyppi === 'teetcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaacn/teetcn';
    } else if (selectedAlatyyppi === 'virvoitusjuomatcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/juotavaacn/virvoitusjuomatcn';
    }

    else if (selectedAlatyyppi === 'kaikki4') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/makeaa';
    } else if (selectedAlatyyppi === 'leivonnaiset') {
      url = 'http://localhost:3000/api/v1/tyyppi/makeaa/leivonnaiset';
    } else if (selectedAlatyyppi === 'muut makeat') {
      url = 'http://localhost:3000/api/v1/tyyppi/makeaa/muut%20makeat';
    } else if (selectedAlatyyppi === 'all4') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/sweet';
    } else if (selectedAlatyyppi === 'pastries') {
      url = 'http://localhost:3000/api/v1/tyyppi/sweet/pastries';
    } else if (selectedAlatyyppi === 'other sweets') {
      url = 'http://localhost:3000/api/v1/tyyppi/sweet/other%20sweets';
    } else if (selectedAlatyyppi === 'alla4') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/sött';
    } else if (selectedAlatyyppi === 'bakverk') {
      url = 'http://localhost:3000/api/v1/tyyppi/sött/bakverk';
    } else if (selectedAlatyyppi === 'andrasötsaker') {
      url = 'http://localhost:3000/api/v1/tyyppi/sött/andrasötsaker';
    } else if (selectedAlatyyppi === 'koik4') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/magus';
    } else if (selectedAlatyyppi === 'saiakesed') {
      url = 'http://localhost:3000/api/v1/tyyppi/magus/saiakesed';
    } else if (selectedAlatyyppi === 'muudmaiustused') {
      url = 'http://localhost:3000/api/v1/tyyppi/magus/muudmaiustused';
    } else if (selectedAlatyyppi === 'kaikkicn3') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/makeaacn';
    } else if (selectedAlatyyppi === 'leivonnaisetcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/makeaacn/leivoinnaisetcn';
    } else if (selectedAlatyyppi === 'muutmakeatcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/makeaacn/muutmakeatcn';
    }

    else if (selectedAlatyyppi === 'kaikki5') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/suolaista';
    } else if (selectedAlatyyppi === 'piirakat') {
      url = 'http://localhost:3000/api/v1/tyyppi/suolaista/piirakat';
    } else if (selectedAlatyyppi === 'salaatit') {
      url = 'http://localhost:3000/api/v1/tyyppi/suolaista/salaatit';
    } else if (selectedAlatyyppi === 'pasteijat') {
      url = 'http://localhost:3000/api/v1/tyyppi/suolaista/pasteijat';
    } else if (selectedAlatyyppi === 'all5') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/savory';
    } else if (selectedAlatyyppi === 'pies') {
      url = 'http://localhost:3000/api/v1/tyyppi/savory/pies';
    } else if (selectedAlatyyppi === 'salads') {
      url = 'http://localhost:3000/api/v1/tyyppi/savory/salads';
    } else if (selectedAlatyyppi === 'pastries2') {
      url = 'http://localhost:3000/api/v1/tyyppi/savory/pastries';
    } else if (selectedAlatyyppi === 'alla5') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/saltet';
    } else if (selectedAlatyyppi === 'pajer') {
      url = 'http://localhost:3000/api/v1/tyyppi/saltet/pajer';
    } else if (selectedAlatyyppi === 'sallader') {
      url = 'http://localhost:3000/api/v1/tyyppi/saltet/sallader';
    } else if (selectedAlatyyppi === 'pastejer') {
      url = 'http://localhost:3000/api/v1/tyyppi/saltet/pastejer';
    } else if (selectedAlatyyppi === 'koik5') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/soolane';
    } else if (selectedAlatyyppi === 'pirukad') {
      url = 'http://localhost:3000/api/v1/tyyppi/soolane/pirukad';
    } else if (selectedAlatyyppi === 'salatid') {
      url = 'http://localhost:3000/api/v1/tyyppi/soolane/salatid';
    } else if (selectedAlatyyppi === 'stritslid') {
      url = 'http://localhost:3000/api/v1/tyyppi/soolane/stritslid';
    } else if (selectedAlatyyppi === 'kaikkicn2') {
      url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/suolaistacn';
    } else if (selectedAlatyyppi === 'piirakatcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/suolaistacn/piirakatcn';
    } else if (selectedAlatyyppi === 'salaatitcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/suolaistacn/salaatitcn';
    } else if (selectedAlatyyppi === 'pasteijatcn') {
      url = 'http://localhost:3000/api/v1/tyyppi/suolaistacn/pasteijatcn';
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
      return tyyppiIdList;

    } else if (tyyppiList.tyyppi_id) {
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

    await fetchAndDisplayByTyyppiId(tyyppiId);
  } else {
    for (const tyyppiId of IdResult) {
      await fetchAndDisplayByTyyppiId(tyyppiId);
    }
  }
}

const fetchAndDisplayByTyyppiId = async (tyyppiId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tuote/tyyppi_id/${tyyppiId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error("Virhe tuotteiden hakemisessa");
    }

    const tuotteet = await response.json();

    if (Array.isArray(tuotteet)) {
      tuotteet.forEach((tuote) => {
        displaySingleTuote(tuote);
      });
    } else {
      displaySingleTuote(tuotteet);
    }
  } catch (error) {
  }
};

const displaySingleTuote = async (tuote) => {
  const kieli = document.getElementById('kieli');
  const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';
  let addCartText = '';
  let removeCart = '';
  let addFavoriteText = '';
  let unfavorateText = '';
  let addfavorite = '';
  let removefavorite = '';
  let hintaTeksti = '';
  let maaraTeksti = '';
  switch (selectedLanguage) {
    case 'EN':
      addCartText = 'Add to cart';
      removeCart = 'Remove from cart';
      addFavoriteText = 'Add to favorites';
      unfavorateText = 'Unlike';
      addfavorite = 'Product added to favorites!';
      removefavorite = 'Product removed from favorites!';
      hintaTeksti = 'Price: ';
      maaraTeksti = 'Amount: ';
      break;
    case 'CN':
      addCartText = '添加到购物车';
      removeCart = '从购物车中删除';
      addFavoriteText = '添加收藏';
      unfavorateText = '删除收藏';
      addfavorite = '产品已添加到收藏夹！';
      removefavorite = '产品已从收藏夹中删除！';
      hintaTeksti = '价格: ';
      maaraTeksti = '数量: ';
      break;
    case 'ET':
      addCartText = 'Lisa ostukorvi';
      removeCart = 'Eemalda ostukorvist';
      addFavoriteText = 'Lisa lemmikutesse';
      unfavorateText = 'Eemalda';
      addfavorite = 'Toode on lisatud lemmikutesse!';
      removefavorite = 'Toode on eemaldatud lemmikutest!';
      hintaTeksti = 'Hind: ';
      maaraTeksti = 'Kogus: ';
      break;
    case 'SV':
      addCartText = 'Lägg till i kundvagnen';
      removeCart = 'Ta bort från kundvagnen';
      addFavoriteText = 'Lägg till i favoriter';
      unfavorateText = 'Olikt';
      addfavorite = 'Produkten har lagts till i favoriter!';
      removefavorite = 'Produkten har tagits bort från favoriter!';
      hintaTeksti = 'Pris: ';
      maaraTeksti = 'Mängd: ';
      break;
    case 'FI':
    default:
      addCartText = 'Lisää ostoskoriin';
      removeCart = 'Poista ostoskorista';
      addFavoriteText = 'Tallenna suosikkeihin';
      unfavorateText = 'Poista suosikkeista';
      addfavorite = 'Tuote lisätty suosikkeihin!';
      removefavorite = 'Tuote poistettu suosikeista!';
      hintaTeksti = 'Hinta: ';
      maaraTeksti = 'Määrä: ';
      break;
  }

  const userId = getUserId();

  const cakeList = document.getElementById('cakeList');

  const tuoteElement = document.createElement('div');
  tuoteElement.classList.add('cake-item');

  // Lisää kuvakehys
  const imgElement = document.createElement('img');
  imgElement.src = `../../../uploads/${tuote.tuote_kuva}`;
  tuoteElement.appendChild(imgElement);

  // Lisää tuotteen nimi
  const h3Element = document.createElement('h3');
  h3Element.textContent = tuote.tuote_nimi;
  tuoteElement.appendChild(h3Element);

  // Lisää tuotteen kuvaus
  const pElement = document.createElement('p');
  pElement.textContent = tuote.tuote_kuvaus;
  tuoteElement.appendChild(pElement);

  const pElement2 = document.createElement('p');
  const kategoriaIdResult = await getKategoriaIdByTuoteId(tuote.tuote_id);


  if (kategoriaIdResult.length > 0) {
    const kategoriaNimet = await Promise.all(
      kategoriaIdResult.map(async (kategoria) => {
        try {
          return await getKategoriaById(kategoria);
        } catch (error) {
          return null;
        }
      })
    );

    const validKategoriaNimet = kategoriaNimet.filter(Boolean);
    pElement2.textContent = validKategoriaNimet.join(', ');
  } else {
    pElement2.textContent = "-";
  }

  tuoteElement.appendChild(pElement2);

  // Lisää hinta
  const pElement3 = document.createElement('p');
  const hintaElement = document.createElement('span');
  hintaElement.textContent = hintaTeksti + tuote.tuote_hinta + '€';

  pElement3.appendChild(hintaElement);
  tuoteElement.appendChild(pElement3);

  const numberInput = document.createElement('input');
  numberInput.id = 'maara';
  numberInput.type = 'number';
  numberInput.name = 'maara';
  numberInput.value = '1';
  numberInput.min = '1';
  numberInput.max = '100';

  numberInput.addEventListener('input', () => {
    const tuote_maara = parseInt(numberInput.value);
  });

  const maaraElement = document.createElement('span');
  maaraElement.textContent = maaraTeksti;

  tuoteElement.appendChild(maaraElement);
  tuoteElement.appendChild(numberInput);

  // Lisää "Lisää ostoskoriin" -painike
  const buttonElement = document.createElement('button');
  buttonElement.textContent = addCartText;
  buttonElement.style.backgroundColor = 'rgb(192, 160, 122)';
  tuoteElement.appendChild(buttonElement);

  // Lisää "Lisää suosikkeihin" -painike
  const buttonElement2 = document.createElement('button');
  buttonElement2.style.backgroundColor = 'rgb(192, 160, 122)';

  const isFavorite = await favorateTarkistus(userId, tuote.tuote_id);
  buttonElement2.textContent = isFavorite ? unfavorateText : addFavoriteText;

  tuoteElement.appendChild(buttonElement2);

  buttonElement.addEventListener('click', async () => {
    const lisaaTuoteMaara = parseInt(numberInput.value, 10);
    const userId = getUserId();
    const tuoteId = tuote.tuote_id;

    const ostoskoriTarkistusTulos = await ostoskoriTarkistus(userId, tuoteId);

    try {
      if (ostoskoriTarkistusTulos === false) {
        buttonElement.textContent = removeCart;
        await addToCart(userId, tuoteId, lisaaTuoteMaara);
      } else {
        buttonElement.textContent = addCartText;
        await deleteTuoteFromCart(userId, tuoteId);
      }
    } catch (error) {
    }
  });

  buttonElement2.addEventListener('click', async () => {
    const isCurrentlyFavorite = await favorateTarkistus(userId, tuote.tuote_id);

    if (isCurrentlyFavorite) {
      buttonElement2.textContent = addFavoriteText;
      alert(removefavorite);
      await removeSuosikista(userId, tuote.tuote_id);
    } else {
      buttonElement2.textContent = unfavorateText;
      alert(addfavorite);
      await addFavorite(userId, tuote.tuote_id);
    }
  });

  cakeList.appendChild(tuoteElement);
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
      fetchAndDisplayTuotteet();
      console.log('Tuote poistettu ostoskorista');
    } catch (error) {
      console.error('Virhe tuotteen poistamisessa:', error.message);
    }
  }
};

const favorateTarkistus = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    const favortateList = await response.json();
    const userIds = favortateList.map((item) => item.asiakas_id);
    const tuoteIds = favortateList.map((item) => item.tuote_id);

    if (!userIds.includes(userId) || !tuoteIds.includes(tuote_id)) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
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
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
  }
};

const geTuoteMaaraFromCart = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe tuotteen hakemisessa');
      return 0;
    }

    const tuoteMaara = await response.json();
    const maara = tuoteMaaratuote_maara;
    console.log('Tuote maara:', tuoteMaara);
    return maara;
  } catch (error) {
    console.error('Virhe tuotteen hakemisessa:', error.message);
    return 0;
  }
}

const addToCart = async (userId, tuote_id, tuote_maara) => {
  const maaraKorissa = await geTuoteMaaraFromCart(userId, tuote_id);
  const uusimaara = tuote_maara + maaraKorissa;
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori`, {
      method: 'POST',
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
      throw new Error('Virhe tuote hakemisessa');
    }
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

    if (!suosikitTuoteId) {
      return [];
    } else {
      return suosikitTuoteId;
    }

  } catch (error) {
    return [];
  }
}

const removeSuosikista = async (userId, tuote_id) => {
  console.log('RemoveTuote id:', tuote_id);
  console.log('RemoveAsiakas id:', userId);
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}/${tuote_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Virhe tuote hakemisessa');
    }
  } catch (error) {
  }
};

const getTuoteIdFromCart = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin hakemisessa');
    }
    const data = await response.json();
    const ostoskoriTuoteId = data.map((tuote) => tuote.tuote_id);

    if (!ostoskoriTuoteId) {
      return [];
    } else {
      return ostoskoriTuoteId;
    }
  } catch (error) {
    console.log('Ostoskorin tuotteet:', ostoskoriTuoteId);
  }
}

const ostoskoriTarkistus = async (userId, tuoteId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin hakemisessa');
    }

    const ostoskoriList = await response.json();
    const tuoteIdList = ostoskoriList.map((tuote) => tuote.tuote_id);

    return tuoteIdList.includes(tuoteId);
  } catch (error) {
    console.error('Virhe ostoskorin hakemisessa:', error.message);
    return false;
  }
};

const updateCart = async (userId, tuoteId, lisamaara) => {
  try {
    const tuoteMaaraKorissa = await getTuoteMaaraFromCart(userId, tuoteId);

    const uusimaara = (tuoteMaaraKorissa || 0) + parseInt(lisamaara, 10);

    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuoteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        asiakas_id: userId,
        tuote_id: tuoteId,
        tuote_maara: uusimaara,
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin päivittämisessä');
    }
  } catch (error) {
    console.error('Virhe ostoskorin päivittämisessä:', error.message);
  }
};

const getTuoteMaaraFromCart = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Virhe tuotteen hakemisessa');
    }
    const data = await response.json();
    const maara = data.tuote_maara;
    return maara;
  } catch (error) {
  }
};

const getKategoriaIdByTuoteId = async (tuoteId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/kategoria_tuote/tuote/${tuoteId}`);

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map(item => item.kategoria_id);
    } else {
      return [data.kategoria_id];
    }
  } catch (error) {
    return [];
  }
};


const getKategoriaById = async (kategoriaId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/kategoria/${kategoriaId}`);
    if (!response.ok) {
      return '';
    }

    const data = await response.json();
    return data.kategoria_nimi;
  } catch (error) {
    return '';
  }
};

fetchAndDisplayTuotteet();

