/**
 * Get the selected language for error messages.
 * @returns {string} The selected language code.
 */
const selectedLanguage = getSelectedLanguage();
let virhesuosikit = '';
let virhesuosikit2 = '';
let virhesuosikit3 = '';
let virhetuote = '';
let virhetuote2 = '';
let virheostoskori = '';
let virheostoskori2 = '';
let virheostoskori3 = '';
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
    break;
}

/**
 * Updates the subtype values based on the selected cake type.
 * @returns {Promise<void>} A promise that resolves when the subtypes are updated.
 */
const handleNewValue = async () => {
  const alatyyppi = await getSelectedAlaTyyppi();
  await updateSubtypes(alatyyppi);
};

/**
 * Updates the selected cake subtype when the dropdown selection changes.
 * @returns {string} The selected subtype.
 */
const updateSelectedAlatyyppi = () => {
  const selectedAlatyyppi = document.getElementById('cakeType').value;
  cakeList.innerHTML = '';
  return selectedAlatyyppi;
}

document.getElementById('cakeType').addEventListener('change', async () => {
  await fetchAndDisplayTuotteet();
});

/**
 * Fetches the current selected subtype asynchronously.
 * @returns {Promise<string>} The selected subtype value.
 */
const getSelectedAlaTyyppi = async () => {
  const selectedAlatyyppi = await updateSelectedAlatyyppi('cakeType').value;
  return selectedAlatyyppi;
};

/**
 * Get the list of type IDs based on the selected subtype.
 * @returns {Promise<string[]>} A list of type IDs.
 */
