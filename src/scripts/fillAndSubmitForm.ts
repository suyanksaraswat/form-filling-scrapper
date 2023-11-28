import path from 'path'
import puppeteer from 'puppeteer'

export default async function fillAndSubmitForm() {

  try {
    const url = 'https://bukabantuan.bukalapak.com/form/175'

    const browser = await puppeteer.launch({ headless: false }) 
    const page = await browser.newPage()

    await page.goto(url)

    const inputFields = await page.$$('.bl-text-field__input')

    for (let i = 0; i < inputFields.length; i++) {

      if (i === 1 || i === 9) {
        await inputFields[i].type(`test${i}@email.com`)
      } else if (i === 10) {
        await inputFields[i].type(`${i}`)
      } else {
        await inputFields[i].type(`test${i}`)
      }
    }

    await page.type(
      '#body',
      'body body body body body bodybody body body body body body body body body body body body body body bodybody'
    )

    const radioButtonSelector = 'input[type="radio"]' // Replace with the actual class of your radio button

    // Wait for the radio button to be present in the DOM
    await page.waitForSelector(radioButtonSelector)

    // Set the value of the radio button using page.evaluate
    await page.evaluate(radioButtonSelector => {
      // eslint-disable-next-line no-undef
      const radioButton = document.querySelector(radioButtonSelector)
      // @ts-ignore
      radioButton.checked = true

      // Trigger the 'change' event
      const event = new Event('change', { bubbles: true })
      radioButton?.dispatchEvent(event)
    }, radioButtonSelector)

    const fileInputId1 = 'link_barang_banyak' // Replace with the actual id of your file input
    const filePath = path.resolve(__dirname, 'test.jpeg') // Replace 'your_file.txt' with the actual file name

    await page.waitForSelector(`#${fileInputId1}`)

    // Upload the file using the file input id
    await page.evaluate((fileInputId, filePath) => {
      // eslint-disable-next-line no-undef
      const fileInput = document.getElementById(fileInputId)
      // eslint-disable-next-line no-undef
      const files = [new File([filePath], 'your_file.txt')]
      Object.defineProperty(fileInput, 'files', {
        value: files,
        writable: false
      })

      // Trigger the 'change' event
      const event = new Event('change', { bubbles: true })
      fileInput?.dispatchEvent(event)
    }, fileInputId1, filePath)



    const fileInputId2 = 'surat_kepemilikan_merek' // Replace with the actual id of your file input

    await page.waitForSelector(`#${fileInputId1}`)

    // Upload the file using the file input id
    await page.evaluate((fileInputId, filePath) => {
      // eslint-disable-next-line no-undef
      const fileInput = document.getElementById(fileInputId)
      // eslint-disable-next-line no-undef
      const files = [new File([filePath], 'your_file.txt')]
      Object.defineProperty(fileInput, 'files', {
        value: files,
        writable: false
      })

      // Trigger the 'change' event
      const event = new Event('change', { bubbles: true })
      fileInput?.dispatchEvent(event)
    }, fileInputId2, filePath)

    const checkboxSelector = 'input[type="checkbox"]' // Replace with the actual class of your checkbox

    // Wait for the checkbox to be present in the DOM
    await page.waitForSelector(checkboxSelector)

    // Set the value of the checkbox using page.evaluate
    await page.evaluate(checkboxSelector => {
      // eslint-disable-next-line no-undef
      const checkbox = document.querySelector(checkboxSelector)
      //@ts-ignore
      checkbox.checked = true

      // Trigger the 'change' event
      const event = new Event('change', { bubbles: true })
      checkbox?.dispatchEvent(event)
    }, checkboxSelector)

    await page.click('.bl-button')

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

    const currentUrl = page.url()
    
    let success

    if (currentUrl.includes('submitted')) {
      success = true
      console.log('Navigation successful. Page contains "success" in the URL.')
    } else {
      console.error('Navigation failed or did not lead to a success page.')
    }

    await browser.close()
    
    return {status: success ? 'form filled' : 'error occured'}
  } catch (error) {
    console.error('Error during file upload:', error)
  }
}
