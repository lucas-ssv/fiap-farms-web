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
  Loader2Icon,
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
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui'
import { TableCellViewerSales } from './components'
import type { SaleModel } from '@/domain/models/sale'
import type { WatchSales } from '@/domain/usecases/sale'
import { Timestamp } from 'firebase/firestore'
import type { LoadProducts } from '@/domain/usecases/product'

type Sale = SaleModel

const columns = (loadProducts: LoadProducts): ColumnDef<Sale>[] => {
  return [
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
        return (
          <TableCellViewerSales
            item={row.original}
            loadProducts={loadProducts}
          />
        )
      },
    },
    {
      accessorKey: 'customer.name',
      header: () => <p>Cliente</p>,
    },
    {
      accessorKey: 'user.name',
      header: () => <p>Vendedor</p>,
    },
    {
      accessorKey: 'quantity',
      header: () => <p>Quantidade</p>,
    },
    {
      accessorKey: 'product.unit',
      header: () => <p>Unidade</p>,
      cell: ({ row }) => {
        const unit = row.original.product.unit === 'kg' ? 'kg' : 'Unidade'
        return <span>{unit}</span>
      },
    },
    {
      accessorKey: 'status',
      header: () => <p>Status</p>,
      cell: ({ row }) => {
        const status = row.original.status
        switch (status) {
          case 'pending':
            return (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                Pendente
              </span>
            )
          case 'completed':
            return (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                Concluída
              </span>
            )
          case 'cancelled':
            return (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                Cancelada
              </span>
            )
          default:
            return <span className="text-gray-500">Desconhecido</span>
        }
      },
    },
    {
      accessorKey: 'saleDate',
      header: () => <p>Data da venda</p>,
      cell: ({ row }) => {
        const saleDate = row.original.saleDate as Timestamp | Date
        let formattedDate = ''
        if (saleDate instanceof Date) {
          formattedDate = saleDate.toLocaleDateString()
        } else if (
          saleDate &&
          typeof saleDate === 'object' &&
          'toDate' in saleDate &&
          typeof saleDate.toDate === 'function'
        ) {
          formattedDate = saleDate.toDate().toLocaleDateString()
        }
        return <span>{formattedDate}</span>
      },
    },
    {
      accessorKey: 'unitPrice',
      header: () => <p>Preço unitário</p>,
      cell: ({ row }) => {
        const priceFormat = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
        return <span>{priceFormat.format(row.original.unitPrice)}</span>
      },
    },
    {
      accessorKey: 'totalPrice',
      header: () => <p>Preço total</p>,
      cell: ({ row }) => {
        const priceFormat = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
        return <span>{priceFormat.format(row.original.totalPrice)}</span>
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
}

type Props = {
  watchSales: WatchSales
  loadProducts: LoadProducts
}

export function Sales({ watchSales, loadProducts }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [sales, setSales] = React.useState<Sale[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const table = useReactTable({
    data: sales,
    columns: columns(loadProducts),
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

  React.useEffect(() => {
    const unsubscribe = watchSales.execute((sales) => {
      setSales(sales)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [watchSales])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="@container/card mx-4 mt-4 lg:mx-6">
      <div className="grid">
        <div>
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Filtrar vendas
          </Label>
          <Input
            placeholder="Filtrar vendas..."
            value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('id')?.setFilterValue(event.target.value)
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
                  Nenhuma venda encontrada.
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
