import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

import type { UserModel } from '@/domain/models/account'
import type { ObserveAndLoadAccountByEmail } from '@/domain/usecases/account'
import { Loading } from '@/presentation/components'

type AuthProviderProps = PropsWithChildren & {
  observeAndLoadAccountByEmail: ObserveAndLoadAccountByEmail
}

type AuthContextProps = {
  user: Omit<UserModel, 'password'> | null
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({
  children,
  observeAndLoadAccountByEmail,
}: AuthProviderProps) {
  const [user, setUser] = useState<Omit<UserModel, 'password'> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = observeAndLoadAccountByEmail.execute((user) => {
      if (user) {
        setUser(user)
      }
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [observeAndLoadAccountByEmail])

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
