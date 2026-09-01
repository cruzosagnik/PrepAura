import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiCritiqueStrictness, setAiCritiqueStrictness] = useState('Rigorous');

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure evaluation tone, preferences, and notifications.</p>
      </div>

      <Card className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">AI Evaluation Strictness</h3>
          <p className="text-xs text-slate-500 mb-3">Adjust how strictly the AI scores syntax and articulation.</p>
          <div className="flex gap-2">
            {['Lenient', 'Moderate', 'Rigorous'].map((level) => (
              <button
                key={level}
                onClick={() => setAiCritiqueStrictness(level)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border ${
                  aiCritiqueStrictness === level
                    ? 'bg-brand-900 text-white border-brand-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Email Notifications</h4>
            <p className="text-xs text-slate-500">Receive weekly preparation summaries and streak alerts.</p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
            className="w-4 h-4 rounded text-brand-900"
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Button variant="primary">Save Preferences</Button>
        </div>
      </Card>
    </div>
  );
};