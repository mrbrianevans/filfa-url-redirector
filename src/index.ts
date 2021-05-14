import * as express from 'express'
import {Request, Response} from 'express'
const app = express()

const charMap = new Map()
charMap.set('a', 'accountants')
charMap.set('c', 'company')

app.get('/:char/:code', async (req: Request, res: Response) => {
  const {char, code} = req.params
  console.log('Requested character', char)
  console.log('Requested code', code)
  if (charMap.has(char)) {
    const url = `https://filterfacility.co.uk/${charMap.get(char)}/filter/${code}`
    res.status(200).send('Redirect to ' + url)
  } else {
    res.status(404).send('Invalid character')
  }
})
// not a valid short url
app.get('*', async (req: Request, res: Response) => {
  res.status(404).send('Invalid url *')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`FilterFacility URL redirector is running on http://localhost:${PORT}`)
})
