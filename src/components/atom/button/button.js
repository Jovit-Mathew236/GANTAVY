export default function Button({ text, styles }) {
  return (
    <button className={`px-5 py-1 bg-primary-color rounded-full ${styles}`}>
      <p className="font-medium text-white text-md text-primary-color tracking-tight">
        {text}
      </p>
    </button>
  );
}
