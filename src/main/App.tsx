import { Toaster } from '@/presentation/components/ui'
import { Routes } from './routes'
import { MakeAuthProvider } from './factories/providers'

function App() {
  return (
    <MakeAuthProvider>
      <Routes />
      <Toaster
        toastOptions={{
          closeButton: true,
        }}
        richColors={true}
        theme="system"
        duration={3000}
      />
    </MakeAuthProvider>
  )
}

export default App
