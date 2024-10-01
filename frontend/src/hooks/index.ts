import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { atomFamily, selectorFamily } from "recoil";

export interface Blog{
    content: string,
    title: string,
    id: string,
    author: {
        name: string
    },
    published: boolean,
    date: string
}

export const useBlogFamily = atomFamily({
    key: "useBlogFamily",
    default: selectorFamily({
        key: "useBlogSelectorFamily",
        get: ({id}: {id: string | ""}) => async () =>{
            const res = await axios.get(`${BACKEND_URL}/blog/${id}`,{headers: {Authorization: localStorage.getItem("token")}})
            const blog: Blog = res.data
            return blog
        }
    })
})

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


export const useYourBlogFamily = atomFamily({
    key: "useYourBlogFamily",
    default: selectorFamily({
        key: "useYourBlogSelectorFamily",
        get: () => async () =>{
            const res = await axios.get(`${BACKEND_URL}/blog/yourBlogs`,{headers: {Authorization: localStorage.getItem("token")}})
            const blog: Blog = res.data
            return blog
        }
    })
})

export const useYourBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/yourBlogs`, {
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