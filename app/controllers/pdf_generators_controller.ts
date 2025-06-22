import { HttpContext } from '@adonisjs/core/http'
import puppeteer from 'puppeteer'

export default class PdfGeneratorController {
  public async generatePdf({ request, response }: HttpContext) {
    console.log("c'est arrivee chez Nous ici")
    try {
      const { url } = request.only(['url'])

      if (!url) {
        return response.status(400).send('URL is required')
      }

      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      console.log(browser)

      console.log(page)

      await page.goto(url, { waitUntil: 'networkidle0' })

      await page.waitForSelector('.avatar', { timeout: 10000 })

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      })

      await browser.close()

      response.header('Content-Type', 'application/pdf')
      response.header('Content-Disposition', 'attachment; filename="cv_profile.pdf"')
      response.header('Content-Length', pdfBuffer.length.toString())
      return response.send(pdfBuffer)
    } catch (error) {
      console.error('Error generating PDF:', error)
      return response.status(500).send('Error generating PDF')
    }
  }
}