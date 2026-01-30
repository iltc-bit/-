
import React, { useState } from 'react';
import ChatFlow from './components/ChatFlow';
import ResultDisplay from './components/ResultDisplay';
import { UserAnswers } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'chat' | 'generating' | 'result'>('intro');
  const [answers, setAnswers] = useState<UserAnswers | null>(null);

  const startSurvey = () => {
    window.scrollTo(0, 0);
    setStep('chat');
  };
  
  const handleRetake = () => {
    setAnswers(null);
    setStep('intro');
  };

  const handleComplete = (userAnswers: UserAnswers) => {
    setAnswers(userAnswers);
    setStep('generating');
    // Mock generating delay for effect
    setTimeout(() => {
      setStep('result');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff0f5] via-white to-[#e0f7fa] flex flex-col items-center justify-center">
      {step === 'intro' && (
        <div className="max-w-md w-full p-8 text-center">
          <div className="mb-10 animate-[fadeInDown_1s_ease-out]">
            <img 
              src="https://www.ilong-termcare.com/uploads/photos/shares/articles-content/%E6%98%9F%E9%9B%B2%E8%A8%88%E7%95%ABLOGO.png" 
              alt="Logo" 
              className="mx-auto h-24 object-contain"
            />
          </div>
          
          {/* Professional Illustrated Icon Composition */}
          <div className="w-32 h-32 mx-auto mb-10 relative group cursor-pointer hover:scale-105 transition-transform duration-500">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-pink-200 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            
            {/* Main Container */}
            <div className="relative w-full h-full bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center border border-pink-50 rotate-3 group-hover:rotate-0 transition-all">
                {/* Main Icon - Guide/Book */}
                <i className="fas fa-book-medical text-5xl text-gray-600"></i>
                
                {/* Secondary Badge - Download */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#ecacbc] rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-all border-2 border-white">
                    <i className="fas fa-download text-white text-lg"></i>
                </div>
                
                {/* Tertiary Badge - Professional/Check */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#a7d4e0] rounded-full flex items-center justify-center shadow-md border-2 border-white transform rotate-12">
                     <i className="fas fa-user-nurse text-white text-sm"></i>
                </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in delay-100 fill-mode-forwards opacity-0" style={{ animationDelay: '0.2s' }}>長期照顧實用指南</h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed animate-fade-in delay-200 fill-mode-forwards opacity-0" style={{ animationDelay: '0.4s' }}>
            長照路很長，我們與你一起面對風險。<br/>
            透過有趣的３分鐘照顧管家對話，為你生成專屬的實用資訊，還可<span className="font-bold text-[#ecacbc]">免費下載實戰檔案</span>。
          </p>
          <div className="animate-fade-in fill-mode-forwards opacity-0" style={{ animationDelay: '0.6s' }}>
            <button 
                onClick={startSurvey}
                className="w-full bg-[#ecacbc] hover:bg-[#f4d0da] text-white font-bold py-5 rounded-3xl shadow-xl shadow-pink-100 transition-all active:scale-95 text-xl group animate-[pulse_2s_infinite]"
            >
                立即測！立即領！ <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
          <div className="mt-12 flex justify-center gap-6 opacity-0 animate-fade-in fill-mode-forwards" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2 shadow-sm border border-blue-100">
                <i className="fas fa-chart-pie text-blue-300 text-xl"></i>
              </div>
              <span className="text-sm text-gray-400">精準分析</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-2 shadow-sm border border-green-100">
                <i className="fas fa-file-pdf text-green-300 text-xl"></i>
              </div>
              <span className="text-sm text-gray-400">專屬攻略</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-2 shadow-sm border border-yellow-100">
                <i className="fas fa-shield-alt text-yellow-300 text-xl"></i>
              </div>
              <span className="text-sm text-gray-400">風險預防</span>
            </div>
          </div>
        </div>
      )}

      {step === 'chat' && (
        <div className="w-full h-screen">
          <ChatFlow onComplete={handleComplete} />
        </div>
      )}

      {step === 'generating' && (
        <div className="max-w-md w-full p-8 text-center animate-fade-in">
          <div className="relative w-24 h-24 mx-auto mb-10">
            <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#ecacbc] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <i className="fas fa-magic text-pink-300 animate-pulse text-2xl"></i>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">檔案編寫中...</h2>
          <p className="text-base text-gray-400">照顧管家正根據您的特質，調度專屬的攻略資源與風險地圖...</p>
        </div>
      )}

      {step === 'result' && answers && (
        <ResultDisplay answers={answers} onRetake={handleRetake} />
      )}
    </div>
  );
};

export default App;
