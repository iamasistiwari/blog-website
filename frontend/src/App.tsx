import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { RecoilRoot } from "recoil";
import { Publish } from "./pages/Publish";
import { Home } from "./pages/Home";
import Yourblogs from "./pages/Yourblogs";
import { EditPost } from "./components/EditPost";




function App() {
  return <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/userBlogs" element={<Yourblogs />} />
        <Route path="/editPost/:id" element={<EditPost />} />
      </Routes>
  </BrowserRouter>
  </RecoilRoot>
  
}

export default App;
