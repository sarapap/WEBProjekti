'use strict';

/*funktio kielen vaihtoon */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/* tekstit eri kielillä  */

let virhetuote = '';
let virhetuote2 = '';
let virhekategoria = '';
const selectedLanguage = getSelectedLanguage();
switch (selectedLanguage) {
    case 'EN':
        virhetuote = 'Error fetching product!';
        virhetuote2 = 'Error adding product!';
        virhekategoria = 'Error removing category!';
        break;
    case 'CN':
        virhetuote = '获取产品时出错！';
        virhetuote2 = '添加产品时出错！';
        virhekategoria = '删除类别时出错！';
        break;
    case 'ET':
        virhetuote = 'Viga toote laadimisel!';
        virhetuote2 = 'Viga toote lisamisel!';
        virhekategoria = 'Viga kategooria eemaldamisel!';
        break;
    case 'SV':
        virhetuote = 'Fel vid hämtning av produkt!';
        virhetuote2 = 'Fel vid lägg till produkt!';
        virhekategoria = 'Fel vid borttagning av kategori!';
        break;
    case 'FI':
    default:
        virhetuote = 'Virhe tuotteen hakemisessa!';
        virhetuote2 = 'Virhe tuotteen lisäämisessä!';
        virhekategoria = 'Virhe kategorian poistamisessa!';
        break;
}

/* uuden käyttäjän lisäys adminin puolesta */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("userModal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");
    const selectedLanguage = getSelectedLanguage();

    if (openModalButton) {
        openModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.showModal();
        });
    }

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.close();
        });
    }

    const userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const requiredFields = ["etunimi", "sukunimi", "tunnus", "salasana", "email", "puhelin"];
            const missingFields = requiredFields.filter(field => !document.getElementById(field)?.value);

            if (missingFields.length > 0) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert(`Missing fields: ${missingFields.join(", ")}`);
                        break;
                    case 'CN':
                        alert(`缺失的字段: ${missingFields.join(", ")}`);
                        break;
                    case 'ET':
                        alert(`Puuduvad väljad: ${missingFields.join(", ")}`);
                        break;
                    case 'SV':
                        alert(`Saknade fält: ${missingFields.join(", ")}`);
                        break;
                    case 'FI':
                    default:
                        alert(`Puuttuvat kentät: ${missingFields.join(", ")}`);
                        break;
                }
                return;
            }

            const data = {
                etunimi: document.getElementById('etunimi') ? document.getElementById('etunimi').value : '',
                sukunimi: document.getElementById('sukunimi') ? document.getElementById('sukunimi').value : '',
                tunnus: document.getElementById('tunnus') ? document.getElementById('tunnus').value : '',
                salasana: document.getElementById('salasana') ? document.getElementById('salasana').value : '',
                email: document.getElementById('email') ? document.getElementById('email').value : '',
                puhelin: document.getElementById('puhelin') ? parseInt(document.getElementById('puhelin').value, 10) : null,
                syntymapaiva: document.getElementById('syntymapaiva') && document.getElementById('syntymapaiva').value.trim() ? document.getElementById('syntymapaiva').value : null,
                rooli: document.getElementById("rooli") ? document.getElementById("rooli").value : "user",
                ehdot_hyvaksytty: document.getElementById('ehdot_hyvaksytty') && document.getElementById('ehdot_hyvaksytty').checked ? 1 : 0,
                allennus_ryhma: document.getElementById('alennus') ? document.getElementById('alennus').value : null,
            };

            try {
                const response = await fetch("http://localhost:3000/api/v1/asiakas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {

                    let targetPage = '';
                    switch (selectedLanguage) {
                        case 'EN':
                            targetPage = '../../html/en/10Paakayttaja_en.html';
                            alert("User added successfully.");
                            break;
                        case 'CN':
                            targetPage = '../../html/cn/10Paakayttaja_cn.html';
                            alert("用户已成功添加。");
                            break;
                        case 'ET':
                            targetPage = '../../html/et/10Paakayttaja_et.html';
                            alert("Kasutaja on edukalt lisatud.");
                            break;
                        case 'SV':
                            targetPage = '../../html/sv/10Paakayttaja_sv.html';
                            alert("Användare har lagts till framgångsrikt.");
                            break;
                        case 'FI':
                        default:
                            targetPage = '../../html/fi/10Paakayttaja.html';
                            alert("Käyttäjä lisätty onnistuneesti.");
                            break;
                    }

                    window.location.href = targetPage;
                } else {
                    switch (selectedLanguage) {
                        case 'EN':
                            alert("Failed to add user. Please try again.");
                            break;
                        case 'CN':
                            alert("添加用户失败。请再试一次。");
                            break;
                        case 'ET':
                            alert("Kasutaja lisamine ebaõnnestus. Proovi uuesti.");
                            break;
                        case 'SV':
                            alert("Misslyckades med att lägga till användare. Försök igen.");
                            break;
                        case 'FI':
                        default:
                            alert("Käyttäjän lisääminen epäonnistui.");
                            break;
                    }
                }
            } catch (error) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert("An error occurred while adding the user.");
                        break;
                    case 'CN':
                        alert("添加用户时发生错误。");
                        break;
                    case 'ET':
                        alert("Kasutaja lisamisel tekkis viga.");
                        break;
                    case 'SV':
                        alert("Ett fel uppstod när användaren lades till.");
                        break;
                    case 'FI':
                    default:
                        alert("Virhe käyttäjän lisäämisessä.");
                        break;
                }
            }
        });
    }
});

