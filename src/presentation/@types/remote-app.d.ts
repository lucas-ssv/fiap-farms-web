declare module 'remote_app/Button' {
  const Button: React.FC<{
    text: string
    onClick?: () => void
  }>
  export default Button
}

declare module 'remote_app/Header' {
  const Header: React.FC
  export default Header
}

declare module 'remote_app/SectionCards' {
  const SectionCards: React.FC<{
    products: ProductModel[]
    sales: SaleModel[]
    goals: GoalModel[]
  }>
  export default SectionCards
}
