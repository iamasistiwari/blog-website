import { SignupInput } from "@iamasistiwari/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"




export const Auth = ({ type }: {type: "signup" | "signin"}) =>{
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    async function sendRequest(){
        try{
            const res = await axios.post(`${BACKEND_URL}/user/${type}`,{
                name: postInputs.name,
                email: postInputs.email,
                password: postInputs.password
            })
            const jwt = res.data.token;
            localStorage.setItem("token", ` Bearer ${jwt}`)
            navigate('/blogs')

        }catch(e){
            alert(`${type} request failed`)
            console.log(e)
            return
        }
    }

    return <div className="bg-slate-100 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="font-semibold text-4xl flex justify-center">
                {type==="signup"? "Create an account" : "Welcome back!"}
            </div>
            <div className="flex justify-center pt-1 pb-10">
                {type==="signup"? "Already have an account" : "Don't have an account"}
                <Link className="underline pl-1" to={type==="signin" ? "/signup": "/signin"}>{type==="signup" ? "Signin": "Signup"}</Link>
            </div>
            <div>
                {type=="signup"? <LabelledInput placeholder="John Doe" label="Name" onChange={(e) =>{
                    setPostInputs(c => ({
                        ...c,
                        name: e.target.value
                    }))
                }} /> : null}
                <LabelledInput placeholder="name@gmail.com" label="Email" onChange={(e) =>{
                    setPostInputs(c =>({
                        ...c,
                        email: e.target.value
                    }))
                }} />
                <LabelledInput placeholder="" label="Password" type="password" onChange={(e) =>{
                    setPostInputs(c => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />
                <div className="pt-8">
                    <button onClick={sendRequest} type="button" className="py-2 pr-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" ></svg>
                        {type==="signin"? "Sign in" : "Sign up"}
                    </button>
                </div>
                
            </div>
        </div>
        
    </div>
}

interface LabelledInputs{
    placeholder: string,
    label: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({label, placeholder, onChange, type}:LabelledInputs){
    return <div className="mb-3">
        <div className="block text-sm font-semibold pl-0.5 mb-1 text-black">
            {label}
        </div>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} onChange={onChange} type={type || "text"}></input>
    </div>
}