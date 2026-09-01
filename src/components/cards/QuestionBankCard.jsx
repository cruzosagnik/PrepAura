import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Clock, Tag, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuestionBankCard = ({ item }) => {
  const navigate = useNavigate();

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Hard: 'bg-rose-50 text-rose-700 border-rose-200'
  };

  return (
    <Card hover className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${difficultyColors[item.difficulty]}`}>
            {item.difficulty}
          </span>
          <span className="flex items-center text-xs font-medium text-slate-400 gap-1">
            <Clock className="w-3.5 h-3.5" />
            {item.timeEstimate}
          </span>
        </div>
        <h4 className="text-base font-semibold text-slate-900 leading-snug mb-2">{item.question}</h4>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          {item.topic}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/interview/setup')}
          className="text-xs"
        >
          Practice <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </Card>
  );
};