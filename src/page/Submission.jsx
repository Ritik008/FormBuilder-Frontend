import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Submission = () => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  
  const getFormSubmissionData = async () => {
    try {
      const response = await axios.get(`/api/form/submit-data/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setSubmissions(response.data);
    } catch (err) {
      console.log(err);
      alert("Error in fetching data");
    }
  };

  const fieldNames = Array.from(
    new Set(submissions.flatMap((data) => Object.keys(data.formData)))
  );

  useEffect(() => {
    getFormSubmissionData();
  }, []);

  return (
    <div className="container mx-auto w-full max-w-screen-lg mt-20">
      <table className="table-auto w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-200">
          <tr>
            {fieldNames.map((field, index) => (
              <th
                key={index}
                className="px-6 py-3 text-sm text-gray-800 font-bold uppercase tracking-wider"
              >
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.map((item, dataIndex) => (
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
  );
};

export default Submission;
