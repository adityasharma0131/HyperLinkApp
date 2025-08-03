import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import QuestionnairesHero from "../../../../assets/QuestionnairesHero.svg";
import AppButton from "../../../../Components/AppButton";

const Questionnaires = () => {
  const navigate = useNavigate();
  const questions = [
    {
      id: 1,
      text: "Do you have a family history of Type 2 Diabetes? (Parent, sibling)",
      options: [
        "Yes, in immediate family (parent/sibling)",
        "Yes, in extended family (grandparent/uncle/aunt)",
        "No known history",
        "Not sure",
      ],
      weights: [3, 2, 0, 1], // Higher weight for more significant risk factors
    },
    {
      id: 2,
      text: "Has any of your family members been diagnosed with heart disease?",
      options: [
        "Yes, in immediate family",
        "Yes, in extended family",
        "No known history",
        "Not sure",
      ],
      weights: [3, 2, 0, 1],
    },
    {
      id: 3,
      text: "Do you have a history of high blood pressure?",
      options: [
        "Yes, currently diagnosed",
        "Previously diagnosed",
        "No history",
        "Not sure",
      ],
      weights: [3, 2, 0, 1],
    },
    {
      id: 4,
      text: "Have you or your family experienced obesity-related conditions?",
      options: [
        "Yes, in immediate family",
        "Yes, in extended family",
        "No",
        "Not sure",
      ],
      weights: [3, 2, 0, 1],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  useEffect(() => {
    const completed = Object.keys(answers).map(Number);
    setCompletedQuestions(completed);
    setAllQuestionsAnswered(completed.length === questions.length);
  }, [answers, questions.length]);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    if (questionId < questions.length) {
      setActiveQuestion(questionId + 1);
    }
  };

  const handleQuestionClick = (questionId) => {
    if (questionId === 1 || answers[questionId - 1]) {
      setActiveQuestion(questionId);
    }
  };

  const calculateRiskAssessment = () => {
    let totalScore = 0;
    let riskFactors = [];

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        const optionIndex = question.options.indexOf(answer);
        const weight = question.weights[optionIndex];
        totalScore += weight;

        if (weight >= 2) {
          // Only include significant risk factors
          riskFactors.push({
            question: question.text,
            answer: answer,
            severity: weight >= 3 ? "high" : "moderate",
          });
        }
      }
    });

    // Determine risk level based on total score
    let riskLevel;
    if (totalScore >= 10) riskLevel = "high";
    else if (totalScore >= 6) riskLevel = "moderate";
    else riskLevel = "low";

    return {
      riskLevel,
      totalScore,
      riskFactors,
      maxPossibleScore: questions.length * 3, // 3 being the highest weight
    };
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      const assessment = calculateRiskAssessment();
      navigate("/app/counselling/result", { state: { assessment } });
    }
  };

  const resetQuestionnaire = () => {
    setAnswers({});
    setActiveQuestion(1);
  };

  return (
    <div className="counselling-questionnaires-page">
      <div className="counselling-questionnaires-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Hello! <br /> This is HELIX
            </h1>
            <p className="hero-subtitle">Your AI Genetic Guide </p>
          </div>
          <div className="hero-image">
            <img src={QuestionnairesHero} alt="Child receiving vaccine" />
          </div>
        </div>
      </div>

      <div className="health-questionnaire">
        <div className="questions-container">
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              activeQuestion={activeQuestion}
              completedQuestions={completedQuestions}
              answers={answers}
              handleQuestionClick={handleQuestionClick}
              handleSelect={handleSelect}
            />
          ))}
        </div>

        <div className="questionnaire-actions">
          <AppButton
            className={`${!allQuestionsAnswered ? "disabled" : ""}`}
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            text={"Submit Questionnaire"}
          />
          <AppButton
            variant={"secondary"}
            onClick={resetQuestionnaire}
            text={"Reset Answers"}
          />
        </div>
      </div>
    </div>
  );
};

