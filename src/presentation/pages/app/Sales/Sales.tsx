import * as React from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { Input } from '@/presentation/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui'
import { TableCellViewerSales } from './components'

const data: Sale[] = [
  {
    id: '1',
    customer: {
      id: 'c1',
      name: 'João Silva',
      email: 'any_email@mail.com',
      phone: '1234567890',
      address: 'Rua Exemplo, 123',
      loyaltyPoints: 100,
    },
    product: 'Produto A',
    quantity: 2,
    price: 'R$ 50,00',
    status: 'completed',
    paymentMethod: 'cash',
    date: '2023-10-01',
  },
  {
    id: '1',
    customer: {
      id: 'c1',
      name: 'João Silva',
      email: 'any_email@mail.com',
      phone: '1234567890',
      address: 'Rua Exemplo, 123',
      loyaltyPoints: 100,
    },
    product: 'Produto A',
    quantity: 2,
    price: 'R$ 50,00',
    status: 'completed',
    paymentMethod: 'credit card',
    date: '2023-10-01',
  },
]

type Sale = {
  id: string
  customer?: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    loyaltyPoints: number
  }
  product: string
  quantity: number
  price: string
  status: 'completed' | 'pending' | 'in progress' | 'canceled'
  paymentMethod: 'credit card' | 'debit card' | 'cash' | 'pix'
  date: string
}

const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <p>ID</p>
    },
  },
  {
    accessorKey: 'customer.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <TableCellViewerSales item={row.original} />
    },
  },
  {
    accessorKey: 'product',
    header: () => <p>Produto</p>,
  },
  {
    accessorKey: 'quantity',
    header: () => <p>Quantidade</p>,
  },
  {
    accessorKey: 'price',
    header: () => <p>Preço total</p>,
  },
  {
    accessorKey: 'status',
    header: () => <p>Status</p>,
  },
  {
    accessorKey: 'date',
    header: () => <p>Data</p>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function Sales() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="@container/card mx-4 mt-4 lg:mx-6">
      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <div>
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Filtrar status
          </Label>
          <Select>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Filtrar período
          </Label>
          <Input
            type="date"
            placeholder="Filtrar por data..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w mt-2"
          />
        </div>
      </div>
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 pt-4">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Linhas por página
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
