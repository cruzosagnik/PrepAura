import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import { Search } from 'lucide-react';

export const InterviewHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await interviewService.getHistory();
        setHistory(res);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) =>
    item.role.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Interview History</h1>
        <p className="text-sm text-slate-500 mt-1">Review past scores and progress logs.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by role or type..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none"
        />
      </div>

      <Card>
        {loading ? (
          <Loading text="Loading interview records..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Difficulty</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 font-medium text-slate-900">{item.role}</td>
                    <td className="py-3.5 text-slate-600">{item.type}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 font-semibold">
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">{item.score}%</td>
                    <td className="py-3.5 text-slate-500 text-xs">{item.duration}</td>
                    <td className="py-3.5 text-slate-500 text-xs">{item.date}</td>
                    <td className="py-3.5 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/interview/result/${item.id}`)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};