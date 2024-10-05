import { useEffect } from 'react'
import { useYourBlogs } from '../hooks'
import { useNavigate } from 'react-router-dom';
import { BlogSkeleton } from './BlogSkeleton';
import UserBlogCard from './UserBlogCard';

export default function UserBlogs() {
    const navigate = useNavigate();
    const { loading, blogs } = useYourBlogs();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/signup');
        }
    }, [navigate])
    if(loading) {
        return <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }
    return <div>
        <div>
            {blogs.map(blog => <UserBlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name}
                publishedDate={blog.date}
                content={blog.content}
                title={blog.title}
                />
            )}
        </div>
    </div>
}
