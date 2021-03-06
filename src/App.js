import "./App.css";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import fox from "./fox.png";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

export default function App() {
  // Set Initial State!
  const [question, setQuestion] = useState({
    questionDetail: "",
    isQuestionDetailValidated: true,
    questions: [
      {
        questionId: 0,
        questionName: "",
        isQuestionsValidated: true,
        questionChoice: [
          {
            choiceId: 0,
            choiceDescription: "",
            isChecked: true,
            isQuestionChoiceValidated: true,
          },
        ],        
      },
    ],
  });

  // Function for Add Question
  function handleAddQuestion() {
    setQuestion((prev) => {
      const newQuestion = { ...prev };
      newQuestion.questions.push({
        questionId: newQuestion.questions.length,
        questionName: "",
        isQuestionsValidated: true,
        questionChoice: [],
      });
      return newQuestion;
    });
  }

  // Function for Delete Question
  function handleDeleteQuestion(index) {
    setQuestion((prev) => {
      const deleteQuestion = { ...prev };
      deleteQuestion.questions.splice(index, 1);
      return deleteQuestion;
    });
  }

  // Function for Duplicate Question
  function handleDuplicateQuestion(index) {
    setQuestion((prev) => {
      const duplicateQuestion = { ...prev };
      const cloneQuestion = JSON.parse(
        JSON.stringify(duplicateQuestion.questions[index])
      );
      duplicateQuestion.questions.push(cloneQuestion);
      return duplicateQuestion;
    });
  }

  // Function for Add Question Choice
  function handelAddChoice(index) {
    setQuestion((prev) => {
      const newChoice = { ...prev };
      newChoice.questions[index].questionChoice.push({
        choiceId: newChoice.questions[index].questionChoice.length,
        choiceDescription: "",
        isChecked: false,
        isQuestionChoiceValidated: true,
      });
      return newChoice;
    });
  }

  // Function for Delete Question Choice
  function handleDeleteChoice(index, choiceIndex) {
    setQuestion((prev) => {
      const deletedChoice = { ...prev };
      deletedChoice.questions[index].questionChoice.splice(choiceIndex, 1);
      return deletedChoice;
    });
  }

  // Function for change questionnaire detail
  function onChangeQuestionnaireDetail(value) {
    setQuestion((prev) => {
      const newQuestionnaireDetail = { ...prev };
      newQuestionnaireDetail.questionDetail = value;      
      return newQuestionnaireDetail;
    });
  }

  // Function for change question text
  function onChangeQuestionText(value, index) {
    setQuestion((prev) => {
      const newQuestionText = { ...prev };
      newQuestionText.questions[index].questionName = value;
      return newQuestionText;
    });
  }

  // Function for change question choice
  function onChangeQuestionChoice(value, choiceIndex, index) {
    setQuestion((prev) => {
      const newChoiceText = { ...prev };
      newChoiceText.questions[index].questionChoice[
        choiceIndex
      ].choiceDescription = value;
      return newChoiceText;
    });
  }

  // Function for handle radio button
  function handleRadioButton(index, choiceIndex) {
    setQuestion((prev) => {
      const radioBtn = { ...prev };
      radioBtn.questions[index].questionChoice.forEach((element, index) => {        
        if (index === choiceIndex) {
          element.isChecked = true;
        } else element.isChecked = false;
      });      
      return radioBtn;
    });
  }

  function handleValidation() {
    setQuestion((prev) => {
      const formValidation = { ...prev };
      formValidation.isQuestionDetailValidated =
        !!formValidation.questionDetail;

      formValidation.questions.forEach((value) => {
        if (!value.questionName) {
          value.isQuestionsValidated = false;
        } else value.isQuestionsValidated = true;

        value.questionChoice.forEach((choice) => {
          if (!choice.choiceDescription) {
            choice.isQuestionChoiceValidated = false;
          } else choice.isQuestionChoiceValidated = true;
        });
      });

      return formValidation;
    });
  }

  // Function handle cancel
  function handleCancel() {
    setQuestion({
      questionDetail: "",
      isQuestionDetailValidated: true,
      questions: [
        {
          questionId: 0,
          questionName: "",
          isQuestionsValidated: true,
          questionChoice: [
            {
              choiceId: 0,
              choiceDescription: "",
              isChecked: true,
              isQuestionChoiceValidated: true,
            },
          ],
        },
      ],
    });
    return question;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="icon-logo">
          <img src={fox} alt="" />
          <p>Foxbith Questionnaire</p>
        </div>
        <div className="header-btn">
          <Button
            onClick={handleCancel}
            color="warning"
            variant="outlined"
            startIcon={<ClearIcon />}
          >
            cancel
          </Button>
          <Button
            onClick={handleValidation}
            color="warning"
            variant="contained"
            sx={{ width: "7rem" }}
            startIcon={<CheckIcon />}
          >
            save
          </Button>
        </div>
      </div>

      <div className="question-container">
        <div className="question">
            <p>Questionnaire Detail</p>
            <TextField
              error={!question.isQuestionDetailValidated}
              helperText={
                question.isQuestionDetailValidated ? (
                  ""
                ) : (
                  <Typography
                    display="inherit"
                    variant="caption"
                    sx={{
                      fontSize: "0.25rem",
                      color: "red",
                    }}
                  >
                    Please fill in this option.
                  </Typography>
                )
              }
              fullWidth
              id="questionnaireDetail"
              label="Name*"
              variant="outlined"
              sx={{ marginTop: "1.5rem" }}
              value={question.questionDetail}
              onChange={(detailEvent) =>
                onChangeQuestionnaireDetail(detailEvent.target.value)
              }
            />

            {/* // Question Section */}
            {question.questions.map((value, index) => (
              <React.Fragment key={index}>
                <div className="question-detail">
                  <p className="question-title">Question {index + 1}</p>
                  <TextField
                    error={!value.isQuestionsValidated}
                    helperText={
                      value.isQuestionsValidated ? (
                        ""
                      ) : (
                        <Typography
                          display="inherit"
                          variant="caption"
                          sx={{
                            fontSize: "0.25rem",
                            color: "red",
                          }}
                        >
                          Please fill in this option.
                        </Typography>
                      )
                    }
                    fullWidth
                    id="questions"
                    value={value.questionName}
                    label="Question*"
                    variant="outlined"
                    onChange={(event) =>
                      onChangeQuestionText(event.target.value, index)
                    }
                  />

                  {/* // Question Choice Section */}
                  {value.questionChoice.map((choice, choiceIndex) => (
                    <div className="question-choice" key={choiceIndex}>
                      <Radio
                        name="radio"
                        onChange={() => handleRadioButton(index, choiceIndex)}
                        checked={choice.isChecked}
                        color="success"
                        sx={{ marginRight: "1rem" }}
                      />
                      <TextField
                        error={!choice.isQuestionChoiceValidated}
                        helperText={
                          choice.isChecked ? (
                            <Typography
                              display="inherit"
                              variant="caption"
                              sx={{
                                fontSize: "0.25rem",
                                color: "green",
                              }}
                            >
                              This answer is correct.
                            </Typography>
                          ) : choice.isQuestionChoiceValidated ? (
                            ""
                          ) : (
                            <Typography
                              display="inherit"
                              variant="caption"
                              sx={{
                                fontSize: "0.25rem",
                                color: "red",
                              }}
                            >
                              Please fill in this option.
                            </Typography>
                          )
                        }
                        fullWidth
                        id="questionChoice"
                        value={choice.choiceDescription}
                        label="Description*"
                        variant="outlined"
                        onChange={(choiceEvent) =>
                          onChangeQuestionChoice(
                            choiceEvent.target.value,
                            choiceIndex,
                            index
                          )
                        }
                      />
                      <IconButton
                        onClick={() => handleDeleteChoice(index, choiceIndex)}
                        sx={{
                          color: "#000",
                          marginLeft: "0.5rem",
                          padding: "1",
                        }}
                        aria-label="delete"
                        size="large"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>

                {/* // Add Question Choice */}
                <div className="add-choice">
                  <Button
                    onClick={() => handelAddChoice(index)}
                    color="warning"
                    sx={{ padding: "0rem 0.5rem", margin: "1.5rem 0 0.5rem 0" }}
                  >
                    <span
                      style={{ fontSize: "1.25rem", marginRight: "0.25rem" }}
                    >
                      +
                    </span>
                    add choice
                  </Button>
                </div>

                {/* // Duplicate, Delete Question */}
                <div className="duplicate-delete">
                  <Button
                    onClick={() => handleDuplicateQuestion(index)}
                    sx={{ color: "#000" }}
                    size="small"
                    variant="text"
                    startIcon={<ContentCopyIcon />}
                  >
                    Duplicate
                  </Button>
                  <Button
                    onClick={() => handleDeleteQuestion(index)}
                    size="small"
                    sx={{ color: "#000" }}
                    variant="text"
                    startIcon={<DeleteOutlineIcon />}
                  >
                    Delete
                  </Button>
                </div>
              </React.Fragment>
            ))}
            {/* // Add Question */}
            <Button
              onClick={handleAddQuestion}
              fullWidth
              color="warning"
              variant="outlined"
              sx={{ marginTop: "1.5rem" }}
            >
              add question
            </Button>
        </div>
      </div>
    </div>
  );
}
