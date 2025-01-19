import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBRipple
} from 'mdb-react-ui-kit';
import img1 from '../../../Assets/flat-lay-herbal-therapy-products.jpg';


export default function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#4A4A4A' }}>
      <MDBContainer className='p-4'>
        
        {/* Footer Content */}
        <section>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              
              {/* About Section */}
              <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon='spa' className='me-3' />
                  Ayur Sensei
                </h6>
                <p>
                  Discover the ancient wisdom of Ayurveda with Ayur Sensei. From herbal remedies to holistic wellness solutions, we are here to guide you on your journey to health and harmony.
                </p>
              </MDBCol>

              {/* Products Section */}
              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                <p>
                  <a href='shop' className='text-reset'>
                    Herbal Supplements
                  </a>
                </p>
                <p>
                  <a href='shop' className='text-reset'>
                    Skin Care
                  </a>
                </p>
                <p>
                  <a href='shop' className='text-reset'>
                    Hair Care
                  </a>
                </p>
                <p>
                  <a href='shop' className='text-reset'>
                    Detox Kits
                  </a>
                </p>
              </MDBCol>

              {/* Useful Links */}
              <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful Links</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Consultations
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Ayurveda 101
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    FAQs
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Contact Us
                  </a>
                </p>
              </MDBCol>

              {/* Contact Details */}
              <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon icon='map-marker-alt' className='me-2' />
                  Colombo, Sri Lanka
                </p>
                <p>
                  <MDBIcon icon='envelope' className='me-3' />
                  info@ayursensei.com
                </p>
                <p>
                  <MDBIcon icon='phone' className='me-3' /> +94 87 446 54321
                </p>
                <p>
                  <MDBIcon icon='whatsapp' className='me-3' /> +94 87 654 32109
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        

      </MDBContainer>

      {/* Footer Copyright */}
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        © 2024 Ayur Sensei. All rights reserved. 
        <a className='text-reset fw-bold ms-2' href='https://AyurSensei.com/'>
          AyurSensei.com
        </a>
      </div>
    </MDBFooter>
  );
}
