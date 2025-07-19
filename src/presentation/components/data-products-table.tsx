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
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui'
import type { ProductionModel } from '@/domain/models/production'
import type { Timestamp } from 'firebase/firestore'

export type Production = ProductionModel

function formatDate(date: Timestamp): string {
  if (!date) return ''
  const d = date.toDate()
  return d.toLocaleDateString('pt-BR')
}

export const columns: ColumnDef<Production>[] = [
  {
    accessorKey: 'product',
    id: 'product',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Produto
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.original.product?.name ?? ''}</div>,
    filterFn: (row, filterValue) => {
      const productName = row.original.product?.name?.toLowerCase() ?? ''
      return productName.includes(filterValue.toLowerCase())
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.status === 'harvested' ? (
          <p className="text-green-500">Já colhido</p>
        ) : row.original.status === 'in_production' ? (
          <p className="text-purple-500">Em produção</p>
        ) : (
          <p className="text-yellow-500">Aguardando</p>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'startDate',
    header: 'Início',
    cell: ({ row }) => <div>{formatDate(row.original.startDate as any)}</div>,
  },
  {
    accessorKey: 'harvestDate',
    header: 'Previsão de colheita',
    cell: ({ row }) => <div>{formatDate(row.original.harvestDate as any)}</div>,
  },
]

type Props = {
  productions: ProductionModel[]
}

export function DataProductsTable({ productions }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: productions,
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
    <Card className="@container/card mx-4 mt-4 lg:mx-6">
      <CardHeader className="flex justify-between">
        <div className="flex flex-col space-y-1">
          <CardTitle>Produções</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Visão do que está aguardando, em produção ou já colhido
            </span>
            <span className="@[540px]/card:hidden">Status das produções</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <Input
          placeholder="Filtrar produtos"
          value={(table.getColumn('product')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('product')?.setFilterValue(event.target.value)
          }
          className="max-w"
        />
        <div className="w-full mt-4">
          <div className="rounded-md border">
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
                      Produto não encontrado.
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
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
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
      </CardContent>
    </Card>
  )
}
