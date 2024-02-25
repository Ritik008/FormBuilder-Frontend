import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant";

const FormPreview = () => {
  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const { id } = useParams();
  
  const getForm = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/form/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setForm(response.data);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error in fetching form");
    }
  };


  useEffect(() => {
    getForm();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues({ ...fieldValues, [name]: value });
  };
  const submitForm = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/form/submit-form/${id}`,
        fieldValues,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        alert("Data submitted successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const getFormData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/form/submit-data/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setFormData(response.data);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to fetch data");
    }
  };

  const fieldNames = Array.from(
    new Set(formData.flatMap((data) => Object.keys(data.formData)))
  );
  useEffect(() => {
    getFormData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container mb-5 sm:w-[90%] md:w-[80%] lg:w-[50%] border p-5 m-auto mt-5 bg-[#f1f1f1]">
        {Object.keys(form).length > 0 && (
          <>
            <h1 className="text-4xl mb-5">{form?.title}</h1>
            <p className="mb-5 block text-justify">{form?.description}</p>
            <form onSubmit={submitForm}>
              {form.fields.map((field, index) => (
                <FormField key={index} {...field} handleChange={handleChange} />
              ))}
              <button
                className="p-2 text-sm rounded mr-3 mb-5 bg-teal-600 text-white w-24"
                type="submit"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
      <div className="w-[50%]">
      <table className="table-auto w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-200">
          <tr>
            {fieldNames.map((field, index) => (
              <th
                key={index}
                className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {formData.map((item, dataIndex) => (
            <tr key={dataIndex}>
              {fieldNames.map((key, index) => (
                <td
                  key={index}
                  className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                >
                  {item.formData[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default FormPreview;
