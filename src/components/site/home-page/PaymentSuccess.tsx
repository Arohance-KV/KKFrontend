import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {

    const navigate = useNavigate();

    return (
        <section className="w-full min-h-screen flex justify-center items-center text-xl p-4 inria-serif-regular flex-col gap-4 text-[#E1C6B3]">
            <p>
                Your payment has been successfully been processed, we will process your order as soon as possible
            </p>
            <Button className="bg-[#E1C6B3] text-white flex justify-center items-center gap-2" onClick={(e) => {
                e.preventDefault();
                navigate("/");
            }}>Go to home <Home /></Button>
        </section>
    );
}