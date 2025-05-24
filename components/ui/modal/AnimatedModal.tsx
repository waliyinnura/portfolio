"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * Provides the modal context to the children components.
 *
 * @param {ReactNode} children Children components that will have access to the modal context.
 * @returns {JSX.Element} The children component with the modal context.
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

/**
 * Custom hook to access the modal context.
 *
 * @returns {ModalContextType} The current modal context value.
 * @throws Will throw an error if used outside of a ModalProvider.
 * @example
 * const { open, setOpen } = useModal();
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
