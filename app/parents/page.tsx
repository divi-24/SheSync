import { ParentDashboard } from '@/components/ParentDashboard'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function ParentsPage() {
  return (
    <ProtectedRoute>
      <ParentDashboard />
    </ProtectedRoute>
  )
}