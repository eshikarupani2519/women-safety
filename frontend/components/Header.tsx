import React from 'react'
import { cn } from '../lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  icon?: React.ReactNode
}

export function Header({ title, subtitle, icon, className, ...props }: HeaderProps) {
  return (
    <div className={cn('mb-8', className)} {...props}>
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-primary text-2xl">{icon}</div>}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
      </div>
      {subtitle && <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>}
    </div>
  )
}
