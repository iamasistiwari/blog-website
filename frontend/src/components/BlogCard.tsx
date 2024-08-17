import { Link } from "react-router-dom"

interface BlogCard {
    id: string
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCard) =>{
    return <Link to={`/blog/${id}`}>
        <div className="pt-12 cursor-pointer">
            <div className="max-w-screen-md border-b border-gray-100">
                <div className="flex ">
                    <Avatar authorName="As" size="small" />
                    <div className="flex flex-col justify-center pl-2">
                        <Circle />
                    </div>
                    <div className=" text-sm flex flex-col justify-center font-light pl-2">
                        {authorName}
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-xsm flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <div className="font-semibold text-black text-2xl mt-2 max-w-2xl font-ubuntu-700">
                    {title}
                </div>
                <div className="font-serif mt-2 max-w-md text-gray-600">
                    {content.slice(0, 60)+ (content.length >=60 ? "....":null)}
                </div>
                    
                <div className="rounded-lg bg-slate-100 w-16 flex justify-center mt-10 mb-4">
                    <div className="text-xsm font-thin p-0.5 ">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </div>
                </div>
            </div>
        </div>
    </Link>
}

export function Avatar({ authorName, size = "small", onClick, }: { authorName: string; size?: "small" | "big"; onClick?: () => void }){
    return <div onClick={onClick} className={`relative inline-flex items-center justify-center ${size === "small"? "w-6 h-6": "w-8 h-8"} overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600 cursor-pointer`}>
        <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">{authorName.charAt(0)}</span>
    </div>
}

export function Circle() {
    return <div className="rounded-full h-1 w-1 bg-slate-500">
    </div>
}