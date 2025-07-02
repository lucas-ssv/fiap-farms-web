import * as React from 'react'
import { Calendar } from '@/presentation/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/presentation/components/ui/popover'
import { Button } from '@/presentation/components/ui/button'
import { Label } from '@/presentation/components/ui/label'
import { Input } from '@/presentation/components/ui/input'
import { ChevronDownIcon } from 'lucide-react'

type Props = {
  value?: Date | null
  onChange?: (date: Date | undefined) => void
  date?: Date | null
  setDate?: (date: Date | undefined) => void
}

export function InputDatetime({ value, onChange, date, setDate }: Props) {
  const [open, setOpen] = React.useState(false)

  const selected = value ?? date
  const [time, setTime] = React.useState(() => {
    if (!selected) return '00:00:00'
    return selected.toTimeString().slice(0, 8) // "HH:MM:SS"
  })

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    const [hours, minutes, seconds] = time.split(':').map(Number)
    selectedDate.setHours(hours)
    selectedDate.setMinutes(minutes)
    selectedDate.setSeconds(seconds)

    onChange?.(selectedDate)
    setDate?.(selectedDate)
    setOpen(false)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTime(newTime)

    if (!selected) return

    const newDate = new Date(selected)
    const [hours, minutes, seconds] = newTime.split(':').map(Number)

    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    newDate.setSeconds(seconds)

    onChange?.(newDate)
    setDate?.(newDate)
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Data
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
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
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Hora
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
