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
        const userName = userData.nimi || "";
        const userUsername = userData.tunnus || "";
        const userEmail = userData.email || "";
        const userPhone = userData.puhelin || "";

        /* käännökset */

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
                edit: "Muokkaa tietoja",
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
                edit: "Edit Information",
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
                edit: "编辑信息",
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
                edit: "Muuda teavet",
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
                edit: "Redigera information",
                logout: "Logga ut",
            },
        };

        const discountGroup = {
            "Opiskelija": {
                "FI": "Opiskelija",
                "EN": "Student",
                "CN": "学生",
                "ET": "Õpilane",
                "SV": "Student",
            },
            "Eläkeläinen": {
                "FI": "Eläkeläinen",
                "EN": "Retiree",
                "CN": "退休人员",
                "ET": "Pensionär",
                "SV": "Pensionär",
            },
        };

        const anotherPage = {
            FI: "../../html/fi/7KayttajaMuutos.html",
            EN: "../../html/en/7KayttajaMuutos_en.html",
            CN: "../../html/cn/7KayttajaMuutos_cn.html",
            ET: "../../html/et/7KayttajaMuutos_et.html",
            SV: "../../html/sv/7KayttajaMuutos_sv.html",
        };

        const t = translations[selectedLanguage];
        const editPage = anotherPage[selectedLanguage];
        const userDiscountGroup = userData.allennus_ryhma || "";
        const translatedDiscountGroup = discountGroup[userDiscountGroup]?.[selectedLanguage] || "";

        /* ruoka-allergiat */
        const allergies = getAllergiat();
        const allergiaText = allergies.join(", ");

        /* syntymäpäivä nätimmin */

        const formattedDate = userData.syntymapaiva ? new Date(userData.syntymapaiva) : null;
        const day = formattedDate ? formattedDate.getUTCDate().toString().padStart(2, '0') : '';
        const month = formattedDate ? (formattedDate.getUTCMonth() + 1).toString().padStart(2, '0') : '';
        const year = formattedDate ? formattedDate.getUTCFullYear() : '';

        const displayDate = formattedDate ? `${day}.${month}.${year}` : '';

        const omatTiedotSection = document.getElementById("omatiedot");

        omatTiedotSection.innerHTML = `
            <h1>${t.title}</h1><br>
            <p>${t.name}: ${userName}</p>
            <p>${t.username}: ${userUsername}</p>
            <p>${t.email}: ${userEmail}</p>
            <p>${t.phone}: ${userPhone}</p>
            <p>${t.birthday}: ${displayDate}</p>
            <p>${t.discountGroup}: ${translatedDiscountGroup}</p>
            <label for="allergia">${t.foodAllergies}:</label><br>
            <li name="allergia" id="allergia" 
            style="color: rgb(219, 146, 56); font-weight: bold; list-style: none;
            border: 1px solid black; border-radius: 5px; font-size: 14px;">
            ${allergiaText}
            </li><br>
            <button class="edit" type="button" onclick="window.location.href = '../../html/${editPage}'"><b>${t.edit}</b></button><br>
            <button class="logOut" type="button" onclick="logOut()"><b>${t.logout}</b></button>
        `;

    } catch (error) {
        console.error("Error fetching user information:", error.message);
    }
});

/* funktio allergien saamiseksi */
function getAllergiaStorageKey() {
    const token = localStorage.getItem('authToken');
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    const userID = parsedPayload.asiakas_id;
    return `userAllergia_${userID}`;
}

function getAllergiat() {
    const storageKey = getAllergiaStorageKey();
    try {
        const storedAllergias = localStorage.getItem(storageKey);
        if (storedAllergias) {
            return JSON.parse(storedAllergias);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Virhe allergioiden hakemisessa:", error);
        return [];
    }
}

