import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import CreatContext from "./context";
import axios from 'axios'
import '../App.css'
const Input = () => {
    const [state, setState] = useState('')
    const [store, setstore] = useState(null)
    const [bstore, bsetstore] = useState([])
    const [is, setIs] = useState(true)
    const [edit, setEdit] = useState(null)
    const [bb, setbb] = useState(null)
    const { postse, delt, puts } = useContext(CreatContext)
    useEffect(() => {
        const ff = async () => {
            const datas = await axios.get('https://todos-backend-app.onrender.com/users/geting')
            bsetstore([...datas.data])
        }
        ff()
    })
    const handler = () => {

        if (state) {
            postse(state)
            setState("")
        }
    }
    const Delte = (ids) => {
        delt(ids)
    }
    const Edit = (id) => {
        setbb(id)
    }
    const changing = async (id) => {
        await puts(id, edit)
        setbb(null)
    }
    return (
        <div className="main-div" style={{marginTop:'100px',marginLeft:'25%',width:'50%',height:'650px',borderRadius:'20px'}}>

            <div className="map-div">
            <div className="input-div"><input className="inputss-div" type="text" onChange={(e) => setState(e.target.value)} value={state} 
            style={{width:'250px',height:'30px',borderRadius:'20px',outline:'none',border:'none',textAlign:'center'}}/></div>
            <button className="btn" onClick={handler} style={{marginTop:'5px',width:'90px',height:'30px',borderRadius:'20px',outline:'none',border:'none',fontSize:'20px'}}>{is ? "ADD" : "SAVE"}</button>{bstore.map((e, index) => {
                return (
                    <div key={index} className="main-div" style={{width:'600px',height:'60px',backgroundColor:'whitesmoke',borderRadius:'20px'}}>
                        {e.id == bb ? <div><input style={{width:'450px',height:'50px',fontSize:'15px',marginLeft:'20px',outline:'none',border:'none',background: 'transparent'}} onChange={(e) => { setEdit(e.target.value) }}></input><button style={{width:'80px',height:'30px',borderRadius:'10px',outline:'none',border:'none',backgroundColor:'rgb(25, 205, 145)',marginTop:'10px',fontSize:'15px'}} className="btn" onClick={() => { changing(e.id) }}>ok</button>
                        </div> :
                            <div style={{marginLeft:'10px',marginTop:'10px'}} className="map2-div">
                                <div style={{width:'460px',fontSize:'17px',marginTop:'5px'}} >{e.description}</div>
                                <button className="btn" style={{height:'30px',borderRadius:'10px',outline:'none',border:'none',backgroundColor:'rgb(164, 95, 228)',fontSize:'15px'}}onClick={() => Delte(e.id)}>DELETE</button>
                                <button className="btn" onClick={() => Edit(e.id)} style={{marginLeft:'3px',height:'30px',borderRadius:'10px',outline:'none',border:'none',backgroundColor:'rgb(164, 95, 228)',fontSize:'15px'}}>EDIT</button>
                            </div>}
                    </div>
                )
            })}</div>
        </div>
    )
}
export default Input;
