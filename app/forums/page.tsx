import  Forum  from '@/components/Forum'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function ForumsPage() {
  return (
    <ProtectedRoute>
      <Forum />
    </ProtectedRoute>
  )
}