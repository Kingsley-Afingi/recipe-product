import anxiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useUpdateRecipe = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data} :{id:number; data:any})=>{
            const res = await anxiosInstance.patch(`/recipes/${id}`,data);
            return res.data
        },
        onSuccess: ()=>{
            toast.success("recipe updated successfully")
            queryClient.invalidateQueries({queryKey:["recipes"]})
        },
        onError:(error:any)=>{
            toast.error(error.response.data.error || "faild to update recipe");
        }
    })
}