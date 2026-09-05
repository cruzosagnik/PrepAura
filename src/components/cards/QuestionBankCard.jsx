import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Clock, Tag, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuestionBankCard = ({ item }) => {
  const navigate = useNavigate();

  const difficultyColors = {
    Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
    Medium: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  return (
    <Card hover className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
              difficultyColors[item.difficulty]
            }`}
          >
            {item.difficulty}
          </span>

          <span className="flex items-center text-xs font-medium text-gray-400 gap-1">
            <Clock className="w-3.5 h-3.5" />
            {item.timeEstimate}
          </span>
        </div>

        <h4 className="text-base font-semibold text-white leading-snug mb-2">
          {item.question}
        </h4>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <Tag className="w-3.5 h-3.5 text-orange-500" />
          {item.topic}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/interview/setup')}
          className="text-xs"
        >
          Practice
          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </Card>
  );
};