import express from 'express';
import api from './api/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use('/api/v1', api);

app.get('/', (req, res) => {
    const tuote = {
        tuote_1d: 1,
        tuote_nimi: 'cake',
        tuote_kuva: 'kuva/cake.png',
        tuote_hinta: 3.25,
        tuote_kustannus: 1.80,
        tuote_tyyppi: "suklaakakku"
    };
    res.json(tuote);
});

export default app;
