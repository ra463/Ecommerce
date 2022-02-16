import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="head">
            <h2>Manage User</h2>
            <Link to="/me/update">Update Profile</Link>{" "}
          </div>
          <div className="profile-Container">
            <div>
              <img
                src={user.avatar.url}
                alt={user.avatar.url ? user.avatar.url : "/Profile.png"}
              />
              <Link to="/me/updatePhoto">
                <EditIcon/>
              </Link>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
            <div>
              <div>
                <div>Name :</div>
                <p>{user.name}</p>
              </div>
              <div>
                <div>E-mail :</div>
                <p>{user.email}</p>
              </div>
              <div>
                <div>Joined On :</div>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
