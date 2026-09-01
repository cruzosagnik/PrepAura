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

  // If no questions in session, redirect back
  useEffect(() => {
    if (!session.questions || session.questions.length === 0) {
      navigate('/interview/setup');
    }
  }, [session, navigate]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentIndex = session.currentIndex || 0;
  const currentQ = session.questions[currentIndex] || {};
  const totalQ = session.questions.length;

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
      const result = await interviewService.completeInterview(session.interviewId);
      navigate(`/interview/result/${result.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session.questions.length) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-900 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{session.config?.role || 'Interview'}</h2>
            <p className="text-[11px] text-slate-500">Live Mock Evaluation</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {formatTimer(seconds)}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExitModal(true)}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" /> Exit
          </Button>
        </div>
      </header>

      {/* Main Interview Card Layout */}
      <main className="max-w-4xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col justify-center">
        {/* Progress */}
        <div className="mb-4">
          <ProgressBar
            progress={((currentIndex + 1) / totalQ) * 100}
            label={`Question ${currentIndex + 1} of ${totalQ}`}
            scoreText={`${Math.round(((currentIndex + 1) / totalQ) * 100)}% Completed`}
          />
        </div>

        <Card className="space-y-6 shadow-sm border-slate-200">
          {/* Question Prompt */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-brand-50 text-brand-900">
                {currentQ.topic || 'General'}
              </span>
              <span className="text-xs text-slate-400 font-medium">Difficulty: {currentQ.difficulty || 'Medium'}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Hint Dropdown */}
          {currentQ.hint && (
            <div>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHint ? 'Hide Hint' : 'Need a hint?'}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-amber-800">
                  {currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* Answer Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Answer
            </label>
            <textarea
              rows={8}
              value={currentText}
              onChange={handleTextChange}
              placeholder="Type your structured explanation here. Be thorough and provide practical examples..."
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
            />
            <div className="flex justify-between items-center mt-1 text-slate-400 text-[11px]">
              <span>Markdown formatting supported</span>
              <span>{currentText.trim().split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              size="md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>

            {currentIndex < totalQ - 1 ? (
              <Button variant="primary" size="md" onClick={handleNext}>
                Next Question <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="accent"
                size="md"
                loading={submitting}
                onClick={handleComplete}
              >
                Finish & Generate AI Report <Send className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </Card>
      </main>

      {/* Exit Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={() => navigate('/dashboard')}
      />
    </div>
  );
};