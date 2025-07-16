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
import type { ProductionModel } from '@/domain/models/production'
import type {
  RemoveProduction,
  UpdateProduction,
  WatchProductions,
} from '@/domain/usecases/production'
import { Timestamp } from 'firebase/firestore'
import type { LoadProducts } from '@/domain/usecases/product'

type Production = ProductionModel

const columns = (
  loadProducts: LoadProducts,
  updateProduction: UpdateProduction,
  removeProduction: RemoveProduction
): ColumnDef<Production>[] => {
  return [
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
        return (
          <TableCellViewerProductions
            item={row.original}
            loadProducts={loadProducts}
            updateProduction={updateProduction}
            removeProduction={removeProduction}
          />
        )
      },
    },
    {
      accessorKey: 'product.category.name',
      header: () => {
        return <p>Categoria</p>
      },
      filterFn: 'includesString',
    },
    {
      accessorKey: 'status',
      header: () => {
        return <p>Status</p>
      },
      cell: ({ row }) => {
        const status = row.getValue('status')
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              status === 'in_production'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {status === 'in_production' ? 'Em progresso' : 'Concluído'}
          </span>
        )
      },
    },
    {
      accessorKey: 'quantity',
      header: () => {
        return <p>Quantidade</p>
      },
      cell: ({ row }) => {
        const quantity = row.getValue('quantity') as number
        return <span className="font-medium">{quantity}</span>
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
      cell: ({ row }) => {
        const unit = row.getValue('unit') as string
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
            {unit === 'kg' ? 'kg' : 'Unidade'}
          </span>
        )
      },
    },
    {
      accessorKey: 'startDate',
      header: () => {
        return <p>Data de Início</p>
      },
      cell: ({ row }) => {
        const startDate = row.getValue('startDate') as Date | Timestamp
        return (
          <span className="font-medium">
            {startDate instanceof Timestamp
              ? startDate.toDate().toLocaleDateString('pt-BR')
              : ''}
          </span>
        )
      },
    },
    {
      accessorKey: 'harvestDate',
      header: () => {
        return <p>Data de Colheita</p>
      },
      cell: ({ row }) => {
        const harvestDate = row.getValue('harvestDate') as Date | Timestamp
        return (
          <span className="font-medium">
            {harvestDate instanceof Timestamp
              ? harvestDate.toDate().toLocaleDateString('pt-BR')
              : ''}
          </span>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => removeProduction.execute(row.original.id)}
              >
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

type Props = {
  watchProductions: WatchProductions
  loadProducts: LoadProducts
  updateProduction: UpdateProduction
  removeProduction: RemoveProduction
}

export function Productions({
  watchProductions,
  loadProducts,
  updateProduction,
  removeProduction,
}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [productions, setProductions] = React.useState<Production[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const table = useReactTable({
    data: productions,
    columns: columns(loadProducts, updateProduction, removeProduction),
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
    const unsubscribe = watchProductions.execute((productions) => {
      setProductions(productions)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchProductions])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="@container/card mx-4 mt-4 lg:mx-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Filtrar produções
          </Label>
          <Input
            placeholder="Filtrar produções..."
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
                  Nenhuma produção encontrada.
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
