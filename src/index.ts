import * as express from 'express'
import {Request, Response} from 'express'
import Timer from 'timer-logs'
const app = express()
const charMap = new Map()
charMap.set('a', 'accountants')
charMap.set('c', 'company')
charMap.set('o', 'officer')
charMap.set('f', 'filter')
charMap.set('s', 'search')

app.get('/:char/:code', async (req: Request, res: Response) => {
  const timer = new Timer({filename: 'index.ts', details: req.params})
  const {char, code} = req.params
  if (charMap.has(char)) {
    const url = `https://filterfacility.co.uk/${charMap.get(char)}/${code}`
    timer.addDetails({url})
    res.redirect(url)
  } else {
    timer.customError('Character code not found in charMap')
    res.status(404).send('Invalid url')
  }
})
app.get('/:char1/:char2/:code', async (req: Request, res: Response) => {
  const timer = new Timer({filename: 'index.ts', details: req.params})
  const {char1, char2, code} = req.params
  if (charMap.has(char1) && charMap.has(char2)) {
    const url = `https://filterfacility.co.uk/${charMap.get(char1)}/${charMap.get(char2)}/${code}`
    timer.addDetails({url})
    res.redirect(url)
  } else {
    timer.customError('Character code not found in charMap')
    res.status(404).send('Invalid url')
  }
})
// not a valid short url
app.get('*', async (req: Request, res: Response) => {
  new Timer({filename: 'index.ts'}).customError('Request to URL which is not configured: '+req.url)
  res.status(404).send('Invalid url')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`FilterFacility URL redirector is running on http://localhost:${PORT}`)
})
