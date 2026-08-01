const { chromium } = require('playwright');
const fs = require('fs');
(async ()=>{
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const base = 'http://localhost:4322';

  // Home initial
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.screenshot({ path: './screenshot-home-1.png', fullPage: true });

  // Rotating examples: take two screenshots 4s apart
  await page.waitForSelector('#rotating-example');
  await page.screenshot({ path: './screenshot-rot-1.png', fullPage: false });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: './screenshot-rot-2.png', fullPage: false });

  // Click header download and screenshot area
  const headerBtn = await page.$('header a[href="#download"]');
  if(headerBtn){
    await headerBtn.click();
    await page.waitForTimeout(500);
    // ensure #download is visible
    const downloadEl = await page.$('#download');
    if(downloadEl){
      await downloadEl.screenshot({ path: './screenshot-download-buttons.png' });
    }
  }

  // OS pages
  const pages = ['macos','windows','linux'];
  for(const p of pages){
    const url = `${base}/${p}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `./screenshot-${p}.png`, fullPage: true });
    if(p === 'macos'){
      // test copy button
      const copyBtn = await page.$('#copy-mac-cmd');
      if(copyBtn){
        await copyBtn.click();
        await page.waitForTimeout(200);
        const cmd = await page.$eval('#mac-cmd', el => el.textContent.trim());
        fs.writeFileSync('./screenshot-macos-cmd.txt', cmd);
      }
    }
  }

  await browser.close();
  console.log('Screenshots saved to current directory.');
})();