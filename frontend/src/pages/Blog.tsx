import { useRecoilValueLoadable } from "recoil";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlogFamily } from "../hooks";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
export const Blog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/signup');
        }
    }, [navigate]);
    const blog = useRecoilValueLoadable(useBlogFamily({id : id || ""}))
    
    console.log(blog)
    if(blog.state === "loading"){
        return <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog.contents} />
    </div>
}
