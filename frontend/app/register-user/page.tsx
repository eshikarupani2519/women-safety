'use client'

import { useState } from 'react'
import {
  Shield,
  User,
  Mail,
  Phone,
  CheckCircle2,
  KeyRound
} from 'lucide-react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [verified, setVerified] = useState(false)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [deviceToken, setDeviceToken] = useState('')
  const [userId, setUserId] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // SEND OTP
  const sendOtp = async () => {
    try {
      const res = await fetch('http://localhost:8000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone })
      })

      const data = await res.json()

      if (res.ok) {
        alert('OTP Sent Successfully')
        setOtpSent(true)
      } else {
        alert(data.detail || 'Failed to send OTP')
      }
    } catch {
      alert('Backend not reachable')
    }
  }

  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:8000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          otp: otp
        })
      })

      const data = await res.json()

      if (res.ok) {
        alert('OTP Verified')
        setVerified(true)
      } else {
        alert(data.detail || 'Invalid OTP')
      }
    } catch {
      alert('Backend not reachable')
    }
  }

  // REGISTER
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!verified) {
      alert('Please verify OTP first')
      return
    }

    try {
      setLoading(true)

      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('device_token', data.device_token)
        localStorage.setItem('user_id', data.user_id)

        setDeviceToken(data.device_token)
        setUserId(data.user_id)
        setSuccess(true)
      } else {
        alert(data.detail || 'Registration Failed')
      }
    } catch {
      alert('Backend not reachable')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-pink-100">

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Shield className="text-pink-600 h-8 w-8" />
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            Women Safety Registration
          </h1>

          <p className="text-gray-500 mt-2">
            Register once & stay protected
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleRegister} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="mt-1 flex items-center border rounded-xl px-3 py-3">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="mt-1 flex items-center border rounded-xl px-3 py-3">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium">Phone</label>
              <div className="mt-1 flex items-center border rounded-xl px-3 py-3">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91XXXXXXXXXX"
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* SEND OTP */}
            <button
              type="button"
              onClick={sendOtp}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold"
            >
              Send OTP
            </button>

            {/* OTP FIELD */}
            {otpSent && (
              <>
                <div>
                  <label className="text-sm font-medium">Enter OTP</label>
                  <div className="mt-1 flex items-center border rounded-xl px-3 py-3">
                    <KeyRound className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={verifyOtp}
                  className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold"
                >
                  Verify OTP
                </button>
              </>
            )}

            {/* VERIFIED */}
            {verified && (
              <div className="text-green-600 text-sm font-semibold text-center">
                OTP Verified Successfully ✅
              </div>
            )}

            {/* REGISTER */}
            <button
              type="submit"
              disabled={loading || !verified}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>

          </form>
        ) : (
          <div className="text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />

            <h2 className="text-2xl font-bold mt-4">
              Registered Successfully
            </h2>

            <p className="text-gray-500 mt-2">
              Device token saved locally
            </p>
          </div>
        )}

      </div>
    </main>
  )
}