export interface UploadService {
  upload: (file: File) => Promise<UploadService.Result>
}

export namespace UploadService {
  export type Result = {
    name: string
    url: string
  }
}
