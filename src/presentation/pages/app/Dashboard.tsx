import {
  DataProductsTable,
  ExpensesTypeChart,
  GoalsChart,
  PopularProductsChart,
  ProductProfitChart,
  SectionCards,
  SellEvolutionChart,
  StockDistribuitionCategoryChart,
} from '@/presentation/components'

export function Dashboard() {
  return (
    <main>
      <SectionCards />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4 px-6 mt-4">
        <ProductProfitChart />
        <PopularProductsChart />
      </div>
      <DataProductsTable />
      <div className="grid lg:grid-cols-2 gap-4 px-4 lg:px-6 mt-4">
        <SellEvolutionChart />
        <GoalsChart />
      </div>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-4 px-4 lg:px-6 mt-4">
        <ExpensesTypeChart />
        <StockDistribuitionCategoryChart />
      </div>
    </main>
  )
}
