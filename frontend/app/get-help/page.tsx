'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, FileText, Phone, Users, Zap } from 'lucide-react'
import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/Card'
import { SafeButton } from '@/components/SafeButton'
import { SuccessModal } from '@/components/SuccessModal'
import { useState } from 'react'

interface HelpOption {
  title: string
  description: string
  icon: React.ReactNode
  actions: { label: string; onClick: () => void }[]
}

export default function GetHelp() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleAction = (message: string) => {
    setSuccessMessage(message)
    setShowSuccess(true)
  }

  const helpOptions: HelpOption[] = [
    {
      title: 'Immediate Assistance',
      description: 'For urgent situations requiring immediate help',
      icon: <Zap className="h-8 w-8" />,
      actions: [
        {
          label: 'Call Emergency',
          onClick: () => {
            window.location.href = 'tel:911'
          },
        },
        {
          label: 'Trigger SOS',
          onClick: () => handleAction('Emergency alert activated'),
        },
      ],
    },
    {
      title: 'Mental Health Support',
      description: 'Counseling and emotional support services',
      icon: <Users className="h-8 w-8" />,
      actions: [
        {
          label: 'Crisis Chat',
          onClick: () => handleAction('Connecting to crisis counselor...'),
        },
        {
          label: 'Find Therapist',
          onClick: () => handleAction('Showing available therapists...'),
        },
      ],
    },
    {
      title: 'Legal Assistance',
      description: 'Free legal advice and support',
      icon: <FileText className="h-8 w-8" />,
      actions: [
        {
          label: 'Consult Lawyer',
          onClick: () => handleAction('Connecting to legal advisor...'),
        },
        {
          label: 'File Report',
          onClick: () => handleAction('Starting incident report...'),
        },
      ],
    },
    {
      title: 'Information & Resources',
      description: 'Articles, guides, and educational materials',
      icon: <Phone className="h-8 w-8" />,
      actions: [
        {
          label: 'Safety Tips',
          onClick: () => handleAction('Loading safety guides...'),
        },
        {
          label: 'FAQ',
          onClick: () => handleAction('Opening FAQ section...'),
        },
      ],
    },
  ]

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
          title="Get Help"
          subtitle="Various resources and assistance options available"
          icon={<AlertTriangle className="h-10 w-10" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {helpOptions.map((option) => (
            <Card key={option.title} hoverable>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">{option.icon}</div>
                  <div>
                    <h3 className="font-bold text-foreground">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {option.actions.map((action) => (
                    <SafeButton
                      key={action.label}
                      onClick={action.onClick}
                      variant="secondary"
                      className="w-full text-sm"
                    >
                      {action.label}
                    </SafeButton>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card hoverable className="mb-8">
          <CardContent className="space-y-4">
            <h3 className="font-bold text-foreground">Emergency Support Lines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground">National Suicide Prevention</p>
                <p className="text-primary font-bold">988</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground">Domestic Violence Hotline</p>
                <p className="text-primary font-bold">1-800-799-7233</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground">Sexual Assault Hotline</p>
                <p className="text-primary font-bold">1-800-656-4673</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground">Crisis Text Line</p>
                <p className="text-primary font-bold">Text HOME to 741741</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card hoverable>
            <CardContent className="space-y-4">
              <h3 className="font-bold text-foreground">Quick Contact List</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <p className="text-sm font-semibold text-foreground">Your Emergency Contacts</p>
                  <p className="text-xs text-muted-foreground mt-1">Sarah, Michael, Dr. Lisa</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <p className="text-sm font-semibold text-foreground">Nearby Trusted People</p>
                  <p className="text-xs text-muted-foreground mt-1">4 volunteers within 2 km</p>
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-secondary/30 border border-border rounded-xl">
            <h3 className="text-lg font-bold text-foreground mb-3">How to Use This App</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Set up your emergency contacts in advance</li>
              <li>Share your location with trusted people</li>
              <li>Use the SOS button for immediate help</li>
              <li>Report safety concerns to help your community</li>
              <li>Keep your profile and numbers updated</li>
            </ol>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        title="Action Started"
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  )
}
