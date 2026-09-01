import React, { createContext, useState } from 'react';

export const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [session, setSession] = useState({
    interviewId: null,
    config: null,
    questions: [],
    answers: {},
    currentIndex: 0,
    startTime: null
  });

  const initializeSession = (interviewData) => {
    setSession({
      interviewId: interviewData.interviewId,
      config: interviewData.config,
      questions: interviewData.questions,
      answers: {},
      currentIndex: 0,
      startTime: Date.now()
    });
  };

  const saveAnswer = (questionIndex, text) => {
    setSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionIndex]: text }
    }));
  };

  const setQuestionIndex = (index) => {
    setSession((prev) => ({ ...prev, currentIndex: index }));
  };

  const resetSession = () => {
    setSession({
      interviewId: null,
      config: null,
      questions: [],
      answers: {},
      currentIndex: 0,
      startTime: null
    });
  };

  return (
    <InterviewContext.Provider
      value={{
        session,
        initializeSession,
        saveAnswer,
        setQuestionIndex,
        resetSession
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};