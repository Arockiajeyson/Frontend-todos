import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";

const CreatContext=createContext()

export const Provied = ({children})=>{
    const [statess,setStatess] =useState([])

    

    const delt = async (ids) => {
        console.log(ids)
        const d= await axios.post('https://todos-backend-app.onrender.com/users/deleting',{ids})
        console.log(d.data)
        
    }
    const postse = async(store)=>{
        try {
            let i=new Date().getTime()

            const a =await axios.post('https://todos-backend-app.onrender.com/users/posting',{store,i})
            console.log(a.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    const puts=async(ids,state)=>{
        try {
            let i=new Date().getTime()

            const a =await axios.post('https://todos-backend-app.onrender.com/users/editing',{ids,state})
            console.log(a.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div>
            <CreatContext.Provider value={{postse,statess,delt,puts}}>
                {children}
            </CreatContext.Provider>
        </div>
    )
}
export default CreatContext;