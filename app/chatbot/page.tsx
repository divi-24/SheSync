import  {Chatbot}  from '@/components/Chatbot'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function ChatbotPage() {
  return (
    <ProtectedRoute>
      <Chatbot />
    </ProtectedRoute>
  )
}