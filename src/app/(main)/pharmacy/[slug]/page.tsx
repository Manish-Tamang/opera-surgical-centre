// src/app/(main)/pharmacy/[slug]/page.tsx
'use client'

import { getProductData } from '@/lib/getProductData'
import { Button } from '@/components/Button'
import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import '@/styles/loader.css'
import { useCart } from '@/contexts/CartContext'
import Cart from '@/components/Cart'

interface Product {
  id: string
  productName: string
  description: string
  category: string
  price: string
  stock: string
  imageUrl: string
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const product = await getProductData(slug)
    return product
  } catch (error) {
    console.error('Error fetching product: ', error)
    return null
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  useEffect(() => {
    async function loadProduct() {
      const fetchedProduct = await fetchProduct(slug)
      setProduct(fetchedProduct)
    }

    loadProduct()
  }, [slug])

  if (!product) {
    return (
      <div className="loading-container">
        <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
          <circle
            className="pl__ring pl__ring--a"
            cx="120"
            cy="120"
            r="105"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 660"
            strokeDashoffset="-330"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--b"
            cx="120"
            cy="120"
            r="35"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 220"
            strokeDashoffset="-110"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--c"
            cx="85"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--d"
            cx="155"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
        </svg>
      </div>
    )
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div className="flex flex-col-reverse">
            <div className="mt-6 lg:mt-0">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="h-full w-full object-cover object-center"
                onClick={() => setSelectedImage(product.imageUrl)}
              />
            </div>
          </div>
          <div className="mt-10 lg:row-span-3 lg:mt-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {product.productName}
            </h2>
            <p className="mt-3 text-3xl text-gray-900">${product.price}</p>
            <p className="mt-3 text-gray-500">{product.description}</p>
            <button
              onClick={handleAddToCart}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-10 right-10 rounded-full bg-gray-300 p-4 text-white hover:bg-indigo-700"
        onClick={() => setIsCartOpen(true)}
      >
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/doodle/48/shopping-cart--v1.png"
          alt="shopping-cart--v1"
        />
      </button>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Transition.Root show={!!selectedImage} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSelectedImage(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <img
                      src={selectedImage || ''}
                      alt="Zoomed"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
