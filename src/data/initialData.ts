import { Workbook } from '../types';

export const INITIAL_WORKBOOKS: Workbook[] = [
  {
    id: 'wb-1',
    title: 'Kenali Diriku & Perasaanku',
    description: 'Workbook interaktif untuk remaja dalam mengenali karakter diri, mengelola emosi, mengatasi tekanan sekolah, perundungan, dan media sosial.',
    coverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    version: '1.0',
    createdBy: 'Tim Psikolog Kenali Dirimu',
    createdAt: new Date().toISOString(),
    sections: [
      {
        id: 'sec-1',
        workbookId: 'wb-1',
        title: 'Section 1: Kenali Diriku',
        description: 'Mari sejenak mengenal siapa dirimu, karakter unikmu, dan hal-hal yang membuatmu berharga.',
        orderIndex: 1,
        questions: [
          {
            id: 'q-1',
            sectionId: 'sec-1',
            type: 'short_text',
            questionText: 'Bagaimana kamu menggambarkan dirimu dalam tiga kata?',
            helperText: 'Contoh: Ramah, Pemikir, Pembelajar.',
            imageUrl: '/assets/teen_scribble_reflection.png',
            themeStyle: 'mood_pastel',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-2',
            sectionId: 'sec-1',
            type: 'long_text',
            questionText: 'Apa hal yang paling kamu sukai dari dirimu saat ini?',
            helperText: 'Bisa berupa sifat, keahlian, atau cara pandangmu.',
            themeStyle: 'mood_pastel',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-3',
            sectionId: 'sec-1',
            type: 'single_choice',
            questionText: 'Mana aktivitas yang paling membuat energimu terisi kembali (*recharge*)?',
            themeStyle: 'mood_pastel',
            required: true,
            orderIndex: 3,
            options: [
              { id: 'opt-3a', questionId: 'q-3', label: 'Menyendiri di kamar sambil dengar musik / baca', value: 'introvert_recharge', icon: '🎧', orderIndex: 1 },
              { id: 'opt-3b', questionId: 'q-3', label: 'Nongkrong & ngobrol seru bareng teman-teman', value: 'extrovert_recharge', icon: '👥', orderIndex: 2 },
              { id: 'opt-3c', questionId: 'q-3', label: 'Olahraga atau aktivitas fisik di luar', value: 'active_recharge', icon: '⚽', orderIndex: 3 },
              { id: 'opt-3d', questionId: 'q-3', label: 'Melakukan hobi kreatif (gambar, nulis, coding, buat konten)', value: 'creative_recharge', icon: '🎨', orderIndex: 4 }
            ]
          }
        ]
      },
      {
        id: 'sec-2',
        workbookId: 'wb-1',
        title: 'Section 2: Mengenali Perasaan',
        description: 'Setiap emosi itu valid. Mari amati emosi apa saja yang hadir akhir-akhir ini.',
        orderIndex: 2,
        questions: [
          {
            id: 'q-4',
            sectionId: 'sec-2',
            type: 'emoji_selector',
            questionText: 'Emosi apa yang paling sering kamu rasakan dalam 1 minggu terakhir?',
            helperText: 'Pilih satu atau beberapa emosi yang mewakili perasaanmu.',
            themeStyle: 'mood_pastel',
            required: true,
            orderIndex: 1,
            options: [
              { id: 'opt-4a', questionId: 'q-4', label: 'Bahagia / Senang', value: 'happy', icon: '😊', orderIndex: 1 },
              { id: 'opt-4b', questionId: 'q-4', label: 'Tenang / Damai', value: 'calm', icon: '😌', orderIndex: 2 },
              { id: 'opt-4c', questionId: 'q-4', label: 'Cemas / Khawatir', value: 'anxious', icon: '😰', orderIndex: 3 },
              { id: 'opt-4d', questionId: 'q-4', label: 'Lelah / Burnout', value: 'exhausted', icon: '😫', orderIndex: 4 },
              { id: 'opt-4e', questionId: 'q-4', label: 'Sedih / Kecewa', value: 'sad', icon: '🥺', orderIndex: 5 },
              { id: 'opt-4f', questionId: 'q-4', label: 'Marah / Kesal', value: 'angry', icon: '😤', orderIndex: 6 }
            ]
          },
          {
            id: 'q-5',
            sectionId: 'sec-2',
            type: 'likert_scale',
            questionText: 'Seberapa mudah kamu mengenali penyebab saat emosimu sedang bergejolak?',
            helperText: '1 = Sangat Sulit, 5 = Sangat Mudah',
            themeStyle: 'mood_pastel',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-6',
            sectionId: 'sec-2',
            type: 'long_text',
            questionText: 'Ketika rasa cemas atau kesal datang, apa hal yang biasanya paling membantu menenangkanmu?',
            helperText: 'Ceritakan langkah kecil yang biasa kamu lakukan.',
            themeStyle: 'mood_pastel',
            required: false,
            orderIndex: 3
          }
        ]
      },
      {
        id: 'sec-3',
        workbookId: 'wb-1',
        title: 'Section 3: Pertemanan, Perundungan & Support System',
        description: 'Refleksi tentang rasa nyaman, hubungan sosial, dan pengalaman di lingkungan pertemanan.',
        orderIndex: 3,
        questions: [
          {
            id: 'q-7-b',
            sectionId: 'sec-3',
            type: 'long_text',
            questionText: 'Pernahkah kamu mengalami tindakan perundungan (bullying), ejekan, atau merasa dikucilkan dalam pertemanan?',
            helperText: 'Ceritakan secara singkat bagaimana perasaanmu saat itu dan bagaimana kamu menghadapinya. Ceritamu aman dan privat.',
            imageUrl: '/assets/teen_scribble_bullying.png',
            themeStyle: 'bullying_ink',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-7',
            sectionId: 'sec-3',
            type: 'rating',
            questionText: 'Seberapa nyaman kamu menjadi dirimu sendiri saat berada di lingkaran pertemananmu saat ini?',
            helperText: 'Beri bintang dari 1 (Sangat Tidak Nyaman) hingga 5 (Sangat Nyaman)',
            themeStyle: 'bullying_ink',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-8',
            sectionId: 'sec-3',
            type: 'multiple_choice',
            questionText: 'Siapa saja orang yang biasanya kamu percayai saat butuh teman cerita?',
            helperText: 'Boleh memilih lebih dari satu.',
            themeStyle: 'bullying_ink',
            required: true,
            orderIndex: 3,
            options: [
              { id: 'opt-8a', questionId: 'q-8', label: 'Sahabat sebaya', value: 'best_friend', icon: '🤝', orderIndex: 1 },
              { id: 'opt-8b', questionId: 'q-8', label: 'Orang tua / Wali', value: 'parents', icon: '🏡', orderIndex: 2 },
              { id: 'opt-8c', questionId: 'q-8', label: 'Kakak / Adik', value: 'siblings', icon: '👧', orderIndex: 3 },
              { id: 'opt-8d', questionId: 'q-8', label: 'Guru BK / Konselor', value: 'counselor', icon: '🏫', orderIndex: 4 },
              { id: 'opt-8e', questionId: 'q-8', label: 'Lebih memilih menyimpan sendiri dulu', value: 'self_only', icon: '🔒', orderIndex: 5 }
            ]
          }
        ]
      },
      {
        id: 'sec-4',
        workbookId: 'wb-1',
        title: 'Section 4: Sekolah & Tekanan',
        description: 'Dunia akademik membawa banyak tantangan. Mari lihat bagaimana kamu menghadapinya.',
        orderIndex: 4,
        questions: [
          {
            id: 'q-9',
            sectionId: 'sec-4',
            type: 'likert_scale',
            questionText: 'Seberapa besar tingkat beban/stres yang kamu rasakan dari tugas dan ujian sekolah akhir-akhir ini?',
            helperText: '1 = Sangat Ringan, 5 = Sangat Berat / Menekan',
            imageUrl: '/assets/teen_scribble_school.png',
            themeStyle: 'school_notebook',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-10',
            sectionId: 'sec-4',
            type: 'long_text',
            questionText: 'Apa yang biasanya menjadi pemicu utama stres di sekolah (misal: takut gagal, ekspektasi, ujian, atau pertemanan)?',
            helperText: 'Tuliskan secara terbuka tanpa rasa takut dinilai.',
            themeStyle: 'school_notebook',
            required: true,
            orderIndex: 2
          }
        ]
      },
      {
        id: 'sec-5',
        workbookId: 'wb-1',
        title: 'Section 5: Media Sosial & Citra Diri',
        description: 'Mengeksplorasi pengaruh dunia digital terhadap pikiran dan perasaanmu.',
        orderIndex: 5,
        questions: [
          {
            id: 'q-11',
            sectionId: 'sec-5',
            type: 'yes_no',
            questionText: 'Pernahkah kamu merasa minder atau membandingkan hidupmu dengan pencapaian orang lain di media sosial?',
            imageUrl: '/assets/teen_social_media.png',
            themeStyle: 'social_media',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-12',
            sectionId: 'sec-5',
            type: 'long_text',
            questionText: 'Pengingat apa yang ingin kamu katakan pada dirimu saat mulai merasa membandingkan diri di media sosial?',
            helperText: 'Contoh: "Proses setiap orang berbeda, aku fokus pada jalanku sendiri."',
            themeStyle: 'social_media',
            required: false,
            orderIndex: 2
          }
        ]
      },
      {
        id: 'sec-6',
        workbookId: 'wb-1',
        title: 'Section 6: Masa Depan & Harapan',
        description: 'Menatap ke depan dengan harapan dan langkah nyata.',
        orderIndex: 6,
        questions: [
          {
            id: 'q-13',
            sectionId: 'sec-6',
            type: 'short_text',
            questionText: 'Apa satu impian atau tujuan kecil yang ingin kamu capai dalam 3 bulan ke depan?',
            themeStyle: 'mood_pastel',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-14',
            sectionId: 'sec-6',
            type: 'long_text',
            questionText: 'Dukungan seperti apa yang paling kamu harapkan dari orang-orang terdekatmu saat ini?',
            themeStyle: 'mood_pastel',
            required: false,
            orderIndex: 2
          }
        ]
      },
      {
        id: 'sec-7',
        workbookId: 'wb-1',
        title: 'Section 7: Refleksi Akhir',
        description: 'Merangkum wawasan yang kamu peroleh dari sesi refleksi hari ini.',
        orderIndex: 7,
        questions: [
          {
            id: 'q-15',
            sectionId: 'sec-7',
            type: 'long_text',
            questionText: 'Pesan atau kalimat penyemangat apa yang ingin kamu berikan untuk dirimu sendiri hari ini?',
            helperText: 'Akan ditampilkan dalam Kartu Refleksi Pribadimu.',
            themeStyle: 'mood_pastel',
            required: true,
            orderIndex: 1
          }
        ]
      }
    ]
  }
];
