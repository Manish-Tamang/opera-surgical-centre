'use client'
import { useState, useEffect } from 'react'
import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

interface Product {
  id: string
  productName: string
  description: string
  category: string
  price: string
  stock: string
  imageUrl: string
}

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    }))
  } catch (error) {
    console.error('Error fetching products: ', error)
    return []
  }
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text
  }
  return `${text.substring(0, maxLength)}...`
}

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase())
  }

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery)
  )

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const products = await fetchProducts()
      setProducts(products)
    }

    fetchAndSetProducts()
  }, [])

  const maxDescriptionLength = 100 // Set the maximum length for the description
  const maxProductNameLength = 20 // Set the maximum length for the product name

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">Pharmacy Products</h2>
          <div className="relative">
            <input
              placeholder="Search..."
              className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
              name="search"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              className="size-6 absolute top-3 right-3 text-gray-500"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <a
              key={product.id}
              href={`/pharmacy/${product.id}`}
              className="relative block rounded-tr-3xl border border-gray-100"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-tr-3xl">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />
                <span
                  className="absolute -right-px -top-px z-10 rounded-bl-3xl rounded-tr-3xl px-6 py-4 font-medium uppercase tracking-widest text-white"
                  style={{ backgroundColor: '#1FBDD8' }}
                >
                  {product.category}
                </span>

                <p className="absolute bottom-4 right-4 z-10 rounded-md bg-black px-4 py-2 text-xl font-bold text-white">
                  ${product.price}
                </p>
              </div>

              <div className="p-4 text-center">
                <strong className="text-xl font-medium text-gray-900">
                  {truncateText(product.productName, maxProductNameLength)}
                </strong>

                <p className="mt-2 text-gray-700">
                  {truncateText(product.description, maxDescriptionLength)}
                </p>

                <span className="mt-4 block rounded-md border border-black bg-black px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
                  View Product
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
