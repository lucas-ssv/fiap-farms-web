import { UploadFirebaseService } from '@/infra/services/firebase'
import { v4 as uuidv4 } from 'uuid'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'any_uuid'),
}))

describe('UploadFirebaseService', () => {
  it('should call uuid', async () => {
    const sut = new UploadFirebaseService()

    await sut.upload('any_uri')

    expect(uuidv4).toHaveBeenCalled()
  })
})
