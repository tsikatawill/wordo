import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  return (
    <div className="container">
      <header className="text-center py-10">
        <Link to={"/"}>
          <h1 className="text-3xl uppercase font-bold">Wordo</h1>
          <p className="">Your free urban dictionary</p>
        </Link>
      </header>
      <main>
        <div className="container">
          <form
            className="search flex items-center rounded-full border-2 border-slate-500 gap-3 justify-center bg-slate-700 w-fit mx-auto h-16 px-8"
            onSubmit={(e) => {
              navigate(`/search/${searchTerm}`);
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Search query"
              className="bg-transparent w-full sm:w-96 outline-none"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button className="submit-btn bg-slate-500 hover:scale-110 cursor-pointer bg-opacity-50 hover:bg-opacity-100 hover p-2 rounded-full">
              <FaSearch />
            </button>
          </form>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
