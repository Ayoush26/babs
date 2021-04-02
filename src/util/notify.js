import toast from 'cogo-toast';

export const notify = {
    success: (msg)=>{
       return toast.success(msg)
    },
    error: (msg)=>{
       return toast.error(msg)
    }
}