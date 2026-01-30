
import React, { useState } from 'react';
import { UserAnswers, Recommendation, Option } from '../types';
import { QUESTIONS, COLORS } from '../constants';
import QuadrantChart from './QuadrantChart';

interface ResultDisplayProps {
  answers: UserAnswers;
  onRetake: () => void;
}

const COUNTIES = [
  "基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市",
  "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣",
  "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣"
];

const STRESS_LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const ResultDisplay: React.FC<ResultDisplayProps> = ({ answers, onRetake }) => {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [stressLevel, setStressLevel] = useState('5');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Helper to de-identify name (e.g., 王小明 -> 王Ｏ名)
  const maskName = (name: string) => {
    if (!name) return '照顧者';
    if (name.length <= 1) return name;
    if (name.length === 2) return name[0] + 'Ｏ';
    return name[0] + 'Ｏ' + name.slice(2);
  };

  // Helper to remove "我是他"
  const cleanRelation = (label: string) => {
    return label.replace('我是他', '').replace('我是她', '');
  };

  // 1. Generate Placements for Chart & Filter Recommendations
  const chartPlacements: Option[] = [];
  const recsQ1: Recommendation[] = [];
  const recsQ2: Recommendation[] = [];
  const recsQ3: Recommendation[] = [];
  
  // Function to create Recommendation object
  const createRec = (opt: Option): Recommendation => ({
    title: opt.fileName || '',
    reason: opt.reason || '',
    highlights: opt.highlights || '',
    link: opt.fileLink || '#',
    score: opt.y, // use importance for sorting
    triggerAnswer: opt.label // Store trigger answer label
  });

  Object.entries(answers).forEach(([qId, ansVal]) => {
    const question = QUESTIONS.find(q => q.id === qId);
    if (!question || !question.options) return;

    const ansIds = Array.isArray(ansVal) ? ansVal : [ansVal];

    ansIds.forEach(ansId => {
      const opt = question.options!.find(o => o.id === ansId);
      if (opt && opt.x > 0) {
        // Requirement 1: All selected options with coordinates should be in chart
        chartPlacements.push(opt);
        
        // Group recommendations by question ID for selection logic
        if (opt.fileId) {
          if (qId === 'q1') recsQ1.push(createRec(opt));
          if (qId === 'q2') recsQ2.push(createRec(opt));
          if (qId === 'q3_trouble') recsQ3.push(createRec(opt));
        }
      }
    });
  });

  // Requirement 2: Selection Logic
  // 1 from Q2 (Living) - pick highest importance
  const selectedQ2 = recsQ2.sort((a, b) => b.score - a.score).slice(0, 1);
  
  // 1 from Q1 (Physical) - pick highest importance
  const selectedQ1 = recsQ1.sort((a, b) => b.score - a.score).slice(0, 1);
  
  // 3 from Q3 (Trouble) - pick highest importance
  const selectedQ3 = recsQ3.sort((a, b) => b.score - a.score).slice(0, 3);

  // Combine and deduplicate fileIds just in case
  const finalRecs: Recommendation[] = [];
  const addedFileNames = new Set<string>();

  [...selectedQ2, ...selectedQ1, ...selectedQ3].forEach(rec => {
    if (!addedFileNames.has(rec.title)) {
      finalRecs.push(rec);
      addedFileNames.add(rec.title);
    }
  });


  // 2. Future Risk Assessment Logic (3 Distinct Types based on answer patterns)
  const avgX = chartPlacements.reduce((acc, curr) => acc + curr.x, 0) / (chartPlacements.length || 1);
  const avgY = chartPlacements.reduce((acc, curr) => acc + curr.y, 0) / (chartPlacements.length || 1);
  
  let riskAssessmentLabel = "";
  let riskDesc = "";
  let riskIcon = "";

  if (avgX >= 65) {
    riskAssessmentLabel = "高壓挑戰・韌性防禦";
    riskIcon = "fa-shield-halved";
    riskDesc = "根據您的填答，目前正處於「高壓挑戰期」。照顧環境存在較多不確定性，對您的體力與心理韌性要求極高。目前的風險點在於「備援系統不足」，建議優先建立外部支撐網，避免單一照顧者長期超負荷運作。";
  } else if (avgY >= 65) {
    riskAssessmentLabel = "策略主導・風險預控";
    riskIcon = "fa-chess-knight";
    riskDesc = "您的填答顯示您對照顧品質與風險控管有高度自覺。目前的評估點在於「資源精準對接」。雖然現況相對穩定，但長照是不斷變動的過程，建議持續強化財務規劃與醫療決策的預備度，以維持現有的穩定品質。";
  } else {
    riskAssessmentLabel = "溫和起步・身心平衡";
    riskIcon = "fa-heart-pulse";
    riskDesc = "目前的照顧風險屬於「中低水平」，重心應放在維持被照顧者的尊嚴與照顧者的身心健康。建議善用現有的輕量級社會資源（如喘息服務、社交據點），在照顧初期就建立良好的生活律動，為長遠的照顧路程打好基礎。";
  }

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 8 && city) setConsultSubmitted(true);
  };

  const handleLineShare = () => {
    const url = window.location.href;
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
    window.open(lineShareUrl, '_blank');
  };

  // Get Answers for Profile
  const userName = answers['user_name'] as string || '';
  const targetName = answers['target_name'] as string || '';
  const targetRelId = answers['target_relationship'] as string;
  const targetRelLabel = QUESTIONS.find(q => q.id === 'target_relationship')?.options?.find(o => o.id === targetRelId)?.label || '家人';
  const targetBirth = answers['target_birth'] as string || '';
  const stressProblem = answers['stress_problem'] as string || '無特殊說明';

  // Get Multiple Choice Labels for Q1
  const q1Ans = answers['q1'];
  const q1Array = Array.isArray(q1Ans) ? q1Ans : [q1Ans];
  const q1Labels = q1Array.map(id => QUESTIONS.find(q => q.id === 'q1')?.options?.find(o => o.id === id)?.label).filter(Boolean).join('、');
  
  const q2Ans = answers['q2'] as string;
  const q2Label = QUESTIONS.find(q => q.id === 'q2')?.options?.find(o => o.id === q2Ans)?.label || '';

  return (
    <div className="bg-[#fcfcfc] min-h-screen animate-fade-in relative">
      {/* Brand Logo */}
      <div className="flex justify-center pt-6 pb-2 sticky top-0 bg-[#fcfcfc]/90 backdrop-blur z-20">
        <img 
          src="https://www.ilong-termcare.com/uploads/photos/shares/articles-content/%E6%98%9F%E9%9B%B2%E8%A8%88%E7%95%ABLOGO.png" 
          alt="愛長照" 
          className="h-14 object-contain"
        />
      </div>

      <div className="max-w-md mx-auto px-5">
        
        {/* Header Banner */}
        <div className="mt-4 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">專屬你的照顧攻略</h2>
          <div className="h-1.5 w-16 bg-[#ecacbc] mx-auto rounded-full mb-2"></div>
          <p className="text-lg text-gray-600">獨一無二的風險評估與資源指南</p>
        </div>

        {/* Basic Profile & Future Risk Assessment */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#9bcba6] rounded-full"></div>
            <h3 className="text-2xl text-gray-800 font-bold">基本資料檔案</h3>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
             <div className="grid grid-cols-1 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-500 mb-2">照顧者資訊</h4>
                  <div className="flex gap-4 text-lg text-gray-700">
                     <p><span className="text-gray-500 mr-1">姓名:</span>{maskName(userName)}</p>
                     <p><span className="text-gray-500 mr-1">關係:</span>{cleanRelation(targetRelLabel)}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-lg font-bold text-gray-500 mb-2">被照顧者資訊</h4>
                  <div className="space-y-1 text-lg text-gray-700">
                     <p><span className="text-gray-500 mr-1">姓名:</span>{maskName(targetName)}</p>
                     <p><span className="text-gray-500 mr-1">出生:</span>民國 {targetBirth} 年</p>
                     <p><span className="text-gray-500 mr-1">狀況:</span>{q1Labels || '未填寫'}</p>
                     <p><span className="text-gray-500 mr-1">居住:</span>{q2Label || '未填寫'}</p>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="mt-6 bg-[#f3f0b8]/40 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-200/20 rounded-full blur-xl"></div>
            <p className="text-lg text-yellow-700 mb-3 font-medium tracking-widest flex items-center gap-2">
              <i className={`fas ${riskIcon} text-yellow-600`}></i> 未來風險綜合評估
            </p>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">【{riskAssessmentLabel}】</h4>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">{riskDesc}</p>
          </div>
        </div>

        {/* Quadrant Map */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 bg-[#a7d4e0] rounded-full"></div>
            <div>
              <h3 className="text-2xl text-gray-800 font-bold">困擾落點分析</h3>
            </div>
          </div>
          <p className="text-base text-gray-600 mb-6 pl-5">系統根據您的填答，將挑戰進行視覺化分佈。</p>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
             <QuadrantChart placements={chartPlacements} />
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-12">
           <div className="flex flex-col gap-1 mb-6 pl-1">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#f4d0da] rounded-full"></div>
                <h3 className="text-2xl text-gray-800 font-bold">為你生成的專屬攻略</h3>
             </div>
             <span className="text-base text-gray-600 pl-5">推薦給你最需要的實用文件</span>
           </div>
          
          <div className="flex flex-col gap-4">
            {finalRecs.length > 0 ? finalRecs.map((rec, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border-2 border-pink-200/60 shadow-[0_0_15px_rgba(236,172,188,0.5)] flex items-center gap-4 hover:shadow-[0_0_20px_rgba(236,172,188,0.7)] transition-all duration-300">
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="inline-block bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-sm font-bold shadow-[0_0_8px_rgba(236,172,188,0.8)]">
                       <i className="fas fa-file-alt mr-1"></i> 推薦
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{rec.title}</h4>
                  <p className="text-base text-gray-600 leading-snug">{rec.highlights}</p>
                </div>

                <a 
                  href={rec.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="shrink-0 bg-[#ecacbc] active:bg-pink-400 text-white px-4 py-3 rounded-2xl text-base font-bold shadow-sm transition-all flex items-center justify-center gap-1 min-w-[5rem]"
                >
                  <span>查看</span>
                </a>
              </div>
            )) : <div className="w-full text-center text-gray-500 text-lg italic py-8">暫無特定推薦檔案</div>}
          </div>
        </div>
      </div>

      {/* Consultation Section & Footer Buttons Combined */}
      <div className="bg-[#d2e8f1]/30 py-10 rounded-t-[3rem]">
        <div className="max-w-md mx-auto px-5">
          <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">申請照顧管家免費諮詢</h4>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50 mb-6">
            <p className="text-base text-gray-600 mb-2">您的核心困擾：</p>
            <p className="text-xl text-gray-800 font-medium">{stressProblem}</p>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center px-2">
            針對您的核心困擾，我們可提供專人1對1討論以及給予專屬對策。<br/><span className="text-base text-gray-500 mt-2 block">(費用由星展基金會、桂格食品、包大人等支持)</span>
          </p>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10">
              {consultSubmitted ? (
              <div className="text-center py-8 text-green-600 bg-green-50 rounded-3xl border border-green-100">
                  <i className="fas fa-check-circle text-5xl mb-4"></i>
                  <p className="text-2xl font-bold">申請已送出！</p>
                  <p className="text-lg mt-2">愛長照團隊將會致電與您聯繫。</p>
              </div>
              ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-5">
                  <div className="space-y-2">
                  <label className="text-lg text-gray-600 font-medium ml-1">聯絡電話</label>
                  <input 
                      type="tel" 
                      placeholder="請輸入手機號碼" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="w-full p-4 text-lg rounded-2xl border border-gray-200 focus:border-blue-300 outline-none text-gray-900 bg-white" 
                      required 
                  />
                  </div>
                  
                  <div className="space-y-2">
                  <label className="text-lg text-gray-600 font-medium ml-1">被照顧者居住縣市</label>
                  <select 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)} 
                      className="w-full p-4 text-lg rounded-2xl border border-gray-200 focus:border-blue-300 outline-none bg-white text-gray-900 appearance-none"
                      required
                  >
                      <option value="" disabled>請選擇居住縣市</option>
                      {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  </div>

                  <div className="space-y-2">
                  <label className="text-lg text-gray-600 font-medium ml-1">目前照顧壓力指數 (1-10)</label>
                  <select 
                      value={stressLevel} 
                      onChange={(e) => setStressLevel(e.target.value)}
                      className="w-full p-4 text-lg rounded-2xl border border-gray-200 focus:border-blue-300 outline-none bg-white text-gray-900 appearance-none"
                  >
                      {STRESS_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  </div>

                  <button type="submit" className="w-full bg-[#ecacbc] text-white font-bold py-4 rounded-2xl text-xl shadow-lg active:scale-95 transition-all mt-4 hover:bg-pink-400">立即申請預約</button>
              </form>
              )}
          </div>

          {/* Footer Buttons moved inside */}
          <div className="flex gap-4">
            <button 
              onClick={onRetake} 
              className="flex-1 bg-white text-gray-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm border border-gray-200"
            >
              <i className="fas fa-redo-alt"></i> 重新玩
            </button>
            <button 
              onClick={handleLineShare}
              className="flex-1 bg-[#00c300] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#00b300] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <i className="fab fa-line text-xl"></i> 分享
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
