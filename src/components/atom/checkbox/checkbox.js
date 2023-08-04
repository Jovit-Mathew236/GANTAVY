export default function CheckBox({ checked, onChange, defaultChecked }) {
  return (
    <input
      id="bordered-checkbox-2"
      type="checkbox"
      value=""
      checked={checked}
      onChange={onChange}
      name="bordered-checkbox"
      className="w-4 h-4 text-blue-100 bg-gray-100  rounded "
    />
  );
}
