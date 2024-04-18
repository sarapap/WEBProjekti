import express from 'express';
import api from './api/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use('/public', express.static('public'));
app.use('/api/v1', api);

app.get('/', (req, res) => {
  const user = {
    asiakas_etunimi: 'Anna',
    asiakas_sukunimi: 'Ansku',
    asiakas_tunnus: 'ansku',
    Asiakas_salasana: 12345,
    asiakas_email: 'anna.@ascafe.fi',
    asiakas_puh: 1234567,
    asiakas_registeri_pvm: '2021-01-01',
  };
  res.json(user);
});

export default app;
