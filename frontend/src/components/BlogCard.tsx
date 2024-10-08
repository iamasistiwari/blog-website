import { useNavigate } from "react-router-dom"

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
    const navigate = useNavigate();
    return <div onClick={() =>{
        navigate(`/blog/${id}`)
        setTimeout(() => window.scrollTo(0, 0), 0);
    }}>
        <div className="pt-12 cursor-pointer w-[720px]">
            <div className="max-w-screen-md border-b border-gray-100">
                <div className="flex ">
                    <Avatar authorName={authorName} size="small" />
                    <div className="flex flex-col justify-center pl-2">
                        <Circle />
                    </div>
                    <div className=" text-sm flex flex-col justify-center font-normal pl-2">
                        {authorName}
                    </div>
                    <div className="pl-2 font-light text-slate-700 text-xsm flex justify-center flex-col">
                        {publishedDate ? publishedDate: "No date found"}
                    </div>
                </div>
                <div className="font-semibold text-black mt-2 font-ubuntu-700 text-lg lg:text-2xl ">
                    {title}
                </div>
                <div className="font-serif mt-2 text-gray-600 text-sm lg:text-lg">
                    {content.slice(0, 60)+ (content.length >=60 ? "....":"")}
                </div>
                    
                <div className="rounded-full bg-slate-200 w-20 flex justify-center mt-10 mb-4">
                    <div className="text-xsm font-medium py-2 px-1.5 ">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export function Avatar({ authorName, size = "small", onClick, }: { authorName: string; size?: "small" | "big"; onClick?: () => void }){
    return <div onClick={onClick} className={`relative inline-flex items-center justify-center ${size === "small"? "w-6 h-6": "w-8 h-8"} overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600 cursor-pointer`}>
        <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">{authorName[0]}</span>
    </div>
}

export function Circle() {
    return <div className="rounded-full h-1 w-1 bg-slate-500">
    </div>
}