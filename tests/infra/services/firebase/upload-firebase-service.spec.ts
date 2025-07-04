import { UploadFirebaseService } from '@/infra/services/firebase'
import { storage } from '@/main/config/firebase'
import { ref } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'any_uuid'),
}))

jest.mock('firebase/storage', () => {
  const onMock = jest.fn((_event, _progress, _error, success) => {
    success()
  })
  const mockUploadTask = {
    on: onMock,
    snapshot: {
      ref: 'mocked_ref',
    },
  }

  return {
    getStorage: jest.fn(),
    ref: jest.fn().mockReturnValue('mocked_storage_ref'),
    uploadBytesResumable: jest.fn().mockReturnValue(mockUploadTask),
    uploadBytes: jest.fn().mockResolvedValue({
      ref: 'mocked_storage_ref',
    }),
    getDownloadURL: jest.fn().mockResolvedValue('any_download_url'),
  }
})

jest.mock('@/main/config/firebase', () => ({
  storage: 'mocked_storage',
}))

jest.mock('@/infra/utils', () => ({
  uriToBlob: jest.fn().mockResolvedValue('mocked_blob'),
}))

describe('UploadFirebaseService', () => {
  it('should call uuid', async () => {
    const sut = new UploadFirebaseService()

    await sut.upload(new File(['content'], 'mocked_file.txt'))

    expect(uuidv4).toHaveBeenCalled()
  })

  it('should call ref with correct values', async () => {
    const sut = new UploadFirebaseService()

    await sut.upload(new File(['content'], 'mocked_file.txt'))

    expect(ref).toHaveBeenCalledWith(storage, 'products/any_uuid')
  })

  it('should return the filename and download URL', async () => {
    const sut = new UploadFirebaseService()
    const file = new File(['content'], 'mocked_file.txt')

    const result = await sut.upload(file)

    expect(result).toEqual({
      name: 'any_uuid',
      url: 'any_download_url',
    })
  })
})
