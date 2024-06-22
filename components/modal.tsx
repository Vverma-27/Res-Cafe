import { useEffect, useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  notClosable,
}: {
  isOpen: boolean;
  onClose?: () => void;
  children: JSX.Element;
  notClosable?: boolean;
}) => {
  if (!isOpen) return null;
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
