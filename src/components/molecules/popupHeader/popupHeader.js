export default function PopupHeader({ heading, content }) {
  return (
    <div className="p-6 pb-0 px-8">
      <div className="">
        <p className="tracking-tight text-black-color  text-2xl font-medium">
          {heading}
        </p>
        <p className="tracking-tight text-gray-400 mb-4  leading-tight">
          {content}
        </p>
      </div>
    </div>
  );
}
