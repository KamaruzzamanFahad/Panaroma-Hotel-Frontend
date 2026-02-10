import { Avatar, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router";
import img from "../assets/panaroma.png"
import ProfileMenu from "./ProfileMenu";

const Navber = ({is_authenticated}) => {

  return (
    <div className="bg-gray-800">
      <Navbar fluid rounded className="container mx-auto">
        <NavbarBrand as={Link} to="/">
          <img src={img} className="mr-3 h-6 sm:h-9" alt="Panaroma Logo" />
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink as={Link} to="/about">
            About
          </NavbarLink>
          <NavbarLink as={Link} to="/services">Services</NavbarLink>
          <NavbarLink as={Link} to="/pricing">Pricing</NavbarLink>
          <NavbarLink as={Link} to="/contact">Contact</NavbarLink>
          
          <ProfileMenu is_authenticated={is_authenticated}/>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}

export default Navber;