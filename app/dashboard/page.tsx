import { Dashboard } from '@/components/Dashboard'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}