import React from "react";
import "./InputFields.css";

function InputFields({ label,type, onChange, value, name,placeholder,pattern,error,required }) {
  return (
    <div
    className="inputClassName"
    >
        <label>
            {label}
        </label>
      <input
       placeholder={"Enter "+label}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        autoComplete="false"
        autoFocus={false}
        required={required ?? true}
        // pattern={pattern}
        id={name}
      />
     {error && error
     [name] && <span style={{color:"red"}}>
        {error[name]}
      </span>}
    </div>
  );
}

export default InputFields;
