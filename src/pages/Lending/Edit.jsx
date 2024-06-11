import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function LendingEdit() {
  const [forms, setForms] = useState({
    stuff_id: "",
    stuff: { name: "" },
    date_time: "",
    name: "",
    user_id: "",
    notes: "",
    total_stuff: "",
  });

  const params = useParams();
  const id = params.id;

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  useEffect(() => {
    instance
      .get(`lendings/${id}`)
      .then((res) => {
        // Jika data stuff tidak ada, inisialisasi dengan objek kosong
        const lendingData = res.data.data;
        if (!lendingData.stuff) {
          lendingData.stuff = { name: "" };
        }
        setForms(lendingData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  const handleEditLending = (event) => {
    event.preventDefault();

    instance
      .put(`lendings/${id}, forms`)
      .then((res) => {
        setSuccess(true);
        setError([]);
        setTimeout(() => {
          navigate("/lending");
        });
      })
      .catch((err) => {
        setError(err.response.data);
        setSuccess(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({
      ...prevForms,
      [name]: value,
    }));
  };

  const handleStuffNameChange = (e) => {
    const { value } = e.target;
    setForms((prevForms) => ({
      ...prevForms,
      stuff: { ...prevForms.stuff, name: value },
    }));
  };

  return (
    <Case name="Lending Edit">
      <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center m-5 pb-10 pt-10">
          {Object.keys(error).length > 0 && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Gagal!
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <ul>
                  {Object.entries(error).map(([key, value], i) => (
                    <li key={key}>{`key !== "status" ? ${
                      i + 1
                    }. ${value} : ""`}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {success && (
            <div role="alert">
              <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                Berhasil!
              </div>
              <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                Data berhasil diperbarui.
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
              Edit Lending
            </h5>
          </div>
          <form onSubmit={handleEditLending} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="stuff_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stuff ID
              </label>
              <input
                type="text"
                id="stuff_id"
                name="stuff_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={forms.stuff_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="stuff_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name Stuff
              </label>
              <input
                type="text"
                id="stuff_name"
                name="stuff_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={forms.stuff.name}
                onChange={handleStuffNameChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="date_time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="datetime-local"
                id="date_time"
                name="date_time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={forms.date_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={forms.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="user_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User ID
              </label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={forms.user_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="notes"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={forms.notes}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="total_stuff"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Stuff
              </label>
              <input
                type="number"
                id="total_stuff"
                name="total_stuff"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={forms.total_stuff}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Case>
  );
}
