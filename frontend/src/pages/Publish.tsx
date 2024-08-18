import { useRecoilValue, useSetRecoilState } from "recoil"
import { descriptionAtom, titleAtom } from "../store/atoms"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"






export const Publish = () =>{
    const navigate = useNavigate()
    const tit = useRecoilValue(titleAtom)
    const des = useRecoilValue(descriptionAtom)

    const PublishYourPost = async () =>{
        try{
            const res = await axios.post(
                `${BACKEND_URL}/blog`,
                {
                    title: tit,
                    content: des
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            alert('your blog is published')
            navigate(`/blog/${res.data.id}`)
            return
        }catch(e){
            console.log(e)
            return
        }
    }

    return <div>
        <div className="flex justify-center mt-2">
        <button onClick={PublishYourPost} type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
        </div>
        <div>
            <TextArea />
        </div>
        
    </div>
}


function TextArea () {
    const setDes = useSetRecoilState(descriptionAtom)
    const setTit = useSetRecoilState(titleAtom)
    return <div className="max-w-screen-2xl mx-2 ">
        <label  className="block mb-2 text-lg font-medium text-gray-900">Write your title . . .</label>
        <div >
            <textarea onChange={(e) =>{
                setTit(e.target.value)
            }} id="message" className="h-44 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
        </div>
        <label  className="block mb-2 text-lg font-medium text-gray-900">Write your description . . .</label>
        <div >
            <textarea onChange={(e) =>{
                setDes(e.target.value)
            }} id="message" className="h-96 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
        </div>
    </div>
    
}

