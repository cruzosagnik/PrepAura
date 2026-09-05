import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview';
import { interviewService } from '../services/interviewService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { ExitConfirmModal } from '../components/interview/ExitConfirmModal';

import {
  Sparkles,
  Clock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Send,
  Lightbulb
} from 'lucide-react';

export const Interview = () => {
  const navigate = useNavigate();
  const { session, saveAnswer, setQuestionIndex } = useInterview();

  const [seconds, setSeconds] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if there are no questions
  useEffect(() => {
    if (!session.questions || session.questions.length === 0) {
      navigate('/interview/setup');
    }
  }, [session, navigate]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentIndex = session.currentIndex || 0;
  const currentQ = session.questions[currentIndex] || {};
  const totalQ = session.questions.length;

  // Load saved answer when question changes
  useEffect(() => {
    setCurrentText(session.answers[currentIndex] || '');
    setShowHint(false);
  }, [currentIndex, session.answers]);

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
    saveAnswer(currentIndex, e.target.value);
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setQuestionIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setQuestionIndex(currentIndex - 1);
    }
  };

  const handleComplete = async () => {
    setSubmitting(true);

    try {
      const result = await interviewService.completeInterview(
        session.interviewId
      );

      navigate(`/interview/result/${result.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  if (!session.questions.length) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="bg-[#0a0a0a] border-b border-white/10 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">

        {/* Logo + Interview Info */}
        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-[#ff6b00] flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Sparkles className="w-4 h-4" />
          </div>

          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              {session.config?.role || 'Interview'}
            </h2>

            <p className="text-[11px] text-gray-500">
              Live Mock Evaluation
            </p>
          </div>

        </div>

        {/* Timer + Exit */}
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-white/10 rounded-lg text-gray-300 text-xs font-mono font-bold">

            <Clock className="w-3.5 h-3.5 text-orange-500" />

            {formatTimer(seconds)}

          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExitModal(true)}
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />

            Exit
          </Button>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-4xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col justify-center">

        {/* Progress */}
        <div className="mb-5">

          <ProgressBar
            progress={((currentIndex + 1) / totalQ) * 100}
            label={`Question ${currentIndex + 1} of ${totalQ}`}
            scoreText={`${Math.round(
              ((currentIndex + 1) / totalQ) * 100
            )}% Completed`}
          />

        </div>

        {/* ================= QUESTION CARD ================= */}
        <Card className="space-y-6 bg-[#141414] border border-white/10 shadow-2xl">

          {/* Question Header */}
          <div className="space-y-3">

            <div className="flex items-center gap-3">

              {/* Topic */}
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                {currentQ.topic || 'General'}
              </span>

              {/* Difficulty */}
              <span className="text-xs text-gray-400 font-medium">
                Difficulty:{' '}
                <span className="text-gray-200">
                  {currentQ.difficulty || 'Medium'}
                </span>
              </span>

            </div>

            {/* QUESTION */}
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {currentQ.question || 'Interview Question'}
            </h2>

          </div>

          {/* ================= HINT ================= */}
          {currentQ.hint && (
            <div>

              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >

                <Lightbulb className="w-3.5 h-3.5" />

                {showHint ? 'Hide Hint' : 'Need a hint?'}

              </button>

              {showHint && (
                <div className="mt-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-sm text-orange-200 leading-relaxed">
                  {currentQ.hint}
                </div>
              )}

            </div>
          )}

          {/* ================= ANSWER ================= */}
          <div>

            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Your Answer
            </label>

            <textarea
              rows={8}
              value={currentText}
              onChange={handleTextChange}
              placeholder="Type your structured explanation here. Be thorough and provide practical examples..."
              className="w-full p-4 text-sm bg-[#0a0a0a] text-white placeholder:text-gray-600 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 resize-none transition-all"
            />

            <div className="flex justify-between items-center mt-2 text-gray-500 text-[11px]">

              <span>
                Markdown formatting supported
              </span>

              <span>
                {currentText.trim().split(/\s+/).filter(Boolean).length} words
              </span>

            </div>

          </div>

          {/* ================= NAVIGATION ================= */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">

            {/* Previous */}
            <Button
              variant="secondary"
              size="md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-[#1a1a1a] border border-white/10 text-gray-300 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />

              Previous
            </Button>

            {/* Next / Finish */}
            {currentIndex < totalQ - 1 ? (

              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
              >
                Next Question

                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

            ) : (

              <Button
                variant="accent"
                size="md"
                loading={submitting}
                onClick={handleComplete}
              >
                Finish & Generate AI Report

                <Send className="w-4 h-4 ml-1" />
              </Button>

            )}

          </div>

        </Card>
      </main>

      {/* ================= EXIT MODAL ================= */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={() => navigate('/dashboard')}
      />

    </div>
  );
};