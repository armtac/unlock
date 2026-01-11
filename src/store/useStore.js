import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      user: {
        language: null,
        profile: null,
        plan: null,
      },
      currentSession: {
        query: null,
        urgency: null,
        category: null,
        consultant: null,
        startTime: null,
        notes: '',
        nextSteps: [],
      },
      sessions: [],
      
      setUserLanguage: (language) => set((state) => ({
        user: { ...state.user, language }
      })),
      
      setUserProfile: (profile) => set((state) => ({
        user: { ...state.user, profile }
      })),
      
      setUserPlan: (plan) => set((state) => ({
        user: { ...state.user, plan }
      })),
      
      setCurrentQuery: (query) => set((state) => ({
        currentSession: { ...state.currentSession, query }
      })),
      
      setCurrentUrgency: (urgency) => set((state) => ({
        currentSession: { ...state.currentSession, urgency }
      })),
      
      setCurrentCategory: (category) => set((state) => ({
        currentSession: { ...state.currentSession, category }
      })),
      
      setCurrentConsultant: (consultant) => set((state) => ({
        currentSession: { ...state.currentSession, consultant }
      })),
      
      startSession: () => set((state) => ({
        currentSession: { ...state.currentSession, startTime: Date.now() }
      })),
      
      setSessionNotes: (notes) => set((state) => ({
        currentSession: { ...state.currentSession, notes }
      })),
      
      setNextSteps: (nextSteps) => set((state) => ({
        currentSession: { ...state.currentSession, nextSteps }
      })),
      
      saveSession: (rating = null, tags = [], ratingNotes = '') => {
        const state = get();
        const session = {
          id: Date.now().toString(),
          ...state.currentSession,
          endTime: Date.now(),
          rating,
          tags,
          ratingNotes,
        };
        
        set((state) => ({
          sessions: [session, ...state.sessions],
          currentSession: {
            query: null,
            urgency: null,
            category: null,
            consultant: null,
            startTime: null,
            notes: '',
            nextSteps: [],
          }
        }));
      },
      
      updateSessionRating: (sessionId, rating, tags, ratingNotes) => {
        set((state) => ({
          sessions: state.sessions.map(session => 
            session.id === sessionId 
              ? { ...session, rating, tags, ratingNotes }
              : session
          )
        }));
      },
      
      resetCurrentSession: () => set({
        currentSession: {
          query: null,
          urgency: null,
          category: null,
          consultant: null,
          startTime: null,
          notes: '',
          nextSteps: [],
        }
      }),
    }),
    {
      name: 'unlock-storage',
    }
  )
);

export default useStore;
