import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

const Admin = () => {

  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const getForms = async () => {
    try {
      const response = await axios.get("/api/admin/all-forms", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setForms(response.data);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error in fetching data");
    }
  };
  useEffect(() => {
    getForms();
  }, []);


  return (
    <div className="container mx-auto mt-5">
      <div className="flex items-center justify-center">
        {forms.length > 0 ? (
          <table className="w-full md:w-[70%] table-auto border-collapse border">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {forms.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-center">{item.title}</td>
                  <td className="px-4 py-2 text-center">{item.description}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <button
                      onClick={() => navigate(`/submission/${item._id}`)}
                      className="w-28 rounded-md border-none text-sm bg-blue-500 p-2 text-white mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
                    >
                      Submissions
                    </button>
                    <button
                      onClick={() => navigate(`/form/${item._id}`)}
                      className="w-28 rounded-md border-none text-sm bg-red-500 p-2 text-white mx-2 hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300"
                    >
                      View
                    </button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-5xl">No Record Found</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
