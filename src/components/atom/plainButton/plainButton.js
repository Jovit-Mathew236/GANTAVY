export default function PlainButton({ styles, text }) {
  return (
    <div
      className={`m-1 text-black-color tracking-tight cursor-pointer  p-2 border-1 rounded-md hover:border-primary-color border-spacing-2 ${styles}`}
    >
      {text}
    </div>
  );
}
