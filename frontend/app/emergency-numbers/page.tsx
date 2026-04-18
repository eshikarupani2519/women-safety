// 'use client'

// import Link from 'next/link'
// import { Phone, MapPin, ArrowLeft } from 'lucide-react'
// import { Header } from '../../components/Header'
// import { Card, CardContent, CardDescription, CardTitle } from '../../components/Card'
// // import { SafeButton } from '../components/SafeButton'
// import { SafeButton } from '../../components/SafeButton'

// const emergencyNumbers = [
//   { number: '112', service: 'National Emergency', icon: '🚨' },
//   { number: '100', service: 'Police', icon: '👮' },
//   { number: '108', service: 'Ambulance', icon: '🚑' },
//   { number: '101', service: 'Fire Brigade', icon: '🔥' },
//   { number: '1091', service: 'Women Helpline', icon: '🛡️' },
//   { number: '181', service: 'Women Distress Helpline', icon: '👩' },
//   { number: '1098', service: 'Child Helpline', icon: '👶' },
// ]
// const makeCall = (num:string) => {
//   window.location.href = `tel:${num}`;
// };
// export default function EmergencyNumbers() {
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
//           title="Emergency Numbers"
//           subtitle="Important numbers to keep handy"
//           icon={<Phone className="h-10 w-10" />}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           {emergencyNumbers.map((item) => (
//             <Card key={item.number} hoverable>
//               <CardContent className="flex items-start gap-4">
//                 <div className="text-3xl">{item.icon}</div>
//                 <div className="flex-1 min-w-0">
//                   <div className="font-bold text-primary text-lg break-all">{item.number}</div>
//                   <p className="text-sm text-muted-foreground mt-1">{item.service}</p>
//                 </div>
//               </CardContent>
            
//               <a href={`tel:${item.number}`}>
//               {/* <SafeButton className="w-full text-sm">
//                 Call Now
//               </SafeButton> */}
//               <SafeButton
//                 className="w-full text-sm"
//                 onClick={() => makeCall(item.number)}
//               >
//                 Call Now
//               </SafeButton>
//             </a>
//             </Card>
//           ))}
//         </div>

//         <div className="mt-8 p-6 bg-secondary/30 border border-border rounded-xl">
//           <h3 className="text-lg font-bold text-foreground mb-3">International Emergency Numbers</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="font-semibold text-primary">Europe</p>
//               <p className="text-muted-foreground">Dial 112 from any location</p>
//             </div>
//             <div>
//               <p className="font-semibold text-primary">Australia</p>
//               <p className="text-muted-foreground">Dial 000 from any location</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }
'use client'

import Link from 'next/link'
import { Phone, ArrowLeft } from 'lucide-react'
import { Header } from '../../components/Header'
import { Card, CardContent } from '../../components/Card'
import { SafeButton } from '../../components/SafeButton'

const emergencyNumbers = [
  { number: '112', service: 'National Emergency', icon: '🚨' },
  { number: '100', service: 'Police', icon: '👮' },
  { number: '108', service: 'Ambulance', icon: '🚑' },
  { number: '101', service: 'Fire Brigade', icon: '🔥' },
  { number: '1091', service: 'Women Helpline', icon: '🛡️' },
  { number: '181', service: 'Women Distress Helpline', icon: '👩' },
  { number: '1098', service: 'Child Helpline', icon: '👶' },
]

const makeCall = (num: string) => {
  window.location.href = `tel:${num}`
}

export default function EmergencyNumbers() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">

        {/* Back Button */}
        <Link href="/">
          <SafeButton
            variant="secondary"
            className="mb-6 rounded-full px-5 py-2 border border-pink-200 bg-white text-pink-600 shadow hover:bg-pink-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </SafeButton>
        </Link>

        {/* Header */}
        <Header
          title="Emergency Numbers"
          subtitle="Quick access numbers for immediate help"
          icon={<Phone className="h-10 w-10 text-pink-600" />}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {emergencyNumbers.map((item) => (
            <Card
              key={item.number}
              hoverable
              className="rounded-2xl border border-pink-100 bg-white shadow-md hover:shadow-xl transition-all"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-pink-700 text-2xl break-all">
                      {item.number}
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.service}
                    </p>

                    <SafeButton
                      className="w-full mt-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-90"
                      onClick={() => makeCall(item.number)}
                    >
                      📞 Call Now
                    </SafeButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 p-6 bg-white border border-pink-100 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            International Emergency Numbers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-pink-50 p-4 rounded-xl">
              <p className="font-semibold text-pink-700">Europe</p>
              <p className="text-gray-600">Dial 112 from any location</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="font-semibold text-purple-700">Australia</p>
              <p className="text-gray-600">Dial 000 from any location</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}