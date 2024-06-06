import { useFormStatus } from "react-dom";

export default function Button({ children, className, formButton, onClick }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={formButton && pending}
      onClick={onClick}
      className={`bg-gradiant-color disabled:bg-opacity-50 disabled:cursor-not-allowed font-semibold text-white ${className}`}
    >
      {children}
    </button>
  );
}
