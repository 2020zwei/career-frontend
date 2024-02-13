import { useNavigate, useLocation } from "react-router-dom";
import { MyCareerGuidanceButton } from "../../commonComponents";
import "./YoutubePageStyle.css";

const YoutubePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, videoId } = location.state || {};
  console.log("===============data", data, videoId);
  return (
    <>
      <div className="youtubeContainerStyle">
        <div className="dashboardRightHeadingDiv">
          {data.youtube_title ? data.youtube_title : "YouTube Video"}{" "}
        </div>
        <iframe
          width="90%"
          height="500"
          src={videoId}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <MyCareerGuidanceButton
          label="Test Yourself"
          className="resultDataButton"
          type="button"
          htmlType="button"
          onClick={() =>
            navigate("/educational-guidance-test", {
              state: { data: data },
            })
          }
        />
      </div>
    </>
  );
};
export default YoutubePage;
