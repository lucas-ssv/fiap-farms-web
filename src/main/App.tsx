import { Toaster } from '@/presentation/components/ui'
import { Routes } from './routes'
import { MakeAuthProvider } from './factories/providers'
import { ThemeProvider } from '@/presentation/components'

function App() {
  return (
    <MakeAuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Routes />
        <Toaster
          toastOptions={{
            closeButton: true,
          }}
          richColors={true}
          theme="system"
          duration={3000}
        />
      </ThemeProvider>
    </MakeAuthProvider>
  )
}

export default App
