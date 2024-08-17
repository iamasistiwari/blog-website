import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    content: string,
    title: string,
    id: string,
    author: {
        name: string
    },
    published: boolean
}

export const useBlog = ({id}: {id: string}) =>{
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then(res =>{
            setBlog(res.data)
            setLoading(false)
        })
    },[id])
    return {
        blog,
        loading
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}