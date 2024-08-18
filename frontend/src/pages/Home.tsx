import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"



export const Home = () =>{
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5);
    useEffect(() =>{
        const timer = setInterval(() =>{
            setCountDown(c => c-1)
        },1000)
        if(countDown == 0){
            clearInterval(timer)
            navigate('/signup')
        }
        return () => clearInterval(timer)
    }, [navigate, countDown])
    return <div className="flex justify-center">
        <div className="mt-20 text-center lg:mt-44">
            <div onClick={() =>{
                navigate("/signup")
            }} className="text-7xl font-dm-serif tracking-wider cursor-pointer">
                {"Space"}
            </div>
            <div className="mt-4 text-base font-ubuntu">
                A blogging website
            </div>
            <div className="mt-2 text-base font-ubuntu">
                Owner :-
            </div>
            <div className="text-base font-ubuntu">
                - Ashish Tiwari -
            </div>
            <div className="mt-20">
                redirecting you to signup page in {countDown}s
            </div>
        </div>
    </div>
}