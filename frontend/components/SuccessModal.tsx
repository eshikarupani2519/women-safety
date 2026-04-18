'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { SafeButton } from './SafeButton'

interface SuccessModalProps {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
}

export function SuccessModal({ isOpen, title, message, onClose }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl p-8 max-w-sm w-full shadow-2xl text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-500/20 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{message}</p>
        <SafeButton onClick={onClose} className="w-full">
          Continue
        </SafeButton>
      </div>
    </div>
  )
}
