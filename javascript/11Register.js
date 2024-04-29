'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('#register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const data = {
                etunimi: document.getElementById('firstname') ? document.getElementById('firstname').value : '',
                sukunimi: document.getElementById('lastname') ? document.getElementById('lastname').value : '',
                tunnus: document.getElementById('tunnus') ? document.getElementById('tunnus').value : '',
                salasana: document.getElementById('password') ? document.getElementById('password').value : '',
                email: document.getElementById('email') ? document.getElementById('email').value : '',
                puhelin: document.getElementById('phone') ? parseInt(document.getElementById('phone').value, 10) : null,
                syntymapaiva: document.getElementById('syntymapaiva') && document.getElementById('syntymapaiva').value.trim() ? document.getElementById('syntymapaiva').value : null,
                rooli: "user",
                ehdot_hyvaksytty: document.querySelector('#accept-1') && document.querySelector('#accept-1').checked ? 1 : 0,
                allennus_ryhma: document.querySelector('input[name="status"]:checked') ? document.querySelector('input[name="status"]:checked').value : null,
            };

            if (data.ehdot_hyvaksytty === 0) {
                alert("Sinun on hyväksyttävä ehdot");
                return;
            }

            fetch('http://localhost:3000/api/v1/asiakas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Rekisteröinti epäonnistui');
                    }
                })
                .then(data => {
                    const token = data.token;

                    if (token) {
                        localStorage.setItem('authToken', token);

                        const kieli = document.getElementById('kieli');
                        const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

                        let targetPage = '';
                        switch (selectedLanguage) {
                            case 'EN':
                                targetPage = '../../html/en/7Kayttaja_en.html';
                                break;
                            case 'CN':
                                targetPage = '../../html/cn/7Kayttaja_cn.html';
                                break;
                            case 'ET':
                                targetPage = '../../html/et/7Kayttaja_et.html';
                                break;
                            case 'SV':
                                targetPage = '../../html/sv/7Kayttaja_sv.html';
                                break;
                            case 'FI':
                            default:
                                targetPage = '../../html/fi/7Kayttaja.html';
                                break;
                        }

                        window.location.href = targetPage;
                    } else {
                        alert('Rekisteröinti epäonnistui. Yritä uudelleen.');
                    }
                })
                .catch(error => {
                    console.error('Virhe rekisteröinnissä:', error);
                    alert('Rekisteröinti epäonnistui. Yritä uudelleen.');
                });
        });
    }
});

