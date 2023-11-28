import { Request, Response } from 'express'

import logger from '../common/logger'
import fillAndSubmitForm from '../scripts/fillAndSubmitForm'

const submitForm = async (req: Request, res: Response) => {
  try {
    const data = await fillAndSubmitForm()

    res.status(200).send(data)
  } catch (e: any) {
    logger.error(e.message)

    res.status(500).send(e.message)
  }
}

export { submitForm }
