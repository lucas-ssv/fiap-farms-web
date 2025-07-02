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
import { TableCellViewerGoals } from './components'

const data: Goal[] = [
  {
    id: '1',
    product: {
      id: 'p1',
      name: 'Produto A',
      description: 'Descrição do Produto A',
      price: '100.00',
      category: {
        id: 'c1',
        name: 'Categoria 1',
      },
    },
    description: 'Meta de vendas do Produto A',
    type: 'sales',
    status: 'pending',
    targetValue: 1000,
    currentValue: 500,
    startDate: new Date('2023-01-01'),
    deadLine: new Date('2023-12-31'),
  },
  {
    id: '2',
    product: {
      id: 'p2',
      name: 'Produto B',
      description: 'Descrição do Produto B',
      price: '200.00',
      category: {
        id: 'c2',
        name: 'Categoria 2',
      },
    },
    description: 'Meta de produção do Produto B',
    type: 'production',
    status: 'completed',
    targetValue: 2000,
    currentValue: 1500,
    startDate: new Date('2023-02-01'),
    deadLine: new Date('2023-11-30'),
  },
]

type Goal = {
  id: string
  product: {
    id: string
    name: string
    description?: string
    price: string
    category: {
      id: string
      name: string
    }
  }
  description?: string
  type: 'sales' | 'production'
  status: 'pending' | 'completed' | 'canceled'
  targetValue: number
  currentValue: number
  startDate: Date
  deadLine: Date
}

const columns: ColumnDef<Goal>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <p>ID</p>
    },
  },
  {
    accessorKey: 'product.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Produto
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <TableCellViewerGoals item={row.original} />
    },
  },
  {
    accessorKey: 'description',
    header: () => <p>Descrição</p>,
  },
  {
    accessorKey: 'type',
    header: () => <p>Tipo da meta</p>,
  },
  {
    accessorKey: 'targetValue',
    header: () => <p>Valor alvo</p>,
  },
  {
    accessorKey: 'currentValue',
    header: () => <p>Valor atual</p>,
  },
  {
    accessorKey: 'startDate',
    header: () => <p>Início</p>,
  },
  {
    accessorKey: 'deadLine',
    header: () => <p>Prazo</p>,
  },
  {
    accessorKey: 'status',
    header: () => <p>Status</p>,
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
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

export function Goals() {
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
      <div className="grid gap-4">
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
                  Nenhuma meta encontrada.
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
