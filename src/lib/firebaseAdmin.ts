import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export const verifyIdToken = (token: string) => {
  return admin.auth().verifyIdToken(token)
}

export const generateCustomToken = async (uid: string, role: string) => {
  try {
    const customToken = await admin.auth().createCustomToken(uid, { role })
    return customToken
  } catch (error) {
    console.error('Error creating custom token:', error)
    throw new Error('Error creating custom token')
  }
}
