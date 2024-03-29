import React, { useEffect, useState } from "react";
import { Spin, message, Radio, Space } from "antd";
import { getApiWithAuth, postApiWithAuth } from "../../utils/api";
import { MyCareerGuidanceButton } from "../commonComponents";
import { useNavigate, useLocation } from "react-router-dom";
import './TakeSelfTest.css'

const TakeSelfTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [quizResult, setQuizResult] = useState([]);
  const [quizData, setQuizData] = useState({}); 
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const { data } = location.state || {};
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  

  const checkUnattemptQuestions = () => {
  
    const filterData = quizData?.questions?.filter((item) => {
      const filterResult = quizResult.filter((item1) => {
       
      });
    });
  };

  useEffect(() => {
    checkUnattemptQuestions();
  }, [quizData, quizResult]);

  useEffect(() => {
    getQuizData();
    document.getElementById('targetSectionId')?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

 
  const getQuizData = async () => {
    
    setLoading(true);
   
    const response = await getApiWithAuth(
      `/psychometric/psychometric/${data.id}/`
    );
 
    if (response?.data?.status === 200) {
      setQuizData(response.data.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

 
  const onChange = (e) => {
    const { name, value } = e.target;
    const existingIndex = quizResult.findIndex(
      (item) => item.question_id === name
    );

    if (existingIndex !== -1) {
      const updatedResult = [...quizResult];
      updatedResult[existingIndex].answer_id = value;
      setQuizResult(updatedResult);
    } else {
      setQuizResult([...quizResult, { question_id: name, answer_id: value }]);
    }
  };

  const saveQuizData = async () => {
    setSubmitButtonClicked(true); 

    if (quizResult.length !== quizData.questions?.length) {
      message.error("Please complete all questions");
    } else {
      setSpinnerLoading(true);
      const response = await postApiWithAuth(`/psychometric/take-test/`, {
        test: data.id,
        answers: quizResult,
      });

      if (response.data.status === 200) {
        message.success("Quiz taken successfully");
        navigate("/occupation", {
          state: { data: response.data.data.test_id },
        });
      }

      setSpinnerLoading(false);
    }
  };

  return (
    <>
      <div className="educationalGuidanceMainDiv" id="targetSectionId">
        <div className="welcomeHaddingText pb-4">{quizData.name}</div>
        <div className="textDescription pb-4">{quizData.intro}</div>
        <div className="educationalGuidanceSecondDiv">
          {loading ? (
            <Spin className="spinStyle" />
          ) : quizData.questions?.length === 0 ? (
            <div className="quizDetailsStyle">No Data Found</div>
          ) : (
            <>
           
              {quizData.questions?.map((item, index) => {
                const isQuestionAnswered = quizResult.some(
                  (result) => result.question_id === item.question_id
                );

                return (
                  <div
                  className={`quizBoxStyle`}
                  key={item.question}
                >
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: 15 }}>{index + 1}</div>
                      <div>
                        <div
                          style={{ color: submitButtonClicked && !isQuestionAnswered ? "red" : "#1476b7", fontWeight: "bold",fontSize:'14px' }}
                          
                          dangerouslySetInnerHTML={{
                            __html: item.question,
                            
                          }}
                        ></div>
                        <div className="mt-3">
                          <Radio.Group
                            onChange={onChange}
                            name={item.question_id}
                            
                            buttonStyle="solid" size="large"
                          >
                            <Space direction="vertical">
                              {item.answers?.map((options) => (
                                <Radio
                                  value={options.answer_id}
                                  key={options.answer_id}
                                >
                                
                                  {options.answer}
                                </Radio>
                              ))}
                            </Space>
                          </Radio.Group>
                          {/* {submitButtonClicked && !isQuestionAnswered && (
                            <p style={{ color: "red" }}>
                              Please select an option
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="mt-3 ">
                <MyCareerGuidanceButton
                  label="Submit"
                  className="takebutton"
                  type="button"
                  htmlType="button"
                  onClick={saveQuizData}
                  loading={spinnerLoading}
                />
                <MyCareerGuidanceButton
                  label="Cancel"
                  className="viewResultButton"
                  type="button"
                  htmlType="button"
                  onClick={() => navigate("/self-assesment")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TakeSelfTest;
