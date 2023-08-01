export default function InputHolder({ children, label }) {
  return (
    <>
      <div className="mb-3">
        <p className="tracking-tight  text-black-color text-lg  font-medium">
          {label}
        </p>
        {children}
      </div>
    </>
  );
}
