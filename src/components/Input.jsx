export default function Input({ type, placeholder, classname }) {
  return (
    <>
      <input
        className={`${classname} input-form p-[15px]  `}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}
