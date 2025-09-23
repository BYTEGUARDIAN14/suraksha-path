import React from 'react'
import { AuthProvider } from './state/auth'
import { I18nProvider } from './state/i18n'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </I18nProvider>
  )
}

