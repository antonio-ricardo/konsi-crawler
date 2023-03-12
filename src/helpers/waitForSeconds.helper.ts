interface waitForSecondsInput {
  seconds: number;
}

export const waitForSeconds = async ({ seconds }: waitForSecondsInput) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('show')
    }, seconds * 1000)
  })
}
