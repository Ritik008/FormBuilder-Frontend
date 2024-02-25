import React from "react";

const FormField = ({ type, label, placeholder, options, handleChange }) => {
  let inputField;
  switch (type) {
    case "text":
      inputField = (
        <input
          className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
          type="text"
          name={label}
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
      break;
    case "radio":
      inputField = options.map((option, index) => (
        <div className="flex items-center mb-4">
          <input
            id={label}
            type="radio"
            name={label}
            onChange={handleChange}
            value={option}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for={label}
            className="ml-2 text-sm font-medium text-gray-900"
          >
            {option}
          </label>
        </div>
      ));

      break;
    case "dropdown":
      inputField = (
        <select
          name={label}
          onChange={handleChange}
          className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
        >
           <option value="">
            {`Select ${label}`}
            </option>
          {options.map((option, index) => (
            <option key={index} value={option.trim()}>
              {option.trim()}
            </option>
          ))}
        </select>
      );
      break;
    case "checkbox":
      inputField = options.map((option, index) => (
        <div className="flex items-center mb-4">
          <input
            id={label}
            type="checkbox"
            value={option}
            name={label}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for={label}
            className="ml-2 text-sm font-medium text-gray-900 "
          >
            {option}
          </label>
        </div>
      ));
      break;
    default:
      inputField = null;
  }
  return (
    <div>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      {inputField}
    </div>
  );
};

export default FormField;
