export const MOCK_USER = {
  id: 'usr_001',
  name: 'Alex Mercer',
  email: 'alex.mercer@example.com',
  targetRole: 'Frontend Developer',
  experienceLevel: 'Mid-Level',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'System Design', 'Web Performance']
};

export const MOCK_STATS = {
  interviewsCompleted: 24,
  averageScore: 84,
  questionsAnswered: 186,
  currentStreak: 5
};

export const MOCK_SCORE_TREND = [
  { date: 'Oct 1', score: 65 },
  { date: 'Oct 8', score: 72 },
  { date: 'Oct 15', score: 70 },
  { date: 'Oct 22', score: 81 },
  { date: 'Oct 29', score: 78 },
  { date: 'Nov 5', score: 85 },
  { date: 'Nov 12', score: 88 }
];

export const MOCK_SKILL_ANALYSIS = [
  { skill: 'Communication', score: 82 },
  { skill: 'Technical Knowledge', score: 89 },
  { skill: 'Problem Solving', score: 85 },
  { skill: 'Confidence', score: 78 },
  { skill: 'Behavioral Skills', score: 80 }
];

export const MOCK_INTERVIEW_HISTORY = [
  {
    id: 'int_101',
    role: 'Frontend Developer',
    type: 'Technical',
    difficulty: 'Medium',
    score: 88,
    date: '2026-03-01',
    duration: '22 mins',
    status: 'Completed'
  },
  {
    id: 'int_102',
    role: 'Software Engineer',
    type: 'Behavioral',
    difficulty: 'Hard',
    score: 79,
    date: '2026-02-27',
    duration: '18 mins',
    status: 'Completed'
  },
  {
    id: 'int_103',
    role: 'Full Stack Engineer',
    type: 'Mixed',
    difficulty: 'Medium',
    score: 84,
    date: '2026-02-20',
    duration: '25 mins',
    status: 'Completed'
  },
  {
    id: 'int_104',
    role: 'Frontend Developer',
    type: 'Technical',
    difficulty: 'Easy',
    score: 92,
    date: '2026-02-15',
    duration: '15 mins',
    status: 'Completed'
  }
];

export const MOCK_QUESTIONS = [
  {
    id: 'q_01',
    role: 'Frontend Developer',
    type: 'Technical',
    topic: 'React',
    difficulty: 'Medium',
    timeEstimate: '3 mins',
    question: 'Explain the Virtual DOM and how React reconciliation algorithm works.',
    hint: 'Think about diffing algorithm, key props, and batched updates.'
  },
  {
    id: 'q_02',
    role: 'Frontend Developer',
    type: 'Technical',
    topic: 'JavaScript',
    difficulty: 'Hard',
    timeEstimate: '4 mins',
    question: 'What is the Event Loop in JavaScript, and how do microtasks differ from macrotasks?',
    hint: 'Mention Call Stack, Callback Queue, Microtask Queue (Promises), and rendering cycles.'
  },
  {
    id: 'q_03',
    role: 'Software Engineer',
    type: 'Behavioral',
    topic: 'Conflict Resolution',
    difficulty: 'Medium',
    timeEstimate: '3 mins',
    question: 'Describe a situation where you had a disagreement with a team member on a technical decision. How did you resolve it?',
    hint: 'Use the STAR method (Situation, Task, Action, Result).'
  },
  {
    id: 'q_04',
    role: 'Backend Developer',
    type: 'Technical',
    topic: 'DBMS',
    difficulty: 'Medium',
    timeEstimate: '3 mins',
    question: 'What are the ACID properties in database management systems? Give an example of isolation failure.',
    hint: 'Atomicity, Consistency, Isolation, Durability. Think about dirty reads or phantom reads.'
  },
  {
    id: 'q_05',
    role: 'System Design',
    type: 'Technical',
    topic: 'Architecture',
    difficulty: 'Hard',
    timeEstimate: '5 mins',
    question: 'How would you design a distributed rate limiter for a high-traffic API gateway?',
    hint: 'Consider Token Bucket vs Leaky Bucket algorithms and Redis centralized tracking.'
  }
];

export const MOCK_RESULT = {
  id: 'int_res_99',
  role: 'Frontend Developer',
  type: 'Technical & Behavioral',
  date: 'Today, 2:45 PM',
  overallScore: 84,
  scores: {
    technical: 88,
    communication: 82,
    problemSolving: 85,
    confidence: 80
  },
  strengths: [
    'Strong conceptual understanding of React lifecycle and fiber reconciliation.',
    'Clear, structured explanations using standard terminology.',
    'Proactively addressed edge cases and web accessibility considerations.'
  ],
  improvements: [
    'Be more concise when explaining asynchronous event loop timings.',
    'Incorporate quantifiable metrics when answering behavioral STAR questions.',
    'Explicitly state trade-offs between memory overhead and rendering performance.'
  ],
  aiRecommendation: 'You demonstrate strong mid-to-senior technical mastery. Focus the next 3 sessions on system design architecture and quantifying your past project impact to maximize your score.',
  questionReviews: [
    {
      question: 'Explain the Virtual DOM and how React reconciliation algorithm works.',
      userAnswer: 'The Virtual DOM is a lightweight copy of the real DOM. When state changes, React creates a new tree and diffs it with the previous tree using heuristic algorithms, updating only changed nodes.',
      aiEvaluation: 'Accurate and direct answer. Good mention of tree diffing heuristics.',
      score: 90,
      modelAnswer: 'The Virtual DOM is an in-memory representation of real DOM UI elements. React uses a reconciliation engine (Fiber) that employs an O(n) heuristic diffing algorithm comparing element types and keys to batch minimal DOM modifications.',
      suggestion: 'Mention how React Fiber prioritizes user interactions over background updates.'
    },
    {
      question: 'What is the Event Loop in JavaScript, and how do microtasks differ from macrotasks?',
      userAnswer: 'The event loop processes tasks from the queue when call stack is empty. Microtasks like promises run before setTimeout macrotasks.',
      aiEvaluation: 'Conceptually correct, but needs deeper detail regarding execution cycle order.',
      score: 78,
      modelAnswer: 'JavaScript is single-threaded. The event loop continuously monitors the Call Stack and Task Queues. After every stack frame clears, the microtask queue is completely drained before picking the next macrotask.',
      suggestion: 'Contrast specific browser APIs (MutationObserver, process.nextTick vs setInterval).'
    }
  ]
};