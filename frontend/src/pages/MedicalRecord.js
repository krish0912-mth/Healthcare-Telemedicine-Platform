import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MedicalRecord.css";

const API_URL = "https://healthcare-telemedicine-platform.onrender.com/api";
function MedicalRecord() {

  // ============================
  // USER
  // ============================

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  const { patientId } = useParams();

  // ============================
  // STATES
  // ============================

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({

    title: "",

    description: "",

    reportFile: ""

  });

  // ============================
  // INPUT CHANGE
  // ============================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  // ============================
  // GET RECORDS
  // ============================

  const getRecords = async () => {

    try {

      setLoading(true);

      setError("");

      let url = "";

      // PATIENT

      if (role === "patient") {

        url =
          `${API_URL}/records/patient`;

      }

      // DOCTOR

      else {

        url =
          `${API_URL}/records/patient/${patientId}`;

      }

      const res = await axios.get(

        url,

        {

          headers: {

            Authorization:

              `Bearer ${token}`

          }

        }

      );

      console.log(res.data);

      setRecords(res.data);

    }

    catch (err) {

      console.log(err);

      setError(

        err?.response?.data?.message ||

        "Unable to load medical records."

      );

    }

    finally {

      setLoading(false);

    }

  };

  // ============================
  // FIRST LOAD
  // ============================

  useEffect(() => {

    getRecords();

  }, [patientId]);

  // ============================
  // CREATE RECORD
  // PATIENT ONLY
  // ============================

  const createRecord = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        `${API_URL}/records`,

        form,

        {

          headers: {

            Authorization:

              `Bearer ${token}`

          }

        }

      );

      console.log(res.data);

      alert(

        "Medical Record Added Successfully"

      );

      setForm({

        title: "",

        description: "",

        reportFile: ""

      });

      getRecords();

    }

    catch (err) {

      console.log(err);

      alert(

        err?.response?.data?.message ||

        "Unable to add record."

      );

    }

  };

  // ============================
  // SEARCH
  // ============================

  const filteredRecords = useMemo(() => {

    return records.filter((record) => {

      return (

        record.title

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          ) ||

        record.description

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          )

      );

    });

  }, [

    records,

    search

  ]);
    // ============================
  // UI
  // ============================

  return (

    <div className="record-page">

      <div className="pageHeader">

        <h1>

          {role === "patient"

            ? "My Medical Records"

            : "Patient Medical Records"}

        </h1>

        <p>

          {role === "patient"

            ? "Manage all your medical reports."

            : "View patient's medical history."}

        </p>

      </div>

      {/* Search */}

      <div className="recordSearch">

        <input

          type="text"

          placeholder="Search medical records..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

      </div>

      {/* Patient Form */}

      {

        role==="patient" &&

        <div className="record-card">

          <h2>

            Add Medical Record

          </h2>

          <form onSubmit={createRecord}>

            <input

              type="text"

              name="title"

              placeholder="Record Title"

              value={form.title}

              onChange={handleChange}

              required

            />

            <textarea

              name="description"

              placeholder="Description"

              value={form.description}

              onChange={handleChange}

              required

            />

            <input

              type="text"

              name="reportFile"

              placeholder="Report File Link"

              value={form.reportFile}

              onChange={handleChange}

            />

            <button>

              Add Medical Record

            </button>

          </form>

        </div>

      }

      {/* Loading */}

      {

        loading &&

        <div className="loadingBox">

          <h2>

            Loading Records...

          </h2>

        </div>

      }

      {/* Error */}

      {

        !loading &&

        error &&

        <div className="errorBox">

          {error}

        </div>

      }

      {/* Empty */}

      {

        !loading &&

        !error &&

        filteredRecords.length===0 &&

        <div className="emptyBox">

          <h2>

            No Medical Records Found

          </h2>

        </div>

      }

      {/* Records */}

      <div className="record-list">

        {

          !loading &&

          !error &&

          filteredRecords.map((record)=>(

            <div

              className="record-item"

              key={record._id}

            >

              <div className="recordTop">

                <h2>

                  {record.title}

                </h2>

              </div>

              <p>

                {record.description}

              </p>

              {

                record.reportFile &&

                <a

                  href={record.reportFile}

                  target="_blank"

                  rel="noreferrer"

                >

                  View Report

                </a>

              }

              <p>

                <strong>

                  Created :

                </strong>

                {" "}

                {

                  new Date(

                    record.createdAt

                  ).toLocaleDateString()

                }

              </p>

              {

                role==="doctor" &&

                record.patient &&

                <div className="patientInfo">

                  <p>

                    <strong>

                      Patient :

                    </strong>

                    {" "}

                    {record.patient.name}

                  </p>

                  <p>

                    <strong>

                      Email :

                    </strong>

                    {" "}

                    {record.patient.email}

                  </p>

                </div>

              }

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default MedicalRecord;