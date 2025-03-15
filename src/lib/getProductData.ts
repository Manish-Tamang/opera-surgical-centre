import { db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export async function getProductData(slug: string) {
  try {
    const productRef = doc(db, 'products', slug) 
    const docSnap = await getDoc(productRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching product: ', error)
    return null
  }
}
