import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Workbook, Session, ResponseItem, SessionProgress, StudentSummaryData, UserProfileData, MoodEntry, ViewType } from '../types';
import { INITIAL_WORKBOOKS } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AppContextType {
  currentUser: User | null;
  currentView: ViewType;
  workbooks: Workbook[];
  activeWorkbook: Workbook | null;
  activeSession: Session | null;
  responses: Record<string, ResponseItem>;
  isAutosaving: boolean;
  autosaveTime: string | null;
  allUsers: User[];
  allSessions: Session[];
  allResponses: ResponseItem[];
  studentSummary: StudentSummaryData | null;
  favorites: string[];
  userProfileData: UserProfileData | null;
  moodEntries: MoodEntry[];

  // Actions
  loginStudent: (displayName: string, pin: string, age?: number) => { success: boolean; isNewUser?: boolean; message?: string };
  loginAdmin: (pin: string) => { success: boolean; message?: string };
  logout: () => void;
  startWorkbook: (workbookId: string, forceNew?: boolean) => void;
  saveAnswer: (questionId: string, answerText?: string, answerJson?: any) => void;
  completeSession: () => void;
  resetStudentPin: (userId: string, newPin: string) => boolean;
  createStudentUser: (displayName: string, pin: string, age?: number) => { success: boolean; message?: string; user?: User };
  updateStudentUser: (userId: string, newDisplayName: string, newPin?: string, newAge?: number) => { success: boolean; message?: string };
  deleteStudentUser: (userId: string) => boolean;
  saveWorkbook: (workbook: Workbook) => void;
  deleteWorkbook: (workbookId: string) => void;
  setCurrentView: (view: ViewType) => void;
  toggleFavorite: (questionId: string) => void;
  saveUserProfile: (data: UserProfileData) => void;
  addMoodEntry: (mood: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Simple hashing function for PIN security
const hashPin = (pin: string): string => {
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'hash_' + Math.abs(hash).toString(16);
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workbooks, setWorkbooks] = useState<Workbook[]>(() => {
    const saved = localStorage.getItem('kd_workbooks');
    if (!saved) return INITIAL_WORKBOOKS;
    try {
      const parsed: Workbook[] = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_WORKBOOKS;
      
      const valid = parsed.map(w => ({
        ...w,
        sections: Array.isArray(w.sections) ? w.sections : []
      }));

      // Ensure INITIAL_WORKBOOKS are included
      INITIAL_WORKBOOKS.forEach(initWb => {
        const idx = valid.findIndex(w => w.id === initWb.id);
        if (idx < 0) {
          valid.push(initWb);
        } else {
          // If stored workbook has no sections or outdated sections, update from initial
          if (!valid[idx].sections || valid[idx].sections.length === 0) {
            valid[idx] = initWb;
          }
        }
      });
      return valid;
    } catch {
      return INITIAL_WORKBOOKS;
    }
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('kd_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [allSessions, setAllSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('kd_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [allResponses, setAllResponses] = useState<ResponseItem[]>(() => {
    const saved = localStorage.getItem('kd_responses');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kd_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeSession, setActiveSession] = useState<Session | null>(() => {
    const saved = localStorage.getItem('kd_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeWorkbook, setActiveWorkbook] = useState<Workbook | null>(() => {
    const saved = localStorage.getItem('kd_active_workbook');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.sections) && parsed.sections.length > 0) {
          return parsed;
        }
      } catch {}
    }
    return INITIAL_WORKBOOKS[0];
  });

  const [responses, setResponses] = useState<Record<string, ResponseItem>>({});
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isAutosaving, setIsAutosaving] = useState<boolean>(false);
  const [autosaveTime, setAutosaveTime] = useState<string | null>(null);
  const [studentSummary, setStudentSummary] = useState<StudentSummaryData | null>(null);

  // User Profile Data & Favorites & Mood Entries
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (currentUser?.favorites) return currentUser.favorites;
    const saved = localStorage.getItem(`kd_favorites_${currentUser?.id || 'guest'}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfileData, setUserProfileData] = useState<UserProfileData | null>(() => {
    if (currentUser?.profileData) return currentUser.profileData;
    const saved = localStorage.getItem(`kd_profile_${currentUser?.id || 'guest'}`);
    return saved ? JSON.parse(saved) : null;
  });

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    if (currentUser?.moodEntries) return currentUser.moodEntries;
    const saved = localStorage.getItem(`kd_moods_${currentUser?.id || 'guest'}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync active session responses safely
  useEffect(() => {
    if (activeSession) {
      const sessionResponses = allResponses.filter(r => r.sessionId === activeSession.id);
      const resMap: Record<string, ResponseItem> = {};
      sessionResponses.forEach(r => {
        resMap[r.questionId] = r;
      });
      setResponses(resMap);
      localStorage.setItem('kd_active_session', JSON.stringify(activeSession));
    } else {
      setResponses({});
      localStorage.removeItem('kd_active_session');
    }
  }, [activeSession?.id, allResponses]);

  // Sync user profile & favorites when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kd_current_user', JSON.stringify(currentUser));
      if (currentUser.profileData) setUserProfileData(currentUser.profileData);
      if (currentUser.favorites) setFavorites(currentUser.favorites);
      if (currentUser.moodEntries) setMoodEntries(currentUser.moodEntries);
    } else {
      localStorage.removeItem('kd_current_user');
      setUserProfileData(null);
      setFavorites([]);
      setMoodEntries([]);
    }
  }, [currentUser]);

  const toggleFavorite = (questionId: string) => {
    setFavorites(prev => {
      const next = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];
      
      if (currentUser) {
        localStorage.setItem(`kd_favorites_${currentUser.id}`, JSON.stringify(next));
        setAllUsers(users => users.map(u => u.id === currentUser.id ? { ...u, favorites: next } : u));
      }
      return next;
    });
  };

  const saveUserProfile = (data: UserProfileData) => {
    const updated: UserProfileData = {
      ...userProfileData,
      ...data,
      updatedAt: new Date().toISOString()
    };
    setUserProfileData(updated);

    if (currentUser) {
      localStorage.setItem(`kd_profile_${currentUser.id}`, JSON.stringify(updated));
      setAllUsers(users => {
        const nextUsers = users.map(u => u.id === currentUser.id ? { ...u, profileData: updated } : u);
        localStorage.setItem('kd_users', JSON.stringify(nextUsers));
        return nextUsers;
      });
      setCurrentUser(prev => prev ? { ...prev, profileData: updated } : null);
    }
  };

  const addMoodEntry = (mood: string) => {
    if (!currentUser) return;
    const newEntry: MoodEntry = {
      id: 'mood_' + Date.now(),
      studentId: currentUser.id,
      mood,
      timestamp: new Date().toISOString()
    };
    setMoodEntries(prev => {
      const next = [newEntry, ...prev];
      localStorage.setItem(`kd_moods_${currentUser.id}`, JSON.stringify(next));
      return next;
    });
    setAllUsers(users => {
      const nextUsers = users.map(u => u.id === currentUser.id ? {
        ...u,
        moodEntries: [newEntry, ...(u.moodEntries || [])]
      } : u);
      localStorage.setItem('kd_users', JSON.stringify(nextUsers));
      return nextUsers;
    });
  };

  const loginStudent = (displayName: string, pin: string, age?: number) => {
    if (!displayName.trim() || pin.length !== 4) {
      return { success: false, message: 'Masukkan Nama Panggilan & PIN 4 Digit valid.' };
    }

    const pinHash = hashPin(pin);
    const existingUser = allUsers.find(
      u => u.displayName.toLowerCase() === displayName.trim().toLowerCase() && u.role === 'student'
    );

    if (existingUser) {
      if (existingUser.pinHash === pinHash) {
        if (age && age > 0) {
          setAllUsers(prev => {
            const updated = prev.map(u => u.id === existingUser.id ? { ...u, age: Number(age) } : u);
            localStorage.setItem('kd_users', JSON.stringify(updated));
            return updated;
          });
        }

        const loggedUser = { ...existingUser, age: age || existingUser.age };
        setCurrentUser(loggedUser);
        localStorage.setItem('kd_current_user', JSON.stringify(loggedUser));

        const publishedWb = workbooks.find(w => w.status === 'published') || workbooks[0];
        if (publishedWb) {
          startWorkbook(publishedWb.id);
        }

        return { success: true, isNewUser: false };
      } else {
        return { success: false, message: 'PIN 4 digit salah untuk nama panggilan ini.' };
      }
    } else {
      const newUser: User = {
        id: 'usr_' + Date.now(),
        displayName: displayName.trim(),
        role: 'student',
        pinHash,
        age: age ? Number(age) : undefined,
        createdAt: new Date().toISOString()
      };

      setAllUsers(prev => {
        const next = [...prev, newUser];
        localStorage.setItem('kd_users', JSON.stringify(next));
        return next;
      });

      setCurrentUser(newUser);
      localStorage.setItem('kd_current_user', JSON.stringify(newUser));

      const publishedWb = workbooks.find(w => w.status === 'published') || workbooks[0];
      if (publishedWb) {
        startWorkbook(publishedWb.id);
      }

      return { success: true, isNewUser: true };
    }
  };

  const loginAdmin = (pin: string) => {
    if (pin === '6969' || pin === '9999' || pin === '1234') {
      const adminUser: User = {
        id: 'usr_admin',
        role: 'admin',
        displayName: 'Psikolog Admin',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(adminUser);
      setCurrentView('admin');
      return { success: true };
    }
    return { success: false, message: 'PIN Administrator tidak valid.' };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveSession(null);
    setActiveWorkbook(null);
    setResponses({});
    setCurrentView('landing');
  };

  const startWorkbook = (workbookId: string, forceNew = false) => {
    const wb = workbooks.find(w => w.id === workbookId) || workbooks.find(w => w.status === 'published') || INITIAL_WORKBOOKS[0];
    const safeWb: Workbook = {
      ...wb,
      sections: Array.isArray(wb.sections) && wb.sections.length > 0 ? wb.sections : (INITIAL_WORKBOOKS.find(i => i.id === wb.id)?.sections || [])
    };
    setActiveWorkbook(safeWb);
    localStorage.setItem('kd_active_workbook', JSON.stringify(safeWb));

    const studentId = currentUser ? currentUser.id : 'guest_user';

    const inProgressSession = allSessions.find(
      s => s.studentId === studentId && s.workbookId === wb.id && s.status === 'in_progress'
    );

    const completedSession = allSessions.find(
      s => s.studentId === studentId && s.workbookId === wb.id && s.status === 'completed'
    );

    if (!forceNew && inProgressSession) {
      setActiveSession(inProgressSession);
      localStorage.setItem('kd_active_session', JSON.stringify(inProgressSession));
    } else if (!forceNew && completedSession) {
      setActiveSession(completedSession);
      localStorage.setItem('kd_active_session', JSON.stringify(completedSession));
    } else {
      const newSession: Session = {
        id: 'ses_' + Date.now(),
        studentId: studentId,
        workbookId: wb.id,
        startedAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
        status: 'in_progress'
      };
      setAllSessions(prev => {
        const next = [...prev, newSession];
        localStorage.setItem('kd_sessions', JSON.stringify(next));
        return next;
      });
      setActiveSession(newSession);
      localStorage.setItem('kd_active_session', JSON.stringify(newSession));
    }
    setCurrentView('session');
  };

  const saveAnswer = async (questionId: string, answerText?: string, answerJson?: any) => {
    if (!activeSession) return;

    setIsAutosaving(true);
    const existing = responses[questionId];

    const responseItem: ResponseItem = {
      id: existing ? existing.id : 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      sessionId: activeSession.id,
      studentId: currentUser ? currentUser.id : 'guest_user',
      questionId,
      answerText,
      answerJson,
      createdAt: new Date().toISOString()
    };

    setResponses(prev => ({
      ...prev,
      [questionId]: responseItem
    }));

    setAllResponses(prev => {
      const filtered = prev.filter(r => !(r.sessionId === activeSession.id && r.questionId === questionId));
      const next = [...filtered, responseItem];
      localStorage.setItem('kd_responses', JSON.stringify(next));
      return next;
    });

    setAllSessions(prev => {
      const next = prev.map(s => s.id === activeSession.id ? { ...s, lastActivityAt: new Date().toISOString() } : s);
      localStorage.setItem('kd_sessions', JSON.stringify(next));
      return next;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('responses').upsert({
          id: responseItem.id,
          session_id: responseItem.sessionId,
          student_id: responseItem.studentId,
          question_id: responseItem.questionId,
          answer_text: answerText || null,
          answer_json: answerJson || null,
          created_at: responseItem.createdAt
        });
      } catch (err) {
        console.warn('Supabase sync warning:', err);
      }
    }

    setTimeout(() => {
      setIsAutosaving(false);
      setAutosaveTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 300);
  };

  const completeSession = async () => {
    if (!activeSession || !activeWorkbook) return;

    const updatedSession: Session = {
      ...activeSession,
      status: 'completed',
      completedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString()
    };

    setActiveSession(updatedSession);
    localStorage.setItem('kd_active_session', JSON.stringify(updatedSession));

    setAllSessions(prev => {
      const next = prev.map(s => s.id === activeSession.id ? updatedSession : s);
      localStorage.setItem('kd_sessions', JSON.stringify(next));
      return next;
    });

    buildStudentSummaryData(updatedSession, activeWorkbook);
    setCurrentView('summary');
  };

  const buildStudentSummaryData = (session: Session, wb: Workbook) => {
    const sessionRes = allResponses.filter(r => r.sessionId === session.id);
    const keyReflections: { question: string; answer: string }[] = [];

    wb.sections.forEach(sec => {
      sec.questions.forEach(q => {
        const resp = sessionRes.find(r => r.questionId === q.id);
        if (resp && (resp.answerText || resp.answerJson)) {
          let ansStr = resp.answerText || '';
          if (!ansStr && resp.answerJson) {
            ansStr = resp.answerJson.label || resp.answerJson.val || JSON.stringify(resp.answerJson);
          }
          if (ansStr.trim()) {
            keyReflections.push({
              question: q.questionText,
              answer: ansStr
            });
          }
        }
      });
    });

    const summary: StudentSummaryData = {
      sessionId: session.id,
      studentName: currentUser?.displayName || 'Remaja',
      completedAt: session.completedAt || new Date().toISOString(),
      frequentEmotions: ['Tenang', 'Bersyukur'],
      keyReflections: keyReflections.slice(0, 5),
      totalAnswered: sessionRes.length,
      insightNote: 'Terima kasih telah meluangkan waktu untuk mendengarkan perasaanamu sendiri. Perjalanan mengenal diri terus berlanjut.'
    };

    setStudentSummary(summary);
  };

  const createStudentUser = (displayName: string, pin: string, age?: number) => {
    if (!displayName.trim() || pin.length !== 4) {
      return { success: false, message: 'Masukkan Nama & PIN 4 Digit valid.' };
    }
    const pinHash = hashPin(pin);
    const newUser: User = {
      id: 'usr_' + Date.now(),
      displayName: displayName.trim(),
      role: 'student',
      pinHash,
      age: age ? Number(age) : undefined,
      createdAt: new Date().toISOString()
    };
    setAllUsers(prev => {
      const next = [...prev, newUser];
      localStorage.setItem('kd_users', JSON.stringify(next));
      return next;
    });
    return { success: true, user: newUser };
  };

  const updateStudentUser = (userId: string, newDisplayName: string, newPin?: string, newAge?: number) => {
    let updatedUser: User | null = null;
    setAllUsers(prev => {
      const next = prev.map(u => {
        if (u.id === userId) {
          const uUser: User = {
            ...u,
            displayName: newDisplayName.trim(),
            age: newAge !== undefined ? Number(newAge) : u.age,
            pinHash: newPin && newPin.length === 4 ? hashPin(newPin) : u.pinHash
          };
          updatedUser = uUser;
          return uUser;
        }
        return u;
      });
      localStorage.setItem('kd_users', JSON.stringify(next));
      return next;
    });

    if (currentUser?.id === userId && updatedUser) {
      setCurrentUser(updatedUser);
      localStorage.setItem('kd_current_user', JSON.stringify(updatedUser));
    }
    return { success: true };
  };

  const deleteStudentUser = (userId: string) => {
    setAllUsers(prev => {
      const next = prev.filter(u => u.id !== userId);
      localStorage.setItem('kd_users', JSON.stringify(next));
      return next;
    });
    return true;
  };

  const resetStudentPin = (userId: string, newPin: string) => {
    if (newPin.length !== 4) return false;
    const pinHash = hashPin(newPin);
    setAllUsers(prev => {
      const next = prev.map(u => u.id === userId ? { ...u, pinHash } : u);
      localStorage.setItem('kd_users', JSON.stringify(next));
      return next;
    });
    return true;
  };

  const saveWorkbook = (wbToSave: Workbook) => {
    setWorkbooks(prev => {
      const idx = prev.findIndex(w => w.id === wbToSave.id);
      let next: Workbook[];
      if (idx >= 0) {
        next = prev.map(w => w.id === wbToSave.id ? wbToSave : w);
      } else {
        next = [...prev, wbToSave];
      }
      localStorage.setItem('kd_workbooks', JSON.stringify(next));
      return next;
    });
  };

  const deleteWorkbook = (workbookId: string) => {
    setWorkbooks(prev => {
      const next = prev.filter(w => w.id !== workbookId);
      localStorage.setItem('kd_workbooks', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentView,
      workbooks,
      activeWorkbook,
      activeSession,
      responses,
      isAutosaving,
      autosaveTime,
      allUsers,
      allSessions,
      allResponses,
      studentSummary,
      favorites,
      userProfileData,
      moodEntries,

      loginStudent,
      loginAdmin,
      logout,
      startWorkbook,
      saveAnswer,
      completeSession,
      resetStudentPin,
      createStudentUser,
      updateStudentUser,
      deleteStudentUser,
      saveWorkbook,
      deleteWorkbook,
      setCurrentView,
      toggleFavorite,
      saveUserProfile,
      addMoodEntry
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
