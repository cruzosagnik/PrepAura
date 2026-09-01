import React, { useState, useEffect } from 'react';
import { questionService } from '../services/questionService';
import { QuestionBankCard } from '../components/cards/QuestionBankCard';
import { Loading } from '../components/common/Loading';
import { Search, Filter } from 'lucide-react';

export const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    const fetchQ = async () => {
      try {
        const res = await questionService.getQuestions();
        setQuestions(res);
      } finally {
        setLoading(false);
      }
    };
    fetchQ();
  }, []);

  const filtered = questions.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchSearch && matchDiff;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
        <p className="text-sm text-slate-500 mt-1">Explore real-world technical and behavioral prompts.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Question Grid */}
      {loading ? (
        <Loading text="Loading questions..." />
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">No questions matched your search criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <QuestionBankCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};