import * as React from 'react'
import { Calendar } from '@/presentation/components/ui/calendar'
import {
  Label,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@/presentation/components/ui'
import { ChevronDownIcon } from 'lucide-react'

type Props = {
  label: string
  value?: Date | null // usado com react-hook-form
  onChange?: (date: Date | undefined) => void // usado com react-hook-form
  date?: Date | null // uso normal (fora do form)
  setDate?: (date: Date | undefined) => void // uso normal
}

export function InputDate({ label, value, onChange, date, setDate }: Props) {
  const [open, setOpen] = React.useState(false)

  const selected = value ?? date
  const handleSelect = (date: Date | undefined) => {
    if (onChange) onChange(date)
    if (setDate) setDate(date)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {selected ? selected.toLocaleDateString() : 'Selecione a data'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selected || undefined}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
