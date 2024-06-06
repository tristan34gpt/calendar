import { useFormStatus } from "react-dom";

export default function Button({ children, className, formButton }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={formButton && pending}
      className={`bg-gradiant-color disabled:bg-opacity-50 disabled:cursor-not-allowed font-semibold text-white ${className}`}
    >
      {children}
    </button>
  );
}
