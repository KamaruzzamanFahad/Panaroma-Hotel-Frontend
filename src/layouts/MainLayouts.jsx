import { Outlet } from "react-router"
import Navber from "./Navber"
import Footer from "./Footer"
import { ToastContainer } from "react-toastify"

const MainLayouts = () => {
    const is_authenticated = localStorage.getItem("access");
    return (
        <>
        <ToastContainer />
            <Navber is_authenticated={is_authenticated} />
            <div className="min-h-screen">
                <Outlet is_authenticated={is_authenticated} />
            </div>
            <Footer />
        </>
    )
}

export default MainLayouts