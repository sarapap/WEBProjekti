'use script';
document.getElementById("kieli").addEventListener("change", function() {
  var selectedLanguage = this.value;
  if (selectedLanguage === 'FI') {
      window.location.href = './fi/1Etusivu.html';
  } else if (selectedLanguage === 'EN') {
      window.location.href = './en/1Etusivu_en.html';
  } else if (selectedLanguage === 'CN') {
      window.location.href = "./1Etusivu_cn.html";
  }
});


document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const menuDropdown = document.getElementById("menuDropdown");

    menuButton.addEventListener("click", function () {
        if (menuDropdown.style.display === "block") {
            menuDropdown.style.display = "none";
        } else {
            menuDropdown.style.display = "block";
        }
    });
});
