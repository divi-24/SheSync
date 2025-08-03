import { ChevronRight } from "lucide-react";

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-[#0e0f1c] border border-pink-300 dark:border-pink-600 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-base font-medium text-gray-900 dark:text-white">
          {question}
        </h4>
        <ChevronRight
          className={`text-pink-600 dark:text-pink-300 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isOpen && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {answer}
        </p>
      )}
    </div>
  );
}

export default FAQItem; // ✅ Ensure this line exists
