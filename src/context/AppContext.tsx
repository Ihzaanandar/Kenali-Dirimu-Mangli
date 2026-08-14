import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Workbook, Session, ResponseItem, SessionProgress, StudentSummaryData } from '../types';
import { INITIAL_WORKBOOKS } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AppContextType {
  currentUser: User | null;
  currentView: 'landing' | 'session' | 'summary' | 'admin';
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
  setCurrentView: (view: 'landing' | 'session' | 'summary' | 'admin') => void;
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

      return parsed.map(wb => {
        const initWb = INITIAL_WORKBOOKS.find(i => i.id === wb.id);
        if (!initWb) return wb;
        return {
          ...wb,
          sections: wb.sections.map(sec => {
            const initSec = initWb.sections?.find(s => s.id === sec.id);
            if (!initSec) return sec;
            return {
              ...sec,
              questions: sec.questions.map(q => {
                const initQ = initSec.questions?.find(iq => iq.id === q.id);
                if (!initQ) return q;
                return {
                  ...q,
                  imageUrl: q.imageUrl || initQ.imageUrl,
                  themeStyle: q.themeStyle || initQ.themeStyle
                };
              })
            };
          })
        };
      });
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
    return saved ? JSON.parse(saved) : null;
  });

  const [responses, setResponses] = useState<Record<string, ResponseItem>>({});
  const [currentView, setCurrentView] = useState<'landing' | 'session' | 'summary' | 'admin'>('landing');
  const [isAutosaving, setIsAutosaving] = useState<boolean>(false);
  const [autosaveTime, setAutosaveTime] = useState<string | null>(null);
  const [studentSummary, setStudentSummary] = useState<StudentSummaryData | null>(null);

  // Sync activeWorkbook with latest workbooks preset
  useEffect(() => {
    if (activeWorkbook) {
      const updated = workbooks.find(w => w.id === activeWorkbook.id);
      if (updated) {
        setActiveWorkbook(updated);
      }
    }
  }, [workbooks]);

  // Sync state with Supabase if configured
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const fetchSupabaseData = async () => {
      try {
        const { data: dbUsers } = await client.from('users').select('*');
        if (dbUsers && dbUsers.length > 0) {
          const formattedUsers: User[] = dbUsers.map((u: any) => ({
            id: u.id,
            role: u.role,
            displayName: u.display_name,
            age: u.age ? Number(u.age) : undefined,
            pinHash: u.pin_hash,
            className: u.class_name,
            createdAt: u.created_at
          }));
          setAllUsers(formattedUsers);
        }

        const { data: dbResponses } = await client.from('responses').select('*');
        if (dbResponses && dbResponses.length > 0) {
          const formattedRes: ResponseItem[] = dbResponses.map((r: any) => ({
            id: r.id,
            sessionId: r.session_id,
            studentId: r.student_id,
            questionId: r.question_id,
            answerText: r.answer_text,
            answerJson: r.answer_json,
            createdAt: r.created_at
          }));
          setAllResponses(formattedRes);
        }

        const { data: dbSessions } = await client.from('sessions').select('*');
        if (dbSessions && dbSessions.length > 0) {
          const formattedSessions: Session[] = dbSessions.map((s: any) => ({
            id: s.id,
            studentId: s.student_id,
            workbookId: s.workbook_id,
            startedAt: s.started_at,
            lastActivityAt: s.last_activity_at,
            completedAt: s.completed_at,
            status: s.status
          }));
          setAllSessions(formattedSessions);
        }
      } catch (err) {
        console.warn('Supabase fetch notice:', err);
      }
    };

    fetchSupabaseData();
  }, []);

  // Sync LocalStorage
  useEffect(() => {
    localStorage.setItem('kd_workbooks', JSON.stringify(workbooks));
  }, [workbooks]);

  useEffect(() => {
    localStorage.setItem('kd_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('kd_sessions', JSON.stringify(allSessions));
  }, [allSessions]);

  useEffect(() => {
    localStorage.setItem('kd_responses', JSON.stringify(allResponses));
  }, [allResponses]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kd_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kd_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('kd_active_session', JSON.stringify(activeSession));
      const sessionResponses = allResponses.filter(r => r.sessionId === activeSession.id);
      const resMap: Record<string, ResponseItem> = {};
      sessionResponses.forEach(r => {
        resMap[r.questionId] = r;
      });
      setResponses(resMap);
    } else {
      localStorage.removeItem('kd_active_session');
      setResponses({});
    }
  }, [activeSession?.id]);

  useEffect(() => {
    if (activeWorkbook) {
      localStorage.setItem('kd_active_workbook', JSON.stringify(activeWorkbook));
    } else {
      localStorage.removeItem('kd_active_workbook');
    }
  }, [activeWorkbook]);

  // Helper to build Student Summary Data from a session
  const buildStudentSummaryData = (session: Session, wb: Workbook) => {
    const sessionResList = allResponses.filter(r => r.sessionId === session.id);
    const resMap: Record<string, ResponseItem> = {};
    sessionResList.forEach(r => { resMap[r.questionId] = r; });

    const frequentEmotions: string[] = [];
    const keyReflections: { question: string; answer: string }[] = [];

    wb.sections.forEach(sec => {
      sec.questions.forEach(q => {
        const res = resMap[q.id];
        if (!res) return;

        if (q.type === 'emoji_selector' && res.answerJson) {
          if (Array.isArray(res.answerJson)) {
            frequentEmotions.push(...res.answerJson);
          } else if (typeof res.answerJson === 'string') {
            frequentEmotions.push(res.answerJson);
          } else if (Array.isArray(res.answerJson.selected)) {
            frequentEmotions.push(...res.answerJson.selected);
          }
        }

        if ((q.type === 'long_text' || q.type === 'short_text') && res.answerText?.trim()) {
          keyReflections.push({
            question: q.questionText,
            answer: res.answerText.trim()
          });
        }
      });
    });

    setStudentSummary({
      sessionId: session.id,
      studentName: currentUser?.displayName || 'Peserta',
      completedAt: session.completedAt || new Date().toISOString(),
      frequentEmotions: Array.from(new Set(frequentEmotions)),
      keyReflections: keyReflections,
      totalAnswered: sessionResList.length,
      insightNote: 'Setiap langkah refleksi yang kamu ambil adalah bentuk apresiasi terhadap dirimu sendiri. Teruslah bertumbuh dengan penuh kehangatan!'
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
        // If age is provided, update existing user's age
        if (age && age > 0) {
          setAllUsers(prev => {
            const updated = prev.map(u => u.id === existingUser.id ? { ...u, age: Number(age) } : u);
            localStorage.setItem('kd_users', JSON.stringify(updated));
            return updated;
          });
        }

        setCurrentUser(existingUser);

        // Find in-progress or completed session for a PUBLISHED workbook
        const inProgress = allSessions.find(
          s => s.studentId === existingUser.id && s.status === 'in_progress'
        );
        const completed = allSessions.find(
          s => s.studentId === existingUser.id && s.status === 'completed'
        );

        if (inProgress) {
          const wb = workbooks.find(w => w.id === inProgress.workbookId && w.status === 'published');
          if (wb) {
            setActiveSession(inProgress);
            setActiveWorkbook(wb);
          }
        } else if (completed) {
          const wb = workbooks.find(w => w.id === completed.workbookId && w.status === 'published');
          if (wb) {
            setActiveSession(completed);
            setActiveWorkbook(wb);
            buildStudentSummaryData(completed, wb);
          }
        }

        return { success: true, isNewUser: false };
      } else {
        return { success: false, message: 'PIN 4 digit tidak sesuai untuk nama panggilan ini.' };
      }
    } else {
      const newUser: User = {
        id: 'usr_' + Date.now(),
        role: 'student',
        displayName: displayName.trim(),
        age: age ? Number(age) : undefined,
        pinHash: pinHash,
        createdAt: new Date().toISOString()
      };
      setAllUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);

      if (isSupabaseConfigured && supabase) {
        supabase.from('users').upsert({
          id: newUser.id,
          role: newUser.role,
          display_name: newUser.displayName,
          age: newUser.age,
          pin_hash: newUser.pinHash,
          created_at: newUser.createdAt
        }).then();
      }

      return { success: true, isNewUser: true };
    }
  };

  const loginAdmin = (pin: string) => {
    if (pin === '6969' || pin === '6969') {
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
    if (!currentUser) return;
    const wb = workbooks.find(w => w.id === workbookId) || workbooks.find(w => w.status === 'published') || workbooks[0];
    setActiveWorkbook(wb);

    // 1. Check for COMPLETED session if not forceNew
    const completedSession = allSessions.find(
      s => s.studentId === currentUser.id && s.workbookId === wb.id && s.status === 'completed'
    );

    // 2. Check for IN-PROGRESS session
    const inProgressSession = allSessions.find(
      s => s.studentId === currentUser.id && s.workbookId === wb.id && s.status === 'in_progress'
    );

    if (!forceNew && completedSession && !inProgressSession) {
      // Open Completed Summary
      setActiveSession(completedSession);
      buildStudentSummaryData(completedSession, wb);
      setCurrentView('summary');
      return;
    }

    if (!forceNew && inProgressSession) {
      // Resume In-Progress session
      setActiveSession(inProgressSession);
      setCurrentView('session');
    } else {
      // Start a brand new session
      const newSession: Session = {
        id: 'ses_' + Date.now(),
        studentId: currentUser.id,
        workbookId: wb.id,
        startedAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
        status: 'in_progress'
      };
      setAllSessions(prev => [...prev, newSession]);
      setActiveSession(newSession);

      if (isSupabaseConfigured && supabase) {
        supabase.from('sessions').upsert({
          id: newSession.id,
          student_id: newSession.studentId,
          workbook_id: newSession.workbookId,
          started_at: newSession.startedAt,
          last_activity_at: newSession.lastActivityAt,
          status: newSession.status
        }).then();
      }
      setCurrentView('session');
    }
  };

  const saveAnswer = (questionId: string, answerText?: string, answerJson?: any) => {
    if (!activeSession || !currentUser) return;

    setIsAutosaving(true);

    const now = new Date().toISOString();
    const existingRes = responses[questionId];

    const updatedResItem: ResponseItem = {
      id: existingRes ? existingRes.id : 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      sessionId: activeSession.id,
      studentId: currentUser.id,
      questionId: questionId,
      answerText: answerText,
      answerJson: answerJson,
      createdAt: now
    };

    setResponses(prev => ({
      ...prev,
      [questionId]: updatedResItem
    }));

    setAllResponses(prev => {
      const filtered = prev.filter(r => !(r.sessionId === activeSession.id && r.questionId === questionId));
      return [...filtered, updatedResItem];
    });

    setActiveSession(prev => prev ? { ...prev, lastActivityAt: now } : null);

    if (isSupabaseConfigured && supabase) {
      supabase.from('responses').upsert({
        id: updatedResItem.id,
        session_id: updatedResItem.sessionId,
        student_id: updatedResItem.studentId,
        question_id: updatedResItem.questionId,
        answer_text: updatedResItem.answerText,
        answer_json: updatedResItem.answerJson,
        created_at: updatedResItem.createdAt
      }).then();
    }

    setTimeout(() => {
      setIsAutosaving(false);
      setAutosaveTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 400);
  };

  const completeSession = () => {
    if (!activeSession || !currentUser || !activeWorkbook) return;

    const completedAt = new Date().toISOString();

    const updatedSession: Session = {
      ...activeSession,
      completedAt: completedAt,
      status: 'completed'
    };

    setActiveSession(updatedSession);
    setAllSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));

    if (isSupabaseConfigured && supabase) {
      supabase.from('sessions').upsert({
        id: updatedSession.id,
        student_id: updatedSession.studentId,
        workbook_id: updatedSession.workbookId,
        started_at: updatedSession.startedAt,
        last_activity_at: updatedSession.lastActivityAt,
        completed_at: updatedSession.completedAt,
        status: updatedSession.status
      }).then();
    }

    buildStudentSummaryData(updatedSession, activeWorkbook);
    setCurrentView('summary');
  };

  const resetStudentPin = (userId: string, newPin: string): boolean => {
    if (newPin.length !== 4) return false;
    const newHash = hashPin(newPin);
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, pinHash: newHash } : u));

    if (isSupabaseConfigured && supabase) {
      supabase.from('users').update({ pin_hash: newHash }).eq('id', userId).then();
    }

    return true;
  };

  const createStudentUser = (displayName: string, pin: string, age?: number) => {
    if (!displayName.trim() || pin.length !== 4) {
      return { success: false, message: 'Nama panggilan & PIN 4 Digit harus diisi dengan benar.' };
    }

    const existing = allUsers.find(
      u => u.displayName.toLowerCase() === displayName.trim().toLowerCase() && u.role === 'student'
    );
    if (existing) {
      return { success: false, message: `Nama panggilan "${displayName}" sudah terdaftar.` };
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      role: 'student',
      displayName: displayName.trim(),
      age: age ? Number(age) : undefined,
      pinHash: hashPin(pin),
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem('kd_users', JSON.stringify(updatedUsers));

    if (isSupabaseConfigured && supabase) {
      supabase.from('users').insert({
        id: newUser.id,
        role: newUser.role,
        display_name: newUser.displayName,
        age: newUser.age,
        pin_hash: newUser.pinHash
      }).then();
    }

    return { success: true, user: newUser };
  };

  const updateStudentUser = (userId: string, newDisplayName: string, newPin?: string, newAge?: number) => {
    if (!newDisplayName.trim()) {
      return { success: false, message: 'Nama panggilan tidak boleh kosong.' };
    }

    const existingOther = allUsers.find(
      u => u.id !== userId && u.displayName.toLowerCase() === newDisplayName.trim().toLowerCase() && u.role === 'student'
    );
    if (existingOther) {
      return { success: false, message: `Nama panggilan "${newDisplayName}" sudah digunakan oleh peserta lain.` };
    }

    let updatedUsers: User[] = [];
    setAllUsers(prev => {
      updatedUsers = prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            displayName: newDisplayName.trim(),
            age: newAge && newAge > 0 ? Number(newAge) : u.age,
            pinHash: newPin && newPin.length === 4 ? hashPin(newPin) : u.pinHash
          };
        }
        return u;
      });
      localStorage.setItem('kd_users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, displayName: newDisplayName.trim(), age: newAge || prev.age } : null);
    }

    if (isSupabaseConfigured && supabase) {
      const updateData: any = { display_name: newDisplayName.trim() };
      if (newAge && newAge > 0) updateData.age = Number(newAge);
      if (newPin && newPin.length === 4) {
        updateData.pin_hash = hashPin(newPin);
      }
      supabase.from('users').update(updateData).eq('id', userId).then();
    }

    return { success: true };
  };

  const deleteStudentUser = (userId: string) => {
    const updatedUsers = allUsers.filter(u => u.id !== userId);
    setAllUsers(updatedUsers);
    localStorage.setItem('kd_users', JSON.stringify(updatedUsers));

    // Cleanup sessions & responses
    const updatedSessions = allSessions.filter(s => s.studentId !== userId);
    setAllSessions(updatedSessions);
    localStorage.setItem('kd_sessions', JSON.stringify(updatedSessions));

    const updatedResponses = allResponses.filter(r => r.studentId !== userId);
    setAllResponses(updatedResponses);
    localStorage.setItem('kd_responses', JSON.stringify(updatedResponses));

    if (currentUser?.id === userId) {
      setCurrentUser(null);
      setActiveSession(null);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.from('users').delete().eq('id', userId).then();
      supabase.from('sessions').delete().eq('student_id', userId).then();
      supabase.from('responses').delete().eq('student_id', userId).then();
    }

    return true;
  };

  const saveWorkbook = (wb: Workbook) => {
    let updatedWorkbooks: Workbook[] = [];
    setWorkbooks(prev => {
      const idx = prev.findIndex(w => w.id === wb.id);
      if (idx >= 0) {
        updatedWorkbooks = [...prev];
        updatedWorkbooks[idx] = wb;
      } else {
        updatedWorkbooks = [...prev, wb];
      }
      localStorage.setItem('kd_workbooks', JSON.stringify(updatedWorkbooks));
      return updatedWorkbooks;
    });

    if (wb.status === 'published') {
      setActiveWorkbook(wb);
    } else if (wb.status === 'draft' && activeWorkbook?.id === wb.id) {
      setActiveWorkbook(null);
      setActiveSession(null);
    }
  };

  const deleteWorkbook = (wbId: string) => {
    setWorkbooks(prev => {
      const updated = prev.filter(w => w.id !== wbId);
      localStorage.setItem('kd_workbooks', JSON.stringify(updated));
      return updated;
    });

    if (activeWorkbook?.id === wbId) {
      setActiveWorkbook(null);
      setActiveSession(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
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
        setCurrentView
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
