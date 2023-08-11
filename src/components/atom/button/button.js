export default function Button({ text, styles, Icon }) {
  return (
    <button
      className={`px-5 flex flex-row items-center justify-center py-1 bg-primary-color rounded-full ${styles}`}
    >
      <p className="font-medium text-white text-md text-primary-color tracking-tight">
        {text}
      </p>
      {Icon ? <Icon className="ml-2 text-xl text-white" /> : ""}
    </button>
  );
}
