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
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <Navbar />

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-white/10 bg-[#050505]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Next-Gen AI Interview Coaching
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">

                Prepare Smarter.
                <br />

                <span className="text-orange-500">
                  Interview Better.
                </span>

              </h1>

              <p className="text-lg text-gray-400 max-w-xl font-normal leading-relaxed">
                Experience ultra-realistic mock interviews with state-of-the-art
                AI. Receive real-time critique, skill diagnostics, and
                role-based recommendations to land your dream offer.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/interview/setup')}
                >
                  Start Practicing Free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/dashboard')}
                >
                  View Demo Dashboard
                </Button>

              </div>

            </div>


            {/* AI Preview */}
            <div className="lg:col-span-5">

              <div className="relative rounded-2xl bg-gradient-to-tr from-[#141414] to-orange-600 p-[2px] shadow-2xl shadow-orange-500/10">

                <div className="rounded-2xl bg-[#0f0f0f] text-white p-6 space-y-4">

                  <div className="flex items-center justify-between pb-3 border-b border-white/10">

                    <div className="flex items-center gap-2">

                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Live AI Evaluation
                      </span>

                    </div>

                    <span className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      Score: 94/100
                    </span>

                  </div>


                  <p className="text-sm font-mono text-gray-300">
                    &quot;Your explanation of database indexing tradeoffs was
                    exceptionally clear and concise...&quot;
                  </p>


                  <div className="grid grid-cols-2 gap-3 pt-2">

                    <div className="p-3 bg-[#181818] rounded-xl border border-white/5">

                      <p className="text-[11px] text-gray-500">
                        Technical Depth
                      </p>

                      <p className="text-lg font-bold text-orange-400">
                        96%
                      </p>

                    </div>


                    <div className="p-3 bg-[#181818] rounded-xl border border-white/5">

                      <p className="text-[11px] text-gray-500">
                        Clarity & Brevity
                      </p>

                      <p className="text-lg font-bold text-orange-400">
                        92%
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          TRUST & STATS
      ========================== */}
      <section className="py-14 bg-[#0a0a0a] border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-3xl font-extrabold text-white">
                10K+
              </h3>

              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                Interviews Practiced
              </p>
            </div>


            <div>
              <h3 className="text-3xl font-extrabold text-white">
                95%
              </h3>

              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                User Satisfaction
              </p>
            </div>


            <div>
              <h3 className="text-3xl font-extrabold text-white">
                50+
              </h3>

              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                Job Role Tracks
              </p>
            </div>


            <div>
              <h3 className="text-3xl font-extrabold text-white">
                &lt; 1 sec
              </h3>

              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                AI Feedback Speed
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================== */}
      <section
        id="features"
        className="py-20 bg-[#050505]"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <h2 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
              Capabilities
            </h2>

            <h3 className="text-3xl font-extrabold text-white">
              Engineered for Interview Mastery
            </h3>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Feature 1 */}
            <Card
              hover
              className="!bg-[#141414] !border-white/10 space-y-3"
            >

              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center">

                <Bot className="w-5 h-5" />

              </div>

              <h4 className="text-lg font-bold text-white">
                AI Mock Interviews
              </h4>

              <p className="text-sm text-gray-400 leading-relaxed">
                Adaptive questioning tailored specifically to your role,
                stack seniority, and chosen difficulty level.
              </p>

            </Card>


            {/* Feature 2 */}
            <Card
              hover
              className="!bg-[#141414] !border-white/10 space-y-3"
            >

              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center">

                <TrendingUp className="w-5 h-5" />

              </div>

              <h4 className="text-lg font-bold text-white">
                Personalized Feedback
              </h4>

              <p className="text-sm text-gray-400 leading-relaxed">
                Granular reports highlighting strengths, missed technical
                nuances, and exact model responses.
              </p>

            </Card>


            {/* Feature 3 */}
            <Card
              hover
              className="!bg-[#141414] !border-white/10 space-y-3"
            >

              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center">

                <BarChart2 className="w-5 h-5" />

              </div>

              <h4 className="text-lg font-bold text-white">
                Performance Analytics
              </h4>

              <p className="text-sm text-gray-400 leading-relaxed">
                Track metrics over time across communication clarity,
                problem-solving depth, and subject knowledge.
              </p>

            </Card>

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section
        id="how-it-works"
        className="py-20 bg-[#0a0a0a] border-t border-white/10"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <h2 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
              Workflow
            </h2>

            <h3 className="text-3xl font-extrabold text-white">
              Simple 4-Step Process
            </h3>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {[
              {
                step: '01',
                title: 'Choose Role',
                desc: 'Select seniority, domain, and interview focus.'
              },
              {
                step: '02',
                title: 'Start Session',
                desc: 'Simulate an authentic high-pressure interview room.'
              },
              {
                step: '03',
                title: 'Answer Prompts',
                desc: 'Formulate answers under live timing conditions.'
              },
              {
                step: '04',
                title: 'Review Report',
                desc: 'Analyze AI feedback, scores, and model answers.'
              }
            ].map((st, i) => (

              <div
                key={i}
                className="p-6 bg-[#141414] rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all"
              >

                <span className="text-2xl font-black text-orange-500">
                  {st.step}
                </span>

                <h4 className="text-base font-bold text-white mt-2">
                  {st.title}
                </h4>

                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {st.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}
      <section className="py-20 bg-[#050505]">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl p-12 space-y-6 shadow-2xl shadow-orange-500/20">

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to ace your next interview?
            </h2>

            <p className="text-orange-100 max-w-xl mx-auto text-sm sm:text-base">
              Join thousands of engineers and product leaders accelerating
              their career trajectory today.
            </p>

            <div>

              <Button
                size="lg"
                variant="secondary"
                className="!bg-[#050505] !text-white hover:!bg-[#141414] !border-white/10"
                onClick={() => navigate('/register')}
              >
                Start Free Interview
              </Button>

            </div>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
};