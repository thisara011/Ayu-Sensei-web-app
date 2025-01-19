import imglogo from "../../../Assets/Screenshot 2024-09-14 101016.png"
const NavbarDoctor = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
        style={{ borderBottom: "1px solid gray" }}
      >
        <div className="container-fluid ">
          <a className="navbar-brand" href="/">
            <img id="imglogo" src={imglogo} alt="Logo"></img>
          </a>
        </div>
        <h3 className="" style={{width:"20%"}}>Doctor Dashboard</h3>
      </nav>
    </div>
  );
};

export default NavbarDoctor;
