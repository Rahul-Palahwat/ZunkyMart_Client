import React, { useEffect, useState } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiOutlineLogin } from "react-icons/hi";

const Navbar = () => {
  let history = useHistory();
  const [logged, setLogged] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogged(true);
    }
    // eslint-disable-next-line
  }, []);

  const onClick = () => {
    if (!logged) {
      history.push("/login");
    }
    const hamItem = document.getElementById("hamItem");
    let dis = hamItem.style.display;
    if (dis === "none") {
      hamItem.style.display = "block";
    } else {
      hamItem.style.display = "none";
    }
  };

  const loggedIn = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className="bg-[#2874f0] fixed top-0 right-0 left-0 z-30 ">
      <nav className=" max-w-[1700px] m-auto py-3 md:px-8 flex md:justify-evenly justify-between items-center ">
        <div
          className="hamburger ml-3 mr-2 flex md:hidden items-center"
          onClick={onClick}
        >
          <div>
            <div className="line h-0.5 w-3.5 bg-white my-0.5"></div>
            <div className="line h-0.5 w-3.5 bg-white my-0.5"></div>
            <div className="line h-0.5 w-3.5 bg-white my-0.5"></div>
          </div>
          <div>
            <Link
              className="italic font-bold text-white px-2 text-xl flex items-center mr-1 cursor-pointer"
              to="/"
            >
              ZunkyMart
            </Link>
          </div>
        </div>
        <div className="logo flex w-1/2">
          <Link
            to="/"
            className="italic font-bold text-white px-2 text-xl items-center mr-1 cursor-pointer hidden md:flex"
          >
            ZunkyMart
          </Link>
          {/* <form action="/query" className='flex w-full' onSubmit={handleSubmit}> */}
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for products, brands and more"
            className="text-sm px-4 py-2 w-[90%] rounded-sm hidden md:block outline-none"
            onChange={onChange}
            value={searchVal}
          />
          <Link
            to={`/search/${searchVal.toString()}`}
            onClick={() => {
              setSearchVal("");
            }}
            className="hidden md:block"
          >
            <i className="fas fa-search bg-none -translate-x-7 cursor-pointer pt-[0.65rem] text-[#2874f0] "></i>
          </Link>
          {/* </form> */}
        </div>

        <div
          className={`text-white ${
            logged && "space-x-9"
          } flex justify-evenly items-center`}
        >
          {logged && (
            <>
              <div className="dropdown hidden md:block cursor-pointer">
                <span className="flex">
                  Account <span className=" ml-1 arrow"> &#x25B4;</span>
                </span>
                <div className="hidden dropdown-content flex-col absolute z-10 text-black -translate-x-8 rounded-sm ">
                  <Link to="/account">
                    <i className="far fa-user-circle"></i>My Profile
                  </Link>
                  <Link to="/" onClick={loggedIn}>
                    <i className="fas fa-power-off"></i>Logout
                  </Link>
                </div>
              </div>
              <div className="dropdown hidden md:block cursor-pointer">
                <span className="flex">
                  More <span className="ml-1 arrow"> &#x25B4;</span>
                </span>
                <div className="hidden dropdown-content flex-col absolute z-10 text-black -translate-x-8 rounded-sm ">
                  <Link to="/orders">
                    <i className="fas fa-folder"></i>Orders
                  </Link>
                  <Link to="/cart">
                    <i className="fas fa-cart-arrow-down"></i>Cart
                  </Link>
                </div>
              </div>
            </>
          )}
          {!logged && (
            <div className="hidden md:block space-x-4">
              <Link
                to="/login"
                className="bg-white text-util rounded-sm px-4 py-1"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-util rounded-sm px-4 py-1"
              >
                SignUp
              </Link>
            </div>
          )}

          <span className="flex items-center cursor-pointer">
            {logged && (
              <>
                <Link to="/cart">
                  <i className="fas fa-cart-plus"></i>
                </Link>
                <Link to="/cart">
                  <p className="ml-2 hidden md:block">Cart</p>{" "}
                </Link>
              </>
            )}
            <div className="md:hidden flex items-center">
              {logged && (
                <Link to={"/account"}>
                  <i className="fas fa-user-check mx-3"></i>
                </Link>
              )}
              {!logged && (
                <Link to={"/login"}>
                  <HiOutlineLogin className="mx-2 text-lg" />
                </Link>
              )}
            </div>
          </span>
        </div>
      </nav>

      <div className="bg-[#2874f0] md:hidden flex justify-center items-center -mt-1">
        <Link
          to={`/search/${searchVal.toString()}`}
          onClick={() => {
            setSearchVal("");
          }}
        >
          <i className="fas fa-search bg-none translate-x-7 cursor-pointer text-[#2874f0]"></i>
        </Link>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for products, brands and more"
          className="text-sm px-9 py-2 w-full my-1 mr-3.5 rounded-sm "
          onChange={onChange}
          value={searchVal}
        />
      </div>

      {logged && (
        <div
          className="h-[100vh] absolute top-0 bg-white border-1 border-gray-300 z-20 hidden w-full max-w-[66%] min-w-[50%] fade"
          id="hamItem"
        >
          <div className="w-full bg-[#2874f0] flex justify-between items-center">
            <span className="text-white px-2 py-3 flex items-center cursor-pointer text-[0.9rem]">
              <i className="far fa-user-circle mr-2"></i>Prashant Singh
            </span>
            <i className="fas fa-times text-white px-3" onClick={onClick}></i>
          </div>
          <div className="items flex flex-col py-2" onClick={onClick}>
            <Link to="/account" className="py-2 ">
              <i className="fas fa-user-tie mx-2"></i>My Profile
            </Link>
            <Link to="/orders" className="py-2 ">
              <i className="fas fa-folder mx-2"></i>My Orders
            </Link>
            <Link to="/cart" className="py-2 ">
              <i className="fas fa-folder mx-2"></i>Cart
            </Link>
            <Link to="/" className="py-2" onClick={loggedIn}>
              <i className="fas fa-power-off mx-2"></i>Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
