
import { Question, QuestionType } from './types';

export const COLORS = {
  primary: '#ecacbc',
  secondary: '#a7d4e0',
  success: '#9bcba6',
  warning: '#f3f0b8',
  lightBlue: '#d2e8f1',
  lightPink: '#f4d0da',
  text: '#4a4a4a',
  bg: '#fcfcfc'
};

export const QUESTIONS: Question[] = [
  {
    id: 'target_relationship',
    category: 'profile',
    text: '請問您與被照顧者的關係是？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      { id: 'rel_daughter', label: '我是他女兒', icon: 'fa-female', x: 0, y: 0 },
      { id: 'rel_son', label: '我是他兒子', icon: 'fa-male', x: 0, y: 0 },
      { id: 'rel_wife', label: '我是他太太', icon: 'fa-heart', x: 0, y: 0 },
      { id: 'rel_husband', label: '我是他先生', icon: 'fa-user-tie', x: 0, y: 0 },
      { id: 'rel_daughter_in_law', label: '我是他媳婦', icon: 'fa-user', x: 0, y: 0 },
      { id: 'rel_son_in_law', label: '我是他女婿', icon: 'fa-user', x: 0, y: 0 },
      { id: 'rel_father', label: '我是他父親', icon: 'fa-user', x: 0, y: 0 },
      { id: 'rel_mother', label: '我是他母親', icon: 'fa-user', x: 0, y: 0 },
      { id: 'rel_sibling', label: '我是他手足', icon: 'fa-users', x: 0, y: 0 },
      { id: 'rel_grandson', label: '我是他孫子', icon: 'fa-child', x: 0, y: 0 },
      { id: 'rel_granddaughter', label: '我是他孫女', icon: 'fa-child', x: 0, y: 0 },
      { id: 'rel_relative', label: '我是他親戚', icon: 'fa-users', x: 0, y: 0 },
      { id: 'rel_friend', label: '我是他朋友', icon: 'fa-handshake', x: 0, y: 0 }
    ]
  },
  {
    id: 'q3_trouble',
    category: 'stress',
    text: '目前您在照顧上遇到的主要困擾有哪些？（可多選）',
    type: QuestionType.MULTI_CHOICE,
    options: [
      { id: 'q3_1', label: '家人病況需要專業人員到府', icon: 'fa-user-md', x: 60, y: 85, fileId: '12', fileName: '居家醫療服務快速參考表', fileLink: 'https://drive.google.com/file/d/161BSksQYVLTeSwDjFMYKaFeuZHaCI4Wq/view?usp=sharing', reason: '連結居家醫療資源，減少奔波。', highlights: '評估是否符合居家醫療條件' },
      { id: 'q3_2', label: '評估各種照顧模式的優缺點', icon: 'fa-balance-scale', x: 95, y: 95, fileId: '15', fileName: '照顧模式比較表', fileLink: 'https://drive.google.com/file/d/1nDAn-dzhkFN6vNUMpgBpWZJToGM_ysNh/view?usp=sharing', reason: '客觀比較各種模式優缺點，減輕心理負擔。', highlights: '釐清各照顧模式成本與優劣' },
      { id: 'q3_3', label: '機構安置不確定要如何挑選', icon: 'fa-search-dollar', x: 25, y: 45, fileId: '2', fileName: '機構挑選與參觀評估', fileLink: 'https://drive.google.com/file/d/12MsE367zkLKhsmKUMsP8X1ZTb9yd73sa/view?usp=sharing', reason: '掌握評估重點，避免踩雷。', highlights: '機構參觀重點與費用陷阱' },
      { id: 'q3_4', label: '聘僱外籍看護擔心不適合', icon: 'fa-passport', x: 85, y: 85, fileId: '3', fileName: '聘僱外籍看護前思考', fileLink: 'https://drive.google.com/file/d/1haa7VF_ayPsEHahBg8b8kiABsaotnzms/view?usp=sharing', reason: '事前準備與心態調整，降低磨合期衝突。', highlights: '外籍看護聘僱前的準備工作' },
      { id: 'q3_5', label: '想掌握各類補助與社會福利', icon: 'fa-hand-holding-usd', x: 20, y: 85, fileId: '22', fileName: '社會資源盤點清單', fileLink: 'https://drive.google.com/file/d/1xAsjFSRdmfB9S_TUuGEe4u7whEPLmHu1/view?usp=sharing', reason: '系統化盤點可用資源，減輕經濟壓力。', highlights: '盤點長照與社會福利資源' },
      { id: 'q3_6', label: '家人行動不便導致交通困難', icon: 'fa-wheelchair', x: 30, y: 45, fileId: '8', fileName: '外出交通多元選擇', fileLink: 'https://drive.google.com/file/d/1bLtYLvvxqqEbZclgpuyIS3cf4ncpkjW6/view?usp=sharing', reason: '善用交通接送資源，解決外出難題。', highlights: '比較各類交通接送方案' },
      { id: 'q3_7', label: '照護作息紊亂需建立規律', icon: 'fa-clock', x: 25, y: 55, fileId: '5', fileName: '日常照顧時間表', fileLink: 'https://drive.google.com/file/d/1tiQ9prTIvd3xSGpFERhIA6_GQEAT1oiu/view?usp=sharing', reason: '建立規律作息，穩定被照顧者情緒。', highlights: '規劃規律的日常照顧作息' },
      { id: 'q3_8', label: '情緒不穩有身心過勞警訊', icon: 'fa-battery-empty', x: 98, y: 98, fileId: '16', fileName: '照顧者的自我覺察', fileLink: 'https://drive.google.com/file/d/1ufout4zBQewFeJskgM6W9XQmZM9hnOZ2/view?usp=sharing', reason: '正視自身狀況，適時尋求喘息。', highlights: '檢視自身照顧壓力與身心狀況' },
      { id: 'q3_9', label: '長期入睡障礙或睡眠品質差', icon: 'fa-bed', x: 68, y: 90, fileId: '21', fileName: '睡眠品質影響因子盤點', fileLink: 'https://drive.google.com/file/d/14dYJBI1LR41JFUvPw_covedzEpJt49K5/view?usp=sharing', reason: '改善睡眠環境與習慣，提升照顧品質。', highlights: '找出影響睡眠的關鍵因子' },
      { id: 'q3_10', label: '擔心自己病倒需建立備援', icon: 'fa-first-aid', x: 65, y: 85, fileId: '14', fileName: '照顧備援紀錄表', fileLink: 'https://drive.google.com/file/d/1c2zrzorujl8zCWsrHYB2y0iR4ZLOOV_A/view?usp=sharing', reason: '預先建立緊急聯絡網，臨危不亂。', highlights: '建立緊急時的照顧備援系統' }
    ]
  },
  {
    id: 'q1',
    category: 'physical',
    text: '目前影響被照顧者身體狀況最主要的原因是什麼？（可多選）',
    type: QuestionType.MULTI_CHOICE,
    options: [
      { id: 'q1_1', label: '健康無疾病', icon: 'fa-smile-beam', x: 20, y: 40, fileId: '23', fileName: '老後生活規劃面向表', fileLink: 'https://drive.google.com/file/d/1q4dFATU5vTPF5AhSM7S0ksLSdgY8uTat/view?usp=sharing', reason: '預先規劃，能讓未來生活更有品質。', highlights: '需提早規畫老後生活質量與意義' },
      { id: 'q1_2', label: '體力、腿力衰退', icon: 'fa-walking', x: 25, y: 85, fileId: '24', fileName: '跌倒預防檢核表', fileLink: 'https://drive.google.com/file/d/1_4sTd8na6IMOQO4M5KEgDHenBF-GSZsL/view?usp=sharing', reason: '行動受限時，居家安全點檢是首要任務。', highlights: '步態受限需重新點檢居家安全設施' },
      { id: 'q1_3', label: '失智症', icon: 'fa-brain', x: 80, y: 90, fileId: '10', fileName: '失智者常見行為與應對', fileLink: 'https://drive.google.com/file/d/1yFNoLqzgcNHYikFTa0UORPh5WRSlxMuv/view?usp=sharing', reason: '理解行為背後的意義，能大幅降低照顧壓力。', highlights: '家人出現行為異常需尋求處理對策' },
      { id: 'q1_4', label: '中風', icon: 'fa-user-injured', x: 75, y: 85, fileId: '13', fileName: '常見復健資源比較表', fileLink: 'https://drive.google.com/file/d/1LgK4HqpqmSCLLuExQFiY9i7KwnrBelCw/view?usp=sharing', reason: '復健黃金期需要精準的資源對接。', highlights: '欲決定復健路徑並考量預算與人力' },
      { id: 'q1_5', label: '帕金森氏症', icon: 'fa-head-side-virus', x: 30, y: 88, fileId: '24', fileName: '跌倒預防檢核表', fileLink: 'https://drive.google.com/file/d/1_4sTd8na6IMOQO4M5KEgDHenBF-GSZsL/view?usp=sharing', reason: '神經退化疾病需要長期的照護規劃與環境調整。', highlights: '需注意行動安全與藥物控制' },
      { id: 'q1_6', label: '癌症', icon: 'fa-ribbon', x: 20, y: 35, fileId: '7', fileName: '回診準備清單', fileLink: 'https://drive.google.com/file/d/1H0bhgoVSL5dFriWdxLFIt4ZhpFUQ92xF/view?usp=sharing', reason: '密集的醫療過程中，效率管理最重要。', highlights: '欲優化回診效率並準確記錄醫囑' },
      { id: 'q1_7', label: '糖尿病', icon: 'fa-tint', x: 25, y: 80, fileId: '19', fileName: '生理數值紀錄表', fileLink: 'https://drive.google.com/file/d/101UQRbMxxAtJPP1HaMobkJxUZCz01F88/view?usp=sharing', reason: '血糖控制與飲食管理是照護重點。', highlights: '需追蹤紀錄血糖與飲食' },
      { id: 'q1_8', label: '高血壓', icon: 'fa-heartbeat', x: 25, y: 80, fileId: '19', fileName: '生理數值紀錄表', fileLink: 'https://drive.google.com/file/d/101UQRbMxxAtJPP1HaMobkJxUZCz01F88/view?usp=sharing', reason: '血壓監測能有效預防心血管併發症。', highlights: '需定期量測血壓並規律服藥' },
      { id: 'q1_9', label: '腎臟問題', icon: 'fa-procedures', x: 25, y: 80, fileId: '19', fileName: '生理數值紀錄表', fileLink: 'https://drive.google.com/file/d/101UQRbMxxAtJPP1HaMobkJxUZCz01F88/view?usp=sharing', reason: '透析或腎病照護需要嚴格的飲食與醫療配合。', highlights: '需注意飲食限制與定期回診' },
      { id: 'q1_10', label: '心臟問題', icon: 'fa-heart-broken', x: 25, y: 80, fileId: '19', fileName: '生理數值紀錄表', fileLink: 'https://drive.google.com/file/d/101UQRbMxxAtJPP1HaMobkJxUZCz01F88/view?usp=sharing', reason: '心臟照護需特別留意徵兆與緊急應變。', highlights: '需監測心率與注意身體警訊' },
      { id: 'q1_11', label: '壓傷（褥瘡）', icon: 'fa-band-aid', x: 50, y: 85, fileId: '18', fileName: '生活照顧快速檢查表', fileLink: 'https://drive.google.com/file/d/1Zqd2SkqYv7F_QoGOwPltrC5PT3TCB5JI/view?usp=sharing', reason: '壓傷照護需要高頻率的翻身與護理，人力需求高。', highlights: '照護人力需求高，需注意傷口護理' },
      { id: 'q1_12', label: '肺部疾病', icon: 'fa-lungs', x: 25, y: 80, fileId: '19', fileName: '生理數值紀錄表', fileLink: 'https://drive.google.com/file/d/101UQRbMxxAtJPP1HaMobkJxUZCz01F88/view?usp=sharing', reason: '呼吸道照護可能涉及儀器使用，需熟悉操作。', highlights: '需注意血氧濃度與呼吸照護' },
      { id: 'q1_13', label: '身心疾病', icon: 'fa-user-nurse', x: 20, y: 35, fileId: '7', fileName: '回診準備清單', fileLink: 'https://drive.google.com/file/d/1H0bhgoVSL5dFriWdxLFIt4ZhpFUQ92xF/view?usp=sharing', reason: '身心狀況穩定需要環境與陪伴的配合。', highlights: '需建立穩定的支持系統' },
      { id: 'q1_14', label: '精神疾病', icon: 'fa-brain', x: 20, y: 35, fileId: '7', fileName: '回診準備清單', fileLink: 'https://drive.google.com/file/d/1H0bhgoVSL5dFriWdxLFIt4ZhpFUQ92xF/view?usp=sharing', reason: '精神照護需要專業醫療與社區資源的介入。', highlights: '需長期穩定就醫與社區復健' },
      { id: 'q1_15', label: '車禍意外', icon: 'fa-car-crash', x: 75, y: 85, fileId: '13', fileName: '常見復健資源比較表', fileLink: 'https://drive.google.com/file/d/1LgK4HqpqmSCLLuExQFiY9i7KwnrBelCw/view?usp=sharing', reason: '意外後的復健之路需要密集的資源投入。', highlights: '需處理急性期醫療與後續復健' }
    ]
  },
  {
    id: 'q2',
    category: 'living',
    text: '目前被照顧者的居住狀況為何？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      { id: 'q2_1', label: '住家中（非獨居）', icon: 'fa-users', x: 65, y: 75, fileId: '11', fileName: '家庭照顧資源盤點表', fileLink: 'https://drive.google.com/file/d/1Tl7GDUSPSK8vvn65wUWhjPiOnOeaQef_/view?usp=sharing', reason: '盤點內部資源，才能達到更好的分工。', highlights: '釐清照顧分工和家庭內部資源' },
      { id: 'q2_2', label: '住家中（獨居）', icon: 'fa-user', x: 85, y: 95, fileId: '17', fileName: '獨居者生活照顧安排', fileLink: 'https://drive.google.com/file/d/18-fhoq7M8sC4uaB7OTCJCF2YC7suLX-/view?usp=sharing', reason: '獨居照護更需強化社會支持網絡。', highlights: '擔心家人長時間缺少社交互動' },
      { id: 'q2_3', label: '住院中', icon: 'fa-hospital', x: 55, y: 85, fileId: '1', fileName: '出院返家照顧準備清單', fileLink: 'https://drive.google.com/file/d/1jWVOk6m_6LActFEICAHxFSZXUeSzOGjL/view?usp=sharing', reason: '返家前的銜接是減少再住院的關鍵。', highlights: '面臨出院前的資源銜接與居家困境' },
      { id: 'q2_4', label: '住機構', icon: 'fa-hotel', x: 95, y: 95, fileId: '15', fileName: '照顧模式比較表', fileLink: 'https://drive.google.com/file/d/1nDAn-dzhkFN6vNUMpgBpWZJToGM_ysNh/view?usp=sharing', reason: '機構轉銜需要全方位的心理與財務評估。', highlights: '對於機構安置安排仍感到不確定' }
    ]
  },
  {
    id: 'target_gender',
    category: 'profile',
    text: '被照顧者的性別是？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      { id: 'gender_m', label: '男性', icon: 'fa-male', x: 0, y: 0 },
      { id: 'gender_f', label: '女性', icon: 'fa-female', x: 0, y: 0 }
    ]
  },
  {
    id: 'target_birth',
    category: 'profile',
    text: '被照顧者的出生年份（民國）：',
    type: QuestionType.TEXT,
    placeholder: '請輸入數字（例：45）'
  },
  {
    id: 'stress_problem',
    category: 'stress',
    text: '最後，能請您描述目前「最擔心」或「深感最具壓力」的一個問題是什麼嗎？',
    type: QuestionType.TEXT,
    placeholder: '例如：擔心突然病倒沒人接手、財務壓力大、家人不諒解...'
  },
  {
    id: 'target_name',
    category: 'profile',
    text: '為了產出這份攻略，請告訴我<span class="font-bold text-pink-500">他的大名</span>，以利後續提供更多協助。我們在呈現時會將姓名去識別化（如：陳Ｏ名），請放心填寫：',
    type: QuestionType.TEXT,
    placeholder: '被照顧者的名字'
  },
  {
    id: 'user_name',
    category: 'profile',
    text: '為了產出這份攻略，請告訴我<span class="font-bold text-pink-500">您的大名</span>。建議填寫真實姓名，以利後續提供更多協助。我們在呈現時會將姓名去識別化（如：陳Ｏ名），請放心填寫：',
    type: QuestionType.TEXT,
    placeholder: '您的名字'
  }
];
