import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";

import { Home, CreatePost } from "./pages/";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex items-center justify-between bg-white sm:px-8 p-4 border-b-[#e6eb4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium text-white bg-[#6469ff] px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>

      <main className="w-full sm:p-8 px-4 py-8 bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
