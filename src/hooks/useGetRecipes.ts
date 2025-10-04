import anxiosInstance from '@/lib/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export const useGetRecipes = (search?:string) => {
    return useQuery({
        queryKey: ["recipes",search],
          queryFn: async () => {
      const res = await anxiosInstance.get("/recipes", {
        params: { q: search }, // this matches the back-end
      });
      return res.data.data;
    },
    })
}

