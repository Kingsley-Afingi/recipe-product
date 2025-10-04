
import Banner from "@/components/layout/Banner"
import RecipeList from "@/recipes/RecipeList"
// import Register from "./register/page"



const page = () => {
  return (
    <div className="">
     <Banner/>
     {/* <Register/>  */}
     <RecipeList/>
    </div>
  )
}

export default page