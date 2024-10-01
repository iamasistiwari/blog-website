

import axios from 'axios';
import { BACKEND_URL } from '../config';


interface BlogCard {
    id: string
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export default function UserBlogCard({
    id,
    title,
    publishedDate
}: BlogCard) {
  return (
    <div className='w-[1080px]'>
      <div className="border-2 rounded-[30px] mt-4 flex flex-col justify-center pl-8 py-4  hover:bg-slate-100 hover:cursor-pointer transition-all duration-200">
        <div className='flex flex-row justify-between'>
            
            <div className='flex flex-col justify-start'>
                <div><span className='font-medium'>Blog Title - </span>{title}</div>
                <div><span className='font-medium'>Published on - </span>{formattedDate(publishedDate)}</div>
            </div>

            <div className='flex my-2 mr-9 space-x-7'>
                <div key={"pencil"} className='border-2 border-slate-400 p-1 rounded-xl hover:bg-slate-200 transition-all duration-100 hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </div>
                <div  onClick={async () => {
                    await deletePost(id)
                }} key={"delete"} className='border-2 border-slate-400 p-1 rounded-xl hover:bg-slate-200 transition-all duration-100 hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </div>
                
            </div>
        </div>
        
        
      </div>
    </div>
  )
}
const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const deletePost = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("User is not authenticated");
        return;
    }
    try {
        const res = await axios.delete(`${BACKEND_URL}/blog/delete/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        alert("Your post is deleted");
        window.location.reload()
    } catch (e) {
        console.error(e);
        alert("Failed to delete the post");
    }
};