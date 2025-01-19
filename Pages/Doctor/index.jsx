import React, { useState, useEffect } from "react";
import { supabase } from "../../Utils/SuperbaseClient";
import NavbarDoctor from "../../Components/Molecules/NavbarDoctor";

const Doctorpage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const loggedDoctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    async function fetchDoctorName() {
      try {
        const { data: doctor, error } = await supabase
          .from("Doctors")
          .select("name")
          .eq("id", loggedDoctorId)
          .single();

        if (error) {
          console.error("Error fetching doctor name:", error);
          return;
        }
        setDoctorName(doctor.name);
      } catch (error) {
        console.error("Error fetching doctor name:", error);
      }
    }

    async function fetchAppointments() {
      try {
        const { data: prescriptions, error: prescriptionError } = await supabase
          .from("Prescription")
          .select("id, letter, date, cus_id, doc_id, hospital_id")
          .eq("doc_id", loggedDoctorId);

        if (prescriptionError) {
          console.error("Error fetching prescriptions:", prescriptionError);
          return;
        }

        const { data: users, error: usersError } = await supabase
          .from("Users")
          .select("id, name");

        if (usersError) {
          console.error("Error fetching users:", usersError);
          return;
        }

        const { data: hospitals, error: hospitalsError } = await supabase
          .from("Hospitals")
          .select("id, name");

        if (hospitalsError) {
          console.error("Error fetching hospitals:", hospitalsError);
          return;
        }

        const { data: hospitalNDoctors, error: hospitalNDoctorsError } = await supabase
          .from("HospitalNDoctors")
          .select("doctor_id, hospital_id, time");

        if (hospitalNDoctorsError) {
          console.error("Error fetching hospitalNDoctors:", hospitalNDoctorsError);
          return;
        }

        const combinedData = prescriptions.map((prescription) => ({
          ...prescription,
          customerName: users.find((user) => user.id === prescription.cus_id)?.name,
          hospitalName: hospitals.find((hospital) => hospital.id === prescription.hospital_id)?.name,
          time: hospitalNDoctors.find(
            (entry) =>
              entry.doctor_id === prescription.doc_id &&
              entry.hospital_id === prescription.hospital_id
          )?.time,
        }));

        setAppointments(combinedData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }

    fetchDoctorName();
    fetchAppointments();
  }, [loggedDoctorId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  return (
    <div>
      <NavbarDoctor />
      <div style={{ marginTop: "15%" }}></div>
      <h1>Upcoming Prescription List</h1>
      <h4>Doctor - {doctorName}</h4>
      <div
        style={{
          overflowX: "auto",
          margin: "20px auto",
          maxWidth: "80%",
        }}
      >
        <table
          className="table"
          style={{ width: "100%", border: "1px solid black" }}
        >
          <thead className="thead-dark">
            <tr>
              <th style={{ border: "1px solid black" }} scope="col">
                Appointment No
              </th>
              <th style={{ border: "1px solid black" }} scope="col">
                Patient Name
              </th>
              <th style={{ border: "1px solid black" }} scope="col">
                Hospital
              </th>
              <th style={{ border: "1px solid black" }} scope="col">
                Prescription
              </th>
              <th style={{ border: "1px solid black" }} scope="col">
                Date
              </th>
              <th style={{ border: "1px solid black" }} scope="col">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={{ border: "1px solid black" }}>{appointment.id}</td>
                <td style={{ border: "1px solid black" }}>{appointment.customerName}</td>
                <td style={{ border: "1px solid black" }}>{appointment.hospitalName}</td>
                <td style={{ border: "1px solid black" }}>{appointment.letter}</td>
                <td style={{ border: "1px solid black" }}>{appointment.date}</td>
                <td style={{ border: "1px solid black" }}>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
        class="btn btn-info"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ margin: "0 10px" }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
        class="btn btn-info"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ margin: "0 10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Doctorpage;
