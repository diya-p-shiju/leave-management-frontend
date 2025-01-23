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
    const [users,setUsers] = useState<User>([]);
    const [selectedUser, setSelectedUser] = useState<User>();


    useEffect(()=>{
        const fetchUsers = async () =>{
            try {
                const response = axios.get("/users/");
                console.log(response);
                setUsers(response.data);
                
            } catch (error) {
                console.log("error while fetching users",error);
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
                {
                    users.map((user)=>{
                        <SelectItem key={user._id} value={user._id}>
                            {user.name}
                        </SelectItem>
                    })
                }
            </SelectGroup>
        </SelectContent>
    </Select>
      
    </div>
  )
}

export default GetUsers
