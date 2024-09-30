import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"



 
export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div >
        <Appbar />
        
        <div>
            <div className=" lg:ml-80 lg:max-w-screen-md">
                <div className="font-semibold text-2xl px-3 tracking-tight lg:text-3xl lg:max-w-6xl mt-7">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2 pl-4 text-sm">
                    Posted on- {formattedDate(blog.date)}
                </div>
                <div className="flex mt-2 pl-2 pb-5 ">
                    <div className="pl-1">
                        <Avatar size="small" authorName={blog.author.name} />
                    </div>
                    <div className="flex flex-col justify-center pl-1 font-semibold">
                        {blog.author.name}
                    </div>
                </div>
            </div>
            <div className="px-4 pt-10 text-base lg:mx-80 lg:text-xl lg:tracking-wider font-anek ">
                <div className="leading-loose">
                    {blog.content}
                </div>
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