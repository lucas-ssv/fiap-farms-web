import { useEffect, useReducer } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/presentation/components/ui'
import type { UseFormReturn } from 'react-hook-form'

type TextInputProps = {
  form: UseFormReturn<any>
  name: string
  label: string
  placeholder: string
  formItemClassName?: string
  disabled?: boolean
}

// Formatador para moeda BRL
const moneyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default function MoneyInput(props: TextInputProps) {
  const { form, name, disabled } = props

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '')
    return moneyFormatter.format(Number(digits) / 100)
  }, '')

  // Inicializa com o valor default (apenas na primeira renderização)
  useEffect(() => {
    const defaultValue = form.getValues(name)
    if (defaultValue) {
      setValue(moneyFormatter.format(defaultValue))
    }
  }, [form, name]) // <- só na montagem

  // Assiste mudanças em tempo real
  useEffect(() => {
    const subscription = form.watch((values) => {
      const watchedValue = values[name]
      if (!watchedValue) {
        setValue('')
      } else {
        setValue(moneyFormatter.format(watchedValue))
      }
    })
    return () => subscription.unsubscribe()
  }, [form, name])

  function handleChange(
    realChangeFn: (value: number) => void,
    formattedValue: string
  ) {
    const digits = formattedValue.replace(/\D/g, '')
    const realValue = Number(digits) / 100
    realChangeFn(realValue)
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const _change = field.onChange

        return (
          <FormItem className={props.formItemClassName}>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                onChange={(ev) => {
                  setValue(ev.target.value)
                  handleChange(_change, ev.target.value)
                }}
                value={value}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
