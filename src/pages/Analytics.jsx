import React from 'react';
import { Card } from '../components/common/Card';
import { MOCK_SCORE_TREND, MOCK_SKILL_ANALYSIS } from '../utils/mockData';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics & Insights</h1>
        <p className="text-sm text-slate-500 mt-1">Deep dive into your strengths and consistency metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7">
          <h3 className="text-base font-bold text-slate-900 mb-4">Score Trend Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_SCORE_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[50, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#0f172a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <h3 className="text-base font-bold text-slate-900 mb-4">Skill Radar Evaluation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SKILL_ANALYSIS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} fontSize={11} stroke="#94a3b8" />
                <YAxis dataKey="skill" type="category" width={110} fontSize={11} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="score" fill="#0f172a" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};