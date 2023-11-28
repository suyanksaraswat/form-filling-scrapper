import path from 'path'
import puppeteer from 'puppeteer'

export default async function fillAndSubmitForm() {

  try {
    // 1. Open browser and url
    const url = 'https://bukabantuan.bukalapak.com/form/175'

    const browser = await puppeteer.launch({ headless: false }) 
    const page = await browser.newPage()

    await page.goto(url)

    // 2. enter random text into input fields
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

    // 3. enter text in body field
    await page.type(
      '#body',
      'body body body body body bodybody body body body body body body body body body body body body body bodybody'
    )

    // 4. select the radio button
    const radioButtonSelector = 'input[type="radio"]' 

    await page.waitForSelector(radioButtonSelector)

    await page.evaluate(radioButtonSelector => {
      // eslint-disable-next-line no-undef
      const radioButton = document.querySelector(radioButtonSelector)
      // @ts-ignore
      radioButton.checked = true

      // Trigger the 'change' event
      const event = new Event('change', { bubbles: true })
      radioButton?.dispatchEvent(event)
    }, radioButtonSelector)


    // 6. upload file for first upload input

    const fileInputId1 = 'link_barang_banyak' 
    const filePath = path.resolve(__dirname, 'test.jpeg') 

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


    // 7. upload file for first upload input

    const fileInputId2 = 'surat_kepemilikan_merek' 

    await page.waitForSelector(`#${fileInputId1}`)

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


    // 8. select checkbox

    const checkboxSelector = 'input[type="checkbox"]' 

    await page.waitForSelector(checkboxSelector)

    await page.evaluate(checkboxSelector => {
      // eslint-disable-next-line no-undef
      const checkbox = document.querySelector(checkboxSelector)
      //@ts-ignore
      checkbox.checked = true

      const event = new Event('change', { bubbles: true })
      checkbox?.dispatchEvent(event)
    }, checkboxSelector)

    // 9. click on submit

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
