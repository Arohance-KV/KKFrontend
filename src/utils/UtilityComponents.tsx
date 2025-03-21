import { CircleAlert, CircleCheck, CircleX } from "lucide-react";

export const ToastSuccess = () => {
    return <CircleCheck className="w-4 h-4 text-green-500" />;
  };
  
export const ToastFaliure = () => {
    return <CircleX className="w-4 h-4 text-red-500" />;
};

export const ToastWarning = () => {
    return <CircleAlert className="w-4 h-4 text-yellow-500" />;
};
  