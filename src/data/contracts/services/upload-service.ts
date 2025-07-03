export interface UploadService {
  upload: (uri: string) => Promise<UploadService.Result>
}

export namespace UploadService {
  export type Result = {
    name: string
    url: string
  }
}
