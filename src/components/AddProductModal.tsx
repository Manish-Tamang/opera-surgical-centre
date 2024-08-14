import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { db, storage } from '@/firebase/config'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('in stock')
  const [image, setImage] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!image) {
      toast.error('Please select an image.')
      return
    }

    try {
      const storageRef = ref(storage, `products/${image.name}`)
      await uploadBytes(storageRef, image)
      const imageUrl = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'products'), {
        productName,
        description,
        category,
        price,
        stock,
        imageUrl,
      })

      toast.success('Product added successfully!')
      onClose()

      // Reset form fields
      setProductName('')
      setDescription('')
      setCategory('')
      setPrice('')
      setStock('in stock')
      setImage(null)
    } catch (error) {
      toast.error('Error adding product: ' + error.message)
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add Product
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mt-2">
                        <input
                          type="text"
                          name="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Product Name"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Description"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Category"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Price"
                        />
                      </div>
                      <div className="mt-2">
                        <select
                          name="stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="in stock">In Stock</option>
                          <option value="out of stock">Out of Stock</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddProductModal
