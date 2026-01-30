
import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS, COLORS } from '../constants';
import { QuestionType, UserAnswers } from '../types';

interface ChatFlowProps {
  onComplete: (answers: UserAnswers) => void;
}

const ChatFlow: React.FC<ChatFlowProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [messages, setMessages] = useState<Array<{ text: string, type: 'bot' | 'user' }>>([]);
  const [inputText, setInputText] = useState('');
  const [selectedMultiIds, setSelectedMultiIds] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUESTIONS[currentIdx];

  useEffect(() => {
    // Initial bot message
    if (currentIdx === 0 && messages.length === 0) {
      setMessages([{ text: currentQuestion.text, type: 'bot' }]);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNext = (val: string | string[]) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: val };
    setAnswers(updatedAnswers);

    let displayMsg = '';
    if (Array.isArray(val)) {
      displayMsg = val.map(id => currentQuestion.options?.find(o => o.id === id)?.label).filter(Boolean).join('\n');
    } else {
      displayMsg = currentQuestion.options?.find(o => o.id === val)?.label || val;
    }

    setMessages(prev => [...prev, { text: displayMsg, type: 'user' }]);

    // Reset multi selection for next question if any
    setSelectedMultiIds([]);

    if (currentIdx < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentIdx(prev => prev + 1);
        const nextQ = QUESTIONS[currentIdx + 1];
        setMessages(prev => [...prev, { text: nextQ.text, type: 'bot' }]);
      }, 600);
    } else {
      setTimeout(() => onComplete(updatedAnswers), 1000);
    }
  };

  const handleTextSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    handleNext(text);
  };

  const toggleMultiSelect = (id: string) => {
    setSelectedMultiIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-[#f4d0da] border-b border-pink-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-400 shadow-sm animate-bounce">
          <i className="fas fa-concierge-bell text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-gray-800 text-lg">照顧管家</h1>
          <p className="text-base text-pink-700">您的照顧顧問</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50/50 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.type === 'bot' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-lg shadow-sm transition-all transform hover:scale-[1.01] ${
              m.type === 'bot' 
                ? 'bg-white text-gray-700 rounded-tl-none border border-pink-50' 
                : 'bg-[#a7d4e0] text-white rounded-tr-none'
            }`}>
              {m.type === 'bot' ? (
                 <span dangerouslySetInnerHTML={{ __html: m.text }} />
              ) : (
                 <span className="whitespace-pre-line block leading-relaxed">{m.text}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-5 bg-white border-t border-gray-100 min-h-[180px]">
        {currentQuestion.type === QuestionType.SINGLE_CHOICE ? (
          <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto p-1 custom-scrollbar">
            {currentQuestion.options?.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => handleNext(opt.id)}
                className={`w-full p-4 bg-[#fcfcfc] border border-gray-100 rounded-2xl text-center flex flex-col items-center justify-center gap-2 hover:border-pink-300 hover:bg-pink-50 transition-all text-gray-600 active:scale-95 shadow-sm animate-fade-in`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {opt.icon && <i className={`fas ${opt.icon} text-2xl text-pink-300`}></i>}
                <span className="text-lg font-medium leading-tight">{opt.label}</span>
              </button>
            ))}
          </div>
        ) : currentQuestion.type === QuestionType.MULTI_CHOICE ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto p-1 custom-scrollbar">
              {currentQuestion.options?.map((opt, i) => {
                const isSelected = selectedMultiIds.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleMultiSelect(opt.id)}
                    className={`w-full p-4 border rounded-2xl text-center flex flex-col items-center justify-center gap-2 transition-all text-gray-600 active:scale-95 shadow-sm animate-fade-in ${
                      isSelected ? 'border-pink-400 bg-pink-50 ring-2 ring-pink-200' : 'bg-[#fcfcfc] border-gray-100'
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {opt.icon && <i className={`fas ${opt.icon} text-2xl ${isSelected ? 'text-pink-500' : 'text-pink-300'}`}></i>}
                    <span className={`text-lg font-medium leading-tight ${isSelected ? 'text-pink-700' : ''}`}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handleNext(selectedMultiIds)}
              disabled={selectedMultiIds.length === 0}
              className="w-full py-4 bg-[#ecacbc] text-white rounded-2xl font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-all text-lg"
            >
              完成選擇 ({selectedMultiIds.length})
            </button>
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="flex gap-3 items-end">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none min-h-[70px] max-h-[140px]"
              rows={2}
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="w-14 h-14 bg-[#ecacbc] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 disabled:opacity-50 transition-all"
            >
              <i className="fas fa-paper-plane text-xl"></i>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatFlow;
