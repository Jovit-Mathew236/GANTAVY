import Select, { StylesConfig } from "react-select";
export default function SelectInput({
  defaultValue,
  isMulti,
  options,
  value,
  onChange,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.1rem",
      border: state.isFocused
        ? "1.7px solid #236bfe"
        : "1.7px solid rgba(209,213,219,1)",
      boxShadow: "none",
      color: "#070707",
      borderRadius: "0.375rem",
      "&:hover": {
        border: "1.7px solid rgba(209,213,219,1)",
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      color: "#070707",
      borderRadius: 1000,
      padding: ".05rem .8rem",
      backgroundColor: "rgb(219,234,254)",
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "#236bfe",
      fontWeight: 500,
      borderRadius: 1000,
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: "#236bfe",
      borderRadius: 1000,
      "&:hover": {
        backgroundColor: "rgb(219,234,254)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#f0f0f0"
        : "white",
      color: state.isSelected ? "white" : "#070707",
      "&:hover": {
        backgroundColor: state.isSelected ? "#007bff" : "#f0f0f0",
        color: state.isSelected ? "white" : "black",
      },
    }),
    menu: (provided) => ({
      ...provided,
      border: "1.7px solid rgba(209,213,219,1)",
      color: "#070707",
      boxShadow: "none",
      borderRadius: "0.375rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#070707",
    }),
  };
  return (
    <Select
      onChange={onChange}
      closeMenuOnSelect={true}
      defaultValue={defaultValue}
      isMulti={isMulti}
      styles={customStyles}
      options={options}
      value={value}
    />
  );
}
