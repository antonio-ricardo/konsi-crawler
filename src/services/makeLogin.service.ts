import { Page } from 'puppeteer'
import { BadRequestError } from '../errors/badRequest'
import { NotFoundError } from '../errors/notFound'

interface makeLoginServiceInput {
  page: Page;
  password: string;
  login: string;
}

const querySelectorsMap = {
  invalidLoginModal:
    '#ion-overlay-1 > div.alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md',
}

export const makeLoginService = async ({
  page,
  login,
  password,
}: makeLoginServiceInput) => {
  const [loginInput, passInput, confirmButton] = await Promise.all([
    page.waitForSelector('#user', {
      timeout: 10000,
    }),
    page.waitForSelector('#pass', {
      timeout: 10000,
    }),
    page.waitForSelector('#botao', {
      timeout: 10000,
    }),
  ])

  if (!loginInput || !passInput) {
    throw new NotFoundError('Not found login or password input', {
      loginInput,
      passInput,
    })
  }

  if (!confirmButton) {
    throw new NotFoundError('Not found confirm button')
  }

  await loginInput.type(login)

  await passInput.type(password)

  await confirmButton.click()

  try {
    await page.waitForSelector(querySelectorsMap.invalidLoginModal, {
      timeout: 3000,
    })
  } catch (error) {
    return
  }

  throw new BadRequestError('Verify user and password')
}
