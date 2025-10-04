"use client"
import RecipeForm from "@/recipes/RecipeForm"
import { useState } from "react"
import Modal from "./Modal"

const AddRecipeModal = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <>
        <button onClick={()=>setIsOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            Add New Recipe
        </button>
        <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
            <RecipeForm onClose={()=>setIsOpen(false)}/>

        </Modal>
    </>
  )
}

export default AddRecipeModal