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
                    Post on 2nd December 2023
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
// export const FullBlog = ({ blog }: {blog: Blog}) => {
//     return <div>
//         <Appbar />
//         <div className="flex justify-center">
//             <div className="flex px-10 w-full pt-200 max-w-screen-xl pt-12">
//                 <div className="pr-5 w-2/3">
//                     <div className="text-4xl font-extrabold">
//                         {blog.title}
//                     </div>
//                     <div className="text-slate-500 pt-2">
//                         Post on 2nd December 2023
//                     </div>
//                     <div className="pt-4">
//                         {blog.content}
//                     </div>
//                 </div>
//                 <div className="col-span-1 w-96 pl-24">
//                     <div className="flex flex-col">
                        
//                         <div className="flex w-full">
//                             <div className="pr-4 ">
//                                 <Avatar size="big" authorName={blog.author.name || "Anonymous"} />
//                             </div>
//                             <div className="flex flex-col justify-center">
//                                 <div className="flex text-slate-600">
//                                     Author
//                                 </div>
//                                 <div className="text-xl font-bold">
//                                     {blog.author.name || "Anonymous"}
//                                 </div>
//                                 <div className="pt-2 text-slate-500">
//                                     Random catch phrase about the author's ability to grab the user's attention
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                 </div>
                
//             </div>
//         </div>
//     </div>
// }