const getTyyppiIdLista = async () => {
  try {
    const selectedAlatyyppi = await updateSelectedAlatyyppi();

    let url;
    if (selectedAlatyyppi === 'kaikki') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/kakut';
    } else if (selectedAlatyyppi === 'juhlakakut') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kakut/juhlakakut';
    } else if (selectedAlatyyppi === 'suolaiset kakut') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kakut/suolaiset%20kakut';
    } else if (selectedAlatyyppi === 'makeat kakut') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kakut/makeat%20kakut';
    } else if (selectedAlatyyppi === 'all') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/cakes';
    } else if (selectedAlatyyppi === 'celebrationCakes') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/cakes/celebrationCakes';
    } else if (selectedAlatyyppi === 'savoryCakes') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/cakes/savoryCakes';
    } else if (selectedAlatyyppi === 'sweetCakes') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/cakes/sweetCakes';
    } else if (selectedAlatyyppi === '全部') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/蛋糕';
    } else if (selectedAlatyyppi === '节日蛋糕') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/蛋糕/节日蛋糕';
    } else if (selectedAlatyyppi === '咸味蛋糕') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/蛋糕/咸味蛋糕';
    } else if (selectedAlatyyppi === '甜味蛋糕') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/蛋糕/甜味蛋糕';
    } else if (selectedAlatyyppi === '全部') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/热食';
    } else if (selectedAlatyyppi === '鸡肉食品') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/热食/鸡肉类';
    } else if (selectedAlatyyppi === '其他热食') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/热食/其他热食';
    } else if (selectedAlatyyppi === 'alla') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/tårtor';
    } else if (selectedAlatyyppi === 'festtårtor') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/tårtor/festtårtor';
    } else if (selectedAlatyyppi === 'saltatårtor') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/tårtor/saltatårtor';
    } else if (selectedAlatyyppi === 'sötatårtor') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/tårtor/sötatårtor';
    } else if (selectedAlatyyppi === 'koik') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/koogid';
    } else if (selectedAlatyyppi === 'pidukoogid') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/koogid/pidukoogid';
    } else if (selectedAlatyyppi === 'soolasedkoogid') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/koogid/soolasedkoogid';
    } else if (selectedAlatyyppi === 'magusadkoogid') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/koogid/magusadkoogid';

    } else if (selectedAlatyyppi === 'kaikkicn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/kakutcn';
    } else if (selectedAlatyyppi === 'juhlakakutcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kakutcn/juhlakakutcn';
    } else if (selectedAlatyyppi === 'suolaisetkakutcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kakutcn/suolaisetkakutcn';
    } else if (selectedAlatyyppi === 'makeatkakutcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kakutcn/makeatkakutcn';

    }

    else if (selectedAlatyyppi === 'kaikki2') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/lammintaruokaa';
    } else if (selectedAlatyyppi === 'kanaruuat') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/lammintaruokaa/kanaruuat';
    } else if (selectedAlatyyppi === 'muutlampimmatruuat') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/lammintaruokaa/muutlampimmatruuat';
    } else if (selectedAlatyyppi === 'all2') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/hotmeals';
    } else if (selectedAlatyyppi === 'chickendishes') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/hotmeals/chickendishes';
    } else if (selectedAlatyyppi === 'otherhotdishes') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/hotmeals/otherhotdishes';
    } else if (selectedAlatyyppi === 'alla2') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/varmarätter';
    } else if (selectedAlatyyppi === 'kycklingrätter') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/varmarätter/kycklingrätter';
    } else if (selectedAlatyyppi === 'andravarmarätter') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/varmarätter/andravarmarätter';
    } else if (selectedAlatyyppi === 'koik2') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/kuumtoit';
    } else if (selectedAlatyyppi === 'kanaroad') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kuumtoit/kanaroad';
    } else if (selectedAlatyyppi === 'muudkuumadtoidud') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/kuumtoit/muudkuumadtoidud';

    } else if (selectedAlatyyppi === 'kaikkicn4') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/lammintaruokaacn';
    } else if (selectedAlatyyppi === 'kanaruuatcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/lammintaruokaacn/kanaruuatcn';
    } else if (selectedAlatyyppi === 'muutlampimatruuatcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/lammintaruokaacn/muutlampimatruuatcn';

    } else if (selectedAlatyyppi === 'kaikki3') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/juotavaa';
    } else if (selectedAlatyyppi === 'lämmintä juotavaa') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaa/lämmintä%20juotavaa';
    } else if (selectedAlatyyppi === 'jääkahvit') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaa/jääkahvit';
    } else if (selectedAlatyyppi === 'teet') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaa/teet';
    } else if (selectedAlatyyppi === 'virvoitusjuomat') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaa/virvoitusjuomat';
    } else if (selectedAlatyyppi === 'all3') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/drinks';
    } else if (selectedAlatyyppi === 'hotdrinks') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drinks/hotdrinks';
    } else if (selectedAlatyyppi === 'iceddrinks') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drinks/iceddrinks';
    } else if (selectedAlatyyppi === 'teas') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drinks/teas';
    } else if (selectedAlatyyppi === 'refreshments') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drinks/refreshments';
    } else if (selectedAlatyyppi === 'alla3') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/drycker';
    } else if (selectedAlatyyppi === 'varmadrycker') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drycker/varmadrycker';
    } else if (selectedAlatyyppi === 'iskaffe') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drycker/iskaffe';
    } else if (selectedAlatyyppi === 'teer') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drycker/teer';
    } else if (selectedAlatyyppi === 'läskedrycker') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/drycker/läskedrycker';
    } else if (selectedAlatyyppi === 'koik3') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/joogid';
    } else if (selectedAlatyyppi === 'kuumadjoogid') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/joogid/kuumadjoogid';
    } else if (selectedAlatyyppi === 'jääkohv') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/joogid/jääkohv';
    } else if (selectedAlatyyppi === 'teed') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/joogid/teed';
    } else if (selectedAlatyyppi === 'karastusjoogid') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/joogid/karastusjoogid';

    } else if (selectedAlatyyppi === 'kaikkicn5') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/juotavaacn';
    } else if (selectedAlatyyppi === 'lammintajuotavaacn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaacn/lammintajuotavaacn';
    } else if (selectedAlatyyppi === 'jääkahvitcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaacn/jääkahvitcn';
    } else if (selectedAlatyyppi === 'teetcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaacn/teetcn';
    } else if (selectedAlatyyppi === 'virvoitusjuomatcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/juotavaacn/virvoitusjuomatcn';
    }

    else if (selectedAlatyyppi === 'kaikki4') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/makeaa';
    } else if (selectedAlatyyppi === 'leivonnaiset') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/makeaa/leivonnaiset';
    } else if (selectedAlatyyppi === 'muut makeat') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/makeaa/muut%20makeat';
    } else if (selectedAlatyyppi === 'all4') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/sweet';
    } else if (selectedAlatyyppi === 'pastries') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/sweet/pastries';
    } else if (selectedAlatyyppi === 'other sweets') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/sweet/other%20sweets';
    } else if (selectedAlatyyppi === 'alla4') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/sött';
    } else if (selectedAlatyyppi === 'bakverk') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/sött/bakverk';
    } else if (selectedAlatyyppi === 'andrasötsaker') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/sött/andrasötsaker';
    } else if (selectedAlatyyppi === 'koik4') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/magus';
    } else if (selectedAlatyyppi === 'saiakesed') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/magus/saiakesed';
    } else if (selectedAlatyyppi === 'muudmaiustused') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/magus/muudmaiustused';
    } else if (selectedAlatyyppi === 'kaikkicn3') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/makeaacn';
    } else if (selectedAlatyyppi === 'leivonnaisetcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/makeaacn/leivoinnaisetcn';
    } else if (selectedAlatyyppi === 'muutmakeatcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/makeaacn/muutmakeatcn';
    }

    else if (selectedAlatyyppi === 'kaikki5') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/suolaista';
    } else if (selectedAlatyyppi === 'piirakat') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/suolaista/piirakat';
    } else if (selectedAlatyyppi === 'salaatit') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/suolaista/salaatit';
    } else if (selectedAlatyyppi === 'pasteijat') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/suolaista/pasteijat';
    } else if (selectedAlatyyppi === 'all5') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/savory';
    } else if (selectedAlatyyppi === 'pies') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/savory/pies';
    } else if (selectedAlatyyppi === 'salads') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/savory/salads';
    } else if (selectedAlatyyppi === 'pastries2') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/savory/pastries';
    } else if (selectedAlatyyppi === 'alla5') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/saltet';
    } else if (selectedAlatyyppi === 'pajer') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/saltet/pajer';
    } else if (selectedAlatyyppi === 'sallader') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/saltet/sallader';
    } else if (selectedAlatyyppi === 'pastejer') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/saltet/pastejer';
    } else if (selectedAlatyyppi === 'koik5') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/soolane';
    } else if (selectedAlatyyppi === 'pirukad') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/soolane/pirukad';
    } else if (selectedAlatyyppi === 'salatid') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/soolane/salatid';
    } else if (selectedAlatyyppi === 'stritslid') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/soolane/stritslid';
    } else if (selectedAlatyyppi === 'kaikkicn2') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/paatyyppi/suolaistacn';
    } else if (selectedAlatyyppi === 'piirakatcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/suolaistacn/piirakatcn';
    } else if (selectedAlatyyppi === 'salaatitcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/suolaistacn/salaatitcn';
    } else if (selectedAlatyyppi === 'pasteijatcn') {
      url = 'http://10.120.32.68/app/api/v1/tyyppi/suolaistacn/pasteijatcn';
    }

    const response = await fetch(url, {
      method: 'GET',
    });

    const tyyppiList = await response.json();

    if (Array.isArray(tyyppiList)) {
      const tyyppiIdList = tyyppiList.map((tyyppi) => tyyppi.tyyppi_id);
      return tyyppiIdList;

    } else if (tyyppiList.tyyppi_id) {
      return tyyppiList.tyyppi_id;
    }
  } catch (error) {
    return [];
  }
};

