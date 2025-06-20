import { Consultations } from '@/components/Consultations'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function ConsultationsPage() {
  return (
    <ProtectedRoute>
      <Consultations />
    </ProtectedRoute>
  )
}