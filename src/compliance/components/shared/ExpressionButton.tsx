// src/compliance/components/shared/ExpressionButton.tsx
// A reusable button component for selecting expressions

interface ExpressionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ExpressionButton: React.FC<ExpressionButtonProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
        isSelected
          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );
};

