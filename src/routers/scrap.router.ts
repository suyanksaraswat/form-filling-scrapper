import express from 'express'

import * as scrapController from '../controllers/scrap.controller'

const router = express.Router()

/* POST store user emails */
router.get('/', scrapController.submitForm)

export { router as default }
