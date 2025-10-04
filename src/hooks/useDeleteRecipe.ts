import anxiosInstance from '@/lib/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner';

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id:number)=>{
            return anxiosInstance.delete(`/recipes/${id}`);

        },

        onSuccess: ()=>{
            toast.success("Recipe deleted successfully")
            queryClient.invalidateQueries({queryKey:["recipes"]})
        },
        onError:(error:any)=>{
            toast.error(error.response?.data?.error || "Failed to delete recipe")
        }
    })
 

}