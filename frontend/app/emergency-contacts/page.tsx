// 'use client'

// import Link from 'next/link'
// import { Users, Plus, ArrowLeft, Phone } from 'lucide-react'
// import { Header } from '../../components/Header'
// import { Card, CardContent, CardDescription, CardTitle } from '../../components/Card'
// import { SafeButton } from '../../components/SafeButton'
// import { useState } from 'react'
// import { SuccessModal } from '../../components/SuccessModal'

// interface Contact {
//   id: number
//   name: string
//   phone: string
//   relationship: string
// }

// const mockContacts: Contact[] = [
//   { id: 1, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', relationship: 'Sister' },
//   { id: 2, name: 'Michael Chen', phone: '+1 (555) 234-5678', relationship: 'Best Friend' },
//   { id: 3, name: 'Dr. Lisa Park', phone: '+1 (555) 345-6789', relationship: 'Doctor' },
// ]

// export default function EmergencyContacts() {
//   const [contacts, setContacts] = useState<Contact[]>(mockContacts)
//   const [showSuccess, setShowSuccess] = useState(false)
//   const [successMessage, setSuccessMessage] = useState('')

//   const handleAddContact = () => {
//     setSuccessMessage('Contact added successfully!')
//     setShowSuccess(true)
//   }

//   const handleNotify = (contact: Contact) => {
//     setSuccessMessage(`Notification sent to ${contact.name}`)
//     setShowSuccess(true)
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
//       <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
//         <Link href="/">
//           <SafeButton variant="secondary" className="mb-6">
//             <ArrowLeft className="h-4 w-4" />
//             Back
//           </SafeButton>
//         </Link>

//         <Header
//           title="Emergency Contacts"
//           subtitle="People who will help in your time of need"
//           icon={<Users className="h-10 w-10" />}
//         />

//         <div className="mb-8">
//           <SafeButton onClick={handleAddContact} className="w-full md:w-auto">
//             <Plus className="h-4 w-4" />
//             Add New Contact
//           </SafeButton>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           {contacts.map((contact) => (
//             <Card key={contact.id} hoverable>
//               <CardContent className="space-y-4">
//                 <div>
//                   <CardTitle>{contact.name}</CardTitle>
//                   <CardDescription>{contact.relationship}</CardDescription>
//                 </div>

//                 <div className="space-y-2">
//                   <a href={`tel:${contact.phone}`}>
//                     <SafeButton className="w-full text-sm">
//                       <Phone className="h-4 w-4" />
//                       Call {contact.name}
//                     </SafeButton>
//                   </a>
//                   <SafeButton
//                     variant="secondary"
//                     onClick={() => handleNotify(contact)}
//                     className="w-full text-sm"
//                   >
//                     Send Alert
//                   </SafeButton>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="mt-8 p-6 bg-secondary/30 border border-border rounded-xl">
//           <h3 className="text-lg font-bold text-foreground mb-3">Tips for Emergency Contacts</h3>
//           <ul className="space-y-2 text-sm text-muted-foreground">
//             <li>✓ Choose people who are reachable 24/7</li>
//             <li>✓ Inform them they&apos;re your emergency contact</li>
//             <li>✓ Keep phone numbers up to date</li>
//             <li>✓ Add at least 3-5 trusted contacts</li>
//           </ul>
//         </div>
//       </div>

//       <SuccessModal
//         isOpen={showSuccess}
//         title="Success"
//         message={successMessage}
//         onClose={() => setShowSuccess(false)}
//       />
//     </main>
//   )
// }
'use client'

import Link from 'next/link'
import { Users, Plus, ArrowLeft, Phone } from 'lucide-react'
import { Header } from '../../components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '../../components/Card'
import { SafeButton } from '../../components/SafeButton'
import { useEffect, useState } from 'react'
import { SuccessModal } from '../../components/SuccessModal'

interface Contact {
  id: number
  name: string
  phone: string
  relationship: string
}

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    relationship: ''
  })

  // Load Contacts
  // const fetchContacts = async () => {
  //   const res = await fetch('http://127.0.0.1:8000/contacts/all')
  //   const data = await res.json()
  //   setContacts(data)
  // }
const fetchContacts = async () => {
  try {
    const res = await fetch('http://localhost:8000/contacts/all')
    console.log("in frontend now");
    console.log(res);
    const data = await res.json()
    setContacts(data)
  } catch (error) {
    console.log(error)
  }
}
  useEffect(() => {
    fetchContacts()
  }, [])

  // Add Contact
  const handleAddContact = async () => {
    const res = await fetch('http://127.0.0.1:8000/contacts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      setSuccessMessage('Contact added successfully!')
      setShowSuccess(true)
      setShowForm(false)
      setForm({ name: '', phone: '', relationship: '' })
      fetchContacts()
    }
  }

  // Send Alert
  const handleNotify = async (id: number, name: string) => {
    const res = await fetch(`http://127.0.0.1:8000/contacts/alert/${id}`, {
      method: 'POST'
    })

    if (res.ok) {
      setSuccessMessage(`Alert sent to ${name}`)
      setShowSuccess(true)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100">
      <div className="max-w-5xl mx-auto px-4 py-8">

        <Link href="/">
          <SafeButton className="mb-6 bg-white text-pink-600 border border-pink-200">
            <ArrowLeft className="h-4 w-4" />
            Back
          </SafeButton>
        </Link>

        <Header
          title="Emergency Contacts"
          subtitle="Trusted people who can help instantly"
          icon={<Users className="h-10 w-10 text-pink-600" />}
        />

        {/* Add Button */}
        <div className="mb-8">
          <SafeButton
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
          >
            <Plus className="h-4 w-4" />
            Add New Contact
          </SafeButton>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 space-y-4 border border-pink-100">
            <input
              placeholder="Name"
              className="w-full border p-3 rounded-xl"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Phone (+91...)"
              className="w-full border p-3 rounded-xl"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder="Relationship"
              className="w-full border p-3 rounded-xl"
              value={form.relationship}
              onChange={(e) =>
                setForm({ ...form, relationship: e.target.value })
              }
            />

            <div className="flex gap-3">
              <SafeButton
                onClick={handleAddContact}
                className="bg-pink-600 text-white"
              >
                Save Contact
              </SafeButton>

              <SafeButton
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-black"
              >
                Cancel
              </SafeButton>
            </div>
          </div>
        )}

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              hoverable
              className="rounded-2xl border border-pink-100 bg-white shadow-md"
            >
              <CardContent className="space-y-4 p-5">
                <div>
                  <CardTitle>{contact.name}</CardTitle>
                  <CardDescription>{contact.relationship}</CardDescription>
                  <p className="text-sm text-gray-500 mt-1">{contact.phone}</p>
                </div>

                <div className="space-y-2">
                  <a href={`tel:${contact.phone}`}>
                    <SafeButton className="w-full bg-green-500 text-white">
                      <Phone className="h-4 w-4" />
                      Call
                    </SafeButton>
                  </a>

                  <SafeButton
                    onClick={() =>
                      handleNotify(contact.id, contact.name)
                    }
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  >
                    Send Alert
                  </SafeButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <SuccessModal
          isOpen={showSuccess}
          title="Success"
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      </div>
    </main>
  )
}