'use strict';

document.getElementById("kieli").addEventListener("change", function () {
    var selectedLanguage = this.value;
    if (selectedLanguage === 'FI') {
        window.location.href = '../fi/1Etusivu.html';
    } else if (selectedLanguage === 'EN') {
        window.location.href = '../en/1Etusivu_en.html';
    } else if (selectedLanguage === 'CN') {
        window.location.href = "/cn/1Etusivu_cn.html";
    }
    else if (selectedLanguage === 'ET') {
        window.location.href = "/et/1Etusivu_et.html";
    }
    else if (selectedLanguage === 'SV') {
        window.location.href = "/sv/1Etusivu_sv.html";
    }
});


// // kun painaa registeroidy button, niin tulee registeri formi ikkuna
// registerForm.style.display = 'none';
// document.querySelector('#registerBtn').addEventListener('click', () => {
//     registerForm.style.display = 'block';
// });
// function registerUser(e) {
//     e.preventDefault();

//     const firstname = registerForm['etunimi'].value;
//     const laskname = registerForm['sukunimi'].value;

//     const email = registerForm['email'].value;
//     const phone = registerForm['puhelin'].value;
//     const password = registerForm['password'].value;

//     auth.createUserWithEmailAndPassword(email, password).then(cred => {
//         console.log(cred.user);
//         registerForm.reset();
//     });
// }
// registerForm.addEventListener('submit', registerUser);


