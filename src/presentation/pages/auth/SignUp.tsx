import { Button, Input } from '@/presentation/components/ui'
import logo from '@/presentation/assets/logo.svg'

export function SignUp() {
  return (
    <main className="h-screen">
      <head>
        <title>Criar Conta | FIAP Farms</title>
      </head>
      <div className="flex h-screen">
        <div className="h-screen bg-[url(/src/presentation/assets/signup-bg.jpg)] bg-cover w-1/2 h-full p-10 hidden md:block">
          <img src={logo} alt="Logo FIAP Farms" />
        </div>
        <section className="flex-1 flex flex-col p-10">
          <div className="flex justify-end">
            <Button className="cursor-pointer" variant="ghost">
              Login
            </Button>
          </div>
          <div className="flex justify-center md:hidden">
            <img src={logo} alt="Logo FIAP Farms" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[350px]">
              <h1 className="text-center text-2xl font-bold text-custom-black">
                Crie sua conta
              </h1>
              <p className="text-center text-sm text-custom-gray mt-2">
                Crie sua conta e acompanhe seus resultados com precisão
              </p>
              <form className="mt-6 space-y-4">
                <Input placeholder="Nome completo" />
                <Input placeholder="Nome do usuário" />
                <Input type="email" placeholder="E-mail" />
                <Input type="password" placeholder="Senha" />
                <Input type="password" placeholder="Repita a senha" />
                <Button className="w-full cursor-pointer bg-green-600 hover:bg-green-700">
                  Criar conta
                </Button>
              </form>
              <hr className="mt-4" />
              <p className="text-center text-sm text-custom-gray mt-4">
                Clicando em Criar conta, você concorda com nossos Termos de
                Serviço e Política de Privacidade.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
