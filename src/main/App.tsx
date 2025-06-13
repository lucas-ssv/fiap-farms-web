import { Toaster } from '@/presentation/components/ui'
import { Routes } from './routes'

function App() {
  return (
    <>
      <Routes />
      <Toaster
        toastOptions={{
          closeButton: true,
        }}
        richColors={true}
        theme="system"
        duration={3000}
      />
    </>
  )
}

export default App