const QuestionItem = ({
  question,
  activeQuestion,
  completedQuestions,
  answers,
  handleQuestionClick,
  handleSelect,
}) => {
  const isActive = activeQuestion === question.id;
  const isCompleted = completedQuestions.includes(question.id);
  const isLocked = question.id > 1 && !answers[question.id - 1];

  return (
    <div
      className={`accordion-item ${isActive ? "active" : ""} ${
        isCompleted ? "completed" : ""
      } ${isLocked ? "locked" : ""}`}
    >
      <div
        className="accordion-header"
        onClick={() => !isLocked && handleQuestionClick(question.id)}
      >
        <div className="question-number">Q{question.id}</div>
        <div className="question-content">
          <h2 className="question-text">{question.text}</h2>
          {answers[question.id] && (
            <p className="answer-preview">
              <span className="selected-label">Selected:</span>{" "}
              {answers[question.id]}
            </p>
          )}
        </div>
        <div className="accordion-icon">
          {isActive ? <ChevronDownIcon /> : <ChevronRightIcon />}
          {isLocked && <LockIcon />}
        </div>
      </div>

      {isActive && (
        <div className="options-group">
          {question.options.map((option, index) => (
            <OptionBox
              key={index}
              option={option}
              isSelected={answers[question.id] === option}
              onSelect={() => handleSelect(question.id, option)}
            />
          ))}
        </div>
      )}
      <style>
        {`
        .counselling-questionnaires-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.counselling-questionnaires-hero {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 20px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(103, 108, 255, 0.2);
}

.hero-top-bar {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.icon-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 18px;
  color: white;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* Changed from center to flex-end */
  position: relative;
  z-index: 2;
  height: 100%; /* Added to take full height */
}

.hero-text h1 {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 200px;
  line-height: 1.5;
}

.hero-image {
  position: relative;
  height: 100%; /* Added to take full height */
  display: flex;
  align-items: flex-end; /* Align image to bottom */
}

.hero-image img {
  width: 150px;
  height: auto;
  position: relative;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
}

/* Modern Health Questionnaire Styles */
.health-questionnaire {
  max-width: 800px;
  margin: 0 auto;
}

.progress-container {
  position: relative;
  height: 6px;
  background: #f0f2f5;
  border-radius: 3px;
  margin-bottom: 32px;
  overflow: hidden;
}
.questions-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accordion-item {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.accordion-item.active {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-color: #c7d2fe;
}

.accordion-item.locked {
  opacity: 0.7;
}

.accordion-item.locked .accordion-header {
  cursor: not-allowed;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.accordion-header:hover:not(.locked) {
  background-color: #f8fafc;
}

.question-number {
  font-size: 16px;
  font-weight: 700;
  color: #a777e3;
  margin-right: 16px;
  min-width: 24px;
}

.question-content {
  flex: 1;
}

.question-text {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
  line-height: 1.4;
}

.answer-preview {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.selected-label {
  font-weight: 500;
  color: #4f6af5;
}

.accordion-icon {
  color: #94a3b8;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lock-icon {
  color: #94a3b8;
}

.accordion-item.active .accordion-icon {
  color: #4f6af5;
}

.accordion-item.locked .accordion-icon {
  color: #cbd5e1;
}

.options-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px 20px;
  animation: fadeIn 0.3s ease-out forwards;
}

.option-box {
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.option-box:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.option-box.selected {
  background: rgba(79, 106, 245, 0.08);
  border-color: #4f6af5;
  color: #4f6af5;
  font-weight: 600;
}

.option-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.check-icon {
  color: #4f6af5;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .health-questionnaire {
    padding: 16px;
  }

  .accordion-header {
    padding: 16px;
  }

  .question-text {
    font-size: 15px;
  }

  .options-group {
    padding: 0 16px 16px;
  }
}

/* Replace inside your styles */
.question-slide {
  opacity: 0;
  transform: scale(0.98);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
  position: absolute;
  width: 100%;
}

.question-slide.visible {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  position: relative;
}

.questions-container {
  position: relative;
  min-height: 200px;
}

.questionnaire-actions {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-direction: column;
}
`}
      </style>
    </div>
  );
};

const OptionBox = ({ option, isSelected, onSelect }) => (
  <div
    className={`option-box ${isSelected ? "selected" : ""}`}
    onClick={onSelect}
  >
    <div className="option-content">
      <span className="option-text">{option}</span>
      {isSelected && <CheckIcon />}
    </div>
  </div>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 9L12 16L5 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 5L16 12L9 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12.6667 7.33333H3.33333C2.59695 7.33333 2 7.93028 2 8.66666V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V8.66666C14 7.93028 13.403 7.33333 12.6667 7.33333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66663 7.33333V4.66666C4.66663 3.78261 5.01782 2.93476 5.64294 2.30964C6.26806 1.68452 7.11591 1.33333 7.99996 1.33333C8.88401 1.33333 9.73186 1.68452 10.357 2.30964C10.9821 2.93476 11.3333 3.78261 11.3333 4.66666V7.33333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="check-icon"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M16.6666 5L7.49992 14.1667L3.33325 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Questionnaires;
