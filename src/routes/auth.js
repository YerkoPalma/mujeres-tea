import { post } from 'httpie'

export async function get (req, res) {
  if (req.query && req.query.code) {
    const code = req.query.code.substring(0, req.query.code.lastIndexOf('#'))
    const { data } = await post('https://api.instagram.com/oauth/access_token', {
      body: {
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
        code
      }
    })
    console.log(data)
  }
}
