import puppeteer from 'puppeteer';
//HTML sivun testi

const { changeLanguage } = require('./1Etusivu'); //

// describe('Language Change Functionality', () => {
//     test('should change the language to English', () => {
//         document.body.innerHTML = `
//             <select id="kieli">
//                 <option value="FI" selected>Suomi</option>
//                 <option value="EN">Englanti</option>
//             </select>
//         `;

//         changeLanguage('EN');
//         const selectElement = document.getElementById('kieli');
//         expect(selectElement.value).toBe('EN');
//     });
// });

function changeLanguage(language) {
  const selectElement = document.getElementById('kieli');
  selectElement.value = language;
}

module.exports = { changeLanguage }; // Export for testing

import { fireEvent, getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// Mocking window.location.href to be able to test its changes
Object.defineProperty(window, 'location', {
  writable: true,
  value: { href: '' }
});

// Function that simulates the environment and functionality you want to test
function setup() {
  document.body.innerHTML = `
    <select id="kieli">
      <option value="FI">Suomi</option>
      <option value="EN">English</option>
      <option value="CN">中文</option>
      <option value="ET">Eesti</option>
      <option value="SV">Svenska</option>
    </select>
  `;

  require('./pathToYourScript.js'); // Adjust the path to where your language switching script is

  return {
    select: getByTestId(document.documentElement, 'kieli'),
  };
}

describe('Language switcher', () => {
  test('redirects to the Finnish page when "FI" is selected', () => {
    const { select } = setup();
    fireEvent.change(select, { target: { value: 'FI' } });
    expect(window.location.href).toBe('../fi/1Etusivu.html');
  });

  test('redirects to the English page when "EN" is selected', () => {
    const { select } = setup();
    fireEvent.change(select, { target: { value: 'EN' } });
    expect(window.location.href).toBe('../en/1Etusivu_en.html');
  });

  test('redirects to the Chinese page when "CN" is selected', () => {
    const { select } = setup();
    fireEvent.change(select, { target: { value: 'CN' } });
    expect(window.location.href).toBe("../cn/1Etusivu_cn.html");
  });

  test('redirects to the Estonian page when "ET" is selected', () => {
    const { select } = setup();
    fireEvent.change(select, { target: { value: 'ET' } });
    expect(window.location.href).toBe("..7et/1Etusivu_et.html"); // Check for typos in the URL if intentional
  });

  test('redirects to the Swedish page when "SV" is selected', () => {
    const { select } = setup();
    fireEvent.change(select, { target: { value: 'SV' } });
    expect(window.location.href).toBe("../sv/1Etusivu_sv.html");
  });
});
