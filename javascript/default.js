/*funktio kielen vaihtoon */
function getSelectedLanguage() {
  const kieli = document.getElementById('kieli');
  return kieli && kieli.value ? kieli.value : 'FI';
}

/* kielen vaihto kun vaihtaa oikean kieliselle sivulle */

document.getElementById("kieli").addEventListener("change", function () {
  var selectedLanguage = this.value;
  if (selectedLanguage === 'FI') {
    window.location.href = '../fi/1Etusivu.html';
  } else if (selectedLanguage === 'EN') {
    window.location.href = '../en/1Etusivu_en.html';
  } else if (selectedLanguage === 'CN') {
    window.location.href = "../cn/1Etusivu_cn.html";
  }
  else if (selectedLanguage === 'ET') {
    window.location.href = "../et/1Etusivu_et.html";
  }
  else if (selectedLanguage === 'SV') {
    window.location.href = "../sv/1Etusivu_sv.html";
  }
});

/*käyttäjä pysyy kirjautuneena */

document.addEventListener('DOMContentLoaded', function () {

     const links = document.querySelectorAll('a');

    const loginEndings = ['11Login.html', '11Login_en.html', '11login_cn.html', '11Login_et.html', '11Login_sv.html'];

    links.forEach(link => {
        const isLoginLink = loginEndings.some(ending => link.href.endsWith(ending));

        if (isLoginLink) {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                const authToken = localStorage.getItem('authToken');

                let redirectPage;

                const kieli = document.getElementById('kieli');
                const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

                if (authToken) {
                    switch (selectedLanguage) {
                        case 'EN':
                            redirectPage = '../../html/en/7Kayttaja_en.html';
                            break;
                        case 'CN':
                            redirectPage = '../../html/cn/7Kayttaja_cn.html';
                            break;
                        case 'ET':
                            redirectPage = '../../html/et/7Kayttaja_et.html';
                            break;
                        case 'SV':
                            redirectPage = '../../html/sv/7Kayttaja_sv.html';
                            break;
                        case 'FI':
                        default:
                            redirectPage = '../../html/fi/7Kayttaja.html';
                            break;
                    }
                } else {
                    switch (selectedLanguage) {
                        case 'EN':
                            redirectPage = '../../html/en/11Login_en.html';
                            break;
                        case 'CN':
                            redirectPage = '../../html/cn/11login_cn.html';
                            break;
                        case 'ET':
                            redirectPage = '../../html/et/11Login_et.html';
                            break;
                        case 'SV':
                            redirectPage = '../../html/sv/11Login_sv.html';
                            break;
                        case 'FI':
                        default:
                            redirectPage = '../../html/fi/11Login.html';
                            break;
                    }
                }
                window.location.href = redirectPage;
            });
        }
        window.location.href = redirectPage;
      });
    }
  });
});

// get asiakas id from local storage
const getUserId = () => {
  const token = localStorage.getItem('authToken');
  const base64Payload = token.split('.')[1];
  const payload = atob(base64Payload);
  const parsedPayload = JSON.parse(payload);
  let userId = parsedPayload.asiakas_id;
  console.log('asiakas id:', userId);
  return userId;
}

const userId = getUserId();
console.log('userId:', userId);

// Päivitä ostoskorin numero
const paivitaOstoskorinNumero = async () => {
  const userId = getUserId();

  const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
  const tuotteet = await getTuotteenMaaraByUserId(userId);
  ostoskoriLkmElement.textContent = tuotteet.length.toString();
}

const paivitaSuosikkiMaara = async () => {
  await getSuosikinMaaraByUserId(userId);
}

const getSuosikinMaaraByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    if (response.status === 404) {
      console.log('Suosikkeja ei löytynyt');
      const suosikit = 0;
      const suosikkiLkmElement = document.getElementById('suosikki-lkm');
      suosikkiLkmElement.textContent = suosikit.toString();
      return 0;
    }

    const suosikit = await response.json();
    console.log('Suosikkien määrä:', suosikit.length.toString());

    const suosikkiLkmElement = document.getElementById('suosikki-lkm');
    suosikkiLkmElement.textContent = suosikit.length.toString();

    return suosikit.length;

  } catch (error) {
    console.error('Virhe suosikkien hakemisessa:', error.message);
    return 0;
  }
}

const getTuotteenMaaraByUserId = async (userId) => {

  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });


    if (!response.ok) {
      if (response.status === 404) { // Jos ostoskoria ei löydy, palautetaan tyhjä taulukko
        const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
        ostoskoriLkmElement.textContent = '0';
        console.log('Ostoskoria ei löydy tai se on tyhjä.');
        return [];
      }
      throw new Error('Virhe ostoskorin hakemisessa');

    }

    const tuotteet = await response.json();
    const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
    ostoskoriLkmElement.textContent = tuotteet.length.toString();
    console.log('Tuoteen määrä ostoskorissa:', tuotteet.length.toString());
    return tuotteet; // Palautetaan tuotteet
  } catch (error) {
    console.error('Virhe ostoskorin hakemisessa:', error.message);
    return 0; // Palautetaan tyhjä taulukko virhetilanteessa
  }
}

const disPlayIconNumerot = async () => {
  await paivitaOstoskorinNumero();
  await paivitaSuosikkiMaara();
}

disPlayIconNumerot();

