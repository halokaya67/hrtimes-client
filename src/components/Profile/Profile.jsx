import React, { useEffect, useState, useRef } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import UserArticleCard from "../UserArticleCard/UserArticleCard";
import DataCard from "../DataCard/DataCard";
import Loading from "../Loading/Loading";
import SortButton from "../SortButton/SortButton";
import Grid from "@material-ui/core/Grid";
import "./Profile.css";
import GoTopButton from "../GoTopButton/GoTopButton";

function Profile(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showGoTop, setShowGoTop] = useState("goTopHidden");

  const refScrollUp = useRef();
  const {
    data,
    user,
    onDataChange,
    articles,
    updateComments,
    updateArticles,
    updateUser,
  } = props;
  const { interests } = user;

  useEffect(() => {
    axios
      .post(
        `${API_URL}/api/fetchNews`,
        { interests },
        { withCredentials: true }
      )
      .then((result) => {
        if (!result) {
          props.history.push(`/${user._id}/edit`);
        } else {
          onDataChange(result.data.data);
        }
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
        let userResponse = await axios.get(`${API_URL}/api/profile`, {
          withCredentials: true,
        });

        updateComments(commentResponse.data);
        updateArticles(articleResponse.data);
        updateUser(userResponse.data);
      } catch (err) {
        console.log("Fetching data failed", err);
      }
    })();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

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

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);

    return scrollPosition > 50
      ? setShowGoTop("goTop")
      : scrollPosition < 50
      ? setShowGoTop("goTopHidden")
      : null;
  };

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  if (!data.length || !user) {
    return <Loading />;
  }

  return (
    <div className="profile">
      <div ref={refScrollUp}></div>
      <div className="welcome">
        <h1>Hi {user.username.toUpperCase()}!</h1>
      </div>
      <br></br>
      {!articles.length ? "" : <h3>by our users:</h3>}
      <hr style={{ width: "100%" }}></hr>

      {articles.length > 0 && (
        <Grid container className="dataArticles">
          <br></br>
          {articles &&
            articles.map((article, index) => {
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
                    author={article.author}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}

      <h3>you may like:</h3>
      <hr style={{ width: "100%" }}></hr>

      <Grid container className="dataArticlesTwo">
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
      <GoTopButton showGoTop={showGoTop} scrollUp={handleScrollUp} />
    </div>
  );
}

export default Profile;
