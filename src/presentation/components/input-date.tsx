import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/presentation/components/ui'
import { Calendar } from '@/presentation/components/ui'
import { Label } from '@/presentation/components/ui'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/presentation/components/ui'

type Props = {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  label?: string
}

export function InputDate({ label, date, setDate }: Props) {
  const [open, setOpen] = React.useState(false)

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
            {date ? date.toLocaleDateString() : 'Selecione a data'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
