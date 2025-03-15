const timeline = [
  {
    name: 'Foundation and Early Focus',
    description:
      'Founded during COVID-19, we initially developed tools to help healthcare providers manage the patient surge.',
    date: 'July 2020',
    dateTime: '2020-08',
  },
  {
    name: 'Expanding Horizons',
    description:
      'We broadened our focus to global clinic management, supporting medical practices worldwide.',
    date: 'Dec 2021',
    dateTime: '2021-12',
  },
  {
    name: 'Clinic Management System Launch',
    description:
      'We launched our all-in-one system, integrating patient care, scheduling, eBilling, and more.',
    date: 'Feb 2022',
    dateTime: '2022-02',
  },
  {
    name: 'Industry Leader in Healthcare Tech',
    description:
      'Our system is now a top-tier solution, continually evolving to enhance care and efficiency.',
    date: 'July 2024',
    dateTime: '2024-07',
  },
]


export default function Services() {

  return (
    <div className="bg-white">
      <main className="isolate">
        <div className="relative isolate -z-10 mt-10 overflow-hidden bg-gradient-to-b from-indigo-100/20">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:col-span-2 xl:col-auto">
                Welcome to Opera Surgical Centre,
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  where we provide comprehensive medical practice management
                  solutions designed to enhance the efficiency and quality of
                  healthcare delivery. Our all-in-one system integrates the
                  latest advancements in technology to support medical clinics,
                  individual practitioners, and third-party billing companies.
                </p>
              </div>
              <img
                alt=""
                src="https://media.vanguardcommunications.net/photo-VCG-HPI-COVID19-Male-Doc-Male-Pt-2000px.jpg"
                className=" aspect-[6/5] w-full max-w-lg rounded-2xl object-cover xl:row-span-2 xl:row-end-2 "
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.name}>
                <time
                  dateTime={item.dateTime}
                  className="flex items-center text-sm font-semibold leading-6 text-indigo-600"
                >
                  <svg
                    viewBox="0 0 4 4"
                    aria-hidden="true"
                    className="mr-4 h-1 w-1 flex-none"
                  >
                    <circle r={2} cx={2} cy={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    aria-hidden="true"
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  />
                </time>
                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-base leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Enhancing Global Reach
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              We continued to refine and expand our offerings, incorporating
              advanced features like mobile access, secure messaging, and
              integrated PACS. Our system became even more adaptable to the
              needs of diverse healthcare environments, supporting both
              on-premise and remote installations.
            </p>

            <div
              aria-hidden="true"
              className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                }}
                className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              />
            </div>
          </div>
        </div>
        <div className="mt-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Patient Care Management
                </h2>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  Our Patient Care Management system ensures that every aspect
                  of patient care is streamlined. From scheduling and tracking
                  to follow-ups and communication, our solution helps healthcare
                  providers deliver top-notch care with ease and efficiency.
                </p>
                <p className="mt-6 text-xl leading-7 text-gray-600">
                  Simplify the appointment booking process with our online
                  scheduling system. Patients can easily book, reschedule, or
                  cancel appointments at their convenience, while providers can
                  manage their schedules with real-time updates and automated
                  reminders.
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    alt=""
                    src="https://th.bing.com/th/id/R.834c9c1d5be3bfaf89a85ac7a5642413?rik=CIGPCPyWIZVABA&pid=ImgRaw&r=0"
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      alt=""
                      src="https://nam.edu/wp-content/uploads/2020/11/shutterstock_168812327-scaled.jpg"
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      alt=""
                      src="https://blog.mighty-well.com/wp-content/uploads/2019/09/qtq80-fZgYf5.jpeg"
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-32 mb-6 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Portals, Secured Messaging, Schedule Online Appointments, eBilling
              etc
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Our Secured Messaging feature allows for confidential
              communication between patients and healthcare providers. Secure,
              encrypted messaging ensures that sensitive information remains
              protected while facilitating seamless and efficient interactions.
            </p>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
              <p className="flex-none text-3xl font-bold tracking-tight text-gray-900">
                1500 +
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-gray-900">
                  Staff on the platform
                </p>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  Registered staff on Opera Surgical centre.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
              <p className="flex-none text-3xl font-bold tracking-tight text-white">
                24/7 Support
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-white">
                  We’re proud that our customer support is available 24/7.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-400">
                  Opera Support Team works everyday for our customers values.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-indigo-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
              <p className="flex-none text-3xl font-bold tracking-tight text-white">
                70% off for cancer patients
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-white">
                  Helping and Supporting
                </p>
                <p className="mt-2 text-base leading-7 text-indigo-200">
                  Cancers Patients are given 70% off and Free Appointments
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
