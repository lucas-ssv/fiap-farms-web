import { initializeApp, type FirebaseOptions } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

import { ENV } from "@/main/config";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: ENV.API_KEY,
  projectId: ENV.PROJECT_ID,
  appId: ENV.APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

export const db = getFirestore()
