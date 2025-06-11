import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection, Timestamp } from "firebase/firestore"

import type { AddAccountRepository, LoadAccountRepository, SaveUserRepository } from "@/data/contracts/account"
import { auth, db } from "@/main/config/firebase"
import { userConverter } from "./converters"

export class AccountFirebaseRepository
  implements AddAccountRepository, SaveUserRepository, LoadAccountRepository
{
  async auth(params: LoadAccountRepository.Params): Promise<void> {
    const { email, password } = params
    await signInWithEmailAndPassword(auth, email, password)
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
}