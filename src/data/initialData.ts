import { Workbook } from '../types';

export const INITIAL_WORKBOOKS: Workbook[] = [
  {
    id: 'wb-my-unsaid-journal',
    title: 'My Unsaid Journal',
    subtitle: 'A journal for everything you never got to say.',
    description: 'Jurnal interaktif untuk semua hal yang belum pernah kamu katakan. Ruang aman untuk mendengar dirimu sendiri.',
    coverImageUrl: '/assets/01.png',
    status: 'published',
    version: '4.0',
    createdBy: 'Tim Psikolog Kenali Dirimu & KKN',
    createdAt: new Date().toISOString(),
    sections: [
      {
        id: 'sec-01-aku',
        workbookId: 'wb-my-unsaid-journal',
        title: '01 — AKU',
        icon: '🌱',
        description: 'Mengenal siapa dirimu dan hal-hal kecil yang membuatmu menjadi dirimu.',
        orderIndex: 1,
        questions: [
          {
            id: 'q-01-1',
            sectionId: 'sec-01-aku',
            type: 'short_text',
            questionText: 'Sebutkan tiga kata yang dapat menggambarkan dirimu?',
            helperText: 'Tuliskan 3 kata pertama yang terlintas di pikiranmu.',
            imageUrl: '/assets/01.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-01-2',
            sectionId: 'sec-01-aku',
            type: 'long_text',
            questionText: 'Apa hal yang paling kamu suka dari dirimu?',
            helperText: 'Bisa tentang sifatmu, caramu berpikir, atau keunikanmu.',
            imageUrl: '/assets/02.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-01-3',
            sectionId: 'sec-01-aku',
            type: 'short_text',
            questionText: 'Apa hal kecil yang bisa membuatmu senang?',
            helperText: 'Misalnya: harum hujan, senyum teman, atau lagu favorit.',
            imageUrl: '/assets/03.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-01-4',
            sectionId: 'sec-01-aku',
            type: 'long_text',
            questionText: 'Kapan terakhir kali kamu merasa bangga pada dirimu sendiri?',
            helperText: 'Ceritakan momen kecil ketika kamu berhasil melewati hal sulit.',
            imageUrl: '/assets/04.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-01-5',
            sectionId: 'sec-01-aku',
            type: 'long_text',
            questionText: 'Menurutmu, apa yang membuat dirimu berbeda dari orang lain?',
            helperText: 'Setiap jiwa punya keistimewaan tersendiri.',
            imageUrl: '/assets/05.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-02-perasaanku',
        workbookId: 'wb-my-unsaid-journal',
        title: '02 — TENTANG PERASAANKU',
        icon: '☁️',
        description: 'Mengenali apa yang sedang kamu rasakan dan apa yang membuat hatimu tenang.',
        orderIndex: 2,
        questions: [
          {
            id: 'q-02-6',
            sectionId: 'sec-02-perasaanku',
            type: 'emoji_selector',
            questionText: 'Akhir-akhir ini, apa yang paling sering kamu rasakan?',
            helperText: 'Pilih emosi yang paling menggambarkan perasaanmu.',
            imageUrl: '/assets/06.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1,
            options: [
              { id: 'opt-2a', questionId: 'q-02-6', label: 'Tenang / Damai', value: 'Tenang', icon: '😌', orderIndex: 1 },
              { id: 'opt-2b', questionId: 'q-02-6', label: 'Bahagia', value: 'Bahagia', icon: '😄', orderIndex: 2 },
              { id: 'opt-2c', questionId: 'q-02-6', label: 'Bersyukur', value: 'Bersyukur', icon: '🥰', orderIndex: 3 },
              { id: 'opt-2d', questionId: 'q-02-6', label: 'Cemas / Khawatir', value: 'Cemas', icon: '😟', orderIndex: 4 },
              { id: 'opt-2e', questionId: 'q-02-6', label: 'Sedih', value: 'Sedih', icon: '😔', orderIndex: 5 },
              { id: 'opt-2f', questionId: 'q-02-6', label: 'Marah / Kesal', value: 'Marah', icon: '😡', orderIndex: 6 },
              { id: 'opt-2g', questionId: 'q-02-6', label: 'Biasa saja', value: 'Biasa saja', icon: '😐', orderIndex: 7 },
              { id: 'opt-2h', questionId: 'q-02-6', label: 'Campur aduk', value: 'Campur aduk', icon: '🤍', orderIndex: 8 }
            ]
          },
          {
            id: 'q-02-7',
            sectionId: 'sec-02-perasaanku',
            type: 'long_text',
            questionText: 'Apa yang biasanya kamu lakukan saat sedang sedih?',
            helperText: 'Bagaimana caramu merawat diri ketika hatimu sedang tidak baik-baik saja?',
            imageUrl: '/assets/07.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-02-8',
            sectionId: 'sec-02-perasaanku',
            type: 'long_text',
            questionText: 'Apa yang paling mudah membuatmu bahagia?',
            helperText: 'Hal-hal sederhana yang selalu membawa senyum di wajahmu.',
            imageUrl: '/assets/08.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-02-9',
            sectionId: 'sec-02-perasaanku',
            type: 'long_text',
            questionText: 'Kapan kamu merasa paling tenang?',
            helperText: 'Tempat, suasana, atau momen yang membuat jiwamu damai.',
            imageUrl: '/assets/09.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-02-10',
            sectionId: 'sec-02-perasaanku',
            type: 'long_text',
            questionText: 'Hal apa yang akhir-akhir ini sering mengganggu pikiranmu?',
            helperText: 'Keluarkan beban pikiranmu di sini secara jujur.',
            imageUrl: '/assets/10.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-03-masakecilku',
        workbookId: 'wb-my-unsaid-journal',
        title: '03 — MASA KECILKU',
        icon: '🧸',
        description: 'Mengunjungi kembali cerita dan pengalaman yang pernah membentuk dirimu.',
        orderIndex: 3,
        questions: [
          {
            id: 'q-03-11',
            sectionId: 'sec-03-masakecilku',
            type: 'long_text',
            questionText: 'Kenangan masa kecil apa yang paling kamu ingat?',
            helperText: 'Momen manis, permainan, atau hangatnya masa lalu.',
            imageUrl: '/assets/11.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-03-12',
            sectionId: 'sec-03-masakecilku',
            type: 'long_text',
            questionText: 'Pengalaman menyedihkan apa yang pernah kamu alami saat kecil?',
            helperText: 'Cerita yang mungkin pernah melukai hatimu waktu dulu.',
            imageUrl: '/assets/12.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-03-13',
            sectionId: 'sec-03-masakecilku',
            type: 'long_text',
            questionText: 'Apa yang paling kamu rindukan dari masa kecilmu?',
            helperText: 'Kepolosan, kebebasan, atau tawa tanpa beban.',
            imageUrl: '/assets/13.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-03-14',
            sectionId: 'sec-03-masakecilku',
            type: 'long_text',
            questionText: 'Kalau bisa bertemu dirimu yang masih kecil, apa yang ingin kamu katakan?',
            helperText: 'Peluk dirimu yang dulu dan berikan pesan hangat.',
            imageUrl: '/assets/14.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-03-15',
            sectionId: 'sec-03-masakecilku',
            type: 'long_text',
            questionText: 'Pengalaman apa yang pernah kamu lewati dan membuatmu menjadi lebih kuat saat ini?',
            helperText: 'Badai masa lalu yang membentuk ketangguhanmu hari ini.',
            imageUrl: '/assets/15.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-04-yangkusimpan',
        workbookId: 'wb-my-unsaid-journal',
        title: '04 — YANG KUSIMPAN SENDIRI',
        icon: '🌧️',
        description: 'Memberi ruang untuk cerita yang selama ini mungkin belum sempat kamu ceritakan.',
        orderIndex: 4,
        questions: [
          {
            id: 'q-04-16',
            sectionId: 'sec-04-yangkusimpan',
            type: 'long_text',
            questionText: 'Hal apa yang selama ini ingin kamu ceritakan, tapi belum pernah kamu ceritakan?',
            helperText: 'Rahasia atau cerita tersimpan yang butuh tempat bermuara.',
            imageUrl: '/assets/16.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-04-17',
            sectionId: 'sec-04-yangkusimpan',
            type: 'long_text',
            questionText: 'Bagaimana perasaanmu yang sebenarnya kamu rasakan saat bilang, “Aku nggak apa-apa”?',
            helperText: 'Di balik kata "gapapa", apa yang sebenarnya menjerit di dalam dada?',
            imageUrl: '/assets/17.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-04-18',
            sectionId: 'sec-04-yangkusimpan',
            type: 'long_text',
            questionText: 'Permasalahan apa yang paling sering kamu pikirkan sebelum tidur?',
            helperText: 'Pikiran-pikiran malam yang suka menari di kepalamu.',
            imageUrl: '/assets/18.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-04-19',
            sectionId: 'sec-04-yangkusimpan',
            type: 'long_text',
            questionText: 'Apa yang paling kamu takutkan saat ini?',
            helperText: 'Ketakutan akan masa depan, kehilangan, atau kegagalan.',
            imageUrl: '/assets/19.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-04-20',
            sectionId: 'sec-04-yangkusimpan',
            type: 'long_text',
            questionText: 'Kalau hari ini kamu bisa jujur tentang satu hal, apa yang ingin kamu katakan?',
            helperText: 'Ruang aman untuk melepas semua topeng.',
            imageUrl: '/assets/20.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-05-merasakurang',
        workbookId: 'wb-my-unsaid-journal',
        title: '05 — SAAT AKU MERASA KURANG',
        icon: '🪞',
        description: 'Mengenali hal-hal yang membuatmu meragukan diri sendiri dan belajar melihatnya dengan lebih lembut.',
        orderIndex: 5,
        questions: [
          {
            id: 'q-05-21',
            sectionId: 'sec-05-merasakurang',
            type: 'long_text',
            questionText: 'Sebutkan hal yang paling sering membuatmu merasa kurang?',
            helperText: 'Saat standar orang lain terasa menghimpitmu.',
            imageUrl: '/assets/21.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-05-22',
            sectionId: 'sec-05-merasakurang',
            type: 'long_text',
            questionText: 'Dalam hal apa kamu paling sering membandingkan dirimu dengan orang lain?',
            helperText: 'Prestasi, penampilan, atau kehidupan sosial.',
            imageUrl: '/assets/22.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-05-23',
            sectionId: 'sec-05-merasakurang',
            type: 'long_text',
            questionText: 'Pernah merasa tidak cukup baik? Kapan?',
            helperText: 'Ceritakan momen ketika kamu merasa usaha terbaikmu seperti tidak dihargai.',
            imageUrl: '/assets/23.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-05-24',
            sectionId: 'sec-05-merasakurang',
            type: 'long_text',
            questionText: 'Apa yang paling sering kamu khawatirkan tentang dirimu?',
            helperText: 'Suara-suara ragu di dalam kepala.',
            imageUrl: '/assets/24.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-05-25',
            sectionId: 'sec-05-merasakurang',
            type: 'long_text',
            questionText: 'Sebutkan kekurangan yang masih sulit kamu terima dari dirimu sendiri?',
            helperText: 'Pelan-pelan belajar mengenali dan menerimanya.',
            imageUrl: '/assets/25.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-06-menyayangidiri',
        workbookId: 'wb-my-unsaid-journal',
        title: '06 — BELAJAR MENYAYANGI DIRI',
        icon: '🤍',
        description: 'Belajar melihat dirimu dengan lebih baik, termasuk menerima kekurangan yang kamu punya.',
        orderIndex: 6,
        questions: [
          {
            id: 'q-06-26',
            sectionId: 'sec-06-menyayangidiri',
            type: 'long_text',
            questionText: 'Apa yang ingin kamu maafkan dari dirimu sendiri?',
            helperText: 'Lepaskan penyesalan masa lalu dan maafkan dirimu.',
            imageUrl: '/assets/26.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-06-27',
            sectionId: 'sec-06-menyayangidiri',
            type: 'long_text',
            questionText: 'Kalau sahabatmu sedang mengalami masalah yang sama denganmu, apa yang akan kamu katakan kepadanya?',
            helperText: 'Katakan kata-kata bijak dan ramah itu juga untuk dirimu sendiri.',
            imageUrl: '/assets/27.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-06-28',
            sectionId: 'sec-06-menyayangidiri',
            type: 'long_text',
            questionText: 'Apa yang sebenarnya ingin kamu dengar ketika sedang merasa sedih?',
            helperText: 'Kata-kata penenang yang paling kamu harapkan.',
            imageUrl: '/assets/28.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-06-29',
            sectionId: 'sec-06-menyayangidiri',
            type: 'long_text',
            questionText: 'Kalau bisa mengatakan satu hal baik kepada dirimu sendiri, apa yang ingin kamu katakan?',
            helperText: 'Pujian paling tulus dari dasar hatimu.',
            imageUrl: '/assets/29.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-06-30',
            sectionId: 'sec-06-menyayangidiri',
            type: 'long_text',
            questionText: 'Menurutmu, apa yang membuat seseorang tetap berharga meskipun punya banyak kekurangan?',
            helperText: 'Nilai kebaikan sejati seorang manusia.',
            imageUrl: '/assets/30.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-07-ternyataaku',
        workbookId: 'wb-my-unsaid-journal',
        title: '07 — TERNYATA AKU PUNYA',
        icon: '🌟',
        description: 'Menemukan kemampuan, kekuatan, dan hal-hal baik yang mungkin selama ini tidak kamu sadari.',
        orderIndex: 7,
        questions: [
          {
            id: 'q-07-31',
            sectionId: 'sec-07-ternyataaku',
            type: 'short_text',
            questionText: 'Apa yang kamu rasa paling kamu kuasai?',
            helperText: 'Bisa hobi, bakat, ketelitian, atau sifat pendengar yang baik.',
            imageUrl: '/assets/31.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-07-32',
            sectionId: 'sec-07-ternyataaku',
            type: 'long_text',
            questionText: 'Apa yang sering orang lain puji dari dirimu?',
            helperText: 'Pujian positif yang pernah kamu terima.',
            imageUrl: '/assets/32.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-07-33',
            sectionId: 'sec-07-ternyataaku',
            type: 'long_text',
            questionText: 'Hal apa yang bisa kamu lakukan dengan baik meskipun menurutmu sederhana?',
            helperText: 'Keahlian kecil yang berguna untuk orang di sekitarmu.',
            imageUrl: '/assets/33.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-07-34',
            sectionId: 'sec-07-ternyataaku',
            type: 'long_text',
            questionText: 'Sebutkan tiga hal yang pernah kamu lakukan dan membuatmu berkata, “Ternyata aku bisa”?',
            helperText: 'Pencapaian hebat yang awalnya terasa mustahil.',
            imageUrl: '/assets/34.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-07-35',
            sectionId: 'sec-07-ternyataaku',
            type: 'long_text',
            questionText: 'Kalau diberi kesempatan untuk mengembangkan satu kemampuan, apa yang ingin kamu pilih?',
            helperText: 'Impian dan keterampilan baru yang ingin diasah.',
            imageUrl: '/assets/35.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-08-orangorang',
        workbookId: 'wb-my-unsaid-journal',
        title: '08 — ORANG-ORANG DI HIDUPKU',
        icon: '🫂',
        description: 'Mengingat orang-orang yang pernah hadir, membantu, dan membuatmu merasa berarti.',
        orderIndex: 8,
        questions: [
          {
            id: 'q-08-36',
            sectionId: 'sec-08-orangorang',
            type: 'short_text',
            questionText: 'Siapa orang yang membuatmu merasa nyaman menjadi dirimu sendiri?',
            helperText: 'Orang yang menerima semua kekonyolan dan ketulusanmu.',
            imageUrl: '/assets/36.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-08-37',
            sectionId: 'sec-08-orangorang',
            type: 'short_text',
            questionText: 'Siapa orang yang paling sering ada untukmu saat kamu sedang susah?',
            helperText: 'Sosok pendukung paling setia dalam hidupmu.',
            imageUrl: '/assets/37.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-08-38',
            sectionId: 'sec-08-orangorang',
            type: 'long_text',
            questionText: 'Apa hal kecil dari seseorang yang pernah membuatmu merasa sangat dihargai?',
            helperText: 'Tindakan sederhana yang menghangatkan hatimu.',
            imageUrl: '/assets/38.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-08-39',
            sectionId: 'sec-08-orangorang',
            type: 'long_text',
            questionText: 'Apa arti keluarga bagimu?',
            helperText: 'Rumah, tempat pulang, atau orang-orang tersayang.',
            imageUrl: '/assets/39.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-08-40',
            sectionId: 'sec-08-orangorang',
            type: 'long_text',
            questionText: 'Menurutmu, seperti apa teman yang benar-benar baik?',
            helperText: 'Kriteria sahabat sejati dalam hidupmu.',
            imageUrl: '/assets/40.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-09-bahagiamimpi',
        workbookId: 'wb-my-unsaid-journal',
        title: '09 — BAHAGIA & MIMPIKU',
        icon: '🌈',
        description: 'Mengenali arti bahagia dan membayangkan kehidupan yang ingin kamu jalani.',
        orderIndex: 9,
        questions: [
          {
            id: 'q-09-41',
            sectionId: 'sec-09-bahagiamimpi',
            type: 'long_text',
            questionText: 'Apa arti bahagia menurutmu?',
            helperText: 'Definisi kedamaian dan kebahagiaan versi hatimu.',
            imageUrl: '/assets/41.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-09-42',
            sectionId: 'sec-09-bahagiamimpi',
            type: 'long_text',
            questionText: 'Kapan terakhir kali kamu merasa benar-benar bahagia?',
            helperText: 'Ceritakan momen ketika hatimu dipenuhi rasa syukur gembira.',
            imageUrl: '/assets/42.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-09-43',
            sectionId: 'sec-09-bahagiamimpi',
            type: 'long_text',
            questionText: 'Kehidupan seperti apa yang sebenarnya kamu inginkan?',
            helperText: 'Gambaran masa depan ideal yang kamu cita-citakan.',
            imageUrl: '/assets/43.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-09-44',
            sectionId: 'sec-09-bahagiamimpi',
            type: 'long_text',
            questionText: 'Kalau tidak ada yang bisa menghakimi atau menertawakanmu, apa yang ingin kamu lakukan?',
            helperText: 'Ekspresikan kebebasan impian terbesarmu.',
            imageUrl: '/assets/44.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-09-45',
            sectionId: 'sec-09-bahagiamimpi',
            type: 'long_text',
            questionText: 'Apa satu mimpi yang masih ingin kamu kejar?',
            helperText: 'Cita-cita indah yang membakar semangatmu.',
            imageUrl: '/assets/45.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      },
      {
        id: 'sec-10-akudatang',
        workbookId: 'wb-my-unsaid-journal',
        title: '10 — AKU YANG AKAN DATANG',
        icon: '🌻',
        description: 'Melihat ke depan dan mengenal dirimu yang ingin kamu tumbuhkan.',
        orderIndex: 10,
        questions: [
          {
            id: 'q-10-46',
            sectionId: 'sec-10-akudatang',
            type: 'long_text',
            questionText: 'Apa yang ingin kamu ubah mulai dari sekarang?',
            helperText: 'Langkah perubahan positif kecil untuk hidupmu.',
            imageUrl: '/assets/46.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-10-47',
            sectionId: 'sec-10-akudatang',
            type: 'long_text',
            questionText: 'Apa yang ingin kamu pertahankan dari dirimu sampai nanti?',
            helperText: 'Kebaikan dan karakter positif yang akan selalu kamu jaga.',
            imageUrl: '/assets/47.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          },
          {
            id: 'q-10-48',
            sectionId: 'sec-10-akudatang',
            type: 'long_text',
            questionText: 'Kalau bisa bertemu dirimu di masa depan, apa yang ingin kamu tanyakan?',
            helperText: 'Pertanyaan penasaran untuk dirimu 10 tahun dari sekarang.',
            imageUrl: '/assets/48.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 3
          },
          {
            id: 'q-10-49',
            sectionId: 'sec-10-akudatang',
            type: 'long_text',
            questionText: 'Kalau hidupmu punya satu kalimat untuk menggambarkan perjalananmu sampai hari ini, apa kalimatnya?',
            helperText: 'Kutipan hidup paling bermakna untukmu.',
            imageUrl: '/assets/49.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 4
          },
          {
            id: 'q-10-50',
            sectionId: 'sec-10-akudatang',
            type: 'long_text',
            questionText: 'Apa yang selama ini ingin kamu katakan, tetapi belum pernah kamu katakan kepada siapa pun?',
            helperText: 'Penutup jujur dari lubuk hatimu di jurnal ini.',
            imageUrl: '/assets/50.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 5
          }
        ]
      }
    ]
  },
  {
    id: 'wb-2-kenali-diriku',
    title: 'Kenali Diriku & Perasaanku',
    subtitle: 'Modul refleksi karakter diri & ekspresi emosi.',
    description: 'Workbook tambahan untuk membantu remaja mengenali emosi harian, mengatasi cemas, dan mengekspresikan harapan.',
    coverImageUrl: '/assets/02.png',
    status: 'published',
    version: '1.0',
    createdBy: 'Tim Psikolog Kenali Dirimu',
    createdAt: new Date().toISOString(),
    sections: [
      {
        id: 'sec-2-1',
        workbookId: 'wb-2-kenali-diriku',
        title: '01 — Mengenal Karakterku',
        icon: '🌱',
        description: 'Mengenali kebiasaan dan cara berpikir positif.',
        orderIndex: 1,
        questions: [
          {
            id: 'q-2-1',
            sectionId: 'sec-2-1',
            type: 'short_text',
            questionText: 'Bagaimana kamu menggambarkan dirimu dalam tiga kata?',
            helperText: 'Contoh: Ramah, Pemikir, Pembelajar.',
            imageUrl: '/assets/01.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1
          },
          {
            id: 'q-2-2',
            sectionId: 'sec-2-1',
            type: 'long_text',
            questionText: 'Apa hal yang paling kamu sukai dari caramu menyelesaikan masalah?',
            imageUrl: '/assets/02.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          }
        ]
      },
      {
        id: 'sec-2-2',
        workbookId: 'wb-2-kenali-diriku',
        title: '02 — Mengatasi Kecemasan Sekolah',
        icon: '☁️',
        description: 'Membantu hatimu merasa lebih tenang saat belajar.',
        orderIndex: 2,
        questions: [
          {
            id: 'q-2-3',
            sectionId: 'sec-2-2',
            type: 'emoji_selector',
            questionText: 'Bagaimana perasaanmu saat memikirkan tugas atau ujian sekolah?',
            imageUrl: '/assets/10.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 1,
            options: [
              { id: 'opt-k1', questionId: 'q-2-3', label: 'Tenang', value: 'Tenang', icon: '😌', orderIndex: 1 },
              { id: 'opt-k2', questionId: 'q-2-3', label: 'Cemas', value: 'Cemas', icon: '😟', orderIndex: 2 },
              { id: 'opt-k3', questionId: 'q-2-3', label: 'Lelah', value: 'Lelah', icon: '😫', orderIndex: 3 },
              { id: 'opt-k4', questionId: 'q-2-3', label: 'Semangat', value: 'Semangat', icon: '🔥', orderIndex: 4 }
            ]
          },
          {
            id: 'q-2-4',
            sectionId: 'sec-2-2',
            type: 'long_text',
            questionText: 'Apa hal paling sederhana yang bisa membantumu lebih rileks?',
            imageUrl: '/assets/09.png',
            themeStyle: 'pencil_sketch',
            required: true,
            orderIndex: 2
          }
        ]
      }
    ]
  }
];
