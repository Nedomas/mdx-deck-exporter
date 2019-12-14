const puppeteer = require('puppeteer');

const screenshotAndNext = async ({
  page,
  urls,
}) => {
  console.log(`Screenshotting slide ${urls.length}.`)

  await page.screenshot({
    path: `./deck/${urls.length}.png`,
  })

  await page.keyboard.press('ArrowRight')
  await page.waitFor(3000)
}

const screenshotOrExit = async ({
  page,
  urls,
  browser,
}) => {
  const url = page.url()

  if (urls[urls.length - 10] === url) {
    console.log('All done!')
    await browser.close()
    return
  }

  urls.push(url)

  await screenshotAndNext({
    page,
    urls,
  })

  return screenshotOrExit({
    page,
    urls,
    browser,
  })
}

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1280,
      height: 660,
    },
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:5000')

  const urls = []

  screenshotOrExit({
    page,
    urls,
    browser,
  })
})();