/* Pääkäyttäjän sivu, vain admin pääsee */

function base64Decode(str) {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

function getUserRoleFromToken(token) {
    const parts = token.split('.');
    const payload = base64Decode(parts[1]);
    const payloadObject = JSON.parse(payload);
    return payloadObject.role;
}

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    const selectedLanguage = getSelectedLanguage();
    if (!token) {

        let redirectPage;
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

        window.location.href = redirectPage;
        return;
    }

    const userRole = getUserRoleFromToken(token);

    if (userRole !== "admin") {
        function showCustomModal() {
            const modal = document.getElementById('customModal');
            const overlay = document.getElementById('backgroundOverlay');

            modal.style.display = 'block';
            overlay.style.display = 'block';

            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', function () {

                let redirectPage;
                switch (selectedLanguage) {
                    case 'EN':
                        redirectPage = '../../html/en/1Etusivu_en.html';
                        break;
                    case 'CN':
                        redirectPage = '../../html/cn/1Etusivu_cn.html';
                        break;
                    case 'ET':
                        redirectPage = '../../html/et/1Etusivu_et.html';
                        break;
                    case 'SV':
                        redirectPage = '../../html/sv/1Etusivu_sv.html';
                        break;
                    case 'FI':
                    default:
                        redirectPage = '../../html/fi/1Etusivu.html';
                        break;
                }

                window.location.href = redirectPage;
            });
        }
        showCustomModal();
    }
});

/* palautteen saaminen */

