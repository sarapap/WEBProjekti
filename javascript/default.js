'use strict';

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
    });
});

