export default function Bredcrumd({ style, text }) {
  return (
    <p
      className={`text-sm rounded-full px-4 text-blue-500 border-1 border-blue-500 tracking-tight ${style}`}
    >
      {text}
    </p>
  );
}
