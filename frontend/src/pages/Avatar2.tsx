import { useNavigate } from 'react-router-dom';
import { Avatar } from '../components/BlogCard';
import{ useState } from 'react';


export const Avatar2 = ({authorName}:{authorName: string}) => {
    const [showSignOut, setShowSignOut] = useState(false);
    const navigate = useNavigate()
    const handleAvatarClick = () => {
        setShowSignOut(!showSignOut);
    };

    return (
        <div>
            <div className="flex">
                <div className=''>
                    <Avatar authorName={authorName} size="big" onClick={handleAvatarClick} />
                </div>
                <div>
                    {showSignOut && (
                        <div className="bg-black text-white text-sm ml-2 flex justify-center p-2 rounded-2xl max-w-16">
                            <button onClick={() => {
                                alert('Sign Out')
                                localStorage.removeItem("token")
                                localStorage.removeItem("authorName")
                                navigate("/signin")
                            }}>Sign Out</button>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
};

