'use client'

import Link from 'next/link'
import { Radio, ArrowLeft, Star, MapPin, Clock, MessageCircle } from 'lucide-react'
import { Header } from '../../components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '../../components/Card'
import { SafeButton } from '../../components/SafeButton'
import { SuccessModal } from '../../components/SuccessModal'
// import { SuccessModal } from '../../components/SuccessModal'
import { useState } from 'react'

interface Volunteer {
  id: number
  name: string
  specialty: string
  rating: number
  responseTime: string
  distance: string
  badges: string[]
  about: string
}

const volunteers: Volunteer[] = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    specialty: 'Safety Navigation',
    rating: 4.9,
    responseTime: '2 mins',
    distance: '0.8 km',
    badges: ['Verified', 'Experienced', 'Fast Response'],
    about: '5+ years helping people stay safe',
  },
  {
    id: 2,
    name: 'Maya Patel',
    specialty: 'Counseling Support',
    rating: 4.8,
    responseTime: '5 mins',
    distance: '1.5 km',
    badges: ['Trained Counselor', 'Verified'],
    about: 'Mental health support and guidance',
  },
  {
    id: 3,
    name: 'Jordan Kim',
    specialty: 'Emergency First Aid',
    rating: 4.7,
    responseTime: '3 mins',
    distance: '1.2 km',
    badges: ['Certified', 'First Aid', 'CPR Trained'],
    about: 'Trained in emergency medical response',
  },
  {
    id: 4,
    name: 'Sarah Chen',
    specialty: 'Community Safety',
    rating: 4.6,
    responseTime: '4 mins',
    distance: '2.1 km',
    badges: ['Community Leader', 'Verified'],
    about: 'Long-time community safety advocate',
  },
]

export default function VolunteerHelpers() {
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRequestHelp = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
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
          title="Volunteer Helpers"
          subtitle="Connect with verified community volunteers"
          icon={<Radio className="h-10 w-10" />}
        />

        <Card hoverable className="mb-8">
          <CardContent className="space-y-3">
            <h3 className="font-semibold text-foreground">What Kind of Help Do You Need?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <SafeButton variant="secondary" size="sm">
                Safety Navigation
              </SafeButton>
              <SafeButton variant="secondary" size="sm">
                Emotional Support
              </SafeButton>
              <SafeButton variant="secondary" size="sm">
                First Aid Assistance
              </SafeButton>
              <SafeButton variant="secondary" size="sm">
                Community Info
              </SafeButton>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold text-foreground mb-4">Available Volunteers</h2>
        <div className="space-y-4 mb-8">
          {volunteers.map((volunteer) => (
            <Card key={volunteer.id} hoverable>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="text-lg font-bold text-primary">
                          {volunteer.name[0]}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-base">{volunteer.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {volunteer.specialty}
                        </CardDescription>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                      {volunteer.about}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {volunteer.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{volunteer.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{volunteer.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{volunteer.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <SafeButton
                    onClick={() => handleRequestHelp(volunteer)}
                    className="w-full text-sm"
                  >
                    Request Help
                  </SafeButton>
                  <SafeButton variant="secondary" className="w-full text-sm">
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </SafeButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card hoverable>
            <CardContent className="space-y-3">
              <h3 className="font-semibold text-foreground">Become a Volunteer</h3>
              <p className="text-sm text-muted-foreground">
                Help others in your community stay safe
              </p>
              <SafeButton variant="secondary" className="w-full">
                Sign Up as Volunteer
              </SafeButton>
            </CardContent>
          </Card>

          <div className="p-6 bg-secondary/30 border border-border rounded-xl">
            <h3 className="text-lg font-bold text-foreground mb-3">Volunteer Verification</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ All volunteers are background checked</li>
              <li>✓ Verified through community reviews</li>
              <li>✓ Training in safety and support</li>
              <li>✓ 24/7 community oversight</li>
            </ul>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="Help Request Sent"
        message={
          selectedVolunteer
            ? `${selectedVolunteer.name} has been notified of your request.`
            : 'Volunteer has been notified'
        }
        onClose={() => setShowSuccess(false)}
      />
    </main>
  )
}
