import React from "react";
import "./Steps.css";

const Steps = ({ current, setCurrent, currentStep, isCvComplete }) => {

  return (
    <>
      <div className="steps">
        <div
          className="step-item"
          key={1}
          onClick={() => {
            setCurrent(1);
          }}
        >
          <div
            className={
              currentStep >= 1
                ? "step-icon-style step-icon-style-active"
                : "step-icon-style step-icon-style-nonActive"
            }
          >
            <span
              className={
                currentStep >= 1
                  ? "step-icon-text step-icon-text-active"
                  : "step-icon-text step-icon-text-nonActive"
              }
            >
              01
            </span>
          </div>
          <div
            className={
              currentStep >= 1
                ? "step-item-content step-item-content-active"
                : "step-item-content step-item-content-nonActive"
            }
          >
            Personal Profile
          </div>
        </div>

        {[
          "Education",
          "Work Experience",
          "Skills",
          `Interests`,
          "References",
        ].map((item, index) => {
          return (
            <div
              className="step-item"
              key={index + 2}
              onClick={() => {
                if (currentStep >= index + 2 || isCvComplete) {
                  setCurrent(index + 2);
                }
              }}
            >
              <div
                className={
                  currentStep >= index + 2
                    ? "step-item-line  step-item-line-active"
                    : `step-item-line  step-item-line-nonActive ${
                        isCvComplete ? "step-item-content-CvComplete" : ""
                      }`
                }
              />
              <div
                className={
                  currentStep >= index + 2
                    ? "step-icon-style step-icon-style-active"
                    : `step-icon-style step-icon-style-nonActive ${
                      isCvComplete ? "step-item-content-CvComplete" : ""
                    }`
                }
              >
                <span
                  className={
                    currentStep >= index + 2
                      ? "step-icon-text step-icon-text-active"
                      : `step-icon-text step-icon-text-nonActive ${
                        isCvComplete ? "step-item-content-CvComplete" : ""
                      }`
                  }
                >
                  {`0${index + 2}`}
                </span>
              </div>
              <div
                className={
                  currentStep >= index + 2
                    ? "step-item-content step-item-content-active"
                    : `step-item-content step-item-content-nonActive ${
                      isCvComplete ? "step-item-content-CvComplete" : ""
                    }`
                }
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Steps;
