import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiChevronDown, FiChevronRight, FiLock, FiCheck } from "react-icons/fi";

import QuestionnairesHero from "../../../../assets/QuestionnairesHero.svg";
import AppButton from "../../../../Components/AppButton";

const Questionnaires = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vaccineName = location.state?.vaccineName || "Selected Vaccine";

  // ✅ If already completed, go to /app/vaccination
  useEffect(() => {
    const hasCompleted = localStorage.getItem("vaccinationQuestionaries") === "true";
    if (hasCompleted) {
      navigate("/app/vaccination");
    }
  }, [navigate]);

  const questions = [
    { id: 1, text: "Are you allergic to anything?", options: ["Yes", "No"] },
    { id: 2, text: "Do you currently have any fever or active infection?", options: ["Yes", "No"] },
    { id: 3, text: "Are you currently on any kind of medications?", options: ["Yes", "No"] },
  ];

  const [answers, setAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("right");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const completed = Object.keys(answers).map(Number);
    setCompletedQuestions(completed);
    setAllQuestionsAnswered(completed.length === questions.length);
  }, [answers, questions.length]);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    if (questionId < questions.length) {
      setAnimationDirection("right");
      setActiveQuestion(questionId + 1);
    }
  };

  const handleSubmit = () => {
    if (!allQuestionsAnswered) {
      alert("Please answer all the questions before submitting.");
      return;
    }
    const allYes = questions.every((q) => answers[q.id] && answers[q.id].toLowerCase() === "yes");
    if (allYes) {
      setShowPopup(true);
    } else {
      localStorage.setItem("vaccinationQuestionaries", "true");
      navigate("/app/vaccination/order-summary", { state: { vaccineName } });
    }
  };

  const handleConsult = () => navigate("/app/consultation");
  const handleContinueAnyway = () => {
    localStorage.setItem("vaccinationQuestionaries", "true");
    navigate("/app/vaccination/order-summary", { state: { vaccineName } });
  };

  const handleQuestionClick = (questionId) => {
    if (questionId === 1 || answers[questionId - 1] || completedQuestions.includes(questionId)) {
      setAnimationDirection(questionId > activeQuestion ? "right" : "left");
      setActiveQuestion(questionId);
    }
  };

  const goToNextQuestion = () => {
    if (activeQuestion < questions.length) {
      setAnimationDirection("right");
      setActiveQuestion(activeQuestion + 1);
    }
  };
  const goToPrevQuestion = () => {
    if (activeQuestion > 1) {
      setAnimationDirection("left");
      setActiveQuestion(activeQuestion - 1);
    }
  };
  const resetQuestionnaire = () => {
    setAnswers({});
    setActiveQuestion(1);
  };

  return (
    <div className="vaccination-questionnaires-page">
      <div className="vaccination-questionnaires-hero">
        <div className="hero-top-bar">
          <button className="icon-button" onClick={() => window.history.back()}>
            <FiArrowLeft className="hero-icon" />
          </button>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hello! <br /> This is HELIX</h1>
            <p className="hero-subtitle">Your AI Genetic Guide</p>
            <p className="hero-vaccine-name">Assessment for: <strong>{vaccineName}</strong></p>
          </div>
          <div className="hero-image">
            <img src={QuestionnairesHero} alt="Genetic counseling illustration" />
          </div>
        </div>
      </div>

      <div className="vaccination-questionnaire">
        <div className="progress-container">
          <div className="progress-indicator">
            <div
              className="progress-bar"
              style={{ width: `${(completedQuestions.length / questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">{completedQuestions.length} of {questions.length} completed</span>
          <div className="question-navigation">
            <AppButton text="Previous" onClick={goToPrevQuestion} variant="secondary" />
            <AppButton text="Next" onClick={goToNextQuestion} />
          </div>
        </div>

        <div className="questions-stack-container">
          {questions.map((question, index) => {
            const isAnswered = answers[question.id];
            const isActive = activeQuestion === question.id;
            const stackPosition = completedQuestions.indexOf(question.id);
            const isBehind = isAnswered && !isActive && stackPosition >= 0;

            return (
              <QuestionItem
                key={question.id}
                question={question}
                activeQuestion={activeQuestion}
                completedQuestions={completedQuestions}
                answers={answers}
                handleQuestionClick={handleQuestionClick}
                handleSelect={handleSelect}
                stackPosition={stackPosition}
                isBehind={isBehind}
                isFirst={index === 0}
                animationDirection={isActive ? animationDirection : null}
              />
            );
          })}
        </div>

        <div className="questionnaire-actions">
          <button className={`submit-btn ${!allQuestionsAnswered ? "disabled" : ""}`} onClick={handleSubmit}>
            Submit Assessment
          </button>
          <button className="reset-btn" onClick={resetQuestionnaire}>
            Reset Answers
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Health Advisory</h2>
            <p>You should be physically fit to access vaccines. We suggest you consult a doctor.</p>
            <div className="popup-actions">
              <AppButton text="Consult a Doctor" onClick={handleConsult} />
              <AppButton text="Continue Anyway" onClick={handleContinueAnyway} variant="secondary" />
            </div>
          </div>
        </div>
      )}


      <style>
        {`
          .vaccination-questionnaires-page {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background-color: #f9fafc;
  min-height: 100vh;
}

.vaccination-questionnaires-hero {
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  padding: 24px;
  border-radius: 0 0 32px 32px;
  color: white;
  position: relative;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  overflow: hidden;
}

.vaccination-questionnaires-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 60%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  z-index: 1;
}

.hero-top-bar {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.icon-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 2;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-icon {
  font-size: 20px;
  color: white;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 2;
  height: 100%;
}

.hero-text h1 {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 280px;
  line-height: 1.5;
  font-weight: 500;
}

.hero-image {
  position: relative;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.hero-image img {
  width: 180px;
  height: auto;
  position: relative;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
  transform: translateY(10px);
}

.vaccination-questionnaire {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.progress-container {
  margin-bottom: 24px;
  position: relative;
}

.progress-indicator {
  height: 6px;
  background: #EDF2F7;
  border-radius: 3px;
  margin-bottom: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6366F1, #8B5CF6);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  display: block;
  font-size: 14px;
  color: #64748B;
  font-weight: 500;
  text-align: right;
}

.questions-stack-container {
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.accordion-item {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid #EDF2F7;
  transform-origin: top center;
}

.accordion-item.active {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #C7D2FE;
  transform: translateY(0) scale(1) !important;
  z-index: 100 !important;
  opacity: 1 !important;
  width: 100% !important;
  margin-left: 0 !important;
  position: relative !important;
}

.accordion-item.slide-right {
  animation: slideInRight 0.3s ease-out forwards;
}

.accordion-item.slide-left {
  animation: slideInLeft 0.3s ease-out forwards;
}

.accordion-item.stacked {
  transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.accordion-header:hover:not(.locked) {
  background-color: #F8FAFC;
}

.question-number-container {
  position: relative;
  margin-right: 16px;
  min-width: 24px;
}

.question-number {
  font-size: 16px;
  font-weight: 700;
  color: #6366F1;
  background: rgba(99, 102, 241, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.answer-indicator {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #10B981;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.answer-indicator svg {
  width: 10px;
  height: 10px;
  color: white;
}

.question-content {
  flex: 1;
}

.question-text {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 6px;
  line-height: 1.4;
}

.answer-preview {
  font-size: 14px;
  color: #64748B;
  margin: 0;
}

.selected-label {
  font-weight: 500;
  color: #6366F1;
}

.accordion-icon {
  color: #94A3B8;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.accordion-item.active .accordion-icon {
  color: #6366F1;
}

.accordion-item.locked .accordion-icon {
  color: #CBD5E1;
}

.options-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 0 20px 20px;
  animation: fadeIn 0.3s ease-out forwards;
}

.option-card {
  padding: 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.option-card:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.option-card.selected {
  background: rgba(99, 102, 241, 0.05);
  border-color: #6366F1;
  color: #6366F1;
  font-weight: 600;
}

.option-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-icon svg {
  width: 18px;
  height: 18px;
}

.option-card.selected .option-icon {
  background: rgba(99, 102, 241, 0.2);
}

.option-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-badge {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6366F1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

.selected-badge svg {
  width: 12px;
  height: 12px;
  color: white;
}

.question-navigation {
      display: flex
;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0 3rem;
    gap: 1rem;
}

.nav-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-button.prev {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.nav-button.next {
  background-color: #4a6bff;
  color: white;
  border: 1px solid #4a6bff;
}

.nav-button:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-button:active:not(.disabled) {
  transform: translateY(0);
}

.nav-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Accessibility focus styles */
.nav-button:focus-visible {
  outline: 2px solid #4a6bff;
  outline-offset: 2px;
}
.nav-button {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F5F9;
  color: #64748B;
}

.nav-button.next {
  background: #6366F1;
  color: white;
}

.nav-button.prev {
  background: #F1F5F9;
  color: #64748B;
}

.nav-button:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.question-counter {
  font-size: 14px;
  color: #64748B;
  font-weight: 500;
}

.questionnaire-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-direction: column;
}

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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .vaccination-questionnaire {
    padding: 16px;
  }

  .hero-text h1 {
    font-size: 28px;
  }

  .hero-image img {
    width: 140px;
  }

  .accordion-header {
    padding: 16px;
  }

  .question-text {
    font-size: 15px;
  }

  .options-group {
    grid-template-columns: 1fr;
    padding: 0 16px 16px;
  }
}

@media (max-width: 480px) {
  .vaccination-questionnaires-hero {
    padding: 20px 16px;
  }

  .hero-text h1 {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .hero-image img {
    width: 120px;
  }

  .nav-button {
    width: 100%;
  }
}


   .submit-btn {
            background-color: #553fb5;
            color: #fff;
            border: none;
            display: flex;
            border-radius: 8px;
            padding: 10px 18px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            font-family: "Outfit", sans-serif;
            gap: 5px;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .reset-btn {
            background-color: #fff;
            color: #553fb5;
            border: 1.5px solid #d1d5db;
            display: flex;
            border-radius: 8px;
            padding: 10px 18px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            font-family: "Outfit", sans-serif;
            gap: 5px;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }

          .popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.popup-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}


`}
      </style>
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
  stackPosition,
  isBehind,
  isFirst,
  animationDirection,
}) => {
  const isActive = activeQuestion === question.id;
  const isCompleted = completedQuestions.includes(question.id);
  const isLocked = question.id > 1 && !answers[question.id - 1] && !isCompleted;
  const hasAnswer = answers[question.id];

  return (
    <div
      className={`accordion-item ${isActive ? "active" : ""} ${
        isCompleted ? "completed" : ""
      } ${isLocked ? "locked" : ""} ${isBehind ? "stacked" : ""} ${
        isActive && animationDirection ? `slide-${animationDirection}` : ""
      }`}
      style={{
        transform: isBehind
          ? `translateY(${stackPosition * -12}px) scale(${
              1 - stackPosition * 0.03
            })`
          : "none",
        zIndex: isActive ? 100 : isBehind ? 10 - stackPosition : 50,
        opacity: isBehind ? 0.9 - stackPosition * 0.1 : 1,
        position: isBehind ? "absolute" : "relative",
        width: isBehind ? `calc(100% - ${stackPosition * 12}px)` : "100%",
        marginLeft: isBehind ? `${stackPosition * 6}px` : "0",
      }}
    >
      <div
        className="accordion-header"
        onClick={() => !isLocked && handleQuestionClick(question.id)}
      >
        <div className="question-number-container">
          <div className="question-number">Q{question.id}</div>
          {hasAnswer && (
            <div className="answer-indicator">
              <FiCheck />
            </div>
          )}
        </div>
        <div className="question-content">
          <h2 className="question-text">{question.text}</h2>
          {answers[question.id] && (
            <p className="answer-preview">
              <span className="selected-label">Your answer:</span>{" "}
              {answers[question.id]}
            </p>
          )}
        </div>
        <div className="accordion-icon">
          {isActive ? <FiChevronDown /> : <FiChevronRight />}
          {isLocked && <FiLock />}
        </div>
      </div>

      {isActive && (
        <div className="options-group">
          {question.options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              isSelected={answers[question.id] === option}
              onSelect={() => handleSelect(question.id, option)}
              icon={getOptionIcon(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OptionCard = ({ option, isSelected, onSelect, icon }) => (
  <div
    className={`option-card ${isSelected ? "selected" : ""}`}
    onClick={onSelect}
  >
    <div className="option-icon">{icon}</div>
    <div className="option-content">
      <span className="option-text">{option}</span>
      {isSelected && (
        <div className="selected-badge">
          <FiCheck />
        </div>
      )}
    </div>
  </div>
);

const getOptionIcon = (index) => {
  const icons = [
    <svg
      key="1"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>,
    <svg
      key="2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12H18L15 21L9 3L6 12H2" />
    </svg>,
    <svg
      key="3"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>,
    <svg
      key="4"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </svg>,
  ];
  return icons[index % icons.length];
};

export default Questionnaires;
