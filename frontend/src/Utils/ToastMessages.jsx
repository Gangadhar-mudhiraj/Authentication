import { toast } from 'react-toastify';

export const successToast = (message = "Success") => {
    toast.success(message);
};

export const failToast = (message = "Something went wrong") => {
    toast.error(message);
};
