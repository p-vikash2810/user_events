const CustomInput = ({
  label,
  type,
  name,
  value,
  handleChange,
  placeholder,
  error,
  labelClass,
  checked
}) => {
  return (
    <div>
      <label className={labelClass}>
        <b>{label}</b>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          checked={checked}
        />
      </label>
      <p className="error"> {error}</p>
    </div>
  );
};

export default CustomInput;
