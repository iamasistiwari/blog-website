import { useNavigate } from "react-router-dom"
import { Avatar2 } from "../pages/Avatar2"



export const Appbar = () =>{
    const navigate = useNavigate()
    return <div className="flex justify-between mt-4 border-b pb-4 px-4 lg:px-10">
        <div onClick={() =>{
            navigate("/blogs")
        }} className="flex text-3xl font-dm-serif tracking-wider cursor-pointer">
            {"Space"}
        </div>
        <div className="flex flex-col justify-center">
            <div className="flex">
                <div onClick={() =>{
                    navigate('/publish')
                }} className="flex pr-3 cursor-pointer lg:pr-10">
                    <div className="flex flex-col justify-center mb-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                    <div className=" flex flex-col justify-center pl-2 text-base font-ubuntu pt-0.5">
                        Write
                    </div>
                </div>
                <div className="flex flex-col justify-center pr-4 cursor-pointer lg:pr-8">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
                </div>
                <Avatar2 authorName={localStorage.getItem("authorName") || ""} />
            </div>
        </div>
    </div>
}