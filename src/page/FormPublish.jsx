import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import { useParams } from "react-router-dom";
import axios from "axios";

const FormPreview = () => {
  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const { id } = useParams();
  const getForm = async () => {
    try {
      const response = await axios.get(`/api/form/${id}`, {
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
        `/api/form/submit-form/${id}`,
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
      const response = await axios.get(`/api/form/submit-data/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setFormData(response.data);
      } else {
        alert("Somethin went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to fetch data");
    }
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container sm:w-[90%] md:w-[80%] lg:w-[50%] border p-5 m-auto mt-5 bg-[#f1f1f1]">
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
    </div>
  );
};

export default FormPreview;