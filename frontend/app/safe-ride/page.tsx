'use client'

import Link from 'next/link'
import { Navigation, ArrowLeft, MapPin, User, Clock } from 'lucide-react'
import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/Card'
import { SafeButton } from '@/components/SafeButton'
import { SuccessModal } from '@/components/SuccessModal'
import { useState } from 'react'

const rideOptions = [
  {
    id: 1,
    service: 'Verified Driver',
    description: 'Pre-screened and verified drivers',
    features: ['Background checked', 'Real-time tracking', '24/7 support'],
    price: 'Starting at $10',
  },
  {
    id: 2,
    service: 'Buddy System',
    description: 'Ride with a trusted friend',
    features: ['No cost sharing', 'Share location', 'Scheduled pickup'],
    price: 'Split with friend',
  },
  {
    id: 3,
    service: 'Group Safe Ride',
    description: 'Travel with others in your area',
    features: ['Shared cost', 'Multiple stops', 'Flexible timing'],
    price: 'Shared cost',
  },
]

export default function SafeRide() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRequestRide = (id: number) => {
    setSelectedOption(id)
    setShowSuccess(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Link href="/">
          <SafeButton variant="secondary" className="mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back
          </SafeButton>
        </Link>

        <Header
          title="Safe Ride"
          subtitle="Get home safely with verified options"
          icon={<Navigation className="h-10 w-10" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {rideOptions.map((option) => (
            <Card key={option.id} hoverable>
              <CardContent className="space-y-4">
                <div>
                  <CardTitle className="text-lg">{option.service}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </div>

                <ul className="space-y-2">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-primary mb-3">{option.price}</p>
                  <SafeButton
                    onClick={() => handleRequestRide(option.id)}
                    className="w-full text-sm"
                  >
                    Request Ride
                  </SafeButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card hoverable>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Current Location</h3>
                  <p className="text-sm text-muted-foreground">123 Main Street, Downtown</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hoverable>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Estimated Driver</h3>
                  <p className="text-sm text-muted-foreground">James Miller - 4.9⭐ (542 rides)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hoverable>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Estimated Arrival</h3>
                  <p className="text-sm text-muted-foreground">5 minutes away</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-secondary/30 border border-border rounded-xl">
          <h3 className="text-lg font-bold text-foreground mb-3">Safety Features</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Share your ride details with emergency contacts</li>
            <li>✓ Live tracking so others know where you are</li>
            <li>✓ In-app emergency button for quick help</li>
            <li>✓ Driver verification and background checks</li>
            <li>✓ 24/7 support team monitoring</li>
          </ul>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="Ride Requested"
        message="Your safe ride has been requested. Your driver will arrive shortly."
        onClose={() => setShowSuccess(false)}
      />
    </main>
  )
}
