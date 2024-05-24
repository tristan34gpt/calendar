export default function Button({ children, className }) {
  return (
    <button className={`bg-gradiant-color ${className}`}>{children}</button>
  );
}
