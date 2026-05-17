import express, { json } from 'express'
import Redis from 'ioredis'

const PORT = 8000;
const BANNER_KEY = 'app:banner'

const app = express()
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

app.use(express.json())

app.post('/banner', async (req, res) => {
  await redis.set(BANNER_KEY, req.body.message || "Welcome")
  res.json({success: true})
})

app.get('/banner', async (req, res) => {
  const message = await redis.get(BANNER_KEY)
  res.json({message})
})

app.get('/banner/exist', async (req, res) => {
  const exists = await redis.exists(BANNER_KEY)
  res.json({exist: Boolean(exists)})
})

app.delete('/banner', async (req, res) => {
  await redis.del(BANNER_KEY)
  res.json({success: true})
})

app.listen(PORT, () => {
  console.log("Server listening at port:", PORT)
})


