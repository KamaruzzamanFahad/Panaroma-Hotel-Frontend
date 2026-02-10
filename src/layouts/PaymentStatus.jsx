import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");

    useEffect(() => {

        if (status === "success") {
            toast.success("Payment successful");
        } else if (status === "fail") {
            toast.error("Payment failed");
        } else if (status === "cancel") {
            toast.warn("Payment cancelled");
        }
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 2000);
    }, [status]);

    return <ToastContainer />;
};

export default PaymentStatus;
