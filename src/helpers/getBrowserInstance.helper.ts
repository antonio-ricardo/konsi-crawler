import puppeteer, { Browser } from 'puppeteer'

let browserInstance: Browser | null = null

export const getBrowserInstance = async () => {
  if (browserInstance === null) {
    browserInstance = await puppeteer.launch({ headless: true })
  }

  return browserInstance
}
