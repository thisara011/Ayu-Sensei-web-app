import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "./index.css";
import img from "../../Assets/doctor.jpg";
import { supabase } from "../../Utils/SuperbaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch user data where email matches from Users table
      let { data, error } = await supabase
        .from("Users") // Replace with your Supabase table name
        .select("id, password") // Fetch 'id' and 'password' fields
        .eq("email", email)
        .single(); // Expect a single row for the entered email

      if (error || !data) {
        // If no user found in Users table, check Doctors table
        ({ data, error } = await supabase
          .from("Doctors") // Replace with your Supabase table name
          .select("id, password") // Fetch 'id' and 'password' fields
          .eq("email", email)
          .single()); // Expect a single row for the entered email

        if (error || !data) {
          setErrorMessage("Email not found. Please check and try again.");
          return;
        } else {
          // Check if the password matches for doctor
          if (data.password === password) {
            const doctorId = data.id; // Get the doctor ID

            // Store doctor ID in localStorage (or sessionStorage)
            localStorage.setItem("doctorId", doctorId);

            // Redirect to doctor page
            window.location.href = `/doctor`;
            return;
          } else {
            setErrorMessage("Invalid password. Please try again.");
            return;
          }
        }
      }

      // Check if the password matches for user
      if (data.password === password) {
        const userId = data.id; // Get the user ID

        // Store user ID in localStorage (or sessionStorage)
        localStorage.setItem("userId", userId);

        // Redirect to home page
        window.location.href = `/home`;
      } else {
        setErrorMessage("Invalid password. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <MDBContainer fluid className="p-5 my-6" style={{width:'80%'}}>
      <MDBRow>
      <h1 style={{ color: 'green' }}>WELCOME TO AYU SENSEI</h1>
        <MDBCol col="10" md="6">
          <img src={img} className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol
          col="4"
          md="6"
          className="d-flex flex-column justify-content-center"
        >
          <form onSubmit={handleLogin}>
            <label style={{ width: "100%" }}>
              Email
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email"
                id="emailInput"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label style={{ width: "100%" }}>
              Password
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="passwordInput"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}

            {/* Sign In Button */}
            <MDBBtn
              type="submit"
              className="mb-4 w-100"
              style={{ backgroundColor: "green" }}
              size="lg"
            >
              Sign in
            </MDBBtn>
          </form>

          {/* Signup Option */}
          <p className="text-center">
            Don't have an account?{" "}
            <a href="signup" style={{ color: "green", textDecoration: "none" }}>
              Sign up
            </a>
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