window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("haePalaute");

    if (button) {
        button.addEventListener("click", async () => {

            const startDateElement = document.getElementById("aloituspvm");
            const endDateElement = document.getElementById("lopetuspvm");

            const startDate = startDateElement.value;
            const endDate = endDateElement.value;

            try {
                const response = await fetch(`http://localhost:3000/api/v1/palaute/${startDate}/${endDate}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const palaute = await response.json();
                    const palauteTbody = document.getElementById("palaute");

                    palauteTbody.innerHTML = "";

                    palaute.forEach((p) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `<td>${p.nimi}:</td><td>"${p.teksti}"</td>`;
                        palauteTbody.appendChild(row);
                    });

                }
            } catch (error) {
            }
        });
    }
});


/* tuotehallinta */

const handleNewValue = async () => {
    const alatyyppi = getSelectedAlaTyyppi();
    await updateSubtypes(alatyyppi);
};

const updateSelectedAlatyyppi = () => {
    const selectedAlatyyppi = document.getElementById('cakeType').value;
    cakeList.innerHTML = '';
    return selectedAlatyyppi;
}

document.addEventListener('DOMContentLoaded', () => {
    const cakeType = document.getElementById('cakeType');
    if (cakeType) {
        cakeType.addEventListener('change', async () => {
            await fetchAndDisplayTuotteet();
        });
    }
});

const getSelectedAlaTyyppi = async () => {
    const selectedAlatyyppi = await updateSelectedAlatyyppi('cakeType').value;
    return selectedAlatyyppi;
};

const getTyyppiIdLista = async () => {
    try {
        const selectedAlatyyppi = await updateSelectedAlatyyppi();

        let url;
        if (selectedAlatyyppi === 'kakut') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakut';
        } else if (selectedAlatyyppi === 'suolaista') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/suolaista';
        } else if (selectedAlatyyppi === 'makeaa') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/makeaa';
        } else if (selectedAlatyyppi === 'lammintaruokaa') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/lammintaruokaa';
        } else if (selectedAlatyyppi === 'juotavaa') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/juotavaa';

        } else if (selectedAlatyyppi === 'cakes') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/cakes';
        } else if (selectedAlatyyppi === 'savory') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/savory';
        } else if (selectedAlatyyppi === 'sweet') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/sweet';
        } else if (selectedAlatyyppi === 'hotmeals') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/hotmeals';
        } else if (selectedAlatyyppi === 'drinks') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/drinks';

        } else if (selectedAlatyyppi === 'tårtor') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/tårtor';
        } else if (selectedAlatyyppi === 'saltet') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/saltet';
        } else if (selectedAlatyyppi === 'sött') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/sött';
        } else if (selectedAlatyyppi === 'varmarätter') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/varmarätter';
        } else if (selectedAlatyyppi === 'drycker') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/drycker';

        } else if (selectedAlatyyppi === 'koogid') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/koogid';
        } else if (selectedAlatyyppi === 'soolane') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/soolane';
        } else if (selectedAlatyyppi === 'magus') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/magus';
        } else if (selectedAlatyyppi === 'kuumtoit') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kuumtoit';
        } else if (selectedAlatyyppi === 'joogid') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/joogid';

        } else if (selectedAlatyyppi === 'kakutcn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakutcn';
        } else if (selectedAlatyyppi === 'suolaistacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/suolaistacn';
        } else if (selectedAlatyyppi === 'makeaacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/makeaacn';
        } else if (selectedAlatyyppi === 'lammintaruokaacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/lammintaruokaacn';
        } else if (selectedAlatyyppi === 'juotavaacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/juotavaacn';
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

const fetchAndDisplayByTyyppiId = async (tyyppiId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/tuote/tyyppi_id/${tyyppiId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(virhetuote);
        }

        const tuotteet = await response.json();

        if (Array.isArray(tuotteet)) {
            tuotteet.forEach((tuote) => {
                displaySingleTuote(tuote);
            });
        } else {
            displaySingleTuote(tuotteet);
        }
    } catch (error) {
    }
};

const displaySingleTuote = async (tuote) => {
    const selectedLanguage = getSelectedLanguage();
    let hintaTeksti = '';
    let maaraTeksti = '';
    let button = '';
    let button2 = '';
    switch (selectedLanguage) {
        case 'EN':
            hintaTeksti = 'Price: ';
            maaraTeksti = 'Amount: ';
            button = 'Edit';
            button2 = 'Add special diets';
            break;
        case 'CN':
            hintaTeksti = '价格: ';
            maaraTeksti = '数量: ';
            button = '编辑';
            button2 = '添加特殊饮食';
            break;
        case 'ET':
            hintaTeksti = 'Hind: ';
            maaraTeksti = 'Kogus: ';
            button = 'Muuda';
            button2 = 'Lisa eridieete';
            break;
        case 'SV':
            hintaTeksti = 'Pris: ';
            maaraTeksti = 'Mängd: ';
            button = 'Redigera';
            button2 = 'Lägg till specialkost';
            break;
        case 'FI':
        default:
            hintaTeksti = 'Hinta: ';
            maaraTeksti = 'Määrä: ';
            button = 'Muokkaa';
            button2 = 'Lisää erityisruokavalioita';
            break;
    }

    const cakeList = document.getElementById('cakeList');

    const tuoteElement = document.createElement('div');
    tuoteElement.classList.add('cake-item');

    // Lisää kuvakehys
    const imgElement = document.createElement('img');
    imgElement.src = `../../../uploads/${tuote.tuote_kuva}`;
    tuoteElement.appendChild(imgElement);

    // Lisää tuotteen nimi
    const h3Element = document.createElement('h3');
    h3Element.textContent = tuote.tuote_nimi;
    tuoteElement.appendChild(h3Element);

    const pElement = document.createElement('p');
    pElement.textContent = tuote.tuote_kuvaus;
    tuoteElement.appendChild(pElement);

    const pElement2 = document.createElement('p');

    const kategoriaIdResult = await getKategoriaIdByTuoteId(tuote.tuote_id);
    const existingKategoriat = kategoriaIdResult.map((id) => parseInt(id, 10));

    if (kategoriaIdResult.length > 0) {
        const kategoriaNimet = await Promise.all(
            kategoriaIdResult.map(async (kategoria) => {
                try {
                    return await getKategoriaById(kategoria);
                } catch (error) {
                    console.error("Virhe kategoriahaussa:", error);
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

    const buttonElement = document.createElement('button');
    buttonElement.textContent = button;
    buttonElement.style.backgroundColor = 'rgb(192, 160, 122)';
    tuoteElement.appendChild(buttonElement);

    const buttonElement2 = document.createElement('button');
    buttonElement2.textContent = button2;
    buttonElement.style.backgroundColor = 'rgb(192, 160, 122)';

    buttonElement2.addEventListener('click', () => openKategoriatModal(tuote.tuote_id, existingKategoriat, pElement2));

    tuoteElement.appendChild(buttonElement2);

    cakeList.appendChild(tuoteElement);
};

const getKategoriaIdByTuoteId = async (tuoteId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/kategoria_tuote/tuote/${tuoteId}`);

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

const getKategoriaById = async (kategoriaId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/kategoria/${kategoriaId}`);
        if (!response.ok) {
            return '';
        }

        const data = await response.json();
        return data.kategoria_nimi;
    } catch (error) {
        return '';
    }
};

const getKategoriatuoteIdByTuoteAndKategoria = async (tuoteId, kategoriaId) => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/v1/kategoria_tuote/${tuoteId}/${kategoriaId}`,
            { method: 'GET' }
        );

        if (!response.ok) {
            throw new Error("Virhe haettaessa kategoriatuote_id");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Virhe:", error);
        return null;
    }
};


const addKategoriaToTuote = async (tuoteId, kategoriaId) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/kategoria_tuote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tuote_id: tuoteId,
                kategoria_id: kategoriaId,
            }),
        });

        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

