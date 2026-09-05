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
  ArrowRight
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <Loading text="Loading dashboard analytics..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white space-y-8">

      {/* =========================
          WELCOME BANNER
      ========================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] p-6 rounded-2xl border border-orange-500/20 shadow-lg">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Ready to sharpen your answers and track your improvement today?
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          onClick={() => navigate('/interview/setup')}
          className="shrink-0"
        >
          <PlayCircle className="w-5 h-5 mr-1" />
          Start New Interview
        </Button>

      </div>


      {/* =========================
          STAT CARDS
      ========================== */}
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


      {/* =========================
          CHARTS + SKILLS
      ========================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* PERFORMANCE CHART */}
        <Card className="lg:col-span-7">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3 className="text-base font-bold text-white">
                Performance Trend
              </h3>

              <p className="text-xs text-gray-400">
                Historical interview score progression
              </p>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">
              +14% Increase
            </span>

          </div>


          <div className="h-64 w-full">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data.scoreTrend}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#262626"
                />

                <XAxis
                  dataKey="date"
                  stroke="#737373"
                  fontSize={11}
                  tickLine={false}
                />

                <YAxis
                  stroke="#737373"
                  fontSize={11}
                  domain={[50, 100]}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: '#141414',
                    border: '1px solid rgba(255, 107, 0, 0.3)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '12px'
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ff6b00"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: '#ff6b00'
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#ff8533'
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </Card>


        {/* SKILL BREAKDOWN */}
        <Card className="lg:col-span-5">

          <div className="mb-5">

            <h3 className="text-base font-bold text-white">
              Skill Breakdown
            </h3>

            <p className="text-xs text-gray-400">
              Evaluation across critical focus areas
            </p>

          </div>


          <div className="space-y-4">

            {data.skillAnalysis.map((item) => (

              <ProgressBar
                key={item.skill}
                label={item.skill}
                progress={item.score}
                scoreText={`${item.score}/100`}
                color={
                  item.score >= 85
                    ? 'bg-orange-500'
                    : 'bg-orange-700'
                }
              />

            ))}

          </div>

        </Card>

      </div>


      {/* =========================
          RECENT INTERVIEWS
      ========================== */}
      <Card>

        <div className="flex items-center justify-between mb-4">

          <div>

            <h3 className="text-base font-bold text-white">
              Recent Mock Sessions
            </h3>

            <p className="text-xs text-gray-400">
              Review your past evaluations and feedback
            </p>

          </div>


          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/history')}
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="border-b border-white/10 text-xs font-semibold uppercase text-gray-500">

              <tr>

                <th className="pb-3">
                  Role
                </th>

                <th className="pb-3">
                  Type
                </th>

                <th className="pb-3">
                  Score
                </th>

                <th className="pb-3">
                  Date
                </th>

                <th className="pb-3 text-right">
                  Action
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-white/10">

              {data.recentInterviews.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-orange-500/5 transition-colors"
                >

                  <td className="py-3.5 font-medium text-white">
                    {item.role}
                  </td>

                  <td className="py-3.5 text-gray-400">
                    {item.type}
                  </td>

                  <td className="py-3.5">

                    <span className="font-bold text-orange-400">
                      {item.score}%
                    </span>

                  </td>

                  <td className="py-3.5 text-gray-400 text-xs">
                    {item.date}
                  </td>

                  <td className="py-3.5 text-right">

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        navigate(`/interview/result/${item.id}`)
                      }
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