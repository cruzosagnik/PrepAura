import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { Loading } from '../components/common/Loading';
import {
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  LayoutDashboard,
  Award
} from 'lucide-react';

export const InterviewResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await interviewService.getInterviewResult(id);
        setResult(res);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  if (loading) return <Loading text="Compiling AI performance breakdown..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Performance Report</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-0.5">Interview Complete 🎉</h1>
          <p className="text-xs text-slate-500 mt-1">{result.role} • {result.type} • {result.date}</p>
        </div>

        <div className="flex gap-2.5">
          <Button variant="secondary" onClick={() => navigate('/interview/setup')}>
            <RotateCcw className="w-4 h-4 mr-1" /> Retry
          </Button>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="w-4 h-4 mr-1" /> Dashboard
          </Button>
        </div>
      </div>

      {/* Overall Score & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-4 flex flex-col items-center justify-center text-center p-8 bg-brand-900 text-white">
          <Award className="w-10 h-10 text-brand-300 mb-2" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-200">Overall Score</span>
          <div className="text-6xl font-extrabold my-2">{result.overallScore}</div>
          <p className="text-xs text-brand-200">Out of 100 maximum benchmark</p>
        </Card>

        <Card className="md:col-span-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Evaluation Metrics</h3>
          <ProgressBar label="Technical Knowledge" progress={result.scores.technical} scoreText={`${result.scores.technical}%`} />
          <ProgressBar label="Communication & Articulation" progress={result.scores.communication} scoreText={`${result.scores.communication}%`} />
          <ProgressBar label="Problem Solving Approach" progress={result.scores.problemSolving} scoreText={`${result.scores.problemSolving}%`} />
          <ProgressBar label="Delivery Confidence" progress={result.scores.confidence} scoreText={`${result.scores.confidence}%`} />
        </Card>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-emerald-100 bg-emerald-50/20">
          <div className="flex items-center gap-2 mb-4 text-emerald-800 font-bold text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Key Strengths
          </div>
          <ul className="space-y-2.5">
            {result.strengths.map((str, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                {str}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-amber-100 bg-amber-50/20">
          <div className="flex items-center gap-2 mb-4 text-amber-800 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Areas for Improvement
          </div>
          <ul className="space-y-2.5">
            {result.improvements.map((imp, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                {imp}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* AI Recommendation */}
      <Card className="bg-slate-900 text-white p-6 space-y-2">
        <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Strategic Recommendation
        </div>
        <p className="text-sm font-normal text-slate-200 leading-relaxed">
          {result.aiRecommendation}
        </p>
      </Card>

      {/* Question by Question Review */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Detailed Question Review</h3>
        {result.questionReviews.map((rev, idx) => (
          <Card key={idx} className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-sm font-bold text-slate-900">
                Q{idx + 1}: {rev.question}
              </h4>
              <span className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-bold shrink-0">
                Score: {rev.score}/100
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Your Response</span>
              <p className="text-xs text-slate-700 italic">&quot;{rev.userAnswer}&quot;</p>
            </div>

            <div className="p-3 bg-blue-50/50 rounded-xl space-y-1 border border-blue-100">
              <span className="text-[11px] font-bold text-brand-900 uppercase tracking-wider">Model Answer</span>
              <p className="text-xs text-slate-700">{rev.modelAnswer}</p>
            </div>

            <p className="text-xs text-slate-600">
              <strong className="text-slate-900">Critique & Improvement: </strong>
              {rev.suggestion}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};