import express from 'express'
import Redis from 'ioredis'

const app = express();
const redis = new Redis(process.env.URL || 'redis://localhost:6379')

app.use(express.json())

// Dynamic Key generator (usually done with a helper function)
function otpKey(phone) {
  return `otp:${phone}`
}

app.post('/otp', async (req, res) => {
  const { phone } = req.body
  const key = otpKey(phone)

  const otp = Date.now().toString();

  await redis.set(key, otp, 'EX', 30)

  res.json({success: true, otp})
})

app.post('/otp/verify', async (req, res) => {
  const {phone, userOtp} = req.body
  const otp = await redis.get(otpKey(phone))

  if (!otp || String(userOtp) !== otp) {
    return res.status(400).json({message: "Invalid OTP"})
  }
  res.json({success: true})
})

app.listen(3000, () => {
  console.log("Server is listening at port", 3000)
})

