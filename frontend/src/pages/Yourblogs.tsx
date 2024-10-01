import UserBlogs from "../components/UserBlogs"
import UserInfo from "../components/UserInfo"


function Yourblogs() {

    return (
        <div>
            <UserInfo />
            <div className="flex flex-col justify-center items-center">
                <UserBlogs />
            </div>
        </div>
        
    )
}

export default Yourblogs
