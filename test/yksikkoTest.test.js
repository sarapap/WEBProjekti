import puppeteer from 'puppeteer';
//HTML sivun testi

const testTableStructure = async (url, data) => {
  let browser;

try {
  browser = await puppeteer.launch({
  headless: 'newPage',
  });

  const page = await browser.newPage();
  await page.goto(url);

  const navLinkit = await page.evaluate(() => {
    const elements = document.querySelectorAll('nav a');
    const links = [];
    elements.forEach(element => {
      links.push(element.href);
    });
    return links;
    });
  };
});


