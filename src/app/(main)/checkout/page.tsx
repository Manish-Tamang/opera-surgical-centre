import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import LogoImage from '@/images/logo.png'

const subtotal = '$210.00'
const discount = { code: 'CHEAPSKATE', amount: '$24.00' }
const taxes = '$23.68'
const shipping = '$22.00'
const total = '$341.68'
const products = [
  {
    id: 1,
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc:
      'https://tailwindui.starxg.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
]

export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
          <div className="px-4 py-6 sm:px-6 lg:hidden">
            <div className="mx-auto flex max-w-lg">
              <a href="#">
                <Image
                  alt="Logo of Opera Surgical Centre"
                  src={LogoImage}
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>

          <h1 className="sr-only">Checkout</h1>

          {/* Mobile order summary */}
          <section
            aria-labelledby="order-heading"
            className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
          >
            <Disclosure as="div" className="mx-auto max-w-lg">
              <div className="flex items-center justify-between">
                <h2
                  id="order-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Your Order
                </h2>
                <DisclosureButton className="group font-medium text-indigo-600 hover:text-indigo-500">
                  <span className="[.group:not([data-open])_&]:hidden">
                    Hide full summary
                  </span>
                  <span className="group-data-[open]:hidden">
                    Show full summary
                  </span>
                </DisclosureButton>
              </div>

              <DisclosurePanel>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-b border-gray-200"
                >
                  {products.map((product) => (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                      />
                      <div className="flex flex-col justify-between space-y-4">
                        <div className="space-y-1 text-sm font-medium">
                          <h3 className="text-gray-900">{product.name}</h3>
                          <p className="text-gray-900">{product.price}</p>
                          <p className="text-gray-500">{product.color}</p>
                          <p className="text-gray-500">{product.size}</p>
                        </div>
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Edit
                          </button>
                          <div className="flex border-l border-gray-300 pl-4">
                            <button
                              type="button"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <form className="mt-10">
                  <label
                    htmlFor="discount-code-mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Discount code
                  </label>
                  <div className="mt-1 flex space-x-4">
                    <input
                      id="discount-code-mobile"
                      name="discount-code-mobile"
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Apply
                    </button>
                  </div>
                </form>

                <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="text-gray-900">{subtotal}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="flex">
                      Discount
                      <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                        {discount.code}
                      </span>
                    </dt>
                    <dd className="text-gray-900">-{discount.amount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Taxes</dt>
                    <dd className="text-gray-900">{taxes}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className="text-gray-900">{shipping}</dd>
                  </div>
                </dl>
              </DisclosurePanel>

              <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                <span className="text-base">Total</span>
                <span className="text-base">{total}</span>
              </p>
            </Disclosure>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
          >
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <ul
              role="list"
              className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6"
            >
              {products.map((product) => (
                <li key={product.id} className="flex space-x-6 py-6">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                  />
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="space-y-1 text-sm font-medium">
                      <h3 className="text-gray-900">{product.name}</h3>
                      <p className="text-gray-900">{product.price}</p>
                      <p className="text-gray-500">{product.color}</p>
                      <p className="text-gray-500">{product.size}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <div className="flex border-l border-gray-300 pl-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
              <form>
                <label
                  htmlFor="discount-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount code
                </label>
                <div className="mt-1 flex space-x-4">
                  <input
                    id="discount-code"
                    name="discount-code"
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Apply
                  </button>
                </div>
              </form>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">{subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex">
                    Discount
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                      {discount.code}
                    </span>
                  </dt>
                  <dd className="text-gray-900">-{discount.amount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">{taxes}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">{shipping}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">{total}</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Checkout form */}
          <section
            aria-labelledby="payment-heading"
            className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
          >
            <div className="mx-auto max-w-lg">
              <div className="hidden pb-16 pt-10 lg:flex">
                <a href="#">
                  <Image
                    alt="Logo of Opera Surgical Centre"
                    src={LogoImage}
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 py-2 text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                <span className="sr-only">Pay with Apple Pay</span>
                <svg
                  className="h-30 w-20"
                  viewBox="-11.153 -123.214 326.05 326.05"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g transform="matrix(2.07675 0 0 -2.07675 -11.153 92.77)">
                    <defs>
                      <path id="a" d="M-84.525-27.457h326.05V78.457h-326.05z" />
                    </defs>
                    <clipPath id="b">
                      <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                    <g clipPath="url(#b)">
                      <path
                        d="M32.419 40.982c-1.674 1.908-4.7 2.726-8.571 2.726H12.613a1.609 1.609 0 0 1-1.59-1.357L6.347 12.68a.964.964 0 0 1 .953-1.114h6.936l1.742 11.049-.054-.346a1.604 1.604 0 0 0 1.583 1.357h3.296c6.475 0 11.545 2.63 13.026 10.238.044.225.082.444.115.658.44 2.812-.003 4.726-1.524 6.459"
                        fill="#003087"
                      />
                      <path
                        d="M117.331 26.863c-.424-2.784-2.55-2.784-4.606-2.784h-1.17l.821 5.198c.05.314.32.545.638.545h.537c1.4 0 2.722 0 3.404-.797.407-.477.53-1.185.376-2.162m-.895 7.264h-7.756a1.08 1.08 0 0 1-1.066-.91L104.48 13.33a.647.647 0 0 1 .638-.747h3.98c.371 0 .687.27.745.636l.89 5.64c.082.523.534.91 1.064.91h2.454c5.11 0 8.058 2.471 8.828 7.372.347 2.142.014 3.826-.989 5.005-1.103 1.296-3.058 1.982-5.653 1.982"
                        fill="#009cde"
                      />
                      <path
                        d="M62.011 26.863c-.424-2.784-2.55-2.784-4.607-2.784h-1.17l.821 5.198c.05.314.32.545.638.545h.537c1.4 0 2.722 0 3.404-.797.408-.477.531-1.185.377-2.162m-.895 7.264H53.36c-.53 0-.982-.386-1.065-.91L49.16 13.33a.646.646 0 0 1 .638-.747h3.704c.53 0 .981.386 1.064.91l.847 5.365c.082.524.534.91 1.064.91h2.454c5.11 0 8.058 2.472 8.828 7.373.347 2.142.014 3.826-.989 5.005-1.103 1.296-3.058 1.982-5.653 1.982M79.123 19.723c-.36-2.122-2.043-3.547-4.192-3.547-1.077 0-1.94.347-2.494 1.003-.55.65-.756 1.577-.582 2.608.334 2.104 2.046 3.574 4.162 3.574 1.055 0 1.91-.35 2.476-1.012.569-.667.793-1.599.63-2.626m5.176 7.23h-3.714a.647.647 0 0 1-.64-.547l-.162-1.038-.26.376c-.804 1.167-2.597 1.558-4.387 1.558-4.103 0-7.608-3.11-8.29-7.47-.355-2.177.149-4.256 1.383-5.707 1.133-1.333 2.75-1.888 4.677-1.888 3.308 0 5.142 2.124 5.142 2.124l-.166-1.032a.646.646 0 0 1 .639-.747h3.344c.53 0 .982.385 1.065.91l2.008 12.713a.647.647 0 0 1-.64.747"
                        fill="#003087"
                      />
                      <path
                        d="M134.443 19.723c-.36-2.122-2.043-3.547-4.192-3.547-1.077 0-1.94.347-2.494 1.003-.55.65-.756 1.577-.582 2.608.334 2.104 2.045 3.574 4.162 3.574 1.055 0 1.91-.35 2.476-1.012.569-.667.793-1.599.63-2.626m5.176 7.23h-3.714a.647.647 0 0 1-.64-.547l-.162-1.038-.26.376c-.804 1.167-2.597 1.558-4.387 1.558-4.102 0-7.607-3.11-8.29-7.47-.355-2.177.15-4.256 1.384-5.707 1.133-1.333 2.75-1.888 4.677-1.888 3.309 0 5.143 2.124 5.143 2.124l-.166-1.032a.644.644 0 0 1 .637-.747h3.343c.53 0 .982.385 1.066.91l2.008 12.713a.647.647 0 0 1-.64.747"
                        fill="#009cde"
                      />
                      <path
                        d="M104.08 26.952h-3.734c-.357 0-.69-.177-.89-.473l-5.15-7.584-2.183 7.288a1.08 1.08 0 0 1-1.033.77h-3.669a.647.647 0 0 1-.612-.856l4.11-12.066-3.866-5.455a.647.647 0 0 1 .528-1.02h3.73c.352 0 .683.173.885.463l12.414 17.918a.646.646 0 0 1-.53 1.015"
                        fill="#003087"
                      />
                      <path
                        d="M143.996 33.58l-3.184-20.251a.647.647 0 0 1 .639-.747h3.201c.53 0 .982.386 1.065.91l3.139 19.888a.646.646 0 0 1-.639.747h-3.582a.645.645 0 0 1-.639-.546"
                        fill="#009cde"
                      />
                      <path
                        d="M32.419 40.982c-1.674 1.908-4.7 2.726-8.571 2.726H12.613a1.609 1.609 0 0 1-1.59-1.357L6.347 12.68a.964.964 0 0 1 .953-1.114h6.936l1.742 11.049-.054-.346a1.604 1.604 0 0 0 1.583 1.357h3.296c6.475 0 11.545 2.63 13.026 10.238.044.225.082.444.115.658.44 2.812-.003 4.726-1.524 6.459"
                        fill="none"
                      />
                      <path
                        d="M117.331 26.863c-.424-2.784-2.55-2.784-4.606-2.784h-1.17l.821 5.198c.05.314.32.545.638.545h.537c1.4 0 2.722 0 3.404-.797.407-.477.53-1.185.376-2.162m-.895 7.264h-7.756a1.08 1.08 0 0 1-1.066-.91L104.48 13.33a.647.647 0 0 1 .638-.747h3.98c.371 0 .687.27.745.636l.89 5.64c.082.523.534.91 1.064.91h2.454c5.11 0 8.058 2.471 8.828 7.372.347 2.142.014 3.826-.989 5.005-1.103 1.296-3.058 1.982-5.653 1.982"
                        fill="none"
                      />
                      <path
                        d="M62.011 26.863c-.424-2.784-2.55-2.784-4.607-2.784h-1.17l.821 5.198c.05.314.32.545.638.545h.537c1.4 0 2.722 0 3.404-.797.408-.477.531-1.185.377-2.162m-.895 7.264H53.36c-.53 0-.982-.386-1.065-.91L49.16 13.33a.646.646 0 0 1 .638-.747h3.704c.53 0 .981.386 1.064.91l.847 5.365c.082.524.534.91 1.064.91h2.454c5.11 0 8.058 2.472 8.828 7.373.347 2.142.014 3.826-.989 5.005-1.103 1.296-3.058 1.982-5.653 1.982"
                        fill="none"
                      />
                      <path
                        d="M79.123 19.723c-.36-2.122-2.043-3.547-4.192-3.547-1.077 0-1.94.347-2.494 1.003-.55.65-.756 1.577-.582 2.608.334 2.104 2.046 3.574 4.162 3.574 1.055 0 1.91-.35 2.476-1.012.569-.667.793-1.599.63-2.626m5.176 7.23h-3.714a.647.647 0 0 1-.64-.547l-.162-1.038-.26.376c-.804 1.167-2.597 1.558-4.387 1.558-4.103 0-7.608-3.11-8.29-7.47-.355-2.177.149-4.256 1.383-5.707 1.133-1.333 2.75-1.888 4.677-1.888 3.308 0 5.142 2.124 5.142 2.124l-.166-1.032a.646.646 0 0 1 .639-.747h3.344c.53 0 .982.385 1.065.91l2.008 12.713a.647.647 0 0 1-.64.747"
                        fill="none"
                      />
                      <path
                        d="M134.443 19.723c-.36-2.122-2.043-3.547-4.192-3.547-1.077 0-1.94.347-2.494 1.003-.55.65-.756 1.577-.582 2.608.334 2.104 2.045 3.574 4.162 3.574 1.055 0 1.91-.35 2.476-1.012.569-.667.793-1.599.63-2.626m5.176 7.23h-3.714a.647.647 0 0 1-.64-.547l-.162-1.038-.26.376c-.804 1.167-2.597 1.558-4.387 1.558-4.102 0-7.607-3.11-8.29-7.47-.355-2.177.15-4.256 1.384-5.707 1.133-1.333 2.75-1.888 4.677-1.888 3.309 0 5.143 2.124 5.143 2.124l-.166-1.032a.644.644 0 0 1 .637-.747h3.343c.53 0 .982.385 1.066.91l2.008 12.713a.647.647 0 0 1-.64.747"
                        fill="none"
                      />
                      <path
                        d="M104.08 26.952h-3.734c-.357 0-.69-.177-.89-.473l-5.15-7.584-2.183 7.288a1.08 1.08 0 0 1-1.033.77h-3.669a.647.647 0 0 1-.612-.856l4.11-12.066-3.866-5.455a.647.647 0 0 1 .528-1.02h3.73c.352 0 .683.173.885.463l12.414 17.918a.646.646 0 0 1-.53 1.015"
                        fill="none"
                      />
                      <path
                        d="M143.996 33.58l-3.184-20.251a.647.647 0 0 1 .639-.747h3.201c.53 0 .982.386 1.065.91l3.139 19.888a.646.646 0 0 1-.639.747h-3.582a.645.645 0 0 1-.639-.546"
                        fill="none"
                      />
                    </g>
                  </g>
                </svg>
              </button>

              <div className="relative mt-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm font-medium text-gray-500">
                    or
                  </span>
                </div>
              </div>

              <form className="mt-6">
                <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email-address"
                        name="email-address"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="name-on-card"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        id="name-on-card"
                        name="name-on-card"
                        type="text"
                        autoComplete="cc-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        id="card-number"
                        name="card-number"
                        type="text"
                        autoComplete="cc-number"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-8 sm:col-span-9">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        id="expiration-date"
                        name="expiration-date"
                        type="text"
                        autoComplete="cc-exp"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        id="cvc"
                        name="cvc"
                        type="text"
                        autoComplete="csc"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-4">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-4">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-4">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-2">
                  <div className="flex h-5 items-center">
                    <input
                      defaultChecked
                      id="same-as-shipping"
                      name="same-as-shipping"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <label
                    htmlFor="same-as-shipping"
                    className="text-sm font-medium text-gray-900"
                  >
                    Billing address is the same as shipping address
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Pay {total}
                </button>

                <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
                  <LockClosedIcon
                    aria-hidden="true"
                    className="mr-1.5 h-5 w-5 text-gray-400"
                  />
                  Payment details stored in plain text
                </p>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
