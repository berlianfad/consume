import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccessMessage } from "../../Utils/Swal";

export default function LendingReturn({ data, onClose }) {
  const [forms, setForms] = useState({
    date_time: "",
    total_good_stuff: 0,
    total_defect_stuff: 0,
  });

  const Lending = data;

  const [error, setError] = useState([]);

  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: "Bearer" + localStorage.getItem("access_token"),
    },
  });

  const handleReturnLend = (event) => {
    event.preventDefault();

    instance
      .post(`restoration/${data.id}`, forms)
      .then((res) => {
        showSuccessMessage("berhasil ubah data barang");
        onClose();
      })
      .catch((err) => {
        setError(err.response.data.data);
        console.log(err.response);
      });
  };
  return (
    <div className="items-center m-5 mt-0 pb-10 pt-0">
      {Object.keys(error).length > 0 ? (
        <div role="alert" className="mb-4">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Gagal!
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <ul>
              {typeof error == "string"
                ? error
                : Object.entries(error).map(([key, value], i) => (
                    <li key={key}>
                      {key != "status" ? i + 1 + ". " + value : ""}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
      {lending ? (
        <table className="mx-2">
          <tr>
            <td className="font-bold">Detail Barang</td>
          </tr>
          <tr>
            <td>Barang</td>
            <td>:</td>
            <td>{lending.stuff.name}</td>
          </tr>
          <tr>
            <td>Tanggal</td>
            <td>:</td>
            <td>{lending.date_time}</td>
          </tr>
          <tr>
            <td>Total barang yang dipinjam</td>
            <td>:</td>
            <td>{lending.total_stuff}</td>
          </tr>
        </table>
      ) : (
        ""
      )}

      <hr className="my-4" />

      <form onSubmit={handleReturnLend} class="max-w-sm mx-auto">
        <div class="mb-5">
          <label
            for="date_time"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Waktu kembali
          </label>
          <input type="datetime-local" id="date_time" class=""></input>
        </div>
      </form>
    </div>
  );
}
