import express from 'express'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, 'dist')
const port = Number(process.env.PORT) || 3000

if (!existsSync(path.join(dist, 'index.html'))) {
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname })
}

const app = express()

app.use(express.static(dist))
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Bogotá listening on ${port}`)
})
