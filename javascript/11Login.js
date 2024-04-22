document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const registerButton = form.querySelector('button[type="submit"]');

  // Lisätään kuuntelija lomakkeen lähetykselle
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Estä lomakkeen oletustoiminto

      // Hae lomakkeen tiedot
      const formData = new FormData(form);

      // Luo lomaketiedostosta objekti
      const formObject = {};
      formData.forEach(function(value, key) {
          formObject[key] = value;
      });

      // Lähetä tiedot Ajaxilla
      sendDataAjax(formObject);

      // Lähetä lomakkeen tiedot myös perinteisesti
      this.submit();
  });

  // Funktio tiedon lähettämiseksi Ajaxilla
  function sendDataAjax(data) {
      // Voit tehdä tässä Ajax-pyynnön käyttäen esim. Fetch API:ta tai XMLHttpRequest-oliota
      // Esimerkki Fetch API:n käytöstä:
      fetch('https://localhost:3000/api/v1/asiakas/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Form submission successful:', data);
          // Voit tässä esimerkiksi näyttää käyttäjälle ilmoituksen onnistuneesta lähetyksestä
      })
      .catch(error => {
          console.error('Form submission error:', error);
          // Voit tässä esimerkiksi näyttää käyttäjälle ilmoituksen virheestä
      });
  }
});
