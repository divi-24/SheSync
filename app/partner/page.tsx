import  Diagnosis  from '@/components/PartnerDashboard'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function PartnerPage() {
  return (
    <ProtectedRoute>
      <Diagnosis />
    </ProtectedRoute>
  )
}