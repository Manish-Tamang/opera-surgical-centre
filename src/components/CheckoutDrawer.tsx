'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface CartItem {
  id: string
  productName: string
  price: string
  quantity: number
}

export default function CheckoutDrawer() {
  const [open, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Function to add item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item])
    setOpen(true)
  }

  // Function to handle checkout (placeholder)
  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems)
    // Implement checkout functionality here
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden lg:block bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Cart
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                        Your Cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <ul>
                      {cartItems.length === 0 && (
                        <li className="text-center text-gray-500">Your cart is empty.</li>
                      )}
                      {cartItems.map(item => (
                        <li key={item.id} className="mb-4 border-b pb-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.productName}</span>
                            <span>{item.quantity} x ${item.price}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={handleCheckout}
                      className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
