import Swal from "sweetalert2";

const SuccessSwal = (message: string) => {
    return Swal.fire({
        title: "Nice :)",
        text: message || "It worked!",
        icon: "success",
        timer: 5000,
        toast: true,
        position: "top-right",
    });
};

const ErrorSwal = (error: Error) => {
    return Swal.fire({
        title: "Oh no :(",
        text: error.message || "An unexpected error occurred (Blame Andrew, but also please tell him what caused this)",
        icon: "error",
        timer: 5000,
        toast: true,
        position: "top-right",
    });
};

export default {
    error: ErrorSwal,
    success: SuccessSwal,
};
