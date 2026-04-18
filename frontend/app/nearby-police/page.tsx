'use client'

import Link from 'next/link'
import { Shield, ArrowLeft, MapPin, Phone, Clock } from 'lucide-react'
import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/Card'
import { SafeButton } from '@/components/SafeButton'
import { SuccessModal } from '@/components/SuccessModal'
import { useState } from 'react'

interface PoliceStation {
  id: number
  name: string
  distance: string
  time: string
  address: string
  phone: string
  available: boolean
}

const policeStations: PoliceStation[] = [
  {
    id: 1,
    name: 'Downtown Police Station',
    distance: '1.2 km',
    time: '5 mins',
    address: '500 Main Street',
    phone: '(555) 123-4567',
    available: true,
  },
  {
    id: 2,
    name: 'West Side Station',
    distance: '2.5 km',
    time: '12 mins',
    address: '750 Oak Avenue',
    phone: '(555) 234-5678',
    available: true,
  },
  {
    id: 3,
    name: 'Harbor District Station',
    distance: '3.8 km',
    time: '18 mins',
    address: '200 Water Street',
    phone: '(555) 345-6789',
    available: true,
  },
  {
    id: 4,
    name: 'North Point Station',
    distance: '4.2 km',
    time: '22 mins',
    address: '900 North Road',
    phone: '(555) 456-7890',
    available: false,
  },
]

export default function NearbyPolice() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleContact = (station: PoliceStation) => {
    setSuccessMessage(`Contacting ${station.name}...`)
    setShowSuccess(true)
  }

  const handleGetDirections = (station: PoliceStation) => {
    setSuccessMessage(`Opening directions to ${station.name}...`)
    setShowSuccess(true)
  }

  const availableStations = policeStations.filter((s) => s.available)
  const limitedStations = policeStations.filter((s) => !s.available)

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
          title="Nearby Police Stations"
          subtitle="Locate the nearest police stations in your area"
          icon={<Shield className="h-10 w-10" />}
        />

        <Card hoverable className="mb-8 border-green-500/30 bg-green-500/5">
          <CardContent className="space-y-2">
            <h3 className="font-semibold text-foreground">Emergency Status</h3>
            <p className="text-sm text-green-500">
              ✓ {availableStations.length} stations fully operational
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold text-foreground mb-4">Available Stations</h2>
        <div className="space-y-3 mb-8">
          {availableStations.map((station) => (
            <Card key={station.id} hoverable>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{station.name}</CardTitle>
                    <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{station.distance} away • {station.time}</span>
                      </div>
                      <div>{station.address}</div>
                    </div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-green-500 mt-1"></div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a href={`tel:${station.phone}`}>
                    <SafeButton className="w-full text-sm" variant="primary">
                      <Phone className="h-4 w-4" />
                      Call
                    </SafeButton>
                  </a>
                  <SafeButton
                    onClick={() => handleGetDirections(station)}
                    className="w-full text-sm"
                    variant="secondary"
                  >
                    <MapPin className="h-4 w-4" />
                    Directions
                  </SafeButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {limitedStations.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-foreground mb-4">Limited Service</h2>
            <div className="space-y-3 mb-8">
              {limitedStations.map((station) => (
                <Card
                  key={station.id}
                  hoverable
                  className="opacity-60"
                >
                  <CardContent className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{station.name}</CardTitle>
                        <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{station.distance} away • {station.time}</span>
                          </div>
                          <div>{station.address}</div>
                        </div>
                      </div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mt-1"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <Card hoverable>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-foreground">In Case of Emergency</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Always call 911 for immediate assistance</li>
              <li>• Police stations are for non-emergency visits</li>
              <li>• You can visit any police station for help</li>
              <li>• Share your location with trusted contacts</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-secondary/30 border border-border rounded-xl">
          <h3 className="text-lg font-bold text-foreground mb-3">Station Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ 24/7 emergency response</li>
            <li>✓ Non-emergency reporting</li>
            <li>✓ Victim support services</li>
            <li>✓ Community outreach</li>
            <li>✓ Lost and found assistance</li>
          </ul>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="Station Selected"
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  )
}
