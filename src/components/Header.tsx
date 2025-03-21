'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import LogoImage from '../../src/images/logo.png';
import Image from 'next/image';

interface MenuIconProps extends React.SVGProps<SVGSVGElement> { }

function MenuIcon(props: MenuIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface ChevronUpIconProps extends React.SVGProps<SVGSVGElement> { }

function ChevronUpIcon(props: ChevronUpIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
}

function MobileNavLink({ href, children }: MobileNavLinkProps) {
  return (
    <PopoverButton
      as={Link}
      href={href}
      className="block text-base leading-7 tracking-tight text-gray-700"
    >
      {children}
    </PopoverButton>
  )
}

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white z-50">
      <nav>
        <Container className="relative z-50 flex justify-between py-4">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Image
                src={LogoImage}
                alt="Logo"
                width={500}
                height={300}
                className="h-10 w-auto"
              />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <PopoverButton
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {open ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )}
                  </PopoverButton>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <PopoverBackdrop
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <PopoverPanel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -32, transition: { duration: 0.2 } }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/services">Services</MobileNavLink>
                            <MobileNavLink href="/about">About us</MobileNavLink>
                            <MobileNavLink href="/contact">Contact us</MobileNavLink>
                            <MobileNavLink href="/feedback">Feedback</MobileNavLink>
                            <MobileNavLink href="/pharmacy">Pharmacy</MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <Button href="/login" variant="outline">Log in</Button>
                            <Button href="/appointment">Book an Appointment</Button>
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            <Button href="/login" variant="outline" className="hidden lg:block">
              Log in
            </Button>
            <Button href="/appointment" className="hidden lg:block">
              Book an Appointment
            </Button>
          </div>
        </Container>
      </nav>
    </header>
  )
}
