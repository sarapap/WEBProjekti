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
              redirectPage = '../../en/7Kayttaja_en.html';
              break;
            case 'CN':
              redirectPage = '../../cn/7Kayttaja_cn.html';
              break;
            case 'ET':
              redirectPage = '../../et/7Kayttaja_et.html';
              break;
            case 'SV':
              redirectPage = '../../sv/7Kayttaja_sv.html';
              break;
            case 'FI':
            default:
              redirectPage = '../../fi/7Kayttaja.html';
              break;
          }
        } else {
          switch (selectedLanguage) {
            case 'EN':
              redirectPage = '../../en/11Login_en.html';
              break;
            case 'CN':
              redirectPage = '../../cn/11login_cn.html';
              break;
            case 'ET':
              redirectPage = '../../et/11Login_et.html';
              break;
            case 'SV':
              redirectPage = '../../sv/11Login_sv.html';
              break;
            case 'FI':
            default:
              redirectPage = '../../fi/11Login.html';
              break;
          }
        }
        window.location.href = redirectPage;
      });
    }
  });

}
);

// get asiakas id from local storage
const getUserId = () => {
  const token = localStorage.getItem('authToken');
  if(token) {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);
    let userId = parsedPayload.asiakas_id;
    return userId;
  }
}



const userId = getUserId();


const paivitaOstoskorinNumero = async () => {
  // const userId = getUserId();

  const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
  const tuotteet = await getTuotteenMaaraByUserId(userId);
  ostoskoriLkmElement.textContent = tuotteet?.length?.toString() || '0';
}

const paivitaSuosikkiMaara = async () => {
  await getSuosikinMaaraByUserId(userId);
}

const getSuosikinMaaraByUserId = async (userId) => {
  try {
    if(!userId) {
      throw new Error('userid not found');
    }

    const response = await fetch(`http://localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    if (response.status === 404) {
      const suosikit = 0;
      const suosikkiLkmElement = document.getElementById('suosikki-lkm');
      suosikkiLkmElement.textContent = suosikit.toString();
      return 0;
    }

    const suosikit = await response.json();

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
    if(!userId) {
      throw new Error('userid not found');
    }


    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });


    if (!response.ok) {
      if (response.status === 404) {
        const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
        ostoskoriLkmElement.textContent = '0';
        return [];
      }
      throw new Error('Virhe ostoskorin hakemisessa');

    }

    const tuotteet = await response.json();
    const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
    ostoskoriLkmElement.textContent = tuotteet.length.toString();
    return tuotteet;
  } catch (error) {
    console.error('Virhe ostoskorin hakemisessa:', error.message);
    return 0;
  }
}

const disPlayIconNumerot = async () => {
  await paivitaOstoskorinNumero();
  await paivitaSuosikkiMaara();
}

const tyhjennaOstoskori = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin tyhjentämisessä');
    }

    const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
    ostoskoriLkmElement.textContent = '0';

    return true;
  } catch (error) {
    console.error('Virhe ostoskorin tyhjentämisessä:', error.message);
    return false;
  }
};

const vahvistaJaTyhjenna = async () => {
  const userId = getUserId();
  await tyhjennaOstoskori(userId);
  const kieli = getSelectedLanguage();
  let targetPage = '';
  switch (kieli) {
    case 'EN':
      targetPage = '../../en/9Vahvistus_en.html';
      break;
    case 'CN':
      targetPage = '../../cn/9Vahvistus_cn.html';
      break;
    case 'ET':
      targetPage = '../../et/9Vahvistus_et.html';
      break;
    case 'SV':
      targetPage = '../../sv/9Vahvistus_sv.html';
      break;
    case 'FI':
    default:
      targetPage = '../../fi/9Vahvistus.html';
      break;
  }
  window.location.href = targetPage;
};


disPlayIconNumerot();
