import React, { useEffect, useState } from "react";
import { Spin, message, Radio, Button, Row, Col } from "antd";
import { getApiWithAuth, postApiWithAuth } from "../../utils/api";
import { MyCareerGuidanceButton } from "../commonComponents";
import Chart from "react-apexcharts";
import { useNavigate, useLocation } from "react-router-dom";
import "./Occupational.css";
const btnOptions = [
  {
    path: "career-idea",
    name: "Career Ideas",
  },
  {
    path: "choice-idea",
    name: "Subject Choices Ideas",
  },
  {
    path: "study-tips",
    name: "5 Study Tips",
  },
];
const Occupational = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [educationGuidance, setEducationGuidance] = useState([]);

  const { data } = location.state || {};

  useEffect(() => {
    if (data.name || data.test_name) {
      getViewResult(data);
    } else {
      getQuizData();
    }
  }, [data]);

  const getViewResult = async (data) => {
    setLoading(true);
    if (data.name) {
      const response = await getApiWithAuth(
        `/psychometric/result?name=${data.name}`
      );
      if (response.data.status === 200) {
        let sortedData = response.data.data.sort((a, b) => b.score - a.score);

        setEducationGuidance(sortedData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else if (data.test_name) {
      const response1 = await getApiWithAuth(
        `/psychometric/result?name=${data.test_name}`
      );
      if (response1.data.status === 200) {
        let sortedData = response1.data.data.sort((a, b) => b.score - a.score);

        setEducationGuidance(sortedData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const getQuizData = async () => {
    setLoading(true);
    const response = await getApiWithAuth(`/psychometric/result/${data}/`);
    if (response.data.status === 200) {
      let sortedData = response.data.data.sort((a, b) => b.score - a.score);
      setEducationGuidance(sortedData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  // const sortByScoreDescending = (a, b) => b.score - a.score;
  // const sortedData = educationGuidance.slice().sort(sortByScoreDescending);

  const scores = educationGuidance.map((item) => item.score);
  const questionTypes = educationGuidance.map((item) => item.question_type);
  let chartColor;

  if (educationGuidance[0]?.test_name == "Occupational Values Assesment") {
    chartColor = "#87aded";
  } else if (
    educationGuidance[0]?.test_name == "Occupational Interest Assesment"
  ) {
    chartColor = "#b9bab8";
  } else {
    chartColor = "#a4eba9";
  }

  const series = [
    {
      data: scores,
    },
  ];

  const options = {
    chart: {
      id: "bar",
      toolbar: {
        show: false,
      },
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "50%",
        colors: {
          backgroundBarColors: ["white"],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: questionTypes,
    },
    colors: [chartColor],
    series: [
      {
        data: scores,
      },
    ],
    title: {
      text: educationGuidance[0]?.test_name,
      align: "center",
    },
    // tooltip: {
    //   y: {
    //     formatter: (value) => value,
    //   },
    // },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
  };

  return (
    <>
      <div className="educationalGuidanceMainDiv">
        {loading ? (
          <Spin className="spinStyle" />
        ) : educationGuidance?.length === 0 ? (
          <div className="quizDetailsStyle">No Data Found</div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                className="skillsButton"
                type="primary"
                onClick={() => {
                  if (data.test_name) {
                    navigate("/dashboard");
                  } else {
                    navigate("/self-assesment");
                  }
                }}
              >
                Back
              </Button>
            </div>
            <div className="welcomeHaddingText ">
              {educationGuidance[0]?.test_name}
            </div>

            <div className="educationalGuidanceSecondDiv">
              <div
                style={{
                  backgroundColor: "white",
                  height: 410,
                  width: "95%",
                  padding: 15,
                  border: 20,
                }}
              >
                <Chart
                  options={options}
                  series={options.series}
                  type="bar"
                  width={"100%"}
                  height={350}
                />
              </div>
              <div className="mt-5 pt-5">
                {educationGuidance?.map((item) => {
                  return (
                    <div>
                      <div
                        className="textStyle18 pt-1 pb-3"
                        style={{ color: "#1476B7", fontWeight: 600 }}
                      >
                        {item.question_type}
                      </div>
                      <div className="textStyle18 pt-1 pb-3">
                        {item.description}
                      </div>
                      <div>
                        <Row
                          gutter={[4, 8]}
                          className="occupationOptionBackground"
                        >
                          {btnOptions.map((buttonitem, index) => (
                            <Col span={24} md={8} key={buttonitem.path}>
                              <Button
                                className="skillsButton"
                                type="primary"
                                key={index}
                                style={{ width: "100%" }}
                                // onClick={() => {
                                //   navigate(`/occupation/}/${buttonitem.name}/${buttonitem.path}/${item.id}`, {
                                //     preventScrollReset: true,
                                //   });
                                // }}

                                onClick={() =>
                                  navigate(`/occupation/${buttonitem.path}`, {
                                    state: {
                                      item: item,
                                      buttonitem: buttonitem,
                                    },
                                    preventScrollReset: true,
                                  })
                                }
                              >
                                {buttonitem.name}
                              </Button>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Occupational;