const deleteKategoriaFromTuote = async (kategoriatuote_id) => {

    try {
        const response = await fetch(`http://localhost:3000/api/v1/kategoria_tuote/${kategoriatuote_id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Virhe poistettaessa kategoria_tuote");
        }

        return true;
    } catch (error) {
        console.error("Virhe:", error);
        return false;
    }
};


const resetKategoriatCheckboxes = () => {
    const kategoriat = document.querySelectorAll('#tuote_kategoriat input[type="checkbox"]');
    kategoriat.forEach((checkbox) => {
        checkbox.checked = false;
    });
};

const openKategoriatModal = (tuoteId, existingKategoriat, updateKategoriaElement) => {
    const kategoriatModal = document.getElementById('kategoriatModal');
    kategoriatModal.showModal();

    const addKategoriat = document.getElementById('addKategoriat');
    const closeKategoriat = document.getElementById('closeKategoriat');

    closeKategoriat?.addEventListener('click', () => {
        kategoriatModal.close();
        resetKategoriatCheckboxes();
    });

    addKategoriat?.addEventListener('click', async () => {
        const kategoriat = document.querySelectorAll('#tuote_kategoriat input[type="checkbox"]');
        let newKategoriat = [];
        let errors = false;

        for (const checkbox of kategoriat) {
            if (checkbox.checked) {
                const kategoriaId = parseInt(checkbox.value, 10);

                if (existingKategoriat.includes(kategoriaId)) {
                    alert(`Kategoria ${checkbox.labels[0].textContent} on jo lisätty.`);
                } else {
                    alert('Kategoria lisätty onnistuneesti');
                    kategoriatModal.close();
                    resetKategoriatCheckboxes();
                    const success = await addKategoriaToTuote(tuoteId, kategoriaId);
                    if (success) {
                        newKategoriat.push(checkbox.labels[0].textContent);
                    } else {
                        console.error(`Virhe kategorian lisäämisessä: ${checkbox.value}`);
                        errors = true;
                    }
                }
            }
        }

        if (!errors) {
            if (newKategoriat.length > 0) {
                if (updateKategoriaElement) {
                    const currentKategoriat = updateKategoriaElement.textContent.split(', ').filter(Boolean);
                    const updatedKategoriat = [...currentKategoriat, ...newKategoriat].filter(
                        (value, index, self) => self.indexOf(value) === index
                    );
                    updateKategoriaElement.textContent = updatedKategoriat.join(', ');
                }

                kategoriatModal.close();
                resetKategoriatCheckboxes();
            }
        }
    });

    deleteKategoriat?.addEventListener('click', async () => {
        const kategoriat = document.querySelectorAll('#tuote_kategoriat2 input[type="checkbox"]');
        let errors = false;

        for (const checkbox of kategoriat) {
            if (checkbox.checked) {
                const kategoriaId = parseInt(checkbox.value, 10);

                const kategoriatuoteData = await getKategoriatuoteIdByTuoteAndKategoria(tuoteId, kategoriaId);

                if (!kategoriatuoteData || !kategoriatuoteData.kategoriatuote_id) {
                    alert("Virhe poistettaessa kategoriaa: tuntematon ID");
                    errors = true;
                }

                const kategoriatuoteId = kategoriatuoteData.kategoriatuote_id;

                const success = await deleteKategoriaFromTuote(kategoriatuoteId);

                if (!success) {
                    errors = true;
                }
            }
        }

        if (!errors) {
            alert('Kategoria poistettu onnistuneesti');
            kategoriatModal.close();
            resetKategoriatCheckboxes();
        }
    });


};


document.addEventListener('DOMContentLoaded', () => {
    const cakeSearch = document.getElementById('cakeSearch');
    if (cakeSearch) {
        cakeSearch.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }
});

const filterProducts = (searchTerm) => {
    const cakeItems = document.querySelectorAll('.cake-item');

    cakeItems.forEach((item) => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        const productDescription = item.querySelector('p').textContent.toLowerCase();

        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};

/* uusi tuote */

document.addEventListener('DOMContentLoaded', () => {
    const tuoteModal = document.getElementById('tuoteModal');
    const newProductButton = document.getElementById('newProductButton');
    const saveButton = document.getElementById('saveButton');
    const closeButton = document.getElementById('closeButton');

    newProductButton?.addEventListener('click', () => {
        tuoteModal?.showModal();
    });

    closeButton?.addEventListener('click', () => {
        tuoteModal?.close();
    });

    saveButton?.addEventListener('click', async () => {
        const tuoteForm = document.getElementById('tuoteForm');
        if (tuoteForm) {
            const formData = new FormData(tuoteForm);

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            try {
                const response = await fetch('http://localhost:3000/api/v1/tuote', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    console.error(virhetuote2);
                } else {
                    tuoteModal?.close();
                }
            } catch (error) {
            }
        }
    });
});





