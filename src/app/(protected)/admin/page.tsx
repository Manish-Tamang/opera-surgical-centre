'use client'
import { withAuth } from '@/components/withAuth'

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      {/* Admin content here */}
    </div>
  )
}

export default withAuth(AdminPage)
