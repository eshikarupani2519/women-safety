'use client'

import Link from 'next/link'
import { AlertTriangle, Phone, Users, MapPin, Navigation, Shield, Radio } from 'lucide-react'
import { Header } from '../components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '../components/Card'
import { FloatingSOSButton } from '../components/FloatingSOSButton'
import { SuccessModal } from '../components/SuccessModal'
// import { SuccessModal } from '../components/SuccessModal'
import { useState } from 'react'

const features = [
  {
    title: 'Emergency Numbers',
    description: 'Quick access to emergency contacts',
    icon: <Phone className="h-8 w-8" />,
    href: '/emergency-numbers',
    color: 'from-red-500/20 to-red-500/10',
  },
  {
    title: 'Emergency Contacts',
    description: 'Your trusted emergency contacts',
    icon: <Users className="h-8 w-8" />,
    href: '/emergency-contacts',
    color: 'from-blue-500/20 to-blue-500/10',
  },
  {
    title: 'Safe Ride',
    description: 'Request safe transportation',
    icon: <Navigation className="h-8 w-8" />,
    href: '/safe-ride',
    color: 'from-green-500/20 to-green-500/10',
  },
  {
    title: 'Track My Location',
    description: 'Share your location safely',
    icon: <MapPin className="h-8 w-8" />,
    href: '/track-location',
    color: 'from-purple-500/20 to-purple-500/10',
  },
  {
    title: 'Find Routes',
    description: 'Find safe routes nearby',
    icon: <Navigation className="h-8 w-8" />,
    href: '/find-routes',
    color: 'from-yellow-500/20 to-yellow-500/10',
  },
  {
    title: 'Nearby Police',
    description: 'Locate nearest police stations',
    icon: <Shield className="h-8 w-8" />,
    href: '/nearby-police',
    color: 'from-indigo-500/20 to-indigo-500/10',
  },
  {
    title: 'Volunteer Helpers',
    description: 'Connect with volunteer support',
    icon: <Radio className="h-8 w-8" />,
    href: '/volunteer-helpers',
    color: 'from-cyan-500/20 to-cyan-500/10',
  },
  {
    title: 'Get Help',
    description: 'Various ways to get assistance',
    icon: <AlertTriangle className="h-8 w-8" />,
    href: '/get-help',
    color: 'from-orange-500/20 to-orange-500/10',
  },
]

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSOS = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <FloatingSOSButton onEmergency={handleSOS} />
      <SuccessModal
        isOpen={showSuccess}
        title="Emergency Alert Sent"
        message="Your emergency contacts and location have been shared. Help is on the way."
        onClose={() => setShowSuccess(false)}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="animate-fade-in">
          <Header
            title="Safety First"
            subtitle="Quick access to emergency services and safety features"
            icon={<AlertTriangle className="h-10 w-10" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Link key={feature.href} href={feature.href}>
              <div style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                <Card hoverable className="h-full cursor-pointer group">
                  <CardContent className="flex flex-col items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-primary">{feature.icon}</div>
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-secondary/30 to-secondary/10 border border-border rounded-xl animate-fade-in">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-primary">★</span> Safety Tips
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-foreground transition-colors">✓ Always share your location with trusted contacts</li>
            <li className="hover:text-foreground transition-colors">✓ Keep your emergency contacts updated</li>
            <li className="hover:text-foreground transition-colors">✓ Use the SOS button in critical situations only</li>
            <li className="hover:text-foreground transition-colors">✓ Let someone know your plans when traveling</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
