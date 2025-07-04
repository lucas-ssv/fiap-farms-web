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
}

// Brazilian currency config
const moneyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default function MoneyInput(props: TextInputProps) {
  const { form, name } = props

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '')
    return moneyFormatter.format(Number(digits) / 100)
  }, '')

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!values[name]) {
        setValue('')
      } else {
        setValue(moneyFormatter.format(values[name]))
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
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
