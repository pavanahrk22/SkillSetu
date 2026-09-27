import { useState } from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';

const QuizQuestion = ({ number, question, options, answer, explanation, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    onAnswer(selected === answer);
  };

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-slate-400">QUESTION {number}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-slate-800 mb-6">{question}</h3>
      
      <div className="space-y-3 mb-6">
        {options.map((opt, idx) => {
          const isCorrect = submitted && labels[idx] === answer;
          const isSelectedAndWrong = submitted && selected === labels[idx] && labels[idx] !== answer;
          
          return (
            <label 
              key={idx} 
              className={clsx(
                "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                !submitted && selected === labels[idx] ? "border-gov-500 bg-gov-50" : "border-slate-200 hover:bg-slate-50",
                isCorrect ? "border-green-500 bg-green-50" : "",
                isSelectedAndWrong ? "border-red-500 bg-red-50" : "",
                submitted && "cursor-default pointer-events-none"
              )}
            >
              <input 
                type="radio" 
                name={`q-${number}`} 
                className="hidden"
                checked={selected === labels[idx]}
                onChange={() => !submitted && setSelected(labels[idx])}
              />
              <div className={clsx(
                "w-8 h-8 rounded flex items-center justify-center mr-4 font-bold text-sm",
                !submitted && selected === labels[idx] ? "bg-gov-600 text-white" : "bg-slate-100 text-slate-500",
                isCorrect ? "bg-green-600 text-white" : "",
                isSelectedAndWrong ? "bg-red-600 text-white" : ""
              )}>
                {labels[idx]}
              </div>
              <span className="flex-1 text-slate-700">{opt}</span>
              
              {isCorrect && <CheckCircle2 className="text-green-600 ml-2" />}
              {isSelectedAndWrong && <XCircle className="text-red-600 ml-2" />}
            </label>
          );
        })}
      </div>

      {!submitted ? (
        <button 
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-3 bg-gov-600 text-white rounded-lg font-medium hover:bg-gov-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>
      ) : (
        <div className={clsx(
          "p-4 rounded-lg mt-4 text-sm",
          selected === answer ? "bg-green-50 text-green-800" : "bg-slate-50 text-slate-700"
        )}>
          <p className="font-bold mb-1">{selected === answer ? 'Correct!' : 'Incorrect.'}</p>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
