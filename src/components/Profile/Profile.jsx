import React, { useEffect } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import SortButton from "../SortButton/SortButton";
import "./Profile.css";
import UserArticleCard from "../UserArticleCard/UserArticleCard";
import DataCard from "../DataCard/DataCard";
import Grid from "@material-ui/core/Grid";

function Profile(props) {
<<<<<<< HEAD
  const {
    data,
    user,
    onDataChange,
    articles,
    comments,
    updateComments,
    updateArticles,
  } = props;
=======
  const { data, user, onDataChange, articles, updateComments, updateArticles } =
    props;
>>>>>>> 5a23c44a6470352757b286a989f82253eaf85e9a
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
      .catch((err) => {
        console.log(err);
      });
    (async () => {
      try {
        let commentResponse = await axios.get(`${API_URL}/api/comments`, {
          withCredentials: true,
        });
        let articleResponse = await axios.get(`${API_URL}/api/articles`, {
          withCredentials: true,
        });

        updateComments(commentResponse.data);
        updateArticles(articleResponse.data);
      } catch (err) {
        console.log("Fetching user data failed", err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let commentResponse = await axios.get(`${API_URL}/api/comments`, {
          withCredentials: true,
        });
        let articleResponse = await axios.get(`${API_URL}/api/articles`, {
          withCredentials: true,
        });
        updateComments(commentResponse.data);
        updateArticles(articleResponse.data);
      } catch (err) {
        console.log("Fetching data failed", err);
      }
    })();
  }, []);

  let flatted = data.flat(Infinity);

  const sortBy = (event) => {
    event.preventDefault();
    let option = event.target.value;
    const clonedData = JSON.parse(JSON.stringify(flatted));
    const sorted = clonedData.sort(function (a, b) {
      if (a[option] > b[option]) {
        return 1;
      }
      if (b[option] > a[option]) {
        return -1;
      }
      return 0;
    });
    onDataChange(sorted);
  };

  if (!data.length || !user) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div className="welcome">
        <h1>Hi {user.username.toUpperCase()}!</h1>
      </div>
      {!articles.length ? "" : <h3>by our users:</h3>}
      <hr style={{ width: "100%" }}></hr>
      <Grid container className="data">
        <br></br>
        {articles &&
          articles.map((article, index) => {
            console.log(article.author.username);
            return (
              <Grid
                container
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="gridItem"
              >
                <UserArticleCard
                  section={article.section}
                  title={article.title}
                  id={article._id}
                  image={article.image}
                  username={article.author.username}
                />
              </Grid>
            );
          })}
      </Grid>

      <h3>you may like:</h3>
      <hr style={{ width: "100%" }}></hr>

      <Grid container className="dataArticles">
        <br></br>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <SortButton justifyContent="flex-end" sortBy={sortBy} />
          </Grid>
        </Grid>
        {flatted.map((article, index) => {
          return (
            <Grid
              container
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="gridItemTwo"
            >
              <DataCard
                section={article.section}
                title={article.title}
                abstract={article.abstract}
                url={article.url}
                image={article.multimedia ? article?.multimedia[0]?.url : null}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Profile;
