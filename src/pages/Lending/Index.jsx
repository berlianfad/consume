import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LendingIndex() {
  const [lendings, setLendings] = useState([]);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState([]);

  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  useEffect(() => {
    instance
      .get("lendings", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setLendings(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        }
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/profile", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setAuthUser(res.data.data);
        console.log(res.data)
        if (location.pathname === "/login") {
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLogin(false);
        if (err.response.status == 401 && location.pathname != "/login") {
          navigate("/login?message=" + encodeURIComponent("Anda Belum login!"));
        }
      });
  }, [navigate]);

  const deleteLending = (id) => {
    instance
      .delete(`lendings/${id}`)
      .then((res) => {
        location.reload();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const markAsSuccess = (id) => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <Case>
      <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center m-5 pb-10 pt-10">
          <div className="flex justify-between">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
              Lending
            </h5>
            <div className="flex justify-end">
              {/* Add necessary buttons */}
            </div>
          </div>
          {Object.keys(error).length > 0 && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Gagal!
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <ul>{error.message}</ul>
              </div>
            </div>
          )}
          <div className="flex mt-4 md:mt-6">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    No
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name Stuff
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lendings.map((lending, id) => (
                  <tr
                    key={lending.id}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {lending.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {lending.stuff ? lending.stuff.name : "0"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(lending.date_time).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {lending.total_stuff}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {lending.notes}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">

                      {
                        authUser["role"] === "staff" ? (
                          <>
                          <Link
                            to={`/lendings/show/${lending.id}`}
                            className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white"
                          >
                            Show
                          </Link>
                          <Link
                            to={`/lendings/edit/${lending.id}`}
                            className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/lendings/delete/${lending.id}`}
                            className="px-4 py-2 bg-green-500 rounded-lg mr-2 font-bold text-white"
                          >
                            Delete
                          </Link>
                          </>
                        ) : (
                          <>
                          <Link
                          to={`/lendings/show/${lending.id}`}
                          className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white"
                        >
                          Show
                        </Link>
                        </>
                          )}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Case>
              );
}
                     