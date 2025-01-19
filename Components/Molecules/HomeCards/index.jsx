import React from "react";
import img1 from "../../../Assets/top-view-mint-cinnamon-with-spices-white-ingredients-leaves.jpg";
import img2 from '../../../Assets/flat-lay-herbal-therapy-products.jpg';
import img3 from '../../../Assets/high-angle-therapist-helping-woman-heal.jpg';
import { RiPsychotherapyFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import ButtonHomeCards from "../../Atoms/ButtonHomeCards";
import './index.css';

const HomeCards = () => {
    return(
        <div>
            <div class="card-group" style={{width:'80%',margin:'0 auto',marginTop:'60px'}}>
  <div class="card" >
    <img src={img1} class="card-img-top" alt="..."/>
    <RiPsychotherapyFill size={100} color="white" style={{margin:'0 auto',marginTop:'-50px',backgroundColor:'green',padding:'10px',borderRadius:'50%'}}/>
    <div class="card-body">
      <h5 class="card-title">Body Constitution</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <div style={{marginTop:'12%'}}></div>
      <ButtonHomeCards title="Check Now" href="checkup"/>
    </div>
  </div>
  <span className="vertical-line"></span>
  <div class="card">
    <img src={img2} class="card-img-top" alt="..."/>
    <FaUserDoctor size={100} color="white" style={{margin:'0 auto',marginTop:'-50px',backgroundColor:'green',padding:'10px',borderRadius:'50%'}}/>
    <div class="card-body">
      <h5 class="card-title">Ayurvedic Medicine</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <div style={{marginTop:'20%'}}></div>
      <ButtonHomeCards title="See Medicines" href="shop" />
    </div>
  </div>
  <span className="vertical-line"></span>
  <div class="card">
    <img src={img3} class="card-img-top" alt="..."/>
    <FaUserNurse size={100} color="white" style={{margin:'0 auto',marginTop:'-50px',backgroundColor:'green',padding:'10px',borderRadius:'50%'}}/>
    <div class="card-body">
      <h5 class="card-title">Therapies</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <div style={{marginTop:'7%'}}></div>
      <ButtonHomeCards title="Book Now" href="bla"/>
    </div>
  </div>
</div>
        </div>
    )
}

export default HomeCards;