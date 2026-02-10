import { Avatar, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { User, LogOut, LayoutDashboard } from "lucide-react";

const ProfileMenu = ({is_authenticated}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    setOpen(false);
    window.location.href = "/auth/login";
  };

  const [pathNmae, setPathName] = useState("/");

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  return (
    <>
          {is_authenticated ? (
            <div className="relative flex items-center" ref={dropdownRef}>
              <button 
                onClick={() => setOpen(!open)}
                className="hover:opacity-80 transition-opacity"
              >
                <Avatar
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                  size="sm"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 top-full w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-700">
                  <Link
                    to={pathNmae === "/dashboard" ? "/" : "/dashboard"}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    { pathNmae === "/dashboard" ? "Home" : "Dashboard"}
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <hr className="my-1 border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavbarLink as={Link} to="/auth/login">
              Sign In / Register
            </NavbarLink>
          )}
    </>
  );
}

export default ProfileMenu;