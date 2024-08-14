'use client'
import Banner from '@/images/banner.png'
import Image from 'next/image'

const stats = [
  { label: 'Patient registration every 24 hours', value: '150+' },
  { label: 'Appointments every 24 hours', value: '200+' },
  { label: 'New users annually', value: '25,000' },
]
const values = [
  {
    name: 'Compassion',
    description:
      'Compassion involves consistently acting with empathy and integrity. It means understanding and sharing the feelings of others, showing kindness, and providing support when needed. Acting with integrity ensures that our actions are honest and ethical, building trust and a sense of community.',
  },
  {
    name: 'Accountability',
    description:
      'Accountability means taking responsibility for our decisions and actions. It involves owning up to mistakes, learning from them, and being transparent about our processes. This fosters a culture of trust and reliability, where everyone feels responsible for the success and integrity of our work.',
  },
  {
    name: 'Respect',
    description:
      'Respect for the rights, beliefs, and choices of every individual is fundamental. This value emphasizes the importance of valuing diversity and treating everyone with dignity. By respecting others, we create an inclusive environment where everyone feels valued and heard.',
  },
  {
    name: 'Excellence',
    description:
      'Excellence is about inspiring and motivating innovation and achievement. It means striving for the highest standards in everything we do and continually seeking ways to improve. By aiming for excellence, we push boundaries, encourage creativity, and achieve outstanding results.',
  },
  {
    name: 'Safety',
    description:
      'Prioritizing safety as an essential part of everyday practice ensures that our environment is secure and supportive. It involves being proactive about identifying and mitigating risks, promoting health and well-being, and ensuring that everyone feels safe in their surroundings.',
  },
  {
    name: 'Collaboration',
    description:
      'Collaboration is the value of working together to achieve common goals. It involves open communication, mutual respect, and the sharing of knowledge and resources. Through collaboration, we harness the strengths and perspectives of different individuals and teams, leading to more innovative solutions and better outcomes. Working together ensures that we can achieve more than we could individually, fostering a sense of unity and collective purpose.',
  },
]
const team = [
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  // More people...
]

export default function Example() {
  return (
    <div className="bg-white">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32 -mt-20">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Opera Surgical Centre - Health Records Clinical Management
                    System
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    Opera Surgical Centre provides a comprehensive, integrated
                    range of clinical services from our various sites ranging
                    from acute tertiary services in areas of emergency medicine,
                    intensive care, medical and surgical services, through to
                    subacute care and onsite and virtual ambulatory clinics. Our
                    specialised services include oncology, renal, women’s health
                    including maternity, chronic disease, geriatrics and
                    cardiology.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/493051/1360/2039/m1/fpnw/wm1/ahagrbtwluuxpgqqxidpvhfnylrpdyxnsimzl5yyamui8rbnlk0m3pndcwuniyfc-.jpg?1432130796&s=31757107a78838bea692e2e8756e5b5b"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://www.lifesciencesreview.com/newstransfer/upload/zrmnh370.jpg"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="https://th.bing.com/th/id/R.43e10dfd0aa3ff509549094dcacac587?rik=8dOeNQFYUb2ZHw&pid=ImgRaw&r=0"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://th.bing.com/th/id/R.38977a9b3db0ba6007c0bb2e2ea1ed2a?rik=7qRZfuQkxy1h%2bA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f833566%2fthumbs%2fo-DOCTORS-APPOINTMENT-facebook.jpg&ehk=nLF46sTL%2flSNsGXpaQCyeyiaI9oDIQoFJ7P7I%2fanYIk%3d&risl=&pid=ImgRaw&r=0"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="https://th.bing.com/th/id/OIP.WpPbdoSK1O7raGoQDsHA2AHaHa?w=600&h=600&rs=1&pid=ImgDetMain"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our mission
            </h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl leading-8 text-gray-600">
                  We provide a combination of hospital, community-based and
                  in-reach services to aged, adult and paediatric patients and
                  newborn babies. Western Health also offers drug health and
                  addiction medicine support through our inpatient service and
                  community Drug Health Service.
                </p>
                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                  <p>
                    Employing more than 800 staff, Opera Surgical Centre has a
                    strong philosophy of working with our local community to
                    deliver excellence in patient care.
                  </p>
                  <p className="mt-10">
                    Opera Surgical Centre is the major healthcare provider to
                    one of the fastest growing and most diverse regions of
                    Australia. The catchment population is nearing 900,000 and
                    the birth rate and movement into this region means that
                    strong growth will continue in the years ahead. Our
                    communities are culturally rich, with members speaking more
                    than 150 different languages and dialects.
                  </p>
                </div>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse gap-y-4"
                    >
                      <dt className="text-base leading-7 text-gray-600">
                        {stat.label}
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <Image
            alt=""
            src={Banner}
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our values
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Logo cloud */}
        <div className="relative isolate -z-10 mt-32 sm:mt-48">
          <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              aria-hidden="true"
              className="h-[40rem] w-[80rem] flex-none stroke-gray-200"
            >
              <defs>
                <pattern
                  x="50%"
                  y="50%"
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-gray-50">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                width="100%"
                height="100%"
                strokeWidth={0}
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  )
}
