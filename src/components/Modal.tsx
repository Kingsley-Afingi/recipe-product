import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?:string
}
export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;
  const stop: React.MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();
  return (
    <div
      className="fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className=" p-6 rounded-lg shadow-lg relative w-[400px] h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <button
        className="absolute top-0 right-2 text-gray-200 hover:text-gray-5   00"
        onClick={onClose}
      >
        close
      </button>
    </div>
  );
}
