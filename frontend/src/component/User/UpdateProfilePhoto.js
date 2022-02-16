import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import "./UpdateProfilePhoto.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, UpdatePhoto, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfilePhoto = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfilePhotoSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("avatar", avatar);

    dispatch(UpdatePhoto(myform));
  };

  const updateProfilePhotoDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Photo updated successfully");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update-Profile" />
          <div className="updateProfile_container">
            <div>
              <h2>Update Profile Photo</h2>
              <form
                encType="multipart/form-data"
                onSubmit={updateProfilePhotoSubmit}
              >
                <div>
                  <img src={avatarPreview} alt="Avatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfilePhotoDataChange}
                  />
                </div>
                <p>*Upload image of under 750kb.</p>
                <input type="submit" value="Update" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfilePhoto;