/**
 * Fetches and displays products based on the type ID list.
 * @returns {Promise<void>} A promise that resolves when the products are fetched and displayed.
 */
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
/**
 * Fetches and displays products based on a specific type ID.
 * @param {string} tyyppiId The type ID to fetch products for.
 * @returns {Promise<void>} A promise that resolves when the products are fetched and displayed.
 */

const fetchAndDisplayByTyyppiId = async (tyyppiId) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/tuote/tyyppi_id/${tyyppiId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virhetuote);
    }

    const tuotteet = await response.json();

    if (Array.isArray(tuotteet)) {
      tuotteet.forEach(async (tuote) => {
        await displaySingleTuote(tuote);
      });
    } else {
      displaySingleTuote(tuotteet);
    }
  } catch (error) {
  }
};

/**
 * Displays a single product on the page.
 * @param {object} tuote The product to display.
 * @param {string} tuote.tuote_nimi The name of the product.
 * @param {string} tuote.tuote_kuva The image of the product.
 * @param {string} tuote.tuote_kuvaus The description of the product.
 * @param {number} tuote.tuote_hinta The price of the product.
 * @returns {Promise<void>} A promise that resolves when the product is displayed.
 */
const displaySingleTuote = async (tuote) => {
  let addCartText = '';
  let addToCartText = '';
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
      addToCartText = 'Added to cart!';
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
      addToCartText = '已添加到购物车！';
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
      addToCartText = 'Lisatud ostukorvi!';
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
      addToCartText = 'Lagt till i kundvagnen!';
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
      addToCartText = 'Lisätty ostoskoriin!';
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
  imgElement.src = `../uploads/${tuote.tuote_kuva}`;
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
  buttonElement.classList.add('add-cart-button');
  buttonElement.style.backgroundColor = 'rgb(192, 160, 122)';
  tuoteElement.appendChild(buttonElement);

  // Lisää "Lisää suosikkeihin" -painike
  const buttonElement2 = document.createElement('button');
  buttonElement2.style.backgroundColor = 'rgb(192, 160, 122)';

  const isFavorite = await favorateTarkistus(userId, tuote.tuote_id);
  buttonElement2.textContent = isFavorite ? unfavorateText : addFavoriteText;

  tuoteElement.appendChild(buttonElement2);

  buttonElement.addEventListener('click', async () => {
    const tuoteMaara = parseInt(numberInput.value, 10);
    const userId = getUserId();
    const tuoteId = tuote.tuote_id;

    const ostoskoriTarkistusTulos = await ostoskoriTarkistus(userId, tuoteId);

    try {
      if (ostoskoriTarkistusTulos === false) {
        await addToCart(userId, tuoteId, tuoteMaara);
      } else {
        alert(addToCartText);
        await updateCart(userId, tuoteId, tuoteMaara);
        await paivitaOstoskorinNumero();
      }
    } catch (error) {
    }
  });


  buttonElement2.addEventListener('click', async () => {
    const isCurrentlyFavorite = await favorateTarkistus(userId, tuote.tuote_id);

    if (isCurrentlyFavorite) {
      buttonElement2.textContent = addFavoriteText;
      await removeSuosikista(userId, tuote.tuote_id);
    } else {
      buttonElement2.textContent = unfavorateText;
      await addFavorite(userId, tuote.tuote_id);
    }
  });

  cakeList.appendChild(tuoteElement);
};

