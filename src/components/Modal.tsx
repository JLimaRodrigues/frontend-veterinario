import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-full max-w-4xl mx-4 relative">
        <button className="absolute top-4 right-4 text-gray-600 dark:text-gray-300" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
