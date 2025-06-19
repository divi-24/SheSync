import { ChevronRight } from "lucide-react";

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-gray-300 rounded p-4 transition-all duration-200"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium">{question}</h4>
        <ChevronRight
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isOpen && <p className="mt-2 text-sm text-gray-700">{answer}</p>}
    </div>
  );
}

export default FAQItem; // ✅ Ensure this line exists
