import {promises as fs} from 'fs'
import path from 'path'
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

export async function get (req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params
  const file = path.join(process.cwd(), 'content', `${slug}.md`)
  const stats = await fs.stat(file)

  if (stats && stats.isFile()) {
    res.writeHead(200)
    const text = await fs.readFile(file, 'utf8')
    res.end(md.render(text))
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
      message: `Not found`
    }))
  }
}
