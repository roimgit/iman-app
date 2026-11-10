import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Clock,
  BookOpen,
  Compass,
  Bell,
  BellRing,
  BellOff,
  Download,
  CheckCircle2,
  Trash2,
  MapPin,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  ChevronLeft,
  Smartphone,
  Wifi,
  WifiOff,
  ShieldAlert,
  Sparkles,
  Copy,
  Check,
  Navigation,
  Settings,
  Calendar,
  Info,
  FileCode,
  ExternalLink
} from 'lucide-react';

// ==========================================
// DATA DEFAULT SURAT OFFLINE (Bawaan Aplikasi)
// ==========================================
const DEFAULT_OFFLINE_SURAHS = {
  1: {
    nomor: 1,
    nama: "الفاتحة",
    namaLatin: "Al-Fatihah",
    jumlahAyat: 7,
    tempatTurun: "Mekah",
    arti: "Pembukaan",
    audioFull: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3",
    ayat: [
      { nomorAyat: 1, teksArab: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ", teksLatin: "Bismillāhir-raḥmānir-raḥīm(i).", teksIndonesia: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." },
      { nomorAyat: 2, teksArab: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ", teksLatin: "Al-ḥamdu lillāhi rabbil-'ālamīn(a).", teksIndonesia: "Segala puji bagi Allah, Tuhan seluruh alam," },
      { nomorAyat: 3, teksArab: "الرَّحْمٰنِ الرَّحِيْمِۙ", teksLatin: "Ar-raḥmānir-raḥīm(i).", teksIndonesia: "Yang Maha Pengasih, Maha Penyayang," },
      { nomorAyat: 4, teksArab: "مٰلِكِ يَوْمِ الدِّيْنِۗ", teksLatin: "Māliki yaumid-dīn(i).", teksIndonesia: "Pemilik hari pembalasan." },
      { nomorAyat: 5, teksArab: "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ", teksLatin: "Iyyāka na'budu wa iyyāka nasta'īn(u).", teksIndonesia: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan." },
      { nomorAyat: 6, teksArab: "اِهدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ", teksLatin: "Ihdinaṣ-ṣirāṭal-mustaqīm(a).", teksIndonesia: "Tunjukilah kami jalan yang lurus," },
      { nomorAyat: 7, teksArab: "صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ࣖ", teksLatin: "Ṣirāṭal-lażīna an'amta 'alaihim, gairil-magḍūbi 'alaihim wa laḍ-ḍāllīn(a).", teksIndonesia: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat." }
    ]
  },
  112: {
    nomor: 112,
    nama: "الإخلاص",
    namaLatin: "Al-Ikhlas",
    jumlahAyat: 4,
    tempatTurun: "Mekah",
    arti: "Ikhlas",
    audioFull: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/112.mp3",
    ayat: [
      { nomorAyat: 1, teksArab: "قُلْ هُوَ اللّٰهُ اَحَدٌۚ", teksLatin: "Qul huwallāhu aḥad(un).", teksIndonesia: "Katakanlah (Muhammad), 'Dialah Allah, Yang Maha Esa.'" },
      { nomorAyat: 2, teksArab: "اَللّٰهُ الصَّمَدُۚ", teksLatin: "Allāhuṣ-ṣamad(u).", teksIndonesia: "Allah tempat meminta segala sesuatu." },
      { nomorAyat: 3, teksArab: "لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ", teksLatin: "Lam yalid wa lam yūlad.", teksIndonesia: "(Allah) tidak beranak dan tidak pula diperanakkan." },
      { nomorAyat: 4, teksArab: "وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ࣖ", teksLatin: "Wa lam yakul lahū kufuwan aḥad(un).", teksIndonesia: "Dan tidak ada sesuatu yang setara dengan Dia." }
    ]
  },
  113: {
    nomor: 113,
    nama: "الفلق",
    namaLatin: "Al-Falaq",
    jumlahAyat: 5,
    tempatTurun: "Mekah",
    arti: "Subuh",
    audioFull: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/113.mp3",
    ayat: [
      { nomorAyat: 1, teksArab: "قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ", teksLatin: "Qul a'ūżu birabbil-falaq(i).", teksIndonesia: "Katakanlah, 'Aku berlindung kepada Tuhan yang menguasai subuh (fajar)," },
      { nomorAyat: 2, teksArab: "مِنْ شَرِّ مَا خَلَقَۙ", teksLatin: "Min syarri mā khalaq(a).", teksIndonesia: "dari kejahatan (makhluk yang) Dia ciptakan," },
      { nomorAyat: 3, teksArab: "وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ", teksLatin: "Wa min syarri gāsiqin iżā waqab(a).", teksIndonesia: "dan dari kejahatan malam apabila telah gelap gulita," },
      { nomorAyat: 4, teksArab: "وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ", teksLatin: "Wa min syarrin-naffāṡāti fil-'uqad(i).", teksIndonesia: "dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya)," },
      { nomorAyat: 5, teksArab: "وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ ࣖ", teksLatin: "Wa min syarri ḥāsidin iżā ḥasad(a).", teksIndonesia: "dan dari kejahatan orang yang dengki apabila dia dengki.'" }
    ]
  },
  114: {
    nomor: 114,
    nama: "الناس",
    namaLatin: "An-Nas",
    jumlahAyat: 6,
    tempatTurun: "Mekah",
    arti: "Manusia",
    audioFull: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/114.mp3",
    ayat: [
      { nomorAyat: 1, teksArab: "قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ", teksLatin: "Qul a'ūżu birabbin-nās(i).", teksIndonesia: "Katakanlah, 'Aku berlindung kepada Tuhannya manusia," },
      { nomorAyat: 2, teksArab: "مَلِكِ النَّاسِۙ", teksLatin: "Malikin-nās(i).", teksIndonesia: "Raja manusia," },
      { nomorAyat: 3, teksArab: "اِلٰهِ النَّاسِۙ", teksLatin: "Ilāhin-nās(i).", teksIndonesia: "sembahan manusia," },
      { nomorAyat: 4, teksArab: "مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ", teksLatin: "Min syarril-waswāsil-khannās(i).", teksIndonesia: "dari kejahatan (bisikan) setan yang bersembunyi," },
      { nomorAyat: 5, teksArab: "الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ", teksLatin: "Allażī yuwaswisu fī ṣudūrin-nās(i).", teksIndonesia: "yang membisikkan (kejahatan) ke dalam dada manusia," },
      { nomorAyat: 6, teksArab: "مِنَ الْجِنَّةِ وَالنَّاسِ ࣖ", teksLatin: "Minal-jinnati wan-nās(i).", teksIndonesia: "dari (golongan) jin dan manusia.'" }
    ]
  }
};

const INDONESIAN_CITIES = [
  { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { name: "Bandung", lat: -6.9175, lng: 107.6191 },
  { name: "Surabaya", lat: -7.2575, lng: 112.7521 },
  { name: "Yogyakarta", lat: -7.7956, lng: 110.3695 },
  { name: "Semarang", lat: -6.9667, lng: 110.4167 },
  { name: "Medan", lat: 3.5952, lng: 98.6722 },
  { name: "Makassar", lat: -5.1477, lng: 119.4327 },
  { name: "Palembang", lat: -2.9761, lng: 104.7754 },
  { name: "Denpasar", lat: -8.6705, lng: 115.2126 },
  { name: "Balikpapan", lat: -1.2379, lng: 116.8529 }
];

// Fallback jadwal sholat Kemenag RI jika belum pernah online sama sekali
const FALLBACK_TIMINGS = {
  Imsak: "04:25",
  Fajr: "04:35",
  Sunrise: "05:52",
  Dhuhr: "11:58",
  Asr: "15:18",
  Maghrib: "18:02",
  Isha: "19:12"
};

export default function App() {
  // Navigation & Global State
  const [activeTab, setActiveTab] = useState("jadwal");
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Location & Prayer Schedule State (Option B: API + Offline Cache)
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = localStorage.getItem("mc_city");
    return saved ? JSON.parse(saved) : INDONESIAN_CITIES[0];
  });
  const [monthlySchedule, setMonthlySchedule] = useState(() => {
    const saved = localStorage.getItem("mc_monthly_schedule");
    return saved ? JSON.parse(saved) : {};
  });
  const [lastSyncDate, setLastSyncDate] = useState(() => {
    return localStorage.getItem("mc_last_sync") || "Belum disinkronkan (Mode Fallback)";
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Forced Adhan Alarm Settings
  const [alarmSettings, setAlarmSettings] = useState(() => {
    const saved = localStorage.getItem("mc_alarm_settings");
    return saved
      ? JSON.parse(saved)
      : {
          Fajr: { forced: true, label: "Subuh" },
          Dhuhr: { forced: true, label: "Dzuhur" },
          Asr: { forced: true, label: "Ashar" },
          Maghrib: { forced: true, label: "Maghrib" },
          Isha: { forced: true, label: "Isya" }
        };
  });

  // Active Forced Adhan Overlay State
  const [activeAdhanAlarm, setActiveAdhanAlarm] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const adhanAudioRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const lastTriggeredMinuteRef = useRef("");

  // Quran State (Option 2: Download per Surah for Offline)
  const [surahList, setSurahList] = useState(() => {
    const saved = localStorage.getItem("mc_surah_list");
    return saved ? JSON.parse(saved) : [];
  });
  const [offlineSurahs, setOfflineSurahs] = useState(() => {
    const saved = localStorage.getItem("mc_offline_surahs");
    return saved ? JSON.parse(saved) : DEFAULT_OFFLINE_SURAHS;
  });
  const [downloadingSurahId, setDownloadingSurahId] = useState(null);
  const [quranFilter, setQuranFilter] = useState("all"); // 'all' | 'offline'
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSurah, setActiveSurah] = useState(null);
  const [playingSurahAudio, setPlayingSurahAudio] = useState(false);
  const quranAudioRef = useRef(null);

  // Qibla Compass State
  const [compassHeading, setCompassHeading] = useState(0);
  const [isSensorActive, setIsSensorActive] = useState(false);

  // APK Builder Tab State
  const [copiedCode, setCopiedCode] = useState("");

  // Show helper toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Monitor Online/Offline Status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast("Terhubung ke internet (Mode Online)");
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast("Mode Offline Aktif - Menggunakan data tersimpan");
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Live Clock & Adhan Time Checker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const currentHM = `${hours}:${minutes}`;

      if (lastTriggeredMinuteRef.current !== currentHM) {
        const todayTimings = getTodayTimings();
        Object.keys(alarmSettings).forEach((key) => {
          const prayerTime = (todayTimings[key] || "").slice(0, 5);
          if (prayerTime === currentHM && alarmSettings[key]?.forced) {
            lastTriggeredMinuteRef.current = currentHM;
            triggerForcedAdhan(alarmSettings[key].label, prayerTime, key === "Fajr");
          }
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [alarmSettings, monthlySchedule, selectedCity]);

  // Save Alarm Settings
  useEffect(() => {
    localStorage.setItem("mc_alarm_settings", JSON.stringify(alarmSettings));
  }, [alarmSettings]);

  // Save Offline Surahs
  useEffect(() => {
    try {
      localStorage.setItem("mc_offline_surahs", JSON.stringify(offlineSurahs));
    } catch (e) {
      showToast("Penyimpanan lokal penuh, hapus beberapa surat offline.");
    }
  }, [offlineSurahs]);

  // Fetch Monthly Prayer Schedule (Method 20: Kemenag RI)
  const syncMonthlyPrayerTimes = async (city = selectedCity) => {
    setIsSyncing(true);
    try {
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${city.lat}&longitude=${city.lng}&method=20`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.code === 200 && Array.isArray(data.data)) {
        const scheduleMap = {};
        data.data.forEach((dayItem) => {
          // Format DD-MM-YYYY
          const dateKey = dayItem.date.gregorian.date;
          const cleanTimings = {};
          Object.entries(dayItem.timings).forEach(([k, v]) => {
            cleanTimings[k] = v.split(" ")[0];
          });
          scheduleMap[dateKey] = cleanTimings;
        });

        const cityKey = `${city.name}_${month}_${year}`;
        const updatedCache = { ...monthlySchedule, [cityKey]: scheduleMap };
        setMonthlySchedule(updatedCache);
        localStorage.setItem("mc_monthly_schedule", JSON.stringify(updatedCache));

        const syncTimeStr = `${new Date().toLocaleDateString("id-ID")} ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
        setLastSyncDate(`${city.name} • ${syncTimeStr}`);
        localStorage.setItem("mc_last_sync", `${city.name} • ${syncTimeStr}`);
        showToast(`Jadwal 1 bulan (${city.name}) berhasil disimpan untuk Offline!`);
      }
    } catch (err) {
      showToast("Gagal sinkronisasi API, menggunakan jadwal cache offline.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-sync on first load if online
  useEffect(() => {
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const cityKey = `${selectedCity.name}_${month}_${year}`;
    if (!monthlySchedule[cityKey] && navigator.onLine) {
      syncMonthlyPrayerTimes(selectedCity);
    }
  }, [selectedCity]);

  // Fetch 114 Surah Metadata List
  useEffect(() => {
    const fetchSurahList = async () => {
      if (surahList.length > 0) return;
      try {
        const res = await fetch("https://equran.id/api/v2/surat");
        const json = await res.json();
        if (json.data) {
          setSurahList(json.data);
          localStorage.setItem("mc_surah_list", JSON.stringify(json.data));
        }
      } catch (e) {
        // Fallback list from offline surahs if offline on first launch
        const fallbackList = Object.values(offlineSurahs).map((s) => ({
          nomor: s.nomor,
          nama: s.nama,
          namaLatin: s.namaLatin,
          jumlahAyat: s.jumlahAyat,
          tempatTurun: s.tempatTurun,
          arti: s.arti
        }));
        setSurahList(fallbackList);
      }
    };
    fetchSurahList();
  }, []);

  // Get Today's Prayer Timings from Offline Cache or Fallback
  const getTodayTimings = () => {
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = String(currentTime.getDate()).padStart(2, "0");
    const monthStr = String(month).padStart(2, "0");
    const dateKey = `${day}-${monthStr}-${year}`;
    const cityKey = `${selectedCity.name}_${month}_${year}`;

    if (monthlySchedule[cityKey] && monthlySchedule[cityKey][dateKey]) {
      return monthlySchedule[cityKey][dateKey];
    }
    return FALLBACK_TIMINGS;
  };

  const todayTimings = getTodayTimings();

  // Calculate Next Prayer & Countdown
  const nextPrayerInfo = useMemo(() => {
    const prayerOrder = [
      { key: "Fajr", label: "Subuh", time: todayTimings.Fajr },
      { key: "Dhuhr", label: "Dzuhur", time: todayTimings.Dhuhr },
      { key: "Asr", label: "Ashar", time: todayTimings.Asr },
      { key: "Maghrib", label: "Maghrib", time: todayTimings.Maghrib },
      { key: "Isha", label: "Isya", time: todayTimings.Isha }
    ];

    const nowSec =
      currentTime.getHours() * 3600 +
      currentTime.getMinutes() * 60 +
      currentTime.getSeconds();

    for (let p of prayerOrder) {
      if (!p.time) continue;
      const [h, m] = p.time.split(":").map(Number);
      const pSec = h * 3600 + m * 60;
      if (pSec > nowSec) {
        const diff = pSec - nowSec;
        const hrs = Math.floor(diff / 3600);
        const mins = Math.floor((diff % 3600) / 60);
        const secs = diff % 60;
        return {
          ...p,
          countdown: `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
        };
      }
    }

    // If past Isha, next is tomorrow's Subuh
    const [fh, fm] = (todayTimings.Fajr || "04:35").split(":").map(Number);
    const fajrSec = fh * 3600 + fm * 60 + 86400;
    const diff = fajrSec - nowSec;
    const hrs = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);
    const secs = diff % 60;
    return {
      key: "Fajr",
      label: "Subuh (Besok)",
      time: todayTimings.Fajr,
      countdown: `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    };
  }, [currentTime, todayTimings]);

  // ==========================================
  // FORCED ADHAN ALARM SOUND & OVERLAY ENGINE
  // ==========================================
  const playOfflineBackupBell = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const playTone = () => {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(528, ctx.currentTime); // Harmonious chime
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.8);
      };
      playTone();
      synthIntervalRef.current = setInterval(playTone, 2400);
    } catch (e) {
      // Ignore audio context restriction if any
    }
  };

  const triggerForcedAdhan = (prayerName, prayerTime, isSubuh = false) => {
    setActiveAdhanAlarm({
      prayerName,
      prayerTime,
      isSubuh,
      city: selectedCity.name
    });
    setIsAudioPlaying(true);

    // Vibrate device if supported on Android
    if (navigator.vibrate) {
      navigator.vibrate([800, 400, 800, 400, 1000]);
    }

    if (adhanAudioRef.current) {
      adhanAudioRef.current.currentTime = 0;
      adhanAudioRef.current
        .play()
        .catch(() => {
          // Fallback to Web Audio API synthesized alarm if offline or stream blocked
          playOfflineBackupBell();
        });
    } else {
      playOfflineBackupBell();
    }
  };

  const stopForcedAdhan = () => {
    setActiveAdhanAlarm(null);
    setIsAudioPlaying(false);
    if (adhanAudioRef.current) {
      adhanAudioRef.current.pause();
      adhanAudioRef.current.currentTime = 0;
    }
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (navigator.vibrate) {
      navigator.vibrate(0);
    }
  };

  // ==========================================
  // AL-QURAN OFFLINE DOWNLOAD PER SURAH
  // ==========================================
  const downloadSurahForOffline = async (nomorSurat, e) => {
    if (e) e.stopPropagation();
    if (!navigator.onLine) {
      showToast("Tidak ada koneksi internet untuk mengunduh surat.");
      return;
    }
    setDownloadingSurahId(nomorSurat);
    try {
      const res = await fetch(`https://equran.id/api/v2/surat/${nomorSurat}`);
      const json = await res.json();
      if (json.data) {
        const s = json.data;
        const formatted = {
          nomor: s.nomor,
          nama: s.nama,
          namaLatin: s.namaLatin,
          jumlahAyat: s.jumlahAyat,
          tempatTurun: s.tempatTurun,
          arti: s.arti,
          audioFull:
            s.audioFull?.["05"] ||
            `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${s.nomor}.mp3`,
          ayat: s.ayat.map((a) => ({
            nomorAyat: a.nomorAyat,
            teksArab: a.teksArab,
            teksLatin: a.teksLatin,
            teksIndonesia: a.teksIndonesia
          }))
        };
        setOfflineSurahs((prev) => ({ ...prev, [nomorSurat]: formatted }));
        showToast(`Surat ${s.namaLatin} berhasil diunduh ke memori Offline!`);
      }
    } catch (err) {
      showToast("Gagal mengunduh surat. Periksa koneksi internet Anda.");
    } finally {
      setDownloadingSurahId(null);
    }
  };

  const removeSurahFromOffline = (nomorSurat, namaLatin, e) => {
    if (e) e.stopPropagation();
    setOfflineSurahs((prev) => {
      const updated = { ...prev };
      delete updated[nomorSurat];
      return updated;
    });
    showToast(`Surat ${namaLatin} dihapus dari penyimpanan offline.`);
  };

  const openSurahReader = async (surahMeta) => {
    if (offlineSurahs[surahMeta.nomor]) {
      setActiveSurah(offlineSurahs[surahMeta.nomor]);
      return;
    }
    if (!navigator.onLine) {
      showToast("Surat ini belum diunduh. Hubungkan internet untuk mengunduh.");
      return;
    }
    await downloadSurahForOffline(surahMeta.nomor);
  };

  // Update activeSurah automatically when download completes
  useEffect(() => {
    if (downloadingSurahId && offlineSurahs[downloadingSurahId]) {
      setActiveSurah(offlineSurahs[downloadingSurahId]);
    }
  }, [offlineSurahs]);

  // ==========================================
  // QIBLA DIRECTION CALCULATION
  // ==========================================
  const qiblaDegree = useMemo(() => {
    const kaabaLat = (21.422487 * Math.PI) / 180;
    const kaabaLng = (39.826206 * Math.PI) / 180;
    const userLat = (selectedCity.lat * Math.PI) / 180;
    const userLng = (selectedCity.lng * Math.PI) / 180;

    const dLng = kaabaLng - userLng;
    const y = Math.sin(dLng);
    const x =
      Math.cos(userLat) * Math.tan(kaabaLat) -
      Math.sin(userLat) * Math.cos(dLng);
    let brng = (Math.atan2(y, x) * 180) / Math.PI;
    return Math.round((brng + 360) % 360);
  }, [selectedCity]);

  const enableCompassSensor = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
          setIsSensorActive(true);
          showToast("Sensor Kompas HP Aktif");
        }
      } catch (err) {
        showToast("Izin sensor ditolak, gunakan slider manual.");
      }
    } else if ("ondeviceorientationabsolute" in window || "ondeviceorientation" in window) {
      window.addEventListener("deviceorientation", handleOrientation);
      setIsSensorActive(true);
      showToast("Sensor Kompas HP Aktif");
    } else {
      showToast("Gunakan penggeser kompas manual di bawah.");
    }
  };

  const handleOrientation = (e) => {
    const alpha = e.webkitCompassHeading || (e.alpha ? 360 - e.alpha : 0);
    setCompassHeading(Math.round(alpha));
  };

  // Detect GPS Location
  const detectGPSLocation = () => {
    if (!navigator.geolocation) {
      showToast("GPS tidak didukung di perangkat ini.");
      return;
    }
    showToast("Mendeteksi titik koordinat GPS...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const customCity = {
          name: "Lokasi GPS Saya",
          lat: Number(pos.coords.latitude.toFixed(4)),
          lng: Number(pos.coords.longitude.toFixed(4))
        };
        setSelectedCity(customCity);
        localStorage.setItem("mc_city", JSON.stringify(customCity));
        syncMonthlyPrayerTimes(customCity);
      },
      () => {
        showToast("Gagal akses GPS. Pilih kota secara manual.");
      }
    );
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    showToast(`${label} berhasil disalin!`);
    setTimeout(() => setCopiedCode(""), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center select-none font-sans">
      {/* Hidden Audio Element for Adhan */}
      <audio
        ref={adhanAudioRef}
        src="https://www.islamcan.com/audio/adhan/azan1.mp3"
        preload="auto"
        onEnded={() => setIsAudioPlaying(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 z-50 max-w-sm w-[92%] bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs font-medium leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================
          FULL-SCREEN FORCED ADHAN ALARM OVERLAY (NOTIFIKASI PAKSA)
         ========================================================= */}
      {activeAdhanAlarm && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-950 text-white flex flex-col justify-between p-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
              ALARM ADZAN PAKSA AKTIF
            </span>
            <span className="text-xs text-emerald-200 font-mono">
              {activeAdhanAlarm.city}
            </span>
          </div>

          <div className="flex flex-col items-center text-center my-auto">
            {/* Pulsing Mosque & Bell Ring */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-36 h-36 rounded-full bg-emerald-500/20 animate-ping absolute" />
              <div className="w-28 h-28 rounded-full bg-emerald-400/30 animate-pulse absolute" />
              <div className="w-24 h-24 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-2xl relative z-10">
                <BellRing className="w-12 h-12 animate-bounce" />
              </div>
            </div>

            <p className="text-emerald-200 uppercase tracking-widest text-xs font-semibold mb-1">
              Saatnya Menunaikan Ibadah Sholat
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Sholat {activeAdhanAlarm.prayerName}
            </h1>
            <p className="text-5xl font-mono font-bold text-amber-300 mb-6">
              {activeAdhanAlarm.prayerTime} WIB
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-xs border border-white/15 mb-4">
              <p className="text-xl font-serif mb-2 leading-relaxed">
                حَيَّ عَلَى الصَّلَاةِ • حَيَّ عَلَى الْفَلَاحِ
              </p>
              <p className="text-xs text-emerald-100 italic">
                {activeAdhanAlarm.isSubuh
                  ? '"Ash-shalatu khairum minan-nauum" (Sholat itu lebih baik daripada tidur)'
                  : '"Mari menunaikan sholat, mari meraih kemenangan"'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            <button
              onClick={stopForcedAdhan}
              className="w-full py-4 bg-white text-emerald-900 font-bold rounded-2xl shadow-lg hover:bg-emerald-50 active:scale-95 transition flex items-center justify-center gap-2 text-base"
            >
              <VolumeX className="w-5 h-5 text-red-600" />
              Matikan Suara Adzan
            </button>
            <button
              onClick={() => {
                stopForcedAdhan();
                showToast("Pengingat ditunda 5 menit.");
              }}
              className="w-full py-3 bg-emerald-700/60 text-emerald-100 font-medium rounded-2xl border border-emerald-500/30 text-sm"
            >
              Tunda 5 Menit (Snooze)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MAIN MOBILE APP CONTAINER
         ========================================================= */}
      <div className="w-full max-w-md min-h-screen bg-slate-50 flex flex-col justify-between pb-24 shadow-xl border-x border-slate-100">
        {/* Top App Bar */}
        <header className="bg-emerald-600 text-white px-5 pt-5 pb-6 rounded-b-3xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
                <h1 className="text-lg font-bold tracking-tight">
                  Muslim Companion
                </h1>
              </div>
              <p className="text-xs text-emerald-100">
                Hybrid Online & Offline • Standar Kemenag RI
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  isOnline
                    ? "bg-emerald-700/80 text-emerald-100"
                    : "bg-amber-500 text-slate-950"
                }`}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3" /> Online
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3" /> Offline
                  </>
                )}
              </span>
              <button
                onClick={() =>
                  triggerForcedAdhan(
                    nextPrayerInfo.label.replace(" (Besok)", ""),
                    nextPrayerInfo.time,
                    nextPrayerInfo.key === "Fajr"
                  )
                }
                className="bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition"
                title="Tes Alarm Adzan Paksa"
              >
                <BellRing className="w-3 h-3 text-amber-300" /> Tes Adzan
              </button>
            </div>
          </div>

          {/* Next Prayer Countdown Banner */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-100 font-semibold block">
                Menuju Waktu {nextPrayerInfo.label}
              </span>
              <div className="text-3xl font-extrabold tracking-tight mt-0.5 font-mono">
                {nextPrayerInfo.countdown}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-100 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-200" />
                <span>{selectedCity.name}</span>
                <span>•</span>
                <span>
                  {currentTime.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}{" "}
                  WIB
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-100 block">Jadwal</span>
              <span className="text-2xl font-bold text-amber-300">
                {nextPrayerInfo.time}
              </span>
              <span className="text-[11px] text-emerald-100 block mt-1">
                {currentTime.toLocaleDateString("id-ID", {
                  weekday: "short",
                  day: "numeric",
                  month: "short"
                })}
              </span>
            </div>
          </div>
        </header>

        {/* =========================================================
            TAB 1: JADWAL SHOLAT & ALARM PAKSA (OPSI B: API + CACHE)
           ========================================================= */}
        {activeTab === "jadwal" && (
          <main className="px-4 pt-4 space-y-4 flex-1">
            {/* Location & Offline Sync Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Pilih Kota / Titik GPS
                </label>
                <button
                  onClick={detectGPSLocation}
                  className="text-xs text-emerald-600 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Navigation className="w-3 h-3" /> Deteksi GPS
                </button>
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedCity.name}
                  onChange={(e) => {
                    const found = INDONESIAN_CITIES.find(
                      (c) => c.name === e.target.value
                    );
                    if (found) {
                      setSelectedCity(found);
                      localStorage.setItem("mc_city", JSON.stringify(found));
                    }
                  }}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
                >
                  {INDONESIAN_CITIES.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                  {!INDONESIAN_CITIES.some(
                    (c) => c.name === selectedCity.name
                  ) && (
                    <option value={selectedCity.name}>
                      {selectedCity.name}
                    </option>
                  )}
                </select>

                <button
                  onClick={() => syncMonthlyPrayerTimes(selectedCity)}
                  disabled={isSyncing}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition shrink-0"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
                  />
                  Simpan 1 Bulan
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Cache Offline: {lastSyncDate}
                </span>
              </div>
            </div>

            {/* Imsak & Terbit Mini Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    Waktu Imsak
                  </span>
                  <span className="text-lg font-bold text-emerald-950">
                    {todayTimings.Imsak || "04:25"}
                  </span>
                </div>
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-amber-800 font-semibold block">
                    Terbit Fajar (Syuruq)
                  </span>
                  <span className="text-lg font-bold text-amber-950">
                    {todayTimings.Sunrise || "05:52"}
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            {/* 5 Daily Prayers with Forced Adhan Toggle */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-bold text-slate-800">
                  Jadwal Sholat & Pengaturan Adzan Paksa
                </h2>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  Ketuk Ikon Lonceng
                </span>
              </div>

              {Object.entries(alarmSettings).map(([key, cfg]) => {
                const timeStr = todayTimings[key] || "00:00";
                const isNext = nextPrayerInfo.key === key;
                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                      isNext
                        ? "bg-emerald-50/90 border-emerald-500 shadow-sm"
                        : "bg-slate-50/70 border-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isNext
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-emerald-700 border border-slate-200"
                        }`}
                      >
                        {cfg.label.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-sm">
                            {cfg.label}
                          </span>
                          {isNext && (
                            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-semibold">
                              Berikutnya
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 block">
                          {cfg.forced
                            ? "Adzan Paksa Aktif (Layar Penuh)"
                            : "Notifikasi Senyap"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-mono font-bold text-slate-800">
                        {timeStr}
                      </span>
                      <button
                        onClick={() => {
                          setAlarmSettings((prev) => ({
                            ...prev,
                            [key]: { ...prev[key], forced: !prev[key].forced }
                          }));
                          showToast(
                            `Adzan Paksa ${cfg.label}: ${
                              !cfg.forced ? "AKTIF" : "NONAKTIF"
                            }`
                          );
                        }}
                        className={`p-2.5 rounded-xl transition ${
                          cfg.forced
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-slate-200 text-slate-500"
                        }`}
                        title="Ubah Mode Adzan Paksa"
                      >
                        {cfg.forced ? (
                          <BellRing className="w-4 h-4" />
                        ) : (
                          <BellOff className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Forced Adhan Simulator Card */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <BellRing className="w-4 h-4 text-amber-300" />
                  Uji Coba Notifikasi Adzan Paksa
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Tes tampilan layar penuh & suara adzan saat waktu sholat tiba.
                </p>
              </div>
              <button
                onClick={() =>
                  triggerForcedAdhan("Dzuhur", todayTimings.Dhuhr || "11:58", false)
                }
                className="bg-white text-emerald-800 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow hover:bg-emerald-50 shrink-0"
              >
                Simulasi Sekarang
              </button>
            </div>
          </main>
        )}

        {/* =========================================================
            TAB 2: AL-QUR'AN (DOWNLOAD PER SURAT UNTUK OFFLINE)
           ========================================================= */}
        {activeTab === "quran" && (
          <main className="px-4 pt-4 space-y-4 flex-1">
            {activeSurah ? (
              /* SURAH READER VIEW */
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveSurah(null);
                      setPlayingSurahAudio(false);
                      if (quranAudioRef.current) quranAudioRef.current.pause();
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl"
                  >
                    <ChevronLeft className="w-4 h-4" /> Daftar Surat
                  </button>

                  <div className="text-center">
                    <h2 className="font-bold text-sm text-slate-800">
                      {activeSurah.nomor}. {activeSurah.namaLatin}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      {activeSurah.arti} • {activeSurah.jumlahAyat} Ayat
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (!quranAudioRef.current) return;
                      if (playingSurahAudio) {
                        quranAudioRef.current.pause();
                        setPlayingSurahAudio(false);
                      } else {
                        quranAudioRef.current.play().catch(() => {
                          showToast("Audio membutuhkan koneksi internet.");
                        });
                        setPlayingSurahAudio(true);
                      }
                    }}
                    className="bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    {playingSurahAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" /> Jeda
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> Murottal
                      </>
                    )}
                  </button>
                  <audio
                    ref={quranAudioRef}
                    src={activeSurah.audioFull}
                    onEnded={() => setPlayingSurahAudio(false)}
                  />
                </div>

                {/* Bismillah Banner */}
                {activeSurah.nomor !== 1 && activeSurah.nomor !== 9 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-serif text-emerald-950">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>
                  </div>
                )}

                {/* Verses List */}
                <div className="space-y-3">
                  {activeSurah.ayat?.map((ayat) => (
                    <div
                      key={ayat.nomorAyat}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {ayat.nomorAyat}
                        </span>
                        <p
                          className="text-2xl leading-loose text-right font-serif text-slate-900 flex-1"
                          dir="rtl"
                        >
                          {ayat.teksArab}
                        </p>
                      </div>
                      <p className="text-xs text-emerald-700 font-medium italic">
                        {ayat.teksLatin}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                        {ayat.teksIndonesia}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* SURAH LIST & OFFLINE MANAGER VIEW */
              <>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        Al-Qur'an Digital (Unduh Sesuai Pilihan)
                      </h2>
                      <p className="text-xs text-slate-500">
                        {Object.keys(offlineSurahs).length} Surat tersimpan di
                        memori HP (100% bisa dibuka Offline)
                      </p>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Cari nama surat atau nomor..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Filter Tabs */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setQuranFilter("all")}
                      className={`py-2 rounded-lg text-xs font-bold transition ${
                        quranFilter === "all"
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-slate-600"
                      }`}
                    >
                      Semua Surat ({surahList.length || 114})
                    </button>
                    <button
                      onClick={() => setQuranFilter("offline")}
                      className={`py-2 rounded-lg text-xs font-bold transition ${
                        quranFilter === "offline"
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-slate-600"
                      }`}
                    >
                      Tersimpan Offline ({Object.keys(offlineSurahs).length})
                    </button>
                  </div>
                </div>

                {/* Surah Cards */}
                <div className="space-y-2.5">
                  {(surahList.length > 0
                    ? surahList
                    : Object.values(offlineSurahs)
                  )
                    .filter((s) => {
                      const matchesFilter =
                        quranFilter === "all" || Boolean(offlineSurahs[s.nomor]);
                      const matchesSearch =
                        s.namaLatin
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        s.arti
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        String(s.nomor) === searchQuery.trim();
                      return matchesFilter && matchesSearch;
                    })
                    .map((surah) => {
                      const isSavedOffline = Boolean(offlineSurahs[surah.nomor]);
                      const isDownloading = downloadingSurahId === surah.nomor;

                      return (
                        <div
                          key={surah.nomor}
                          onClick={() => openSurahReader(surah)}
                          className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between hover:border-emerald-400 cursor-pointer transition"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isSavedOffline
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {surah.nomor}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm text-slate-800">
                                  {surah.namaLatin}
                                </h3>
                                {isSavedOffline && (
                                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                                    <CheckCircle2 className="w-3 h-3" /> Offline
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {surah.arti} • {surah.jumlahAyat} Ayat
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-lg font-serif text-emerald-800 mr-1">
                              {surah.nama}
                            </span>
                            {isSavedOffline ? (
                              <button
                                onClick={(e) =>
                                  removeSurahFromOffline(
                                    surah.nomor,
                                    surah.namaLatin,
                                    e
                                  )
                                }
                                className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition"
                                title="Hapus dari penyimpanan offline"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={(e) =>
                                  downloadSurahForOffline(surah.nomor, e)
                                }
                                disabled={isDownloading}
                                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 transition"
                              >
                                {isDownloading ? (
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <>
                                    <Download className="w-3.5 h-3.5" /> Unduh
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </main>
        )}

        {/* =========================================================
            TAB 3: KOMPAS ARAH KIBLAT
           ========================================================= */}
        {activeTab === "kiblat" && (
          <main className="px-4 pt-4 space-y-4 flex-1">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedCity.name}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  Sudut Kiblat: {qiblaDegree}° dari Utara
                </span>
              </div>

              {/* Interactive Compass Dial */}
              <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full border-8 border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center relative transition-transform duration-300"
                  style={{ transform: `rotate(${-compassHeading}deg)` }}
                >
                  <span className="absolute top-2 font-extrabold text-xs text-red-600">
                    U (0°)
                  </span>
                  <span className="absolute bottom-2 font-bold text-xs text-slate-400">
                    S (180°)
                  </span>
                  <span className="absolute right-3 font-bold text-xs text-slate-400">
                    T (90°)
                  </span>
                  <span className="absolute left-3 font-bold text-xs text-slate-400">
                    B (270°)
                  </span>

                  {/* Qibla Pointer Arrow */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${qiblaDegree}deg)` }}
                  >
                    <div className="flex flex-col items-center -mt-32">
                      <div className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md mb-1">
                        KA'BAH 🕋
                      </div>
                      <div className="w-1.5 h-20 bg-gradient-to-b from-emerald-600 to-transparent rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Center Hub */}
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg z-10 font-bold text-xs">
                  {compassHeading}°
                </div>
              </div>

              {/* Alignment Status */}
              <div
                className={`p-3 rounded-xl text-xs font-bold ${
                  Math.abs(compassHeading - qiblaDegree) <= 8
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {Math.abs(compassHeading - qiblaDegree) <= 8
                  ? "✅ Tepat Menghadap Arah Kiblat!"
                  : `Putar perangkat hingga derajat mendekati ${qiblaDegree}°`}
              </div>

              {/* Sensor Button + Manual Calibration Slider */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <button
                  onClick={enableCompassSensor}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Compass className="w-4 h-4" />
                  {isSensorActive
                    ? "Sensor Kompas Aktif"
                    : "Aktifkan Sensor Kompas HP"}
                </button>

                <div className="text-left">
                  <label className="text-[11px] font-semibold text-slate-500 flex justify-between mb-1">
                    <span>Simulasi / Kalibrasi Putaran Kompas Manual:</span>
                    <span className="font-mono text-emerald-700 font-bold">
                      {compassHeading}°
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="359"
                    value={compassHeading}
                    onChange={(e) => setCompassHeading(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>
            </div>
          </main>
        )}

        {/* =========================================================
            TAB 4: PUSAT UNDUH .APK & INSTALL ANDROID (TANPA ANDROID STUDIO)
           ========================================================= */}
        {activeTab === "apk" && (
          <main className="px-4 pt-4 space-y-4 flex-1">
            {/* Hero Explanation */}
            <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-md space-y-2">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-300" />
                <h2 className="font-bold text-sm">
                  Cara Download File .APK ke HP Anda
                </h2>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Seluruh kode aplikasi ini sudah siap. Pilih salah satu dari{" "}
                <strong>2 cara instan di bawah ini</strong> untuk memasangnya
                sebagai aplikasi Android (`.apk`) tanpa perlu menginstal Android
                Studio di komputer.
              </p>
            </div>

            {/* Method 1: Instant PWA / PWABuilder to APK */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                Cara 1 • Paling Cepat (1 Menit)
              </span>
              <h3 className="font-bold text-sm text-slate-800">
                Pasang Langsung / Konversi Otomatis via PWABuilder
              </h3>
              <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
                <li>
                  Untuk pasang langsung sekarang: buka menu pojok kanan atas
                  browser Chrome HP Anda lalu ketuk{" "}
                  <strong>"Tambahkan ke Layar Utama / Install Aplikasi"</strong>.
                </li>
                <li>
                  Jika ingin file mentah <strong>.APK</strong>: unggah aplikasi
                  ini ke Vercel/Netlify gratis, lalu masukkan link-nya ke{" "}
                  <strong>PWABuilder.com</strong> dan klik{" "}
                  <strong>"Package for Android (.APK)"</strong>.
                </li>
              </ol>
            </div>

            {/* Method 2: Capacitor + GitHub Actions Cloud APK Compiler */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                Cara 2 • Build Native Capacitor .APK Otomatis di Cloud
              </span>
              <h3 className="font-bold text-sm text-slate-800">
                Biarkan Server GitHub Membuatkan File .APK Untuk Anda
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Salin file konfigurasi di bawah ini ke repositori GitHub Anda.
                Server GitHub Actions akan otomatis meng-compile file{" "}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-emerald-700">
                  app-debug.apk
                </code>{" "}
                yang siap Anda download!
              </p>

              {/* Copyable capacitor.config.json */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-3 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                  <span className="text-emerald-400 font-bold">
                    capacitor.config.json
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `{\n  "appId": "com.muslimcompanion.hybrid",\n  "appName": "Muslim Companion",\n  "webDir": "dist",\n  "bundledWebRuntime": false\n}`,
                        "capacitor.config.json"
                      )
                    }
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded flex items-center gap-1"
                  >
                    {copiedCode === "capacitor.config.json" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Salin
                  </button>
                </div>
                <pre className="overflow-x-auto text-[11px] text-slate-300">
{`{
  "appId": "com.muslimcompanion.hybrid",
  "appName": "Muslim Companion",
  "webDir": "dist"
}`}
                </pre>
              </div>

              {/* Copyable GitHub Actions Workflow */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-3 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                  <span className="text-emerald-400 font-bold">
                    .github/workflows/build-apk.yml
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `name: Build Android APK\non: [push, workflow_dispatch]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - uses: actions/setup-java@v4\n        with:\n          distribution: 'temurin'\n          java-version: 17\n      - name: Install & Build Web App\n        run: |\n          npm install\n          npm run build\n          npx cap add android || true\n          npx cap sync android\n      - name: Compile Gradle APK\n        run: |\n          cd android && chmod +x gradlew && ./gradlew assembleDebug\n      - name: Upload Ready APK\n        uses: actions/upload-artifact@v4\n        with:\n          name: Muslim-Companion-APK\n          path: android/app/build/outputs/apk/debug/app-debug.apk`,
                        "Workflow GitHub APK"
                      )
                    }
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded flex items-center gap-1"
                  >
                    {copiedCode === "Workflow GitHub APK" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Salin Workflow
                  </button>
                </div>
                <pre className="overflow-x-auto text-[10px] text-slate-300 leading-relaxed">
{`name: Build Android APK
on: [push, workflow_dispatch]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: 17
      - run: |
          npm install && npm run build
          npx cap add android && npx cap sync
          cd android && ./gradlew assembleDebug
      - uses: actions/upload-artifact@v4
        with:
          name: Muslim-Companion-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk`}
                </pre>
              </div>
            </div>
          </main>
        )}

        {/* =========================================================
            BOTTOM NAVIGATION BAR
           ========================================================= */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around z-40 shadow-lg">
          <button
            onClick={() => setActiveTab("jadwal")}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${
              activeTab === "jadwal"
                ? "text-emerald-600 font-bold bg-emerald-50"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[11px]">Jadwal</span>
          </button>

          <button
            onClick={() => setActiveTab("quran")}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${
              activeTab === "quran"
                ? "text-emerald-600 font-bold bg-emerald-50"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[11px]">Al-Qur'an</span>
          </button>

          <button
            onClick={() => setActiveTab("kiblat")}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${
              activeTab === "kiblat"
                ? "text-emerald-600 font-bold bg-emerald-50"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[11px]">Kiblat</span>
          </button>

          <button
            onClick={() => setActiveTab("apk")}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${
              activeTab === "apk"
                ? "text-emerald-600 font-bold bg-emerald-50"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-[11px]">Unduh .APK</span>
          </button>
        </nav>
      </div>
    </div>
  );
}