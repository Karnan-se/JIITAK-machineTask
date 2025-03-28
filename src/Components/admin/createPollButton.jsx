import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import { Plus } from "lucide-react"

export function CreatePollButton({setNewPoll}) {
  return (
    <Button  onClick={()=> setNewPoll((prev)=> !prev)}
       >
        <Plus className="mr-2 h-4 w-4" />
        Create Poll
      
    </Button>
  )
}

