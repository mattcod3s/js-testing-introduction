const { generateText, checkAndGenerate } = require('./util');
const puppeteer = require('puppeteer');


test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

test('should generate data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});


test('should generate a valid text output', () => {
    const text = checkAndGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(
        'file:///Users/matthewkostka/Documents/js-testing-aca/js-testing-introduction/index.html'
        );
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', (el) => {el.textContent});
    expect(finalText).toBe('Anna (28 years old)');
}, 12000);