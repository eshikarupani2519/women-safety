'use client'

import Link from 'next/link'
import { Navigation, ArrowLeft, MapPin, AlertCircle, ThumbsUp } from 'lucide-react'
import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/Card'
import { SafeButton } from '@/components/SafeButton'
import { SuccessModal } from '@/components/SuccessModal'
import { useState } from 'react'

interface Route {
  id: number
  name: string
  distance: string
  time: string
  safetyRating: number
  reports: number
  features: string[]
}

const routes: Route[] = [
  {
    id: 1,
    name: 'Main Street Route',
    distance: '2.3 km',
    time: '18 mins',
    safetyRating: 4.8,
    reports: 0,
    features: ['Well-lit', 'Busy area', 'CCTV coverage', 'Police patrol'],
  },
  {
    id: 2,
    name: 'Park Avenue Route',
    distance: '3.1 km',
    time: '22 mins',
    safetyRating: 4.6,
    reports: 0,
    features: ['Moderate traffic', 'Some lighting', 'Transit stops'],
  },
  {
    id: 3,
    name: 'Downtown Quick Route',
    distance: '2.8 km',
    time: '16 mins',
    safetyRating: 4.9,
    reports: 0,
    features: ['Multiple exits', 'Busy', 'Good lighting', 'Police presence'],
  },
]

export default function FindRoutes() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route)
    setShowSuccess(true)
  }

  const getSafetyColor = (rating: number) => {
    if (rating >= 4.7) return 'text-green-500'
    if (rating >= 4.0) return 'text-yellow-500'
    return 'text-orange-500'
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
          title="Find Safe Routes"
          subtitle="Navigate using verified safe paths in your area"
          icon={<Navigation className="h-10 w-10" />}
        />

        <Card hoverable className="mb-8">
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">From → To</h3>
              <p className="text-sm text-muted-foreground">
                📍 Current Location → Your Destination
              </p>
            </div>
            <SafeButton className="w-full">Set Destination</SafeButton>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-foreground mb-4">Available Routes</h2>
        <div className="space-y-4 mb-8">
          {routes.map((route) => (
            <Card key={route.id} hoverable>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{route.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{route.distance}</span>
                      <span>~{route.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getSafetyColor(route.safetyRating)}`}>
                      {route.safetyRating}⭐
                    </div>
                    <p className="text-xs text-muted-foreground">Safety Rating</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {route.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {route.reports > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-orange-500">{route.reports} user report(s)</span>
                  </div>
                )}

                <SafeButton
                  onClick={() => handleSelectRoute(route)}
                  className="w-full"
                >
                  Navigate This Route
                </SafeButton>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card hoverable>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-foreground">Safety Report</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Help others by reporting safety concerns on your route
            </p>
            <SafeButton variant="secondary" className="w-full text-sm">
              <AlertCircle className="h-4 w-4" />
              Report Issue
            </SafeButton>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-secondary/30 border border-border rounded-xl">
          <h3 className="text-lg font-bold text-foreground mb-3">How Routes Are Rated</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Real-time user reports and feedback</li>
            <li>✓ Police and emergency service presence</li>
            <li>✓ Street lighting and visibility</li>
            <li>✓ Public transportation availability</li>
            <li>✓ CCTV and surveillance coverage</li>
          </ul>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="Navigation Started"
        message={selectedRoute ? `Navigating via ${selectedRoute.name}` : 'Route selected'}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  )
}
