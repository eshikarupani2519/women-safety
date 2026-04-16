'use client'

import React, { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { SafeButton } from './SafeButton'

interface FloatingSOSButtonProps {
  onEmergency?: () => void
}

export function FloatingSOSButton({ onEmergency }: FloatingSOSButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  React.useEffect(() => {
    if (countdown === null || countdown <= 0) return

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  const handleSOSPress = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      setCountdown(5)
    }
  }

  const handleConfirm = () => {
    onEmergency?.()
    setShowConfirm(false)
    setCountdown(null)
  }

  const handleCancel = () => {
    setShowConfirm(false)
    setCountdown(null)
  }

  return (
    <>
      <button
        onClick={handleSOSPress}
        className="fixed bottom-8 right-8 z-50 h-20 w-20 rounded-full bg-primary text-primary-foreground shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center gap-2 font-bold text-lg hover:scale-110 active:scale-95 md:h-24 md:w-24 md:text-xl animate-pulse"
        title="Emergency SOS Button"
      >
        <AlertTriangle className="h-8 w-8 md:h-10 md:w-10" />
        <span className="text-xs md:text-sm">SOS</span>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border-2 border-primary rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Emergency Alert</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {countdown !== null && countdown > 0
                ? `Activating in ${countdown} seconds...`
                : 'Are you sure you want to trigger an emergency alert?'}
            </p>
            <div className="flex gap-3">
              <SafeButton
                variant="secondary"
                onClick={handleCancel}
                disabled={countdown !== null && countdown > 0}
                className="flex-1"
              >
                Cancel
              </SafeButton>
              <SafeButton
                onClick={handleConfirm}
                className="flex-1"
              >
                Confirm SOS
              </SafeButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
