import { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';
import ProgressRing from '../components/ProgressRing';
import { UploadCloud, Clock, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const mockQuestions = [
  {
    id: 1,
    question: "When analyzing large datasets for policy formulation, which approach is most effective for minimizing bias?",
    options: [
      "Relying solely on historical precedent data",
      "Using stratified random sampling across diverse demographics",
      "Selecting data that aligns with predefined policy goals",
      "Surveying only the most accessible urban populations"
    ],
    answer: "B",
    explanation: "Stratified random sampling ensures that all subgroups are proportionately represented, significantly reducing bias compared to convenience or selective sampling."
  },
  {
    id: 2,
    question: "In the context of E-Governance, what does API stand for and why is it critical?",
    options: [
      "Application Programming Interface; it allows different govt systems to communicate securely",
      "Automated Public Information; it broadcasts alerts to citizens",
      "Advanced Processing Index; it measures server performance",
      "Authorized Personnel Identifier; it manages employee access"
    ],
    answer: "A",
    explanation: "APIs allow different software systems to communicate, enabling interoperability between various government departments."
  }
];

const Assessment = () => {
  const { user } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (isCorrect) => {
    setAnswers({ ...answers, [currentQ]: isCorrect });
    if (isCorrect) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentQ < mockQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsFinished(true);
      toast.success('Assessment completed! Competency scores updated.');
    }
  };

  // Trainer view for generating assessments
  if (user?.role === 'trainer') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Generate Assessment</h1>
          <p className="text-slate-600 mt-1">Upload training materials (PDF, PPT) to automatically generate MCQs via AI.</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="border-2 border-dashed border-gov-300 rounded-xl p-12 text-center hover:bg-gov-50 cursor-pointer">
            <UploadCloud className="mx-auto h-12 w-12 text-gov-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700">Upload Course Material</h3>
            <p className="text-sm text-slate-500 mt-2">Upload material to generate quiz</p>
          </div>
          <button className="mt-6 w-full bg-gov-600 text-white py-3 rounded-lg font-medium hover:bg-gov-700">
            Generate Questions
          </button>
        </div>
      </div>
    );
  }

  // Learner view
  if (isFinished) {
    const percentage = Math.round((score / mockQuestions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Assessment Complete!</h2>
        <div className="flex justify-center mb-8">
          <ProgressRing radius={80} stroke={12} progress={percentage} color={percentage >= 70 ? '#138808' : '#eab308'} label="Final Score" />
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-left mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><Award className="mr-2 text-gov-600" /> Competency Updates</h3>
          <p className="text-slate-600">Based on your performance, your competency profile has been updated:</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex justify-between items-center bg-green-50 px-4 py-2 rounded text-green-800">
              <span>Data Analysis</span>
              <span className="font-bold">Level 3 &rarr; Level 4</span>
            </li>
            <li className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded text-slate-700">
              <span>E-Governance</span>
              <span className="font-bold">Level 3 (Maintained)</span>
            </li>
          </ul>
        </div>
        <button onClick={() => window.location.href='/dashboard'} className="bg-gov-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gov-700">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const q = mockQuestions[currentQ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Competency Assessment</h1>
          <p className="text-slate-600 text-sm mt-1">Data Analysis & Digital Literacy</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-lg font-medium text-slate-700">
          <Clock size={18} />
          <span>14:59</span>
        </div>
      </div>

      <div className="mb-6 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-gov-600 transition-all duration-300" style={{ width: `${((currentQ + 1) / mockQuestions.length) * 100}%` }}></div>
      </div>

      <QuizQuestion 
        number={currentQ + 1}
        question={q.question}
        options={q.options}
        answer={q.answer}
        explanation={q.explanation}
        onAnswer={handleAnswer}
      />

      {answers[currentQ] !== undefined && (
        <div className="flex justify-end">
          <button 
            onClick={nextQuestion}
            className="bg-gov-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gov-700"
          >
            {currentQ < mockQuestions.length - 1 ? 'Next Question &rarr;' : 'Finish Assessment'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Assessment;
