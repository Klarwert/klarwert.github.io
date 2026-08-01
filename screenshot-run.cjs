const fs = require('fs');
(async ()=>{
  const { chromium } = require('playwright');
  let browser;
  try{
    browser = await chromium.launch({ headless: true });
  }catch(e){
    console.error('playwright chromium.launch failed, trying system Chrome...', e.message);
    try{
      const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
      browser = await chromium.launch({ headless: true, executablePath: chromePath });
    }catch(e2){
      console.error('system Chrome launch failed:', e2.message);
      process.exit(1);
    }
  }

  const page = await browser.newPage();
  const base = 'http://localhost:4322';

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.screenshot({ path: './screenshot-home-1.png', fullPage: true });

  await page.waitForSelector('#rotating-example');
  await page.screenshot({ path: './screenshot-rot-1.png', fullPage: false });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: './screenshot-rot-2.png', fullPage: false });

  const headerBtn = await page.$('header a[href="#download"]');
  if(headerBtn){
    await headerBtn.click();
    await page.waitForTimeout(500);
    const downloadEl = await page.$('#download');
    if(downloadEl){
      await downloadEl.screenshot({ path: './screenshot-download-buttons.png' });
    }
  }

  const pages = ['macos','windows','linux'];
  for(const p of pages){
    const url = `${base}/${p}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `./screenshot-${p}.png`, fullPage: true });
    if(p === 'macos'){
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
  console.log('Screenshots saved.');
})();