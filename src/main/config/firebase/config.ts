import { initializeApp, type FirebaseOptions } from "firebase/app";
import { initializeAuth } from "firebase/auth";

import { ENV } from "@/main/config";

const firebaseConfig: FirebaseOptions = {
  apiKey: ENV.API_KEY,
  projectId: ENV.PROJECT_ID,
  appId: ENV.APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app)
