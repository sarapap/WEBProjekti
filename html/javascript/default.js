/*funktio kielen vaihtoon */
function getSelectedLanguage() {
  const kieli = document.getElementById('kieli');
  return kieli && kieli.value ? kieli.value : 'FI';
}

/* kielen vaihto kun vaihtaa oikean kieliselle sivulle */

document.getElementById("kieli").addEventListener("change", function () {
  var selectedLanguage = this.value;
  if (selectedLanguage === 'FI') {
    window.location.href = '../../html/fi/1Etusivu.html';
  } else if (selectedLanguage === 'EN') {
    window.location.href = '../../html/en/1Etusivu_en.html';
  } else if (selectedLanguage === 'CN') {
    window.location.href = "../../html/cn/1Etusivu_cn.html";
  }
  else if (selectedLanguage === 'ET') {
    window.location.href = "../../html/et/1Etusivu_et.html";
  }
  else if (selectedLanguage === 'SV') {
    window.location.href = "../../html/sv/1Etusivu_sv.html";
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

        const selectedLanguage = getSelectedLanguage();

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
  });

}
);

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

// if (!response.ok) {
//   throw new Error('Virhe vierasasiakkaan lisäämisessä');
// }

//     const userId = await getLastUserId();
//     console.log('Vierasasiakas lisätty onnistuneesti:', userId);
//     localStorage.setItem('userId', userId); // Save userId to localStorage
//     const token = localStorage.getItem('authToken');
//     console.log('token:', token);

//     setTimeout(() => {
//       removeOstoskoristaById(userId);
//     }, 2 * 60 * 60 * 1000); // 2 hours * 60 minutes * 60 seconds * 1000 milliseconds
//     return userId;
//   } catch (error) {
//     console.error('Error adding guest user:', error);
//     return null; // Return null or another appropriate value to indicate an error
//   }
// };

// get asiakas id from local storage
const getUserId = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);
    let userId = parsedPayload.asiakas_id;
    return userId;
  }
}

const userId = getUserId();

const getLastUserId = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/asiakas', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe viimeisen käyttäjän hakemisessa');
    }
    const data = await response.json();
    const userId = data[data.length - 1].asiakas_id;
    return userId;
  } catch (error) {
    return 0;
  }
}

const disPlayIconNumerot = async () => {
  await paivitaOstoskorinNumero();
  await paivitaSuosikkiMaara();
}

const paivitaOstoskorinNumero = async () => {
  const userId = getUserId();
  const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');

  const tuotteet = await getTuotteenMaaraByUserId(userId);
  const tuotteenLkm = tuotteet.reduce((sum, tuote) => sum + tuote.tuote_maara, 0);

  ostoskoriLkmElement.textContent = tuotteenLkm.toString();
};


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
    return 0;
  }
}

const getTuotteenMaaraByUserId = async (userId) => {

  try {
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
    return 0;
  }
}

const removeOstoskoristaById = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/ostoskori/${UserId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin poistamisessa');
    }

  } catch (error) {
  }
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
      targetPage = '../../html/en/9Vahvistus_en.html';
      break;
    case 'CN':
      targetPage = '../../html/cn/9Vahvistus_cn.html';
      break;
    case 'ET':
      targetPage = '../../html/et/9Vahvistus_et.html';
      break;
    case 'SV':
      targetPage = '../../html/sv/9Vahvistus_sv.html';
      break;
    case 'FI':
    default:
      targetPage = '../../html/fi/9Vahvistus.html';
      break;
  }
  window.location.href = targetPage;
};


disPlayIconNumerot();