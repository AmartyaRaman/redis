import express from 'express'
import Redis from 'ioredis'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 8000
const app = express()

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

app.get('/redis', async (req, res) => {
  const reply = await redis.ping();
  res.json({message: `Redis replied with: ${reply}`})
})

app.get('/mongo', async (req, res) => {
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/MONGO'

  if (mongoose.connection.readyState == 0) {
    await mongoose.connect(url)
  }
  res.json({message: "Database connected"})
})

app.listen(PORT, () => console.log(`Server is listening at port: ${PORT}`))