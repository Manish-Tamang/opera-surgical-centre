'use client'

import { withAuth } from '@/components/AuthPharmacy'
import { useEffect, useState } from 'react';
import AddProductModal from '@/components/AddProductModal';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Product {
  id: string;
  productName: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  imageUrl: string;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Product, 'id'>
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Products
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the products in Opera Pharmacy including their Product name,
                  description, Price and Stock.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={openModal}
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Product
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                              <div className="h-11 w-11 flex-shrink-0">
                                <img
                                  alt={product.productName}
                                  src={product.imageUrl}
                                  className="h-11 w-11 cursor-pointer"
                                  onClick={() => handleImageClick(product.imageUrl)}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {product.productName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 truncate max-w-[200px]">
                            <div className="text-gray-900">{product.description}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${product.stock === 'in stock' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                              {product.stock === 'in stock' ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            ${product.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Image Zoom Modal */}
      <Transition.Root show={!!selectedImage} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setSelectedImage(null)}>
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

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
                <img
                  src={selectedImage || ''}
                  alt="Zoomed"
                  className="w-full cursor-pointer"
                  onClick={() => setSelectedImage(null)}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default withAuth(Dashboard);
