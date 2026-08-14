import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, BookOpen, BarChart3, Plus, Edit2, Trash2, ShieldCheck, Search, Eye, X, Save, Sparkles, UserPlus, AlertTriangle } from 'lucide-react';
import { Workbook, QuestionType, Section, Question } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    allUsers,
    allSessions,
    allResponses,
    workbooks,
    startWorkbook,
    createStudentUser,
    updateStudentUser,
    deleteStudentUser,
    saveWorkbook,
    deleteWorkbook,
    setCurrentView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'workbooks'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Participant Response Inspection Modal State
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);
  const [selectedWorkbookFilter, setSelectedWorkbookFilter] = useState<string | 'all'>('all');

  // Create Student Modal State
  const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);
  const [createNameInput, setCreateNameInput] = useState('');
  const [createAgeInput, setCreateAgeInput] = useState('15');
  const [createPinInput, setCreatePinInput] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);

  // Edit Student Modal State
  const [editingStudent, setEditingStudent] = useState<{ id: string; displayName: string; age?: number } | null>(null);
  const [editNameInput, setEditNameInput] = useState('');
  const [editAgeInput, setEditAgeInput] = useState('');
  const [editPinInput, setEditPinInput] = useState('');
  const [editError, setEditError] = useState<string | null>(null);

  // Delete Student Modal State
  const [deletingStudent, setDeletingStudent] = useState<{ id: string; displayName: string } | null>(null);

  // Workbook Editor Modal State
  const [editingWorkbook, setEditingWorkbook] = useState<Workbook | null>(null);

  // Filter students
  const studentUsers = allUsers.filter(u => u.role === 'student' &&
    u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedSessionsCount = allSessions.filter(s => s.status === 'completed').length;
  const inProgressSessionsCount = allSessions.filter(s => s.status === 'in_progress').length;

  // Age Statistics Computation
  const usersWithAge = studentUsers.filter(u => u.age && u.age > 0);
  const avgAge = usersWithAge.length > 0
    ? (usersWithAge.reduce((acc, u) => acc + (u.age || 0), 0) / usersWithAge.length).toFixed(1)
    : '-';

  const ageGroups = {
    junior: usersWithAge.filter(u => u.age! >= 10 && u.age! <= 14).length,
    middle: usersWithAge.filter(u => u.age! >= 15 && u.age! <= 17).length,
    senior: usersWithAge.filter(u => u.age! >= 18).length,
  };

  const handleCreateStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    const ageNum = createAgeInput ? parseInt(createAgeInput, 10) : undefined;
    const res = createStudentUser(createNameInput, createPinInput, ageNum);
    if (res.success) {
      setIsCreateStudentOpen(false);
      setCreateNameInput('');
      setCreateAgeInput('15');
      setCreatePinInput('');
    } else {
      setCreateError(res.message || 'Gagal menambahkan peserta.');
    }
  };

  const handleEditStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setEditError(null);
    const ageNum = editAgeInput ? parseInt(editAgeInput, 10) : undefined;
    const res = updateStudentUser(editingStudent.id, editNameInput, editPinInput || undefined, ageNum);
    if (res.success) {
      setEditingStudent(null);
      setEditNameInput('');
      setEditAgeInput('');
      setEditPinInput('');
    } else {
      setEditError(res.message || 'Gagal merubah data peserta.');
    }
  };

  const handleDeleteStudentConfirm = () => {
    if (!deletingStudent) return;
    deleteStudentUser(deletingStudent.id);
    setDeletingStudent(null);
  };

  const handleOpenStudentResponses = (studentId: string, workbookId?: string) => {
    setViewingStudentId(studentId);
    setSelectedWorkbookFilter(workbookId || 'all');
  };

  const handleCreateNewWorkbook = () => {
    const newWb: Workbook = {
      id: 'wb_' + Date.now(),
      title: 'Workbook Baru Refleksi Remaja',
      description: 'Deskripsi workbook interaktif baru.',
      status: 'published',
      version: '1.0',
      createdBy: 'Admin Psikolog',
      createdAt: new Date().toISOString(),
      sections: [
        {
          id: 'sec_' + Date.now(),
          workbookId: 'wb_' + Date.now(),
          title: 'Section 1: Pengenalan',
          description: 'Deskripsi section pertama.',
          orderIndex: 1,
          questions: [
            {
              id: 'q_' + Date.now(),
              sectionId: 'sec_' + Date.now(),
              type: 'short_text',
              questionText: 'Apa yang sedang kamu pikirkan hari ini?',
              required: true,
              orderIndex: 1
            }
          ]
        }
      ]
    };
    saveWorkbook(newWb);
    setEditingWorkbook(newWb);
  };

  // Add Question to active section in editor
  const handleAddQuestionToSection = (sectionIndex: number) => {
    if (!editingWorkbook) return;
    const updatedSections = [...editingWorkbook.sections];
    const sec = updatedSections[sectionIndex];

    const newQ: Question = {
      id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 3),
      sectionId: sec.id,
      type: 'long_text',
      questionText: 'Pertanyaan refleksi baru...',
      required: true,
      orderIndex: sec.questions.length + 1
    };

    updatedSections[sectionIndex] = {
      ...sec,
      questions: [...sec.questions, newQ]
    };

    setEditingWorkbook({
      ...editingWorkbook,
      sections: updatedSections
    });
  };

  // Add Section in editor
  const handleAddSection = () => {
    if (!editingWorkbook) return;
    const newSecId = 'sec_' + Date.now();
    const newSec: Section = {
      id: newSecId,
      workbookId: editingWorkbook.id,
      title: `Section ${editingWorkbook.sections.length + 1}: Topik Baru`,
      description: 'Deskripsi section refleksi baru.',
      orderIndex: editingWorkbook.sections.length + 1,
      questions: [
        {
          id: 'q_' + Date.now(),
          sectionId: newSecId,
          type: 'long_text',
          questionText: 'Pertanyaan refleksi...',
          required: true,
          orderIndex: 1
        }
      ]
    };

    setEditingWorkbook({
      ...editingWorkbook,
      sections: [...editingWorkbook.sections, newSec]
    });
  };

  const handleSaveWorkbookEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkbook) return;
    saveWorkbook(editingWorkbook);
    setEditingWorkbook(null);
  };

  // Student being viewed details
  const viewingStudent = allUsers.find(u => u.id === viewingStudentId);
  const studentResponses = viewingStudentId
    ? allResponses.filter(r => r.studentId === viewingStudentId)
    : [];

  const viewingStudentSessions = viewingStudentId
    ? allSessions.filter(s => s.studentId === viewingStudentId)
    : [];

  const studentWorkbooks = Array.from(
    new Set(
      viewingStudentSessions
        .map(s => workbooks.find(w => w.id === s.workbookId))
        .filter((w): w is Workbook => Boolean(w))
    )
  );

  // Grouped responses per workbook and section
  const filteredWorkbooksToDisplay = selectedWorkbookFilter === 'all'
    ? (studentWorkbooks.length > 0 ? studentWorkbooks : workbooks)
    : studentWorkbooks.filter(w => w.id === selectedWorkbookFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-300">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3f0e6] border border-[#e2dccb] text-xs font-bold text-slate-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
            <span>Dashboard Administrator & Psikolog</span>
          </div>
          <h2 className="font-heading-hand text-3xl font-extrabold text-slate-900 leading-tight">
            Panel Pengelolaan Kenali Dirimu
          </h2>
          <p className="font-handwriting text-sm text-slate-600">
            Analisis demografi usia, kelola data peserta (CRUD), dan periksa isian jawaban per workbook.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('landing')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold border border-slate-300/80 transition-colors shrink-0"
        >
          Ke Beranda Depan
        </button>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex p-1.5 bg-[#eae7df] rounded-2xl border border-slate-300/70">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xs border border-slate-300' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Statistik & Demografi</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'users' ? 'bg-white text-slate-900 shadow-xs border border-slate-300' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Kelola Peserta ({studentUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('workbooks')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'workbooks' ? 'bg-white text-slate-900 shadow-xs border border-slate-300' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kelola Workbook ({workbooks.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW ANALYTICS & DEMOGRAPHICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-300 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Remaja Terdaftar</span>
              <p className="text-3xl font-extrabold text-slate-900">{studentUsers.length}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-300 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata Usia Peserta</span>
              <p className="text-3xl font-extrabold text-indigo-900">{avgAge} <span className="text-sm font-bold text-slate-500">tahun</span></p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-300 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sesi Workbook Selesai</span>
              <p className="text-3xl font-extrabold text-emerald-800">{completedSessionsCount}</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-300 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sesi Sedang Berlangsung</span>
              <p className="text-3xl font-extrabold text-amber-800">{inProgressSessionsCount}</p>
            </div>
          </div>

          {/* Demografi Usia Peserta */}
          <div className="bg-white rounded-3xl p-6 border border-slate-300 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Analisis Demografi Usia Remaja</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <span className="text-xs font-bold text-indigo-800 block">10 - 14 Tahun (Remaja Awal / SMP)</span>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-2xl font-extrabold text-indigo-950">{ageGroups.junior} Peserta</span>
                  <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                    {usersWithAge.length > 0 ? Math.round((ageGroups.junior / usersWithAge.length) * 100) : 0}%
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f1e6] border border-[#e5dfce] space-y-1">
                <span className="text-xs font-bold text-amber-900 block">15 - 17 Tahun (Remaja Tengah / SMA)</span>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-2xl font-extrabold text-slate-900">{ageGroups.middle} Peserta</span>
                  <span className="text-xs font-bold text-amber-900 bg-white px-2.5 py-0.5 rounded-full border border-[#d5cebc] shadow-2xs">
                    {usersWithAge.length > 0 ? Math.round((ageGroups.middle / usersWithAge.length) * 100) : 0}%
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-700 block">18+ Tahun (Remaja Akhir / Kuliah)</span>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-2xl font-extrabold text-slate-900">{ageGroups.senior} Peserta</span>
                  <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-full border border-slate-300 shadow-2xs">
                    {usersWithAge.length > 0 ? Math.round((ageGroups.senior / usersWithAge.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PARTICIPANTS MANAGEMENT (FULL CRUD & AGE COLUMN) */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-300 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Daftar Remaja Peserta</h3>
              <p className="text-xs text-slate-500">Kelola akun peserta (Tambah, Edit, Hapus) dan periksa umur & isian jawaban.</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari nama panggilan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-slate-800 bg-slate-50"
                />
              </div>

              <button
                onClick={() => {
                  setCreateNameInput('');
                  setCreateAgeInput('15');
                  setCreatePinInput('');
                  setCreateError(null);
                  setIsCreateStudentOpen(true);
                }}
                className="btn-charcoal px-3.5 py-2 text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Tambah Peserta</span>
              </button>
            </div>
          </div>

          {/* User Table with Clean Fixed Column Layout & Age Column */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8f7f3] text-slate-500 font-bold uppercase text-[11px] tracking-wider whitespace-nowrap">
                  <th className="py-3.5 px-4 w-40">Nama Panggilan</th>
                  <th className="py-3.5 px-4 w-24 text-center">Umur</th>
                  <th className="py-3.5 px-4">Workbook Dikerjakan</th>
                  <th className="py-3.5 px-4 w-36 text-center">Status Isian</th>
                  <th className="py-3.5 px-4 w-32 text-center">Tanggal Daftar</th>
                  <th className="py-3.5 px-4 w-48 text-right">Aksi Kelola Psikolog</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {studentUsers.map(user => {
                  const userResCount = allResponses.filter(r => r.studentId === user.id).length;
                  const userSessions = allSessions.filter(s => s.studentId === user.id);
                  const userWbs = Array.from(
                    new Set(
                      userSessions
                        .map(s => workbooks.find(w => w.id === s.workbookId))
                        .filter((w): w is Workbook => Boolean(w))
                    )
                  );

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 align-middle whitespace-nowrap text-sm">
                        {user.displayName}
                      </td>
                      <td className="py-4 px-4 align-middle text-center font-bold text-slate-800 whitespace-nowrap">
                        {user.age ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
                            {user.age} th
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 align-middle">
                        {userWbs.length > 0 ? (
                          <div className="flex flex-col gap-1.5 items-start">
                            {userWbs.map((wb) => (
                              <button
                                key={wb.id}
                                onClick={() => handleOpenStudentResponses(user.id, wb.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f2eee3] hover:bg-[#e4decb] text-slate-900 text-xs font-bold border border-[#dfd9c7] shadow-2xs transition-colors cursor-pointer group"
                                title={`Klik untuk lihat jawaban spesifik ${wb.title}`}
                              >
                                <BookOpen className="w-3.5 h-3.5 text-slate-700 shrink-0 group-hover:scale-110 transition-transform" />
                                <span>{wb.title}</span>
                                <Eye className="w-3 h-3 text-slate-400 group-hover:text-slate-800 ml-1" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">Belum Mengerjakan</span>
                        )}
                      </td>
                      <td className="py-4 px-4 align-middle text-center whitespace-nowrap">
                        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300">
                          {userResCount} Isian Terjawab
                        </span>
                      </td>
                      <td className="py-4 px-4 align-middle text-center text-slate-600 font-semibold whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-4 px-4 align-middle text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenStudentResponses(user.id, 'all')}
                            className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-2.5 py-1.5 rounded-xl transition-colors shadow-2xs"
                            title="Lihat Semua Jawaban"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Jawaban</span>
                          </button>

                          <button
                            onClick={() => {
                              setEditingStudent({ id: user.id, displayName: user.displayName, age: user.age });
                              setEditNameInput(user.displayName);
                              setEditAgeInput(user.age ? String(user.age) : '');
                              setEditPinInput('');
                              setEditError(null);
                            }}
                            className="flex items-center gap-1 text-xs font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-xl transition-colors shadow-2xs"
                            title="Edit Data Peserta & PIN"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-indigo-700" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => setDeletingStudent({ id: user.id, displayName: user.displayName })}
                            className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors shadow-2xs"
                            title="Hapus Peserta Ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {studentUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                      Belum ada remaja yang mendaftar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WORKBOOK MANAGEMENT */}
      {activeTab === 'workbooks' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Daftar Booklet Workbook</h3>
            <button
              onClick={handleCreateNewWorkbook}
              className="btn-charcoal px-4 py-2.5 text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Workbook Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workbooks.map(wb => (
              <div key={wb.id} className="bg-white rounded-3xl p-6 border border-slate-300 shadow-xs space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">{wb.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{wb.description}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#f0ece1] text-slate-800 text-[10px] font-bold border border-[#e0d9c8]">
                    {wb.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-semibold text-slate-500">
                  <span>{wb.sections.length} Section • {wb.sections.reduce((acc, s) => acc + s.questions.length, 0)} Pertanyaan</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newStatus = wb.status === 'published' ? 'draft' : 'published';
                        saveWorkbook({ ...wb, status: newStatus });
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all ${
                        wb.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                      title={wb.status === 'published' ? 'Klik untuk Sembunyikan dari Peserta' : 'Klik untuk Tampilkan ke Peserta'}
                    >
                      <span className={`w-2 h-2 rounded-full ${wb.status === 'published' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      <span>{wb.status === 'published' ? 'Aktif (Tampil di Peserta)' : 'Sembunyi (Draft)'}</span>
                    </button>

                    <button
                      onClick={() => {
                        saveWorkbook({ ...wb, status: 'published' });
                        startWorkbook(wb.id);
                      }}
                      className="btn-charcoal px-3.5 py-1.5 text-xs font-bold shadow-xs flex items-center gap-1"
                      title="Buka & Kerjakan Workbook Ini Langsung"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Buka & Kerjakan Ini</span>
                    </button>

                    <button
                      onClick={() => setEditingWorkbook(wb)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl"
                      title="Edit Workbook"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => deleteWorkbook(wb.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE STUDENT USER MODAL */}
      {isCreateStudentOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-slate-300 relative">
            <button
              onClick={() => setIsCreateStudentOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-2xs"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tambah Peserta Remaja Baru</h3>
                <p className="text-xs text-slate-500">Buat akun remaja, tentukan umur & PIN akses.</p>
              </div>
            </div>

            <form onSubmit={handleCreateStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Budi, Annisa"
                    value={createNameInput}
                    onChange={(e) => setCreateNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Umur (Thn)</label>
                  <input
                    type="number"
                    min={10}
                    max={25}
                    placeholder="15"
                    value={createAgeInput}
                    onChange={(e) => setCreateAgeInput(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-center focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PIN Akses (4 Digit Angka)</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Contoh: 1234"
                  value={createPinInput}
                  onChange={(e) => setCreatePinInput(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold tracking-widest text-center focus:outline-none focus:border-slate-800"
                  required
                />
              </div>

              {createError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-center">
                  {createError}
                </p>
              )}

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateStudentOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-charcoal px-5 py-2.5 text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Simpan Peserta</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STUDENT USER MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-slate-300 relative">
            <button
              onClick={() => setEditingStudent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-2xs"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                <Edit2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Data Peserta</h3>
                <p className="text-xs text-slate-500">Ubah nama panggilan, umur, atau PIN akses.</p>
              </div>
            </div>

            <form onSubmit={handleEditStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={editNameInput}
                    onChange={(e) => setEditNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Umur (Thn)</label>
                  <input
                    type="number"
                    min={10}
                    max={25}
                    value={editAgeInput}
                    onChange={(e) => setEditAgeInput(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-center focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  PIN Baru (Opsional, Kosongkan Jika Tidak Diubah)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="4 Digit PIN Baru..."
                  value={editPinInput}
                  onChange={(e) => setEditPinInput(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold tracking-widest text-center focus:outline-none focus:border-slate-800"
                />
              </div>

              {editError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-center">
                  {editError}
                </p>
              )}

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-charcoal px-5 py-2.5 text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE STUDENT CONFIRMATION MODAL */}
      {deletingStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-slate-300 relative text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Hapus Peserta Remaja?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apakah Anda yakin ingin menghapus akun peserta <span className="font-bold text-slate-900">"{deletingStudent.displayName}"</span>? 
                Seluruh isian jawaban dan riwayat refleksinya akan dihapus permanen.
              </p>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setDeletingStudent(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteStudentConfirm}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Peserta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW RESPONSES MODAL FILTERED BY WORKBOOK */}
      {viewingStudentId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-300 flex flex-col max-h-[88vh] overflow-hidden">
            
            {/* STICKY HEADER WITH PROMINENT CLOSE BUTTON */}
            <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Jawaban Refleksi: {viewingStudent?.displayName} {viewingStudent?.age ? `(${viewingStudent.age} th)` : ''}
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">
                  Total {studentResponses.length} isian pertanyaan tersimpan
                </p>
              </div>
              <button
                onClick={() => setViewingStudentId(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-2xs shrink-0"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* WORKBOOK FILTER TAB BAR */}
            <div className="px-6 py-3 bg-[#f8f7f3] border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
              <span className="text-xs font-bold text-slate-500 shrink-0">Filter Workbook:</span>
              <button
                onClick={() => setSelectedWorkbookFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedWorkbookFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Semua Workbook ({studentWorkbooks.length})
              </button>

              {studentWorkbooks.map(wb => {
                const wbResponseCount = studentResponses.filter(r => {
                  return wb.sections.some(sec => sec.questions.some(q => q.id === r.questionId));
                }).length;

                return (
                  <button
                    key={wb.id}
                    onClick={() => setSelectedWorkbookFilter(wb.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      selectedWorkbookFilter === wb.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{wb.title} ({wbResponseCount})</span>
                  </button>
                );
              })}
            </div>

            {/* SCROLLABLE RESPONSES LIST GROUPED BY WORKBOOK AND SECTION */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {filteredWorkbooksToDisplay.map(wb => {
                const wbSections = wb.sections.map(sec => {
                  const items = sec.questions.map(q => {
                    const resp = studentResponses.find(r => r.questionId === q.id);
                    return { question: q, response: resp };
                  }).filter(item => item.response !== undefined);
                  return { section: sec, items };
                }).filter(s => s.items.length > 0);

                if (wbSections.length === 0) {
                  return (
                    <div key={wb.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                      <p className="text-xs font-bold text-slate-800">{wb.title}</p>
                      <p className="text-[11px] text-slate-400 italic">Belum ada isian jawaban untuk workbook ini.</p>
                    </div>
                  );
                }

                return (
                  <div key={wb.id} className="space-y-4">
                    
                    {/* Workbook Banner Header */}
                    <div className="flex items-center gap-2 p-3 bg-[#f2eee3] rounded-2xl border border-[#dfd9c7]">
                      <BookOpen className="w-4.5 h-4.5 text-slate-900 shrink-0" />
                      <h4 className="font-extrabold text-sm text-slate-900">{wb.title}</h4>
                      <span className="ml-auto text-[10px] font-bold text-slate-700 bg-white/90 px-2.5 py-0.5 rounded-full border border-[#d2cbba]">
                        Versi {wb.version}
                      </span>
                    </div>

                    {/* Sections & Questions List */}
                    <div className="space-y-6 pl-1 sm:pl-3">
                      {wbSections.map(({ section, items }) => (
                        <div key={section.id} className="space-y-3">
                          <h5 className="font-extrabold text-xs text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-800 shrink-0" />
                            <span>{section.title}</span>
                          </h5>

                          <div className="space-y-3">
                            {items.map(({ question, response }) => {
                              let formattedAnswer: React.ReactNode = '-';
                              if (response) {
                                if (response.answerText) {
                                  formattedAnswer = response.answerText;
                                } else if (response.answerJson) {
                                  const aj = response.answerJson;
                                  if (aj.label) formattedAnswer = aj.label;
                                  else if (aj.rating) formattedAnswer = `Rating Bintang: ${aj.rating} / 5 ⭐`;
                                  else if (aj.val) formattedAnswer = `Pilihan: ${aj.val}`;
                                  else if (aj.emotions && Array.isArray(aj.emotions)) formattedAnswer = aj.emotions.join(', ');
                                  else formattedAnswer = JSON.stringify(aj);
                                }
                              }

                              return (
                                <div key={question.id} className="p-4 rounded-2xl bg-[#faf9f6] border border-slate-200 space-y-2 shadow-2xs">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-xs font-bold text-slate-900 leading-snug">
                                      <span className="text-slate-400 mr-1">Soal {question.orderIndex}:</span> {question.questionText}
                                    </p>
                                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0 uppercase">
                                      {question.type.replace('_', ' ')}
                                    </span>
                                  </div>

                                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                      Jawaban Remaja:
                                    </span>
                                    <p className="font-handwriting text-base text-slate-800 leading-relaxed font-semibold">
                                      {formattedAnswer}
                                    </p>
                                  </div>

                                  {response && (
                                    <p className="text-[10px] font-handwriting text-slate-400 text-right">
                                      Diisi: {new Date(response.createdAt).toLocaleString('id-ID')}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}

              {studentResponses.length === 0 && (
                <p className="text-center py-8 text-slate-400 font-medium text-xs">
                  Siswa ini belum mengisi pertanyaan refleksi.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WORKBOOK EDITOR MODAL */}
      {editingWorkbook && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-300 flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* STICKY HEADER WITH PROMINENT CLOSE BUTTON */}
            <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <h3 className="text-lg font-extrabold text-slate-900">
                Visual Editor: {editingWorkbook.title}
              </h3>
              <button
                onClick={() => setEditingWorkbook(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-2xs shrink-0"
                title="Tutup Editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCROLLABLE FORM BODY ONLY */}
            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleSaveWorkbookEditor} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Workbook</label>
                    <input
                      type="text"
                      value={editingWorkbook.title}
                      onChange={(e) => setEditingWorkbook({ ...editingWorkbook, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:border-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Workbook</label>
                    <textarea
                      value={editingWorkbook.description}
                      onChange={(e) => setEditingWorkbook({ ...editingWorkbook, description: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-slate-800"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Status Publikasi</label>
                      <select
                        value={editingWorkbook.status}
                        onChange={(e) => setEditingWorkbook({ ...editingWorkbook, status: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none focus:border-slate-800"
                      >
                        <option value="published">Published (Aktif & Tampil)</option>
                        <option value="draft">Draft (Draf Rahasia)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Versi</label>
                      <input
                        type="text"
                        value={editingWorkbook.version}
                        onChange={(e) => setEditingWorkbook({ ...editingWorkbook, version: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none focus:border-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Sections & Questions Editor */}
                <div className="space-y-6 pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-900">Section & Pertanyaan ({editingWorkbook.sections.length} Section)</h4>
                  </div>

                  {editingWorkbook.sections.map((sec, sIdx) => (
                    <div key={sec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-300 space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={sec.title}
                          onChange={(e) => {
                            const updated = [...editingWorkbook.sections];
                            updated[sIdx].title = e.target.value;
                            setEditingWorkbook({ ...editingWorkbook, sections: updated });
                          }}
                          className="font-bold text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-300 w-full max-w-sm"
                        />
                      </div>

                      <div className="space-y-3 pl-2 border-l-2 border-slate-300">
                        {sec.questions.map((q, qIdx) => (
                          <div key={q.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center">
                                {qIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={q.questionText}
                                onChange={(e) => {
                                  const updatedSecs = [...editingWorkbook.sections];
                                  updatedSecs[sIdx].questions[qIdx].questionText = e.target.value;
                                  setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                }}
                                className="text-xs font-semibold w-full border-b pb-1 focus:outline-none focus:border-slate-800"
                              />
                            </div>

                            <div className="flex items-center gap-2 text-[11px]">
                              <label className="text-slate-400 shrink-0">URL Visual Ilustrasi:</label>
                              <input
                                type="text"
                                placeholder="Contoh: /assets/teen_bullying_reflection.png atau URL gambar (https://...)"
                                value={q.imageUrl || ''}
                                onChange={(e) => {
                                  const updatedSecs = [...editingWorkbook.sections];
                                  updatedSecs[sIdx].questions[qIdx].imageUrl = e.target.value;
                                  setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                }}
                                className="text-[11px] bg-slate-50 border border-slate-300 rounded px-2 py-1 w-full text-slate-700 focus:bg-white focus:outline-none"
                              />
                            </div>

                            {/* LIVE IMAGE PREVIEW IN EDITOR */}
                            {q.imageUrl && q.imageUrl.trim() !== '' && (
                              <div className="mt-1 p-2 bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-3">
                                <img
                                  src={q.imageUrl}
                                  alt="Pratinjau Gambar"
                                  className="w-16 h-14 object-contain rounded border border-slate-300 bg-white"
                                />
                                <div className="flex-1 overflow-hidden">
                                  <span className="text-[11px] font-bold text-slate-900 block truncate">
                                    ✓ Gambar Terdeteksi
                                  </span>
                                  <span className="text-[9px] text-slate-500 block truncate">
                                    {q.imageUrl}
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-[11px]">
                              <label className="text-slate-400 shrink-0">
                                Teks Petunjuk / Helper:
                              </label>
                              <input
                                type="text"
                                placeholder="Contoh: Tuliskan jawaban jujurmu..."
                                value={q.helperText || ''}
                                onChange={(e) => {
                                  const updatedSecs = [...editingWorkbook.sections];
                                  updatedSecs[sIdx].questions[qIdx].helperText = e.target.value;
                                  setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                }}
                                className="text-[11px] bg-slate-50 border border-slate-300 rounded px-2 py-1 w-full text-slate-700"
                              />
                            </div>

                            <div className="flex items-center gap-3 text-[11px]">
                              <label className="text-slate-400">Tipe:</label>
                              <select
                                value={q.type}
                                onChange={(e) => {
                                  const updatedSecs = [...editingWorkbook.sections];
                                  const newType = e.target.value as QuestionType;
                                  updatedSecs[sIdx].questions[qIdx].type = newType;
                                  if (['single_choice', 'multiple_choice', 'emoji_selector'].includes(newType) && (!q.options || q.options.length === 0)) {
                                    updatedSecs[sIdx].questions[qIdx].options = [
                                      { id: 'opt_' + Date.now() + '_1', questionId: q.id, label: 'Pilihan 1', value: 'pilihan_1', icon: newType === 'emoji_selector' ? '😊' : undefined, orderIndex: 1 },
                                      { id: 'opt_' + Date.now() + '_2', questionId: q.id, label: 'Pilihan 2', value: 'pilihan_2', icon: newType === 'emoji_selector' ? '😌' : undefined, orderIndex: 2 }
                                    ];
                                  }
                                  setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                }}
                                className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-bold text-slate-700"
                              >
                                <option value="short_text">Short Text (Teks Singkat)</option>
                                <option value="long_text">Long Text (Jurnal Teks Panjang)</option>
                                <option value="single_choice">Single Choice (Pilihan Ganda)</option>
                                <option value="multiple_choice">Multiple Choice (Bisa Pilih Banyak)</option>
                                <option value="emoji_selector">Emoji Selector (Pilih Emoji)</option>
                                <option value="likert_scale">Likert Scale (1-5)</option>
                                <option value="rating">Rating Bintang</option>
                                <option value="yes_no">Yes / No (Ya / Tidak)</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => {
                                  const updatedSecs = [...editingWorkbook.sections];
                                  updatedSecs[sIdx].questions = updatedSecs[sIdx].questions.filter((_, idx) => idx !== qIdx);
                                  setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                }}
                                className="text-rose-600 hover:text-rose-800 ml-auto font-bold"
                              >
                                Hapus
                              </button>
                            </div>

                            {/* OPTIONS LIST EDITOR FOR CHOICE & EMOJI QUESTIONS */}
                            {['single_choice', 'multiple_choice', 'emoji_selector'].includes(q.type) && (
                              <div className="mt-3 p-3 bg-slate-100 rounded-xl border border-slate-300 space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-extrabold text-slate-900">
                                    Daftar Opsi Pilihan Jawaban ({q.options?.length || 0})
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedSecs = [...editingWorkbook.sections];
                                      const currentOpts = updatedSecs[sIdx].questions[qIdx].options || [];
                                      const newOptId = 'opt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 3);
                                      const newOpt = {
                                        id: newOptId,
                                        questionId: q.id,
                                        label: 'Pilihan ' + (currentOpts.length + 1),
                                        value: 'opt_val_' + (currentOpts.length + 1),
                                        icon: q.type === 'emoji_selector' ? '😊' : undefined,
                                        orderIndex: currentOpts.length + 1
                                      };
                                      updatedSecs[sIdx].questions[qIdx].options = [...currentOpts, newOpt];
                                      setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                    }}
                                    className="flex items-center gap-1 text-[10px] font-extrabold text-slate-800 bg-white hover:bg-slate-200 border border-slate-300 px-2.5 py-1 rounded-lg shadow-xs transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Tambah Pilihan</span>
                                  </button>
                                </div>

                                <div className="space-y-2">
                                  {(!q.options || q.options.length === 0) && (
                                    <p className="text-[11px] text-amber-700 italic font-medium">Belum ada pilihan. Klik "+ Tambah Pilihan" di atas.</p>
                                  )}
                                  {q.options?.map((opt, oIdx) => (
                                    <div key={opt.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
                                      {q.type === 'emoji_selector' && (
                                        <input
                                          type="text"
                                          value={opt.icon || ''}
                                          placeholder="Emoji"
                                          onChange={(e) => {
                                            const updatedSecs = [...editingWorkbook.sections];
                                            updatedSecs[sIdx].questions[qIdx].options![oIdx].icon = e.target.value;
                                            setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                          }}
                                          className="w-10 text-center text-sm bg-slate-50 border border-slate-300 rounded p-1"
                                          title="Karakter Emoji"
                                        />
                                      )}
                                      <input
                                        type="text"
                                        placeholder="Label opsi pilihan..."
                                        value={opt.label}
                                        onChange={(e) => {
                                          const updatedSecs = [...editingWorkbook.sections];
                                          const val = e.target.value;
                                          updatedSecs[sIdx].questions[qIdx].options![oIdx].label = val;
                                          updatedSecs[sIdx].questions[qIdx].options![oIdx].value = val.toLowerCase().replace(/\s+/g, '_');
                                          setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                        }}
                                        className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded px-2.5 py-1 flex-1 text-slate-800 focus:bg-white focus:outline-none"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updatedSecs = [...editingWorkbook.sections];
                                          updatedSecs[sIdx].questions = updatedSecs[sIdx].questions?.filter((_, idx) => idx !== oIdx);
                                          setEditingWorkbook({ ...editingWorkbook, sections: updatedSecs });
                                        }}
                                        className="text-rose-500 hover:text-rose-700 p-1 text-[11px] font-bold"
                                        title="Hapus Pilihan Ini"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* TAMBAH PERTANYAAN DI BAGIAN BAWAH SECTION */}
                        <button
                          type="button"
                          onClick={() => handleAddQuestionToSection(sIdx)}
                          className="w-full py-3 bg-[#f5f1e6] hover:bg-[#eae4d4] text-slate-800 border border-dashed border-[#c8c0aa] rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs group mt-3"
                        >
                          <Plus className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
                          <span>Tambah Pertanyaan Baru di {sec.title}</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* TAMBAH SECTION BARU DI PALING BAWAH */}
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all group mt-2"
                  >
                    <Plus className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span>Tambah Section Baru</span>
                  </button>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEditingWorkbook(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn-charcoal px-6 py-2.5 text-xs font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
