import React from 'react'
import Navbar from './navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default DashboardLayout
