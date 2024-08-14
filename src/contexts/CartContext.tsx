'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface Product {
  id: string
  productName: string
  imageUrl: string
  category: string
  price: string
}

interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

const CART_STORAGE_KEY = 'cart'

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product])
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
