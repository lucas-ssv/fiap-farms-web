import {
  DataProductsTable,
  PopularProductsChart,
  ProductProfitChart,
  SectionCards,
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
    </main>
  )
}
