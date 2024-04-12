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
