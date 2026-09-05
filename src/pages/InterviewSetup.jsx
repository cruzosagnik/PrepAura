import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ROLES,
  EXPERIENCE_LEVELS,
  INTERVIEW_TYPES,
  DIFFICULTIES,
  QUESTION_COUNTS
} from '../utils/constants';
import { useInterview } from '../hooks/useInterview';
import { interviewService } from '../services/interviewService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Sliders, Play, CheckCircle } from 'lucide-react';

export const InterviewSetup = () => {
  const navigate = useNavigate();
  const { initializeSession } = useInterview();
  const [loading, setLoading] = useState(false);

  const [config, setConfig] = useState({
    role: 'Frontend Developer',
    experienceLevel: 'Mid-Level',
    type: 'Technical',
    difficulty: 'Medium',
    questionCount: 5
  });

  const handleStart = async () => {
    setLoading(true);

    try {
      const interviewSession = await interviewService.startInterview(config);
      initializeSession(interviewSession);
      navigate('/interview/session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#050505] text-white">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Configure Your Interview
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Customize criteria to trigger role-targeted mock questions and
          evaluation metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Configuration Selectors */}
        <div className="lg:col-span-8 space-y-6">

          {/* Target Role */}
          <Card>
            <label className="block text-sm font-bold text-white mb-3">
              1. Select Target Role
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() =>
                    setConfig({
                      ...config,
                      role: r
                    })
                  }
                  className={`p-3 text-xs font-semibold rounded-xl border text-left transition-all duration-200 ${
                    config.role === r
                      ? 'bg-[#ff6b00] text-white border-[#ff6b00] shadow-lg shadow-orange-500/20'
                      : 'bg-[#141414] text-gray-300 border-white/10 hover:border-orange-500/50 hover:text-white hover:bg-[#1c1c1c]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </Card>

          {/* Experience Level & Interview Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Experience Level */}
            <Card>
              <label className="block text-sm font-bold text-white mb-3">
                2. Experience Level
              </label>

              <div className="space-y-2">
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        experienceLevel: lvl
                      })
                    }
                    className={`w-full p-2.5 text-xs font-semibold rounded-xl border text-left flex justify-between items-center transition-all duration-200 ${
                      config.experienceLevel === lvl
                        ? 'bg-[#ff6b00] text-white border-[#ff6b00]'
                        : 'bg-[#141414] text-gray-300 border-white/10 hover:border-orange-500/50 hover:text-white'
                    }`}
                  >
                    {lvl}

                    {config.experienceLevel === lvl && (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Interview Type */}
            <Card>
              <label className="block text-sm font-bold text-white mb-3">
                3. Interview Type
              </label>

              <div className="space-y-2">
                {INTERVIEW_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        type: t
                      })
                    }
                    className={`w-full p-2.5 text-xs font-semibold rounded-xl border text-left flex justify-between items-center transition-all duration-200 ${
                      config.type === t
                        ? 'bg-[#ff6b00] text-white border-[#ff6b00]'
                        : 'bg-[#141414] text-gray-300 border-white/10 hover:border-orange-500/50 hover:text-white'
                    }`}
                  >
                    {t}

                    {config.type === t && (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Difficulty & Number of Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Difficulty */}
            <Card>
              <label className="block text-sm font-bold text-white mb-3">
                4. Difficulty
              </label>

              <div className="flex gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        difficulty: d
                      })
                    }
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border text-center transition-all duration-200 ${
                      config.difficulty === d
                        ? 'bg-[#ff6b00] text-white border-[#ff6b00]'
                        : 'bg-[#141414] text-gray-300 border-white/10 hover:border-orange-500/50 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Card>

            {/* Question Count */}
            <Card>
              <label className="block text-sm font-bold text-white mb-3">
                5. Question Count
              </label>

              <div className="flex gap-2">
                {QUESTION_COUNTS.map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        questionCount: cnt
                      })
                    }
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border text-center transition-all duration-200 ${
                      config.questionCount === cnt
                        ? 'bg-[#ff6b00] text-white border-[#ff6b00]'
                        : 'bg-[#141414] text-gray-300 border-white/10 hover:border-orange-500/50 hover:text-white'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4">

          <Card className="sticky top-24 bg-[#141414] border-white/10 shadow-xl">

            {/* Summary Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">

              <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Sliders className="w-4 h-4 text-orange-500" />
              </div>

              <h3 className="text-sm font-bold text-white">
                Session Summary
              </h3>
            </div>

            {/* Summary Details */}
            <div className="py-4 space-y-4 text-xs">

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Target Role
                </span>

                <span className="font-semibold text-white text-right">
                  {config.role}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Seniority
                </span>

                <span className="font-semibold text-white text-right">
                  {config.experienceLevel}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Format
                </span>

                <span className="font-semibold text-white text-right">
                  {config.type}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Difficulty
                </span>

                <span className="font-semibold text-orange-400 text-right">
                  {config.difficulty}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Total Questions
                </span>

                <span className="font-semibold text-white text-right">
                  {config.questionCount} Questions
                </span>
              </div>
            </div>

            {/* Start Button */}
            <Button
              size="lg"
              loading={loading}
              onClick={handleStart}
              className="w-full mt-2 bg-[#ff6b00] hover:bg-[#ff8533]"
            >
              <Play className="w-4 h-4 mr-1" />
              Start AI Interview
            </Button>

          </Card>
        </div>
      </div>
    </div>
  );
};