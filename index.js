const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://webscraper.io/test-sites/e-commerce/allinone" 
    );

  const skills = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        ".col-sm-4.col-lg-4.col-md-4 h4"
      )
    ).map((x) => x.textContent);
  });
  await page.screenshot({ path: "monitor.png" })
  await fs.writeFile("monitors.txt", skills.join("\r\n"));

  await browser.close();
}

start();
