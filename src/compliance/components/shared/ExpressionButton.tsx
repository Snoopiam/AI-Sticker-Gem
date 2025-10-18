// src/compliance/components/shared/ExpressionButton.tsx
// A reusable button component for selecting expressions

interface ExpressionButtonProps {
  name: string;
  icon: string;
  description: string;
  category: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ExpressionButton: React.FC<ExpressionButtonProps> = ({ 
  name, 
  icon, 
  isSelected, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      title={name}
      className={`px-2 py-2 rounded-lg text-lg font-medium transition-all flex flex-col items-center justify-center gap-1 ${
        isSelected
          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs">{name}</span>
    </button>
  );
};

