export default function Input({ type, placeholder, classname, name }) {
  return (
    <>
      <input
        className={`${classname} input-form p-[15px]  `}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
}
