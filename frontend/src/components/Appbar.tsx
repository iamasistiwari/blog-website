import { Avatar } from "./BlogCard"



export const Appbar = () =>{
    return <div className="flex justify-between px-10 mt-4 border-b pb-4">
        <div className="flex text-3xl font-dm-serif">
            {"Space"}
        </div>
        <div className="flex flex-col justify-center">
            <div className="flex">
                <div className="flex flex-col justify-center pr-2">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
                </div>
                
                <Avatar authorName="A" size="big" />
            </div>
        </div>
    </div>
}