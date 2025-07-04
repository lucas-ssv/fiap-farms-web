export interface UploadService {
  upload: (file: File, folderName: string) => Promise<UploadService.Result>
}

export namespace UploadService {
  export type Result = {
    name: string
    url: string
  }
}
