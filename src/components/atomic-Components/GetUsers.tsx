import React from 'react'
import newRequest from '@/utils/newRequest'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { User } from '@/types/types'
  import { useState, useEffect } from 'react'
  
interface GetUserProps {
    onSelectUser : (userId:string) => void;
}


const GetUsers : React.FC<GetUserProps> = ({onSelectUser}) => {
    const [user,setUser] = useState<User>([]);
    const [selectedUser, setSelectedUser] = useState<User>();


    useEffect(()=>{
        const fetchUsers = async () =>{
            try {
                
            } catch (error) {
                
            }
        }
    },[])

  return (
    <div>
    <Select>
        <SelectTrigger >
            <SelectValue placeholder="Select a staff" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectItem value={''} ></SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
      
    </div>
  )
}

export default GetUsers
