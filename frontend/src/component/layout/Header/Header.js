import React, { useState, Fragment } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const [keyword, setKeyword] = useState(" ");
  const history = useHistory();

  const searchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <>
      <nav>
        <a className="logo">
          <h1>
            <span>E</span>commerce<span>.</span>
          </h1>
        </a>
        <ul
          className={
            showMediaIcons ? "navigation navigation-mobile" : "navigation"
          }
        >
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          {!isAuthenticated && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
        <div className="search-div">
          <form className="Search" onSubmit={searchSubmit}>
            <input
              className="Searchinput"
              type="text"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input className="btn1" type="submit" value="Search" />
          </form>
        </div>
        <div className="hamburger">
          <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <MenuIcon className="hamburger" />
          </a>
        </div>
      </nav>
      <Fragment>
        <div>{isAuthenticated && <UserOptions user={user} />}</div>
      </Fragment>
    </>
  );
};

export default Header;
