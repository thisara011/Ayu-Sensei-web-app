import React, { useEffect, useState } from "react";
import { supabase } from "../../../Utils/SuperbaseClient";
import Swal from "sweetalert2";
import Navbar from "../../../Components/Molecules/Navbar";
import Footer from "../../../Components/Molecules/Footer";
import "./index.css";

const ShopHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("Products")
        .select("id, name, description, price, product_image, quantity");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle Buy Now click
  const handleBuyNow = async (product) => {
    try {
      const cus_id = localStorage.getItem("userId"); // Assuming you store the user ID in localStorage
      if (!cus_id) {
        Swal.fire({
          title: "Error",
          text: "User not logged in!",
          icon: "error",
        });
        return;
      }

      // Step 1: Prompt user for quantity
      const { value: quantityToBuy } = await Swal.fire({
        title: `How many ${product.name} would you like to buy?`,
        input: "number",
        inputAttributes: {
          min: 1,
          max: product.quantity,
          step: 1,
        },
        inputValue: 1, // Default value
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value || value < 1 || value > product.quantity) {
            return "Please enter a valid quantity";
          }
        },
      });

      // If user cancels, don't continue
      if (!quantityToBuy) {
        return;
      }

      const total_price = product.price * quantityToBuy;

      // Step 2: Prompt user for shipping address
      const { value: shippingAddress } = await Swal.fire({
        title: "Enter Shipping Address",
        input: "textarea",
        inputPlaceholder: "Enter your address here...",
        inputAttributes: {
          "aria-label": "Type your shipping address here",
        },
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "Shipping address cannot be empty";
          }
        },
      });

      // If user cancels, don't continue
      if (!shippingAddress) {
        return;
      }

      // Step 3: Dummy payment form
      const { isConfirmed } = await Swal.fire({
        title: "Payment Details",
        html: `
          <p>Total Price: Rs.${total_price}</p>
          <input type="text" id="cardNumber" class="swal2-input" placeholder="Card Number">
          <input type="text" id="cardHolder" class="swal2-input" placeholder="Card Holder Name">
          <input type="text" id="expiry" class="swal2-input" placeholder="Expiry Date (MM/YY)">
          <input type="text" id="cvv" class="swal2-input" placeholder="CVV">
        `,
        showCancelButton: true,
        confirmButtonText: "Pay Now",
        cancelButtonText: "Cancel",
        preConfirm: () => {
          const cardNumber = Swal.getPopup().querySelector("#cardNumber").value;
          const cardHolder = Swal.getPopup().querySelector("#cardHolder").value;
          const expiry = Swal.getPopup().querySelector("#expiry").value;
          const cvv = Swal.getPopup().querySelector("#cvv").value;

          if (!cardNumber || !cardHolder || !expiry || !cvv) {
            Swal.showValidationMessage("Please fill all fields!");
          }
        },
      });

      // If payment is not confirmed, don't continue
      if (!isConfirmed) {
        return;
      }

      // Step 4: Save the order in the database
      const { error } = await supabase.from("Order").insert([
        {
          cus_id,
          product_id: product.id,
          quantity: quantityToBuy,
          date: new Date().toISOString().split("T")[0], // Current date
          total_price,
          address: shippingAddress, // Save the address
        },
      ]);

      if (error) {
        console.error("Error inserting order:", error.message);
        Swal.fire({
          title: "Order Failed",
          text: "Could not place your order. Please try again!",
          icon: "error",
        });
      } else {
        // Reduce the product quantity in the 'Products' table
        const { error: updateError } = await supabase
          .from("Products")
          .update({
            quantity: product.quantity - quantityToBuy,
          })
          .eq("id", product.id);

        if (updateError) {
          console.error("Error updating product quantity:", updateError.message);
          Swal.fire({
            title: "Error",
            text: "Could not update product quantity. Please try again!",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Order Placed!",
            text: `You purchased ${quantityToBuy} of ${product.name} for Rs.${total_price}. Shipping address: ${shippingAddress}`,
            icon: "success",
          });

          // Re-fetch the product list to reflect the updated quantity
          const { data } = await supabase
            .from("Products")
            .select("id, name, description, price, product_image, quantity");
          setProducts(data);
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
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
          Ayurveda Store
        </h1>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.product_image} alt={product.name} />
            <hr />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: Rs.{product.price}</p>
            <p>Available Quantity: {product.quantity}</p>

            <button id="homecardbtn" onClick={() => handleBuyNow(product)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ShopHome;
