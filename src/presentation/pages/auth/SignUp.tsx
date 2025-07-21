import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

import type { AddAccount } from '@/domain/usecases/account'
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

type Props = {
  addAccount: AddAccount
}

type SignUpFormData = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const schema = z
  .object({
    name: z
      .string('Nome é obrigatório')
      .min(1, 'O nome precisa ter pelo menos 1 caractere'),
    username: z
      .string('Nome de usuário é obrigatório')
      .min(1, 'O nome de usuário precisa ter pelo menos 1 caractere'),
    email: z.email('O e-mail é obrigatório'),
    password: z
      .string('A senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string('A confirmação de senha é obrigatória')
      .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })

export function SignUp({ addAccount }: Props) {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const navigate = useNavigate()

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { name, username, email, password } = data
      await addAccount.execute({
        name,
        username,
        email,
        password,
      })
    } catch (error) {
      toast.error(
        'Erro ao criar conta. Verifique os dados e tente novamente.',
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
        <div className="h-screen bg-[url(/src/presentation/assets/signup-bg.jpg)] bg-cover w-1/2 h-full p-10 hidden md:block">
          <img src={logo} alt="Logo FIAP Farms" />
        </div>
        <section className="flex-1 flex flex-col p-10">
          <div className="flex justify-end">
            <Button
              className="cursor-pointer"
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[350px]">
              <h1 className="text-center text-2xl font-bold dark:text-white text-custom-black">
                Crie sua conta
              </h1>
              <p className="text-center text-sm text-custom-gray mt-2">
                Crie sua conta e acompanhe seus resultados com precisão
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nome do usuário" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Repita a senha"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                    Criar conta
                  </Button>
                </form>
              </Form>
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
