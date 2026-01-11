import consultantsData from '../data/consultants.json';

const categoryKeywords = {
  'Procurement': ['procurement', 'acquisti', 'supplier', 'fornitori', 'sourcing', 'contratti', 'negoziazione'],
  'HR': ['hr', 'risorse umane', 'assunzione', 'hiring', 'talent', 'recruiting', 'dipendenti', 'team'],
  'Finance': ['finance', 'finanza', 'budget', 'cfo', 'costi', 'financial', 'finanziario', 'contabilità'],
  'Finance IT & Transformation': ['digital transformation', 'it transformation', 'automation', 'digitale', 'sistemi', 'erp', 'software'],
  'Leadership': ['leadership', 'management', 'gestione', 'team building', 'coaching', 'executive', 'strategia'],
  'Sales': ['sales', 'vendite', 'commerciale', 'clienti', 'customer', 'business development'],
  'Manufacturing': ['manufacturing', 'produzione', 'supply chain', 'operations', 'operazioni'],
};

const seniorKeywords = ['cfo', 'director', 'executive', 'strategia', 'strategy', 'business case', 'high stakes', 'importante', 'critical'];

export const classifyQuery = (query) => {
  const lowerQuery = query.toLowerCase();
  
  let bestMatch = null;
  let maxScore = 0;
  
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    const score = keywords.filter(keyword => lowerQuery.includes(keyword)).length;
    if (score > maxScore) {
      maxScore = score;
      bestMatch = category;
    }
  });
  
  return bestMatch || 'Leadership';
};

export const needsSenior = (query) => {
  const lowerQuery = query.toLowerCase();
  return seniorKeywords.some(keyword => lowerQuery.includes(keyword));
};

export const findConsultant = (query, userLanguage, category) => {
  const isSeniorNeeded = needsSenior(query);
  
  let candidates = consultantsData.filter(consultant => {
    const hasCategory = consultant.categories.includes(category);
    const hasLanguage = consultant.languages.includes(userLanguage);
    return hasCategory && hasLanguage;
  });
  
  if (candidates.length === 0) {
    candidates = consultantsData.filter(consultant => 
      consultant.languages.includes(userLanguage)
    );
  }
  
  if (candidates.length === 0) {
    candidates = consultantsData;
  }
  
  candidates.sort((a, b) => {
    if (isSeniorNeeded) {
      if (a.level === 'Senior' && b.level !== 'Senior') return -1;
      if (a.level !== 'Senior' && b.level === 'Senior') return 1;
    }
    return b.rating - a.rating;
  });
  
  return candidates[0];
};

export const findThreeConsultants = (userLanguage, category) => {
  // Filter by category and language
  let candidates = consultantsData.filter(consultant => {
    const hasCategory = consultant.categories.includes(category);
    const hasLanguage = consultant.languages.includes(userLanguage);
    return hasCategory && hasLanguage;
  });
  
  // Fallback to language only if no category match
  if (candidates.length === 0) {
    candidates = consultantsData.filter(consultant => 
      consultant.languages.includes(userLanguage)
    );
  }
  
  // Final fallback to all consultants
  if (candidates.length === 0) {
    candidates = consultantsData;
  }
  
  // Find best consultant for each level
  const levels = ['Senior', 'Mid', 'Junior'];
  const levelLabels = {
    'Senior': 'Senior',
    'Mid': 'Emerging',
    'Junior': 'Rising'
  };
  
  const result = [];
  
  levels.forEach(level => {
    const levelCandidates = candidates.filter(c => c.level === level);
    if (levelCandidates.length > 0) {
      // Sort by rating and pick the best
      levelCandidates.sort((a, b) => b.rating - a.rating);
      result.push({
        ...levelCandidates[0],
        displayLevel: levelLabels[level]
      });
    }
  });
  
  // If we don't have 3, fill with best available
  while (result.length < 3 && candidates.length > result.length) {
    const used = result.map(r => r.id);
    const remaining = candidates.filter(c => !used.includes(c.id));
    if (remaining.length > 0) {
      remaining.sort((a, b) => b.rating - a.rating);
      result.push({
        ...remaining[0],
        displayLevel: levelLabels[remaining[0].level] || remaining[0].level
      });
    } else {
      break;
    }
  }
  
  return result.slice(0, 3);
};

export const generateETA = () => {
  return Math.floor(Math.random() * 4) + 1;
};

export const generateThreeETAs = () => {
  return [
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1
  ];
};

export const generateRoomName = () => {
  const random = Math.random().toString(36).substring(2, 8);
  const timestamp = Date.now();
  return `unlock-${random}-${timestamp}`;
};

export const generateNextSteps = (category) => {
  const templates = {
    'Procurement': [
      'Identifica 3 fornitori alternativi per il tuo prodotto/servizio principale',
      'Prepara una matrice di confronto costi-benefici per la negoziazione',
      'Definisci i KPI chiave per monitorare le performance dei fornitori'
    ],
    'HR': [
      'Crea un job description dettagliato con competenze chiave richieste',
      'Pianifica 3 colloqui strutturati con domande comportamentali',
      'Definisci un piano di onboarding di 30-60-90 giorni'
    ],
    'Finance': [
      'Analizza le voci di costo principali e identifica 3 aree di ottimizzazione',
      'Prepara un forecast trimestrale con scenari best/worst case',
      'Definisci 5 KPI finanziari da monitorare settimanalmente'
    ],
    'Finance IT & Transformation': [
      'Mappa i processi attuali e identifica 3 quick wins per l\'automazione',
      'Valuta 2-3 soluzioni software con demo e pricing',
      'Prepara un business case con ROI atteso e timeline di implementazione'
    ],
    'Leadership': [
      'Identifica le 3 priorità strategiche per il prossimo trimestre',
      'Pianifica 1-on-1 con i key stakeholder per allineamento',
      'Definisci obiettivi SMART e metriche di successo per il team'
    ],
    'Sales': [
      'Segmenta i prospect in base a potenziale e urgenza',
      'Prepara una value proposition personalizzata per i top 3 clienti',
      'Definisci il processo di follow-up con touchpoint e timing'
    ],
    'Manufacturing': [
      'Analizza i colli di bottiglia nella produzione e proponi soluzioni',
      'Calcola l\'OEE (Overall Equipment Effectiveness) attuale',
      'Identifica 3 azioni per ridurre gli scarti e migliorare la qualità'
    ]
  };
  
  return templates[category] || templates['Leadership'];
};
