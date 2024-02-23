import React, { useState } from "react";
import FormField from "../components/FormField";
import FormPublish from "./FormPublish";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('')
  const [newField, setNewField] = useState({
    type: "",
    label: "",
    placeholder: "",
    options: []
  });

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'options') {
      const options = value.split(',')
      setNewField({...newField, [name]: options})
    }else {
      setNewField({ ...newField, [name]: value });
    }
    
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index) => {
    if (index === draggedIndex) return;
    setDraggedOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex === null || draggedOverIndex === null) return;

    const updatedFields = [...fields];
    const draggedItem = updatedFields[draggedIndex];
    updatedFields.splice(draggedIndex, 1);
    updatedFields.splice(draggedOverIndex, 0, draggedItem);

    setFields(updatedFields);
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  const addField = () => {
    setFields([...fields, { ...newField }]);
    setNewField({ type: "", label: "", placeholder: "", options: [] });
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleFieldChange = (index, name, value) => {
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
  };


  const saveFormHandler = async () => {
    try {
      const response = await axios.post('/api/form', {title: formTitle, description: formDescription, fields},
      {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      if(response.status === 200) {
        alert("Form saved")
        navigate('/')
      }else {
        alert("Something went wrong")
      }
    }catch(err) {
      console.error(err)
      alert(err?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="container flex flex-col-reverse md:flex-row justify-between mt-12 mx-auto">
      <div className="md:w-[55%] w-full mx-4 md:mx-0">
        {fields.length > 0 && <h1 className="text-4xl mb-5">Form</h1>}
        {fields.map((field, index) => (
          <div
            key={index}
            className="mb-4 rounded bg-white p-2 hover:cursor-grab hover:bg-gray-100"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
          >
            <FormField
              {...field}
              onChange={(name, value) => handleFieldChange(index, name, value)}
            />
            <button
              className="p-2 rounded bg-gray-600 text-white text-sm w-17"
              onClick={() => removeField(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="md:w-[40%] w-full mx-4 md:mx-0 mb-9">
        <h1 className="text-4xl mb-5">Form Builder</h1>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            onChange={(e) => setFormTitle(e.target.value)}
            value={formTitle}
            className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Description:
          </label>
          <textarea
            type="text"
            name="description"
            onChange={(e) => setFormDescription(e.target.value)}
            value={formDescription}
            className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Type:
          </label>
          <select
            name="type"
            onChange={handleChange}
            value={newField.type}
            className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
          >
            <option value="">Select Type</option>
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="dropdown">Dropdown</option>
          </select>
        </div>
        {(newField.type === "radio" ||
          newField.type === "checkbox" ||
          newField.type === "dropdown") && (
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Options separated with commas(,):
            </label>
            <input
              type="text"
              name="options"
              value={newField.options}
              onChange={handleChange}
              className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            />
          </div>
        )}
        <div className="mb-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Label:
          </label>
          <input
            type="text"
            name="label"
            value={newField.label}
            onChange={handleChange}
            className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>
        {newField.type !== "radio" &&
          newField.type !== "checkbox" &&
          newField.type !== "dropdown" && (
            <div className="mb-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Placeholder:
              </label>
              <input
                type="text"
                name="placeholder"
                value={newField.placeholder}
                onChange={handleChange}
                className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              />
            </div>
          )}
        <div className="flex items-center">
          <button
            className="p-2 text-sm rounded mr-3 bg-blue-500 text-white w-24"
            onClick={addField}
          >
            Add Field
          </button>
          <button
            className="p-2 text-sm rounded bg-red-600 text-white w-24"
            onClick={saveFormHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
