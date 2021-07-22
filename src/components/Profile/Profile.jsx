import React, { useEffect, Link } from "react";
import { API_URL } from "../../config";
import axios from "axios";

function Profile(props) {
  const { getData, data, user, onDataChange, fetchingUser } = props;
  const { interests } = user;

  useEffect(() => {
    axios
      .post(
        `${API_URL}/api/fetchNews`,
        { interests },
        { withCredentials: true }
      )
      .then((result) => {
        onDataChange(result.data.data);
      })
      .catch((err) => {});
  }, []);

  if (!data.length) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
      {/* {data.map((interest) => {
        return interest.data.results.map((el, index) => {
          return (
            <div key={index}>
              <p>{el.title}</p>
              <a href={el.url}>link for the article</a>
            </div>
          );
        });
      })} */}
    </div>
  );
}

export default Profile;
