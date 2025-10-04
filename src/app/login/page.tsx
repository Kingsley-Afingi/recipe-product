"use client"
import CustomInput from "@/components/CustomAuth-input";
import anxiosInstance from "@/lib/axiosInstance";
import { useCartStore } from "@/store/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {z} from "zod"

const loginSchema= z.object({
    email: z.string().email({
        message:("invalid email address")
    }),
    password: z.string().min(3,{
        message: "password must be atleast 6 character "
    }).max(100),
})
type loginSchemaData =z.infer<typeof loginSchema>;
const Login = () => {
    const router = useRouter();
    const {control,handleSubmit} = useForm<loginSchemaData>({
    defaultValues: {
        email: "",
        password: "",
    },
    resolver: zodResolver(loginSchema),
})
const onSubmit = (data: loginSchemaData)=>{
    mutation.mutate(data)
    console.log(data)
}
// 
const mutation = useMutation({
    mutationFn: async (payload: loginSchemaData)=>{
        const res =await anxiosInstance.post("/auth/login",payload)
        return res.data
        console.log(res)
    },
    // onSuccess: ()=>{
    //     toast.success("login succefull",{duration:2000})
    //     setTimeout(()=>router.push("/"),1500)
    // },

    
    onSuccess: async (res) => {
  toast.success("Login successful", { duration: 2000 });

  const userId = res.data.user.id; // from Supabase response
  const { fetchCartFromDB } = useCartStore.getState();

  await fetchCartFromDB(userId); // 🟢 Load user’s cart from DB

  setTimeout(() => router.push("/"), 1500);
},



    onError: (error:any)=>{
        toast.error(error.response?.data.message || error.message || "login failed",{duration:3000})

    }
})
  return (
    <>
    <form action="" onSubmit={handleSubmit(onSubmit)} className="bg-black lg:w-[40%] w-full p-2  mx-auto rounded-xl space-y-4">
        <CustomInput
        name="email"
        label="Email"
        type="email"
        control={control}
        placeholder="email"
        required
        />

        <CustomInput
        label="Password"
        name="password"
        placeholder="password"
        type="password"
        control={control}
        required
        />
        <button type="submit" className="bg-blue-600 text-white w-full rounded-xl px-4 py-2 ">
            {mutation.isPending ? "Login..." : "Login"}
        </button>
         <p className="text-white">
        Dont have account ? {""} 
        <Link href="/register">register</Link>
       </p>
       <p className="text-white">
        
       </p>
    </form>
    </>
  )
}

export default Login