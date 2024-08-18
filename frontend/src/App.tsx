import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { RecoilRoot } from "recoil";
import { Publish } from "./pages/Publish";




function App() {
  return <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
  </BrowserRouter>
  </RecoilRoot>
  
}

export default App;
