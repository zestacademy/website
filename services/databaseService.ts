import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db, isFirebaseInitialized } from '../lib/firebase'

function ensureDatabaseReady() {
  if (!isFirebaseInitialized || !db) {
    throw new Error('Firestore is not configured. Add Firebase keys to .env to enable database operations.')
  }
}

export async function upsertUserProfile(user: any, extraFields: Record<string, any> = {}) {
  if (!user) return
  ensureDatabaseReady()

  await setDoc(
    doc(db!, 'users', user.uid),
    {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      updatedAt: serverTimestamp(),
      ...extraFields,
    },
    { merge: true },
  )
}

export async function ensureUserProfileData(user: any) {
  if (!user) return
  ensureDatabaseReady()

  await upsertUserProfile(user)
}

export async function getUserProfileData(uid: string) {
  ensureDatabaseReady()

  const userSnapshot = await getDoc(doc(db!, 'users', uid))

  return {
    user: userSnapshot.exists() ? userSnapshot.data() : null,
  }
}

export async function createContactLead(payload: any) {
  ensureDatabaseReady()
  return addDoc(collection(db!, 'leads'), {
    ...payload,
    createdAt: serverTimestamp(),
  })
}

export async function upsertNewsletterSubscription(email: string) {
  ensureDatabaseReady()

  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail) {
    throw new Error('Email is required for newsletter subscription.')
  }

  const subscriberId = encodeURIComponent(normalizedEmail)
  const subscriberRef = doc(db!, 'newsletterSubscribers', subscriberId)

  await setDoc(
    subscriberRef,
    {
      email: normalizedEmail,
      source: 'home-page',
      subscribedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'active',
    },
    { merge: true },
  )
}