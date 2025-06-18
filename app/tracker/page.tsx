import { PeriodTracker } from '@/components/PeriodTracker'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function TrackerPage() {
  return (
    <ProtectedRoute>
      <PeriodTracker />
    </ProtectedRoute>
  )
}