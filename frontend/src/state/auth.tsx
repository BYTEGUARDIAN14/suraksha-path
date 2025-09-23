import React from 'react'

type User = { id: number; name: string; role: 'student' | 'admin'; email?: string; region?: string }

type AuthCtx = {
  user: User | null
  token: string | null
  login: (u: User, t: string) => void
  logout: () => void
}

const Ctx = React.createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) as User : null
  })
  const [token, setToken] = React.useState<string | null>(() => localStorage.getItem('token'))

  const login = (u: User, t: string) => {
    setUser(u)
    setToken(t)
    localStorage.setItem('user', JSON.stringify(u))
    localStorage.setItem('token', t)
  }
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return <Ctx.Provider value={{ user, token, login, logout }}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

