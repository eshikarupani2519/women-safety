'use client'

import { useState } from 'react'
import { Shield, User, Mail, Phone, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  })

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
    } catch (error) {
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

            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 flex items-center border rounded-xl px-3 py-3">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 flex items-center border rounded-xl px-3 py-3">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1 flex items-center border rounded-xl px-3 py-3">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="phone"
                  placeholder="+91XXXXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>

          </form>
        ) : (
          <div className="text-center">

            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />

            <h2 className="text-2xl font-bold mt-4 text-gray-800">
              Registered Successfully
            </h2>

            <p className="text-gray-500 mt-2">
              Device token saved locally.
            </p>

            {/* <div className="mt-5 text-left bg-gray-50 p-4 rounded-xl text-sm">
              <p><strong>User ID:</strong> {userId}</p>
              <p className="break-all mt-2">
                <strong>Device Token:</strong> {deviceToken}
              </p>
            </div> */}
          </div>
        )}

      </div>
    </main>
  )
}