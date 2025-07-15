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
import { TableCellViewerGoals } from './components'
import type { GoalModel } from '@/domain/models/goal'
import type { UpdateGoal, WatchGoals } from '@/domain/usecases/goal'
import { Timestamp } from 'firebase/firestore'
import type { LoadProducts } from '@/domain/usecases/product'

type Goal = GoalModel

const columns = (
  loadProducts: LoadProducts,
  updateGoal: UpdateGoal
): ColumnDef<Goal>[] => {
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
          <TableCellViewerGoals
            item={row.original}
            loadProducts={loadProducts}
            updateGoal={updateGoal}
          />
        )
      },
    },
    {
      accessorKey: 'description',
      header: () => <p>Descrição</p>,
    },
    {
      accessorKey: 'type',
      header: () => <p>Tipo da meta</p>,
      cell: ({ row }) => {
        const type = row.original.type
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              type === 'sales'
                ? 'bg-blue-100 text-blue-800'
                : type === 'production'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {type === 'sales'
              ? 'Vendas'
              : type === 'production'
              ? 'Produção'
              : 'Outro'}
          </span>
        )
      },
    },
    {
      accessorKey: 'targetValue',
      header: () => <p>Valor alvo</p>,
      cell: ({ row }) => {
        const targetValue = row.original.targetValue
        return (
          <span className="font-medium">
            {targetValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        )
      },
    },
    {
      accessorKey: 'currentValue',
      header: () => <p>Valor atual</p>,
      cell: ({ row }) => {
        const currentValue = row.original.currentValue
        return (
          <span className="font-medium">
            {currentValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        )
      },
    },
    {
      accessorKey: 'startDate',
      header: () => <p>Início</p>,
      cell: ({ row }) => {
        const startDate = row.original.startDate
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
      accessorKey: 'deadline',
      header: () => <p>Prazo</p>,
      cell: ({ row }) => {
        const deadline = row.original.deadline
        return (
          <span className="font-medium">
            {deadline instanceof Timestamp
              ? deadline.toDate().toLocaleDateString('pt-BR')
              : ''}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => <p>Status</p>,
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              status === 'in_progress'
                ? 'bg-yellow-100 text-yellow-800'
                : status === 'done' || status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status === 'in_progress'
              ? 'Em progresso'
              : status === 'done'
              ? 'Concluída'
              : status === 'active'
              ? 'Ativa'
              : 'Cancelada'}
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
              <DropdownMenuItem variant="destructive">Remover</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

type Props = {
  watchGoals: WatchGoals
  loadProducts: LoadProducts
  updateGoal: UpdateGoal
}

export function Goals({ watchGoals, loadProducts, updateGoal }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [goals, setGoals] = React.useState<Goal[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const table = useReactTable({
    data: goals,
    columns: columns(loadProducts, updateGoal),
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
    const unsubscribe = watchGoals.execute((goals) => {
      setGoals(goals)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchGoals])

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
            Filtrar meta
          </Label>
          <Input
            placeholder="Filtrar metas..."
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
