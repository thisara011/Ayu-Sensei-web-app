import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Molecules/Navbar";
import img1 from "../../Assets/doctor.jpg";
import { supabase } from "../../Utils/SuperbaseClient";
import Swal from "sweetalert2";

const DocChannel = () => {
  const [showMapLink, setShowMapLink] = useState(false);
  const [bookings, setBookings] = useState([]); // Now always an array
  const [search, setSearch] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Fetch hospitals and doctors when the component mounts
  useEffect(() => {
    const fetchHospitals = async () => {
      const { data, error } = await supabase.from("Hospitals").select("*");
      if (error) {
        console.error("Error fetching hospitals:", error);
      } else {
        setHospitals(data);
      }
    };

    const fetchDoctors = async () => {
      const { data, error } = await supabase.from("Doctors").select("*");
      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        setDoctors(data);
      }
    };

    fetchHospitals();
    fetchDoctors();
  }, []);

  // Handle search button click
  const handleSearch = async () => {
    setSearch(true);

    if (!selectedHospital || !selectedDoctor) {
      console.error("Please select both a hospital and a doctor.");
      return;
    }

    try {
      // Fetch bookings for the selected hospital and doctor
      const { data: bookingData, error: bookingError } = await supabase
        .from("HospitalNDoctors")
        .select("date_available_on_week")
        .eq("hospital_id", selectedHospital)
        .eq("doctor_id", selectedDoctor);

      if (bookingError) {
        console.error("Error fetching bookings:", bookingError);
        return;
      }

      // Fetch the selected hospital
      const { data: hospitalData } = await supabase
        .from("Hospitals")
        .select("name, location_link")
        .eq("id", selectedHospital)
        .single();

      // Fetch the selected doctor
      const { data: doctorData } = await supabase
        .from("Doctors")
        .select("name, specialization")
        .eq("id", selectedDoctor)
        .single();

      if (hospitalData && doctorData) {
        // Format the booking dates
        const nextAvailableDates = bookingData.map((booking) => {
          return getNextWeekDate(booking.date_available_on_week);
        });

        setBookings(nextAvailableDates); // Set bookings as an array of dates
      }
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  };

  // Function to calculate the next week's date for a specific day
  const getNextWeekDate = (dayName) => {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    const todayDayIndex = today.getDay(); // Current day index (0 = Sunday, 1 = Monday, etc.)
    const targetDayIndex = daysOfWeek.indexOf(dayName.toLowerCase());

    if (targetDayIndex === -1) return null; // Invalid day name

    let daysUntilNext = targetDayIndex - todayDayIndex;
    if (daysUntilNext <= 0) daysUntilNext += 7;

    const nextDate = new Date();
    nextDate.setDate(today.getDate() + daysUntilNext);

    return nextDate.toDateString();
  };

  const handleBookingClick = async (selectedDate) => {
    const doctor = doctors[selectedDoctor - 1];
    const hospital = hospitals[selectedHospital - 1];
    const id = localStorage.getItem("userId");
    
    // Show SweetAlert2 Popup
    const { value: prescription } = await Swal.fire({
      title: "Enter Prescription Letter",
      input: "text",
      inputLabel: "Prescription Letter",
      inputPlaceholder: "Enter the letter...",
      showCancelButton: true,
    });
  
    if (prescription) {
      try {
        const { data, error } = await supabase.from("Prescription").insert([
          {
            hospital_id: selectedHospital,
            doc_id: selectedDoctor,
            cus_id: id,
            letter: prescription,
            date: selectedDate, // Ensure selectedDate is in the correct format
          },
        ]);
      
        if (error) {
          console.error("Error inserting data:", error.message);  // Log the specific error message
          Swal.fire("Error", `Failed to save the prescription: ${error.message}`, "error");
        } else {
          Swal.fire("Success", "Prescription saved successfully!", "success");
        }
      } catch (err) {
        console.error("Unexpected error:", err);  // Log the full error object
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
      
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginTop: "100px",
          height: "70px",
          backgroundColor: "green",
        }}
      >
        <h1 style={{ color: "white", textAlign: "center", padding: "12px" }}>
          Doctor Channeling
        </h1>
      </div>

      <div
        className="why-container"
        style={{ backgroundColor: "white", marginTop: "-20px" }}
      >
        <div className="why-content" style={{ backgroundColor: "white" }}>
          <div className="why-section" style={{ display: "flex" }}>
            {/* Left Side: Form */}
            <div className="why-text" style={{ flex: 1 }}>
              <h1 className="why-title">Channel your Doctor Now</h1>

              {/* Hospital Selector */}
              <div className="mb-3">
                <label htmlFor="hospital" className="form-label">
                  Select Hospital
                </label>
                <select
                  id="hospital"
                  className="form-control"
                  onChange={(e) => setSelectedHospital(e.target.value)}
                >
                  <option value="">-- Select Hospital --</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Selector */}
              <div className="mb-3">
                <label htmlFor="doctor" className="form-label">
                  Select Doctor
                </label>
                <select
                  id="doctor"
                  className="form-control"
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: "green" }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Right Side: Bookings */}
            <div className="bookings" style={{ flex: 1, marginLeft: "20px" }}>
              {bookings.length > 0 ? (
                <ul>
                  <h2>Next Available Booking Dates</h2>
                  {bookings.map((date, index) => (
                    <li
                    key={index}
                    style={{
                      textAlign: "left",
                      border: "2px solid black",
                      padding: "10px",
                      margin: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleBookingClick(date)} // Trigger Swal on click
                  >
                    {date} - {doctors[selectedDoctor - 1]?.name} -{" "}
                    {doctors[selectedDoctor - 1]?.specialization} <br />
                    {hospitals[selectedHospital - 1]?.name} 
                  </li>
                  ))}
                </ul>
              ) : (
                <div className="why-image">
                  <img
                    src={img1}
                    alt="Try AyurSensei"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocChannel;
