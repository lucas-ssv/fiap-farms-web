export interface CustomerModel {
  id: string
  name: string
  email: string
  phone: string
  postalCode: string
  address: string
  addressNumber: string
  addressComplement?: string
  neighborhood: string
  city: string
  state: string
  createdAt: Date
  updatedAt: Date
}
