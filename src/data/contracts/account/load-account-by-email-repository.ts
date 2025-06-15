export interface LoadAccountByEmailRepository {
  loadByEmail: (
    email: string
  ) => Promise<LoadAccountByEmailRepository.Result | null>
}

export namespace LoadAccountByEmailRepository {
  export type Result = {
    name: string
    username: string
    email: string
    userUID: string
  }
}