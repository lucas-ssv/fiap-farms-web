import { Button, Input } from '@/presentation/components/ui'
import logo from '@/presentation/assets/logo.svg'

export function Login() {
  return (
    <main className="h-screen">
      <head>
        <title>Login | FIAP Farms</title>
      </head>
      <div className="flex h-screen">
        <div className="h-screen bg-[url(/src/presentation/assets/login-bg.jpg)] bg-cover w-1/2 h-full p-10 hidden md:block">
          <img src={logo} alt="Logo FIAP Farms" />
        </div>
        <section className="flex-1 flex flex-col p-10">
          <div className="flex justify-end">
            <Button className="cursor-pointer" variant="ghost">
              Criar conta
            </Button>
          </div>
          <div className="flex justify-center md:hidden">
            <img src={logo} alt="Logo FIAP Farms" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[350px]">
              <h1 className="text-center text-2xl font-bold text-custom-black">
                Faça seu login
              </h1>
              <p className="text-center text-sm text-custom-gray mt-2">
                Acesse sua conta e acompanhe os resultados do seu negócio
              </p>
              <form className="mt-6 space-y-4">
                <Input type="email" placeholder="E-mail" />
                <div>
                  <Input type="password" placeholder="Senha" />
                  <Button
                    className="font-regular text-sm text-custom-gray p-0 h-full mt-2"
                    variant="link"
                  >
                    Esqueceu a senha?
                  </Button>
                </div>
                <Button className="w-full cursor-pointer bg-green-600 hover:bg-green-700">
                  Acessar
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
