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

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");

    let userId;

    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        const parsedPayload = JSON.parse(payload);

        userId = parsedPayload.asiakas_id;

        const response = await fetch(`http://localhost:3000/api/v1/asiakas/info/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Virhe käyttäjän tietojen hakemisessa.");
        }

        const userData = await response.json();

        const kieli = document.getElementById("kieli");
        const selectedLanguage = kieli && kieli.value ? kieli.value : 'FI';

        const translations = {
            FI: {
                title: "Omat tiedot",
                name: "Nimi",
                username: "Tunnus",
                email: "Sähköposti",
                phone: "Puhelin",
                birthday: "Syntymäpäivä",
                discountGroup: "Alennusryhmä",
                foodAllergies: "Ruoka-allergiat",
                logout: "Kirjaudu ulos",
            },
            EN: {
                title: "Personal Information",
                name: "Name",
                username: "Username",
                email: "Email",
                phone: "Phone",
                birthday: "Birthday",
                discountGroup: "Discount Group",
                foodAllergies: "Food Allergies",
                logout: "Log Out",
            },
            CN: {
                title: "个人信息",
                name: "名字",
                username: "用户名",
                email: "电子邮件",
                phone: "电话",
                birthday: "生日",
                discountGroup: "折扣组",
                foodAllergies: "食物过敏",
                logout: "登出",
            },
            ET: {
                title: "Isiklik teave",
                name: "Nimi",
                username: "Kasutajanimi",
                email: "E-post",
                phone: "Telefon",
                birthday: "Sünnipäev",
                discountGroup: "Soodustusgrupp",
                foodAllergies: "Toiduallergiad",
                logout: "Logi välja",
            },
            SV: {
                title: "Personlig information",
                name: "Namn",
                username: "Användarnamn",
                email: "E-post",
                phone: "Telefon",
                birthday: "Födelsedag",
                discountGroup: "Rabattgrupp",
                foodAllergies: "Matallergier",
                logout: "Logga ut",
            },
        };

        const t = translations[selectedLanguage];

        const omatTiedotSection = document.getElementById("omatiedot");

        omatTiedotSection.innerHTML = `
            <h1>${t.title}</h1><br>
            <p>${t.name}: ${userData.nimi}</p>
            <p>${t.username}: ${userData.tunnus}</p>
            <p>${t.email}: ${userData.email}</p>
            <p>${t.phone}: ${userData.puhelin ?? t.phone}</p>
            <p>${t.birthday}: ${userData.syntymapaiva ?? t.birthday}</p>
            <p>${t.discountGroup}: ${userData.allennus_ryhma ?? t.discountGroup}</p>
            <label for="allergia">${t.foodAllergies}</label><br>
            <textarea name="allergia" id="allergia">${userData.allergia ?? ''}</textarea><br>
            <button class="logOut" type="button" onclick="logOut()"><b>${t.logout}</b></button>
        `;

    } catch (error) {
        console.error("Virhe käyttäjän tietojen hakemisessa:", error.message);
    }
});


