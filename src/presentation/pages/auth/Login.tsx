import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { z } from 'zod/v4'

import type { Authentication } from '@/domain/usecases/account'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/presentation/components/ui'
import logo from '@/presentation/assets/logo.svg'
import { toast } from 'sonner'

type Props = {
  authentication: Authentication
}

type LoginFormData = {
  email: string
  password: string
}

const schema = z.object({
  email: z.email('O e-mail é obrigatório'),
  password: z
    .string('A senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export function Login({ authentication }: Props) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, password } = data
      await authentication.execute({
        email,
        password,
      })
    } catch (error) {
      toast.error(
        'Erro ao fazer login. Verifique os dados e tente novamente.',
        {
          description:
            error instanceof Error ? error.message : 'Erro desconhecido',
        }
      )
    }
  }

  return (
    <main className="h-screen">
      <div className="flex h-screen">
        <div className="h-screen bg-[url(/src/presentation/assets/login-bg.jpg)] bg-cover w-1/2 h-full p-10 hidden md:block">
          <img src={logo} alt="Logo FIAP Farms" />
        </div>
        <section className="flex-1 flex flex-col p-10">
          <div className="flex justify-end">
            <Button
              className="cursor-pointer"
              variant="ghost"
              onClick={() => navigate('/signup')}
            >
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="email" placeholder="E-mail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Senha"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          className="font-regular text-sm text-custom-gray p-0 justify-start h-auto"
                          variant="link"
                        >
                          Esqueceu a senha?
                        </Button>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2Icon className="animate-spin" />
                    )}
                    Acessar
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
