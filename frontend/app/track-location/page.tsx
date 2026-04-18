'use client'

import Link from 'next/link'
import { MapPin, ArrowLeft, Share2, Users } from 'lucide-react'
import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/Card'
import { SafeButton } from '@/components/SafeButton'
import { SuccessModal } from '@/components/SuccessModal'
import { useState } from 'react'

interface SharedLocation {
  id: number
  contactName: string
  sharedSince: string
  isActive: boolean
}

const mockSharedLocations: SharedLocation[] = [
  { id: 1, contactName: 'Sarah Johnson', sharedSince: '2 hours ago', isActive: true },
  { id: 2, contactName: 'Michael Chen', sharedSince: '30 minutes ago', isActive: true },
]

export default function TrackLocation() {
  const [sharedLocations, setSharedLocations] = useState<SharedLocation[]>(mockSharedLocations)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleShareLocation = () => {
    setSuccessMessage('Your location is now being shared with selected contacts')
    setShowSuccess(true)
  }

  const handleStopSharing = (contactName: string) => {
    setSuccessMessage(`Stopped sharing location with ${contactName}`)
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
          title="Track My Location"
          subtitle="Share your real-time location with trusted people"
          icon={<MapPin className="h-10 w-10" />}
        />

        <Card hoverable className="mb-8">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Your Current Location</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  📍 123 Main Street, Downtown Area
                </p>
              </div>
              <div className="h-24 w-24 bg-secondary rounded-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Share Location With</h2>
          <SafeButton onClick={handleShareLocation} className="w-full md:w-auto">
            <Share2 className="h-4 w-4" />
            Share My Location
          </SafeButton>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Currently Sharing With</h2>
          {sharedLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sharedLocations.map((location) => (
                <Card key={location.id} hoverable>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{location.contactName}</h3>
                        <p className="text-xs text-muted-foreground">Shared {location.sharedSince}</p>
                      </div>
                      {location.isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-green-500"></span>
                      )}
                    </div>
                    <SafeButton
                      variant="secondary"
                      onClick={() => handleStopSharing(location.contactName)}
                      className="w-full text-sm"
                    >
                      Stop Sharing
                    </SafeButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card hoverable>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">
                  Not sharing your location with anyone yet
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card hoverable>
            <CardContent className="space-y-3">
              <h3 className="font-semibold text-foreground">Time-Based Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Set location sharing to automatically stop after a specific time
              </p>
              <SafeButton variant="secondary" className="w-full text-sm">
                Set Timer
              </SafeButton>
            </CardContent>
          </Card>

          <Card hoverable>
            <CardContent className="space-y-3">
              <h3 className="font-semibold text-foreground">Geofence Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Get alerts when you leave a safe zone
              </p>
              <SafeButton variant="secondary" className="w-full text-sm">
                Setup Alert
              </SafeButton>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 bg-secondary/30 border border-border rounded-xl">
          <h3 className="text-lg font-bold text-foreground mb-3">Privacy & Security</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Only people you approve can see your location</li>
            <li>✓ Stop sharing anytime, instantly</li>
            <li>✓ Your location is encrypted</li>
            <li>✓ Set time limits on location sharing</li>
            <li>✓ View sharing history</li>
          </ul>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="Location Updated"
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  )
}
