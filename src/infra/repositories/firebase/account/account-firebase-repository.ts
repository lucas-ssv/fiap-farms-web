import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type NextOrObserver,
  type User as FirebaseUser,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'

import type {
  AddAccountRepository,
  AuthRepository,
  LoadAccountByEmailRepository,
  LoadAccountRepository,
  LogoutAccountRepository,
  SaveUserRepository,
} from '@/data/contracts/account'
import { auth, db } from '@/main/config/firebase'
import { userConverter, type User } from './converters'

export class AccountFirebaseRepository
  implements
    AddAccountRepository,
    SaveUserRepository,
    LoadAccountRepository,
    AuthRepository<NextOrObserver<FirebaseUser>>,
    LoadAccountByEmailRepository,
    LogoutAccountRepository
{
  async auth(params: LoadAccountRepository.Params): Promise<void> {
    const { email, password } = params
    await signInWithEmailAndPassword(auth, email, password)
  }

  onAuthStateChanged(callback: NextOrObserver<FirebaseUser>): () => void {
    const unsubscribe = onAuthStateChanged(auth, callback)
    return unsubscribe
  }

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Result | null> {
    const q = query(
      collection(db, 'users').withConverter(userConverter),
      where('email', '==', email)
    )
    const querySnapshot = await getDocs(q)
    let user: User | null = null
    querySnapshot.forEach((doc) => {
      user = doc.data()
    })
    return user
  }

  async add(account: AddAccountRepository.Params): Promise<string> {
    const { email, password } = account
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user.uid
  }

  async save(user: SaveUserRepository.Params): Promise<void> {
    await addDoc(collection(db, 'users').withConverter(userConverter), {
      userUID: user.userUID,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  async logout(): Promise<void> {
    await signOut(auth)
  }
}
