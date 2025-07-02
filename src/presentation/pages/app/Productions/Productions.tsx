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
import { TableCellViewerProductions } from './components'

const data: Production[] = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'Tomate',
      price: 3.5,
      cost: 2.0,
      category: 'Hortaliças',
      stock: 100,
      minStock: 20,
      maxStock: 200,
      unit: 'kg',
      description: 'Tomate orgânico fresco',
      image: '/images/tomate.jpg',
      createdAt: new Date('2023-01-01T10:00:00Z'),
      updatedAt: new Date('2023-10-01T12:00:00Z'),
    },
    farm: {
      id: '1',
      name: 'Fazenda Verde',
      location: 'São Paulo, SP',
      size: 50,
      unit: 'hectares',
      description: 'Fazenda especializada em hortaliças orgânicas',
      createdAt: new Date('2023-01-01T10:00:00Z'),
      updatedAt: new Date('2023-10-01T12:00:00Z'),
    },
    status: 'in_production',
    quantityProduced: 200,
    unit: 'kg',
    startDate: new Date('2023-09-01'),
    harvestDate: new Date('2023-09-30'),
  },
]

type Production = {
  id: string
  product: {
    id: string
    name: string
    price: number
    cost: number
    category: string
    stock: number
    minStock: number
    maxStock: number
    unit: string
    description: string
    image: string
    createdAt: Date
    updatedAt: Date
  }
  farm: {
    id: string
    name: string
    location: string
    size: number
    unit: string
    description: string
    createdAt: Date
    updatedAt: Date
  }
  status: 'in_production' | 'completed' | 'cancelled'
  quantityProduced: number
  unit: string
  startDate: Date
  harvestDate: Date
}

const columns: ColumnDef<Production>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <p>ID</p>
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <TableCellViewerProductions item={row.original} />
    },
  },
  {
    accessorKey: 'product.category',
    header: () => {
      return <p>Categoria</p>
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: 'farm.name',
    header: () => {
      return <p>Fazenda</p>
    },
  },
  {
    accessorKey: 'status',
    header: () => {
      return <p>Status</p>
    },
  },
  {
    accessorKey: 'quantityProduced',
    header: () => {
      return <p>Quantidade Produzida</p>
    },
  },
  {
    accessorKey: 'unit',
    header: () => {
      return <p>Unidade</p>
    },
  },
  {
    accessorKey: 'startDate',
    header: () => {
      return <p>Data de Início</p>
    },
  },
  {
    accessorKey: 'harvestDate',
    header: () => {
      return <p>Data de Colheita</p>
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

export function Productions() {
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
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div>
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Filtrar categoria
          </Label>
          <Select>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Categoria" />
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
            Filtrar produtos
          </Label>
          <Input
            placeholder="Filtrar produtos..."
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