/**
 * Deletes a product from the user's cart.
 * @param {string} userId - The ID of the user.
 * @param {string} tuote_id - The ID of the product to remove.
 * @returns {Promise<void>} A promise that resolves when the product is removed from the cart.
 */

const deleteTuoteFromCart = async (userId, tuote_id) => {
  const onTuoteKorissa = await ostoskoriTarkistus(userId, tuote_id);
  if (onTuoteKorissa) {
    try {
      const response = await fetch(`http://10.120.32.68/app/api/v1/ostoskori/${userId}/${tuote_id}`, {
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
 * Checks if a product is in a user's favorites list.
 * @param {string} userId - The ID of the user.
 * @param {string} tuote_id - The ID of the product.
 * @returns {Promise<boolean>} True if the product is in the favorites list, false otherwise.
 */
const favorateTarkistus = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virhesuosikit);
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

/**
 * Adds a product to a user's favorites list.
 * @param {string} asiakas_id - The ID of the customer.
 * @param {string} tuote_id - The ID of the product to add.
 * @returns {Promise<void>} A promise that resolves when the product is added to the favorites list.
 */

const addFavorite = async (asiakas_id, tuote_id) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/suosikit`, {
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
      throw new Error(virhetuote);
    }
  } catch (error) {
  }
};

/**
 * Gets the quantity of a product from the user's cart.
 * @param {string} userId - The ID of the user.
 * @param {string} tuote_id - The ID of the product.
 * @returns {Promise<number>} The quantity of the product in the cart.
 */
const geTuoteMaaraFromCart = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virhetuote);
    }

    const data = await response.json();
    if (!data || !data.tuote_maara) {
      return 0;
    }

    const maara = data.tuote_maara;
    return maara;

  } catch (error) {
    return 0;
  }
};


/**
 * Adds a product to the user's cart.
 * @param {string} userId - The ID of the user.
 * @param {string} tuote_id - The ID of the product.
 * @param {number} tuote_maara - The quantity of the product to add.
 * @returns {Promise<void>} A promise that resolves when the product is added to the cart.
 */
const addToCart = async (userId, tuote_id, tuote_maara) => {
  try {
    const maaraKorissa = await geTuoteMaaraFromCart(userId, tuote_id);
    const uusimaara = maaraKorissa ? tuote_maara + maaraKorissa : tuote_maara;

    const response = await fetch(`http://10.120.32.68/app/api/v1/ostoskori`, {
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
      throw new Error(virheostoskori3);
    }

  } catch (error) {
  }
};

/**
 * Retrieves the product IDs from a user's favorites.
 * @param {string} userID - The ID of the user.
 * @returns {Promise<string[]>} A list of product IDs from the user's favorites.
 * @throws Will throw an error if the fetch request fails.
 */
const getTuoteIdFromFavorates = async (userID) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/suosikit/${userID}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virhesuosikit);
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

