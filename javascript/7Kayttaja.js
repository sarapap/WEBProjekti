'use strict';

function logOut() {
    localStorage.removeItem('authToken');

    const kieli = document.getElementById('kieli');
    const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

    let logoutPage = '';
    switch (selectedLanguage) {
        case 'EN':
            logoutPage = '11Login_en.html';
            break;
        case 'CN':
            logoutPage = '11Login_cn.html';
            break;
        case 'ET':
            logoutPage = '11Login_et.html';
            break;
        case 'SV':
            logoutPage = '11Login_sv.html';
            break;
        case 'FI':
        default:
            logoutPage = '11Login.html';
            break;
    }
    window.location.href = logoutPage;
}


