
import  SymptomAnalysis  from '@/components/SymptomAnalysis'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function SymptomAnalyzerPage() {
  return (
    <ProtectedRoute>
      <SymptomAnalysis />
    </ProtectedRoute>
  )
}