/**
 * Removes a product from the user's favorites list.
 * @param {string} userId - The ID of the user.
 * @param {string} tuote_id - The ID of the product to remove.
 * @returns {Promise<void>} A promise that resolves when the product is removed from the favorites list.
 */
const removeSuosikista = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/suosikit/${userId}/${tuote_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(virhetuote);
    }
  } catch (error) {
  }
};

/**
 * Retrieves the product IDs from the user's cart.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<string[]>} A list of product IDs in the user's cart.
 */
const getTuoteIdFromCart = async (userId) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virheostoskori);
    }
    const data = await response.json();
    const ostoskoriTuoteId = data.map((tuote) => tuote.tuote_id);

    if (!ostoskoriTuoteId) {
      return [];
    } else {
      return ostoskoriTuoteId;
    }
  } catch (error) {
  }
}

/**
 * Checks if a product is in the user's cart.
 * @param {string} userId - The ID of the user.
 * @param {string} tuoteId - The ID of the product.
 * @returns {Promise<boolean>} True if the product is in the cart, false otherwise.
 */
const ostoskoriTarkistus = async (userId, tuoteId) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(virheostoskori);
    }

    const ostoskoriList = await response.json();
    const tuoteIdList = ostoskoriList.map((tuote) => tuote.tuote_id);

    return tuoteIdList.includes(tuoteId);
  } catch (error) {
    return false;
  }
};

/**
 * Updates the quantity of a product in the user's cart.
 * @param {string} userId - The ID of the user.
 * @param {string} tuoteId - The ID of the product.
 * @param {number} lisamaara - The additional quantity to update.
 * @returns {Promise<void>} A promise that resolves when the product quantity is updated.
 */
const updateCart = async (userId, tuoteId, lisamaara) => {
  try {
    const tuoteMaaraKorissa = await getTuoteMaaraFromCart(userId, tuoteId);

    const uusimaara = (tuoteMaaraKorissa || 0) + parseInt(lisamaara, 10);

    const response = await fetch(`http://10.120.32.68/app/api/v1/ostoskori/${userId}/${tuoteId}`, {
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
      throw new Error(virheostoskori3);
    }
  } catch (error) {
  }
};

/**
 * Retrieves the quantity of a product from the user's cart.
 * @param {string} userId - The ID of the user.
 * @param {string} tuote_id - The ID of the product.
 * @returns {Promise<number>} The quantity of the product in the cart.
 * @throws Will throw an error if the fetch request fails.
 */
const getTuoteMaaraFromCart = async (userId, tuote_id) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/ostoskori/${userId}/${tuote_id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(virhetuote);
    }
    const data = await response.json();
    const maara = data.tuote_maara;
    return maara;
  } catch (error) {
  }
};

/**
 * Retrieves category IDs for a given product ID.
 * @param {string} tuoteId - The ID of the product.
 * @returns {Promise<string[]>} A list of category IDs for the product.
 * @throws Will throw an error if the fetch request fails.
 */
const getKategoriaIdByTuoteId = async (tuoteId) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/kategoria_tuote/tuote/${tuoteId}`);

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


/**
 * Retrieves the name of a category given its ID.
 * @param {string} kategoriaId - The ID of the category.
 * @returns {Promise<string>} The name of the category.
 * @throws Will throw an error if the fetch request fails.
 */
const getKategoriaById = async (kategoriaId) => {
  try {
    const response = await fetch(`http://10.120.32.68/app/api/v1/kategoria/${kategoriaId}`);
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

