// const sqlite3 = require('sqlite3').verbose();


// // Avaa SQLite-tietokanta
// const db = new sqlite3.Database('ostoskori.db');

// // Luodaan taulu ostoskoria varten, jos sitä ei ole olemassa
// db.serialize(() => {
//     db.run("CREATE TABLE IF NOT EXISTS ostoskori (asiakas_id TEXT, tuote_id INT, maara INT)");

//     // Funktio lisää tuotteen ostoskoriin
//     function lisaaVierasOstoskoriin(asiakas_id, tuote_id, maara) {
//         db.run("INSERT INTO ostoskori (asiakas_id, tuote_id, maara) VALUES (?, ?, ?)", [asiakas_id, tuote_id, maara], (err) => {
//             if (err) {
//                 console.error('Virhe lisättäessä ostoskoria:', err.message);
//             } else {
//                 console.log('Tuote lisätty ostoskoriin onnistuneesti.');
//             }
//         });
//     }
// });

//   // Funktio hakee ostoskorin tuotteiden määrän tietokannasta
//   function haeVierasOstoskoristaTuoteMaara() {
//     return new Promise((resolve, reject) => {
//         // Tehdään kysely tietokantaan
//         db.get("SELECT COUNT(*) as maara FROM ostoskori", (err, row) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(row.maara);
//             }
//         });
//     });
//   }
//   function haeVierasOstokoristaTuoteId() {
//     return new Promise((resolve, reject) => {
//         db.get("SELECT tuote_id FROM ostoskori", (err, row) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(row.tuote_id);
//             }
//         });
//     });
//   }

//   // Kutsutaan funktiota ja päivitetään ostoskorin numero sen paluuarvolla
//   const ostoskorinyhdistaminen = async () => {
//     (haeVierasOstoskoristaTuoteMaara() && haeVierasOstokoristaTuoteId).then(numero => {
//     const tarkistaOstoskori = ostoskoriTarkistus();
//     if(tarkistaOstoskori === true){
//       paivitaOstoskorinNumero(numero);
//     }else {
//         console.log('Ostoskoria ei ole olemassa');
//         addToCart(tuote_id, maara);
//       }
//     }).catch(err => {
//       console.error('Virhe haettaessa ostoskorin tuotteiden määrää:', err);
//     });
//   }
// // Suljetaan tietokanta lopuksi



//   // Tarkistetaan, onko käyttäjä kirjautunut sisään
// function uusiVierasId() {
//   if (!kirjaustarkistus()) {
//     // Jos käyttäjä ei ole kirjautunut sisään, luodaan vieras istunto
//     const vierasId = generoiVierasId(); // Esimerkiksi satunnainen merkkijono tai numero

//     // Tallennetaan vierasId istunnon ajaksi (2 tuntia)
//     sessionStorage.setItem('vierasId', vierasId);
//     setTimeout(() => {
//         // Poistetaan vierasId istunnosta 2 tunnin kuluttua
//         sessionStorage.removeItem('vierasId');
//     }, 2 * 60 * 60 * 1000); // 2 tuntia * 60 minuuttia * 60 sekuntia * 1000 millisekuntia
//     console.log('VierasId:', vierasId);
//     // Lisätään tuote ostoskoriin vierasId:n avulla
//     lisaaTuoteOstoskoriin(vierasId);
//     return vierasId;
//   }
// }

// const kirjaustarkistus = () =>{
//   if (localStorage.getItem('authToken')) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function generoiVierasId() {
//   //generoidaan satunnainen merkkijono
//   return Math.random().toString(36).substring(2, 15);
// }

// function lisaaVierasOstoskoriin(asiakas_id, tuote_id, maara) {
//   (tuote_id, maara) {
//   const vierasId = sessionStorage.getItem('vierasId');
//   if (vierasId) {

//       // Tässä voisi olla koodi, joka lisää tuotteen ostoskoriin käyttämällä vierasId:tä
//   }
// }

//   // Tässä voisi olla koodi, joka lisää tuotteen ostoskoriin käyttämällä vierasId:tä

// }

// db.close();

// export { uusiVierasId,
//   kirjaustarkistus,
//   generoiVierasId,
// lisaaVierasOstoskoriin,
//   haeVierasOstoskoristaTuoteMaara,
//   haeVierasOstokoristaTuoteId,
//   ostoskorinyhdistaminen };
