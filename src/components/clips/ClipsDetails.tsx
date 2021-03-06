import { useEffect } from "react";
import "./Clips.scss";
import { ImVolumeMute2, ImVolumeMedium } from "react-icons/im";
import { GoVerified } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../redux/GiphyActions";
import { RootStore } from "../../redux/Store";
import { TrendingState } from "../../redux/types";
import { Link } from "react-router-dom";
import spinner from "../../images/loading.gif";
import clipImg from "../../images/artist.gif";

const ClipsDetails = () => {
  const clips = useSelector((state: RootStore) => state.giphy.trending);
  const loading = useSelector((state: RootStore) => state.giphy.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrending());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container loading">
        <img src={spinner} alt="" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="clips-details-banner">
        <img src={clipImg} alt="clip img" />
      </div>

      <h3>All Clips</h3>
      <div className="clip-details">
        {clips &&
          clips.map((item: TrendingState, index) => {
            const { mp4 } = item.images.original;
            return (
              <Link
                to={`/gifs/${item.username}`}
                key={index}
                className="clip-details-content"
              >
                <i className="icon">
                  <ImVolumeMute2 />
                </i>
                <i className="icon1">
                  <ImVolumeMedium />
                </i>
                <video src={mp4} loop autoPlay></video>
                <h4>{item.title}</h4>
                {item.user ? (
                  <div className="clip-details-user">
                    <img
                      src={item.user.avatar_url}
                      width="30px"
                      height="30px"
                      alt=""
                    />
                    <h4>{item.user.username}</h4>
                    {item.user.is_verified ? (
                      <i>
                        <GoVerified />
                      </i>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ClipsDetails;
