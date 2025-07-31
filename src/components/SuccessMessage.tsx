import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="flex items-center space-x-3 text-green-600">
        <CheckCircle size={24} />
        <span className="text-lg font-medium">{message}</span>
      </div>
    </div>
  );
};

export default SuccessMessage;