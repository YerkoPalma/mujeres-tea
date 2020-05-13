import httpie from 'httpie'
import * as fs from 'fs'
import path from 'path'
import env from '../../environment.json'

export async function get (req, res) {
  if (req.query && req.query.code) {
    try {
      const authorization = new URLSearchParams({
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
        code: req.query.code
      })
      let { data } = await httpie.post('https://api.instagram.com/oauth/access_token', {
        body: authorization.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log('1) Short access token:', data.access_token)
      // get long live access token
      const access = new URLSearchParams({
        grant_type: 'ig_exchange_token',
        client_secret: process.env.APP_SECRET,
        access_token: data.access_token
      })
      const url = `https://graph.instagram.com/access_token?${access.toString()}`
      console.log('2) url for long access token', url)
      ;({ data } = await httpie.get(url))
      console.log('3) response', data)
      env.ACCESS_TOKEN = data.access_token
      env.ACCESS_TOKEN_EXPIRES = data.expires_in

      // save access token
      const envPath = path.join(__dirname, '..', '..', 'environment.json')
      console.log('4) saving ', env, envPath)
      fs.writeFileSync(envPath, JSON.stringify(env, null, 2))
      // redirect home
      res.end(JSON.stringify(data, null, 2))
    } catch (err) {
      console.error('Error!', err.statusCode, err.message)
      console.error('~> data:', err.data)
      res.end()
    }
  }
}
