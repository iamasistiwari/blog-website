import { useRecoilState, useSetRecoilState } from "recoil";
import { descriptionAtom, titleAtom } from "../store/atoms";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
  published: boolean;
  date: string;
}

export const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tit, setTit] = useRecoilState(titleAtom);
  const [des, setDes] = useRecoilState(descriptionAtom);

  console.log(tit)
  console.log(des)

  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/blog/${id}`, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        const blog: Blog = res.data;
        setTit(blog.title);
        setDes(blog.content);
      } catch (e) {
        console.log(e);
      }
    };
    data();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const PublishYourPost = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/blog/edit`,
        {
          id: Number(id),
          title: tit,
          content: des,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Your blog is published"+res.data);
      navigate(`/blog/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-2">
        <button
          onClick={PublishYourPost}
          type="button"
          className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Publish
        </button>
      </div>
      <div>
        <TextArea title={tit} description={des} />
      </div>
    </div>
  );
};

interface TextAreaProps {
  title: string;
  description: string;
}

function TextArea({ title, description }: TextAreaProps) {
  const setDes = useSetRecoilState(descriptionAtom);
  const setTit = useSetRecoilState(titleAtom);

  return (
    <div className="max-w-screen-2xl mx-2">
      <label className="block mb-2 text-lg font-medium text-gray-900">
        Write your title . . .
      </label>
      <div>
        <textarea
          value={title}
          onChange={(e) => {
            setTit(e.target.value);
          }}
          id="message"
          className="h-44 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your title here..."
        ></textarea>
      </div>
      <label className="block mb-2 text-lg font-medium text-gray-900">
        Write your description . . .
      </label>
      <div>
        <textarea
          value={description}
          onChange={(e) => {
            setDes(e.target.value);
          }}
          id="message"
          className="h-96 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your description here..."
        ></textarea>
      </div>
    </div>
  );
}
