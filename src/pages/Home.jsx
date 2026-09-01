import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  Sparkles,
  Bot,
  BarChart2,
  CheckCircle2,
  ShieldCheck,
  Target,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Next-Gen AI Interview Coaching
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                Prepare Smarter. <br />
                <span className="text-brand-900">Interview Better.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Experience ultra-realistic mock interviews with state-of-the-art AI. Receive real-time critique, skill diagnostics, and role-based recommendations to land your dream offer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" variant="primary" onClick={() => navigate('/interview/setup')}>
                  Start Practicing Free <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
                  View Demo Dashboard
                </Button>
              </div>
            </div>

            {/* Dashboard / Mock Preview UI */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 to-brand-900 p-1.5 shadow-2xl">
                <Card className="bg-slate-900 text-white border-0 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live AI Evaluation</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-brand-800 text-brand-200">Score: 94/100</span>
                  </div>
                  <p className="text-sm font-mono text-slate-300">
                    &quot;Your explanation of database indexing tradeoffs was exceptionally clear and concise...&quot;
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-800/80 rounded-xl">
                      <p className="text-[11px] text-slate-400">Technical Depth</p>
                      <p className="text-lg font-bold text-white">96%</p>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl">
                      <p className="text-[11px] text-slate-400">Clarity & Brevity</p>
                      <p className="text-lg font-bold text-white">92%</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900">10K+</h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Interviews Practiced</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900">95%</h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">User Satisfaction</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900">50+</h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Job Role Tracks</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900">&lt; 1 sec</h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">AI Feedback Speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Capabilities</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Engineered for Interview Mastery</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">AI Mock Interviews</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Adaptive questioning tailored specifically to your role, stack seniority, and chosen difficulty level.
              </p>
            </Card>

            <Card hover className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Personalized Feedback</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Granular reports highlighting strengths, missed technical nuances, and exact model responses.
              </p>
            </Card>

            <Card hover className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Performance Analytics</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track metrics over time across communication clarity, problem-solving depth, and subject knowledge.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Workflow</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Simple 4-Step Process</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose Role', desc: 'Select seniority, domain, and interview focus.' },
              { step: '02', title: 'Start Session', desc: 'Simulate an authentic high-pressure interview room.' },
              { step: '03', title: 'Answer Prompts', desc: 'Formulate answers under live timing conditions.' },
              { step: '04', title: 'Review Report', desc: 'Analyze AI feedback, scores, and model answers.' }
            ].map((st, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                <span className="text-2xl font-black text-brand-900">{st.step}</span>
                <h4 className="text-base font-bold text-slate-900 mt-2">{st.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-brand-900 text-white p-12 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to ace your next interview?</h2>
            <p className="text-brand-200 max-w-xl mx-auto text-sm sm:text-base">
              Join thousands of engineers and product leaders accelerating their career trajectory today.
            </p>
            <div>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-slate-900 hover:bg-slate-100"
                onClick={() => navigate('/register')}
              >
                Start Free Interview
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};