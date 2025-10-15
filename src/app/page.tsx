
import Banner from "@/components/layout/Banner"
import SkeletonLoader from "@/components/SkeletonLoader"
import RecipeList from "@/recipes/RecipeList"
import { Suspense } from "react"



const page = () => {
  return (
    <div className="">
     <Banner/>
     {/* <Register/>  */}
     {/* <RecipeList/> */}
      <Suspense fallback={<SkeletonLoader/>}>
      <RecipeList />
    </Suspense>
    </div>
  )
}

export default page