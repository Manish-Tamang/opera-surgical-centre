'use client'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Dialog } from '@headlessui/react'

const LoginModal = ({ isOpen, onClose = () => {}, onLoginSuccess = () => {} }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const auth = getAuth()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLoginSuccess()
      onClose()
    } catch (error) {
      setError('Failed to login. Please check your credentials.')
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-lg font-bold">Login</Dialog.Title>
          <div>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                name="Password"
                type="password"
                placeholder="123"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-red-500">{error}</p>}
          <button
            type="button"
            className="mt-4 rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-cyan-600 hover:bg-cyan-700"
            onClick={handleLogin}
          >
            Login
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default LoginModal
