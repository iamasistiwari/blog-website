import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useEffect } from "react";
export const Blogs = () => {
    const navigate = useNavigate()
    const { loading, blogs } = useBlogs();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/signup');
        }
    }, [navigate]);
    if (loading) {
        return <div>
            <Appbar />
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center ">
            <div className="max-w-64 lg:max-w-screen-lg">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={formattedDate(blog.date)}
                />)}
            </div>
        </div>
    </div>
}
const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
  