'use strict';

const selectedLanguage = getSelectedLanguage();
switch (selectedLanguage) {
    case 'EN':
        virhesuosikit = 'Error fetching favorites!';
        virhesuosikit2 = 'Error adding favorite!';
        virhesuosikit3 = 'Error removing favorite!';
        virhetuote = 'Error fetching product!';
        virheostoskori = 'Error fetching cart!';
        virheostoskori2 = 'Error adding product to cart!';
        virheostoskori3 = 'Error updating product in cart!';
        break;
    case 'CN':
        virhesuosikit = '获取收藏夹时出错！';
        virhesuosikit2 = '添加收藏夹时出错！';
        virhesuosikit3 = '删除收藏夹时出错！';
        virhetuote = '获取产品时出错！';
        virheostoskori = '获取购物车时出错！';
        virheostoskori2 = '将产品添加到购物车时出错！';
        virheostoskori3 = '在购物车中更新产品时出错！';
        break;
    case 'ET':
        virhesuosikit = 'Viga lemmikute laadimisel!';
        virhesuosikit2 = 'Viga lemmiku lisamisel!';
        virhesuosikit3 = 'Viga lemmiku eemaldamisel!';
        virhetuote = 'Viga toote laadimisel!';
        virheostoskori = 'Viga ostukorvi laadimisel!';
        virheostoskori2 = 'Viga toote lisamisel ostukorvi!';
        virheostoskori3 = 'Viga toote uuendamisel ostukorvis!';
        break;
    case 'SV':
        virhesuosikit = 'Fel vid hämtning av favoriter!';
        virhesuosikit2 = 'Fel vid lägg till favorit!';
        virhesuosikit3 = 'Fel vid borttagning av favorit!';
        virhetuote = 'Fel vid hämtning av produkt!';
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
        virheostoskori = 'Virhe ostoskorin hakemisessa!';
        virheostoskori2 = 'Virhe tuotteen lisäämisessä ostoskoriin!';
        virheostoskori3 = 'Virhe tuotteen päivittämisessä ostoskoriin!';
        break;
}

const eriLaskutusCheckbox = document.getElementById('eri_laskutus');
const laskutusOsoiteDiv = document.getElementById('laskutus_osoite');

eriLaskutusCheckbox.addEventListener('change', () => {
    if (eriLaskutusCheckbox.checked) {
        laskutusOsoiteDiv.style.display = 'block';
    } else {
        laskutusOsoiteDiv.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("maksutiedotForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        vahvistaJaTyhjenna();
    });
});

document.getElementById('applyDiscountButton').addEventListener('click', () => {
    const discountCode = document.getElementById('alennus').value.trim();

    let discountResult = 'Virheellinen alennuskoodi';

    if (discountCode === 'EnsiTilaus15') {
        discountResult = 'Alennuskoodi hyväksytty! Saat 15 % alennusta.';
    } else if (discountCode === 'AlennusRyhma15') {
        discountResult = 'Alennuskoodi hyväksytty! Saat 20 % alennusta.';
    }

    document.getElementById('discountResult').innerText = discountResult;
});
