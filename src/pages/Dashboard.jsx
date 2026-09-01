import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { interviewService } from '../services/interviewService';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { Loading } from '../components/common/Loading';
import {
  CheckCircle2,
  Award,
  HelpCircle,
  Flame,
  PlayCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDash = async () => {
      try {
        const res = await interviewService.getDashboardData();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchDash();
  }, []);

  if (loading) return <Loading text="Loading dashboard analytics..." />;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ready to sharpen your answers and track your improvement today?
          </p>
        </div>
        <Button
          size="lg"
          variant="primary"
          onClick={() => navigate('/interview/setup')}
          className="shrink-0"
        >
          <PlayCircle className="w-5 h-5 mr-1" /> Start New Interview
        </Button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Interviews Completed"
          value={data.stats.interviewsCompleted}
          change="+3 this week"
          icon={CheckCircle2}
        />
        <StatCard
          title="Average Score"
          value={`${data.stats.averageScore}%`}
          change="+4% overall boost"
          icon={Award}
        />
        <StatCard
          title="Questions Answered"
          value={data.stats.questionsAnswered}
          change="Across 6 domains"
          icon={HelpCircle}
        />
        <StatCard
          title="Current Streak"
          value={`${data.stats.currentStreak} Days`}
          change="Keep it up!"
          icon={Flame}
        />
      </div>

      {/* Charts & Skill Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Performance Trend</h3>
              <p className="text-xs text-slate-500">Historical interview score progression</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              +14% Increase
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.scoreTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[50, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#0f172a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0f172a' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Analysis Breakdown */}
        <Card className="lg:col-span-5">
          <div className="mb-5">
            <h3 className="text-base font-bold text-slate-900">Skill Breakdown</h3>
            <p className="text-xs text-slate-500">Evaluation across critical focus areas</p>
          </div>
          <div className="space-y-4">
            {data.skillAnalysis.map((item) => (
              <ProgressBar
                key={item.skill}
                label={item.skill}
                progress={item.score}
                scoreText={`${item.score}/100`}
                color={item.score >= 85 ? 'bg-brand-900' : 'bg-blue-600'}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Interviews Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Mock Sessions</h3>
            <p className="text-xs text-slate-500">Review your past evaluations and feedback</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
            View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-400">
              <tr>
                <th className="pb-3">Role</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Score</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.recentInterviews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 font-medium text-slate-900">{item.role}</td>
                  <td className="py-3.5 text-slate-500">{item.type}</td>
                  <td className="py-3.5">
                    <span className="font-bold text-slate-900">{item.score}%</span>
                  </td>
                  <td className="py-3.5 text-slate-500 text-xs">{item.date}</td>
                  <td className="py-3.5 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/interview/result/${item.id}`)}
                    >
                      Report
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};