import Cookies from '@/components/Cookies'
import { Hero } from '@/components/Hero'
import { Reviews } from '@/components/Reviews'


export default function Home() {
  return (
    <>
    <Cookies />
      <Hero />
      <Reviews />
    </>
  )
}
