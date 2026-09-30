import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Music2, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twentiva - Kuis Kesehatan" },
      {
        name: "description",
        content: "Kuis seru tiga soal untuk belajar menjaga kesehatan kulit.",
      },
      { property: "og:title", content: "Twentiva - Kuis Kesehatan" },
      {
        property: "og:description",
        content: "Main dan uji pemahamanmu tentang kesehatan kulit bersama Kalpi dan Salpi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

/* ============================ Data ============================ */

type QuizItem = {
  question: string;
  answers: readonly string[];
  correct: number;
  explanation: string;
};

const quiz = [
  {
    question: "Kurap biasanya berbentuk…",
    answers: ["Garis lurus", "Lingkaran", "Segitiga", "Bintik kecil"],
    correct: 1,
    explanation:
      "Karena kurap biasanya muncul sebagai bercak berbentuk lingkaran dan disebabkan oleh jamur.",
  },
  {
    question: "Biang keringat lebih mudah muncul saat…",
    answers: ["Cuaca panas", "Cuaca dingin", "Sedang tidur", "Sesudah makan"],
    correct: 0,
    explanation: "Biang keringat mudah muncul ketika tubuh panas dan banyak berkeringat.",
  },
  {
    question: "Sebelum memakai obat kulit, langkah pertama adalah…",
    answers: ["Memakai parfum", "Menggaruk kulit", "Cuci tangan", "Menutup dengan kain"],
    correct: 2,
    explanation:
      "Mencuci tangan sebelum menggunakan obat kulit membantu menjaga kebersihan dan mencegah kotoran masuk ke area yang sedang diobati.",
  },
] as const satisfies readonly QuizItem[];

/* ============================ Audio ============================ */

type Mood = "neutral" | "happy" | "sad";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

function getAudioCtx() {
  const AudioCtx = window.AudioContext ?? window.webkitAudioContext;
  return AudioCtx ? new AudioCtx() : null;
}

function playTone(kind: "correct" | "wrong" | "finish") {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const notes =
    kind === "wrong" ? [210, 160] : kind === "finish" ? [523, 659, 784, 1046] : [523, 784];
  notes.forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = kind === "wrong" ? "square" : "sine";
    osc.frequency.value = frequency;
    const start = ctx.currentTime + index * 0.12;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.13, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.2);
  });
  setTimeout(() => void ctx.close(), 900);
}

// Sound efek tepuk tangan memakai Web Audio API.
function playClapping() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  for (let i = 0; i < 6; i++) {
    const start = now + i * 0.11;
    const bufferSize = Math.floor(ctx.sampleRate * 0.06);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let j = 0; j < bufferSize; j++) {
      data[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / bufferSize, 2);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1600 + i * 120;
    filter.Q.value = 1.2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.06);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(start);
    source.stop(start + 0.07);
  }
  setTimeout(() => void ctx.close(), 1200);
}

/* ============================ Mascot SVG ============================ */

type MascotProps = { small?: boolean; mood?: Mood };

// Kalpi — maskot kapsul lonjong panjang vertikal dua warna, bermata berkaki.
function CapsuleMascot({ small = false, mood = "neutral" }: MascotProps) {
  const size = small ? 72 : 128;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kalpi, maskot kapsul"
      className="animate-float"
    >
      <ellipse cx="50" cy="115" rx="7" ry="4.5" fill="#2D1B3D" />
      <ellipse cx="70" cy="115" rx="7" ry="4.5" fill="#2D1B3D" />
      <g>
        <rect
          x="40"
          y="8"
          width="40"
          height="100"
          rx="20"
          fill="#FFFDF7"
          stroke="#2D1B3D"
          strokeWidth="3.5"
        />
        <path
          d="M40 28 C40 16 80 16 80 28 L80 58 L40 58 Z"
          fill="#A855F7"
          stroke="#2D1B3D"
          strokeWidth="3.5"
        />
        <line x1="40" y1="58" x2="80" y2="58" stroke="#2D1B3D" strokeWidth="3.5" />
      </g>
      {/* Mata */}
      {mood === "happy" ? (
        <>
          <path
            d="M47 69 Q52 64 57 69"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M63 69 Q68 64 73 69"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : mood === "sad" ? (
        <>
          <path
            d="M47 73 Q52 68 57 73"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M63 73 Q68 68 73 73"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <ellipse cx="52" cy="70" rx="6" ry="7" fill="#FFFDF7" stroke="#2D1B3D" strokeWidth="2" />
          <circle cx="53" cy="71" r="3" fill="#2D1B3D" />
          <circle cx="54" cy="69" r="1.1" fill="#FFFDF7" />
          <ellipse cx="68" cy="70" rx="6" ry="7" fill="#FFFDF7" stroke="#2D1B3D" strokeWidth="2" />
          <circle cx="69" cy="71" r="3" fill="#2D1B3D" />
          <circle cx="70" cy="69" r="1.1" fill="#FFFDF7" />
        </>
      )}
      <circle cx="46" cy="82" r="3.5" fill="#F472B6" opacity="0.55" />
      <circle cx="74" cy="82" r="3.5" fill="#F472B6" opacity="0.55" />
      {/* Mulut */}
      {mood === "happy" ? (
        <path
          d="M50 83 Q60 95 70 83"
          stroke="#2D1B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      ) : mood === "sad" ? (
        <path
          d="M53 92 Q60 86 67 92"
          stroke="#2D1B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d="M53 84 Q60 91 67 84"
          stroke="#2D1B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}

// Salpi — maskot salep tube bentuk segitiga, bermata berkaki.
function OintmentMascot({ small = false, mood = "neutral" }: MascotProps) {
  const size = small ? 72 : 128;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Salpi, maskot salep"
      className="animate-float [animation-delay:-1.5s]"
    >
      <ellipse cx="48" cy="115" rx="7" ry="4.5" fill="#2D1B3D" />
      <ellipse cx="72" cy="115" rx="7" ry="4.5" fill="#2D1B3D" />
      <g>
        <path
          d="M50 12 L70 12 L88 100 C88 108 32 108 32 100 Z"
          fill="#FCD34D"
          stroke="#2D1B3D"
          strokeWidth="3.5"
        />
        <rect
          x="50"
          y="4"
          width="20"
          height="12"
          rx="2"
          fill="#FB923C"
          stroke="#2D1B3D"
          strokeWidth="3"
        />
        <line x1="42" y1="55" x2="78" y2="55" stroke="#2D1B3D" strokeWidth="1.5" opacity="0.4" />
        <line x1="44" y1="62" x2="76" y2="62" stroke="#2D1B3D" strokeWidth="1.5" opacity="0.4" />
      </g>
      {/* Mata */}
      {mood === "happy" ? (
        <>
          <path
            d="M47 77 Q52 72 57 77"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M63 77 Q68 72 73 77"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : mood === "sad" ? (
        <>
          <path
            d="M47 81 Q52 76 57 81"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M63 81 Q68 76 73 81"
            stroke="#2D1B3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <ellipse cx="52" cy="78" rx="6" ry="7" fill="#FFFDF7" stroke="#2D1B3D" strokeWidth="2" />
          <circle cx="53" cy="79" r="3" fill="#2D1B3D" />
          <circle cx="54" cy="77" r="1.1" fill="#FFFDF7" />
          <ellipse cx="68" cy="78" rx="6" ry="7" fill="#FFFDF7" stroke="#2D1B3D" strokeWidth="2" />
          <circle cx="69" cy="79" r="3" fill="#2D1B3D" />
          <circle cx="70" cy="77" r="1.1" fill="#FFFDF7" />
        </>
      )}
      <circle cx="44" cy="90" r="3.5" fill="#F472B6" opacity="0.55" />
      <circle cx="76" cy="90" r="3.5" fill="#F472B6" opacity="0.55" />
      {/* Mulut */}
      {mood === "happy" ? (
        <path
          d="M51 91 Q60 103 69 91"
          stroke="#2D1B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      ) : mood === "sad" ? (
        <path
          d="M53 100 Q60 94 67 100"
          stroke="#2D1B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d="M53 92 Q60 99 67 92"
          stroke="#2D1B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}

// Logo brand — huruf T dalam kotak pink tua, T pink muda.
function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Twentiva"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#F472B6" />
      <path d="M8 11 H24 M16 11 V24" stroke="#FBCFE8" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

/* ============================ Confetti helper ============================ */

function Confetti({ count = 36, duration = 2 }: { count?: number; duration?: number }) {
  const pieces = Array.from({ length: count });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {pieces.map((_, i) => (
        <i
          key={i}
          className={cn(
            "absolute top-0 h-3 w-2",
            i % 4 === 0
              ? "bg-primary"
              : i % 4 === 1
                ? "bg-secondary"
                : i % 4 === 2
                  ? "bg-sky"
                  : "bg-success",
          )}
          style={{
            left: `${(i * 47) % 100}%`,
            animation: `confetti-fall ${duration + (i % 4) * 0.3}s linear ${-(i % 5) * 0.18}s infinite`,
            ["--drift" as string]: `${(i % 2 ? 1 : -1) * (15 + (i % 50))}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================ Page ============================ */

function QuizPage() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "done">("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [showPraise, setShowPraise] = useState(false);
  const [mood, setMood] = useState<Mood>("neutral");
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const musicTimer = useRef<number | null>(null);

  const playMusicNote = useCallback(() => {
    if (!soundOn) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = [262, 330, 392, 330][Math.floor(Date.now() / 700) % 4] ?? 262;
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
    setTimeout(() => void ctx.close(), 600);
  }, [soundOn]);

  useEffect(() => {
    if (musicOn && screen !== "intro") musicTimer.current = window.setInterval(playMusicNote, 700);
    return () => {
      if (musicTimer.current) window.clearInterval(musicTimer.current);
    };
  }, [musicOn, playMusicNote, screen]);

  const choose = (index: number) => {
    if (solved) return;
    const currentItem = quiz[questionIndex] ?? quiz[0];
    if (index === currentItem.correct) {
      setSolved(true);
      setWrongIndex(null);
      setShowPraise(true);
      setMood("happy");
      if (soundOn) {
        playTone("correct");
        playClapping();
      }
      setTimeout(() => setShowPraise(false), 2600);
    } else {
      setWrongIndex(index);
      setMood("sad");
      if (soundOn) playTone("wrong");
      setTimeout(() => setWrongIndex(null), 650);
      setTimeout(() => setMood("neutral"), 900);
    }
  };

  const next = () => {
    setMood("neutral");
    if (questionIndex === quiz.length - 1) {
      setScreen("done");
      setShowPraise(false);
      if (soundOn) playTone("finish");
    } else {
      setQuestionIndex((v) => v + 1);
      setSolved(false);
      setWrongIndex(null);
      setShowPraise(false);
    }
  };

  const restart = () => {
    setScreen("intro");
    setQuestionIndex(0);
    setSolved(false);
    setWrongIndex(null);
    setShowPraise(false);
    setMood("neutral");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-5 sm:px-6 sm:py-8">
      <div
        aria-hidden
        className="absolute -left-14 top-16 h-36 w-36 rounded-full border-[24px] border-accent opacity-70"
      />
      <div
        aria-hidden
        className="absolute -right-10 bottom-12 h-32 w-32 rotate-12 rounded-3xl bg-secondary/60"
      />
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2 font-display text-xl font-extrabold text-primary">
          <BrandLogo className="h-8 w-8 shrink-0" /> Twentiva
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={musicOn ? "Matikan musik" : "Nyalakan musik"}
            title={musicOn ? "Matikan musik" : "Nyalakan musik"}
            onClick={() => setMusicOn((v) => !v)}
          >
            <Music2 className={cn(musicOn && "text-primary")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={soundOn ? "Matikan suara" : "Nyalakan suara"}
            title={soundOn ? "Matikan suara" : "Nyalakan suara"}
            onClick={() => setSoundOn((v) => !v)}
          >
            {soundOn ? <Volume2 /> : <VolumeX />}
          </Button>
        </div>
      </header>

      {screen === "intro" && (
        <Intro
          onStart={() => {
            setScreen("quiz");
            setMusicOn(true);
          }}
        />
      )}
      {screen === "quiz" && (
        <QuizStage
          item={quiz[questionIndex] ?? quiz[0]}
          index={questionIndex}
          wrongIndex={wrongIndex}
          solved={solved}
          mood={mood}
          onChoose={choose}
          onNext={next}
        />
      )}
      {screen === "done" && <Finish onRestart={restart} />}
      {showPraise && <PraisePopup />}
    </main>
  );
}

/* ============================ Screens ============================ */

function PraisePopup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Confetti count={36} duration={1.8} />
      <div className="relative animate-pop rounded-3xl border-2 border-success bg-card p-7 text-center shadow-[0_12px_0_var(--answer-shadow)] sm:p-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
          <Check className="h-9 w-9 text-primary-foreground" />
        </div>
        <p className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
          Kamu Hebat!
        </p>
        <p className="mx-auto mt-3 max-w-xs font-bold text-muted-foreground">
          Jawabanmu tepat. Lanjutkan!
        </p>
      </div>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-5xl place-items-center py-8">
      <div className="w-full text-center animate-pop">
        <div className="mx-auto flex max-w-xl items-end justify-center -space-x-3">
          <CapsuleMascot />
          <OintmentMascot />
        </div>
        <p className="mx-auto mb-3 w-fit rounded-full bg-secondary px-4 py-2 text-sm font-extrabold text-secondary-foreground">
          Uji pemahamanmu: benar atau salah?
        </p>
        <h1 className="font-display text-5xl font-extrabold leading-none text-foreground sm:text-7xl">
          Yuk, bermain!
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg font-bold text-muted-foreground">
          Angkat tangan kalau kamu yakin. Temukan jawaban yang benar bersama Kalpi &amp; Salpi!
        </p>
        <Button variant="play" size="xl" className="mt-8" onClick={onStart}>
          Mulai kuis <ArrowRight />
        </Button>
        <p className="mt-5 text-sm font-bold text-muted-foreground">3 soal · Coba sampai benar</p>
      </div>
    </section>
  );
}

function QuizStage({
  item,
  index,
  wrongIndex,
  solved,
  mood,
  onChoose,
  onNext,
}: {
  item: QuizItem;
  index: number;
  wrongIndex: number | null;
  solved: boolean;
  mood: Mood;
  onChoose: (i: number) => void;
  onNext: () => void;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-3xl py-8 sm:py-12">
      {/* Progress bar */}
      <div className="mb-7 flex items-center gap-4">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-card shadow-inner">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((index + (solved ? 1 : 0)) / quiz.length) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-sm font-extrabold text-muted-foreground">
          {index + 1} / {quiz.length}
        </span>
      </div>

      <div className="relative rounded-3xl border-2 border-border bg-card p-5 shadow-[0_10px_0_var(--answer-shadow)] sm:p-9">
        {/* Mascot ditempatkan di kanan-atas kartu, di luar area progress */}
        <div className="absolute -right-1 -top-20 flex items-end sm:-right-2 sm:-top-24">
          <CapsuleMascot small mood={mood} />
          <OintmentMascot small mood={mood} />
        </div>

        <p className="mb-2 text-sm font-extrabold uppercase text-primary">Soal {index + 1}</p>
        <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          {item.question}
        </h2>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {item.answers.map((answer, answerIndex) => {
            const isWrong = wrongIndex === answerIndex;
            const isCorrect = solved && answerIndex === item.correct;
            return (
              <Button
                key={answer}
                variant="answer"
                disabled={solved}
                onClick={() => onChoose(answerIndex)}
                className={cn(
                  isWrong && "animate-wiggle border-destructive bg-destructive/10 text-destructive",
                  isCorrect &&
                    "border-success bg-success-soft text-foreground shadow-[0_4px_0_var(--success)]",
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-sm",
                    isWrong && "bg-destructive text-destructive-foreground",
                    isCorrect && "bg-success text-primary-foreground",
                  )}
                >
                  {isWrong ? <X /> : isCorrect ? <Check /> : String.fromCharCode(65 + answerIndex)}
                </span>
                {answer}
              </Button>
            );
          })}
        </div>

        {wrongIndex !== null && !solved && (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-xl bg-destructive/10 p-4 font-extrabold text-destructive animate-wiggle"
          >
            <X className="h-6 w-6" /> Belum tepat. Ayo coba lagi!
          </div>
        )}

        {solved && (
          <div
            role="status"
            className="mt-6 rounded-xl border-2 border-success bg-success-soft p-5 animate-pop"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex shrink-0 items-end -space-x-3">
                <CapsuleMascot small mood="happy" />
                <OintmentMascot small mood="happy" />
              </div>
              <div>
                <p className="flex items-center gap-2 font-display text-xl font-extrabold text-foreground">
                  <Check className="rounded-full bg-success p-1 text-primary-foreground" /> Tepat
                  sekali!
                </p>
                <p className="mt-2 font-semibold text-muted-foreground">{item.explanation}</p>
              </div>
            </div>
            <Button variant="play" size="lg" className="mt-5 w-full sm:w-auto" onClick={onNext}>
              {index === quiz.length - 1 ? "Lihat hasil" : "Soal berikutnya"} <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Finish({ onRestart }: { onRestart: () => void }) {
  return (
    <section className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-3xl place-items-center py-8 text-center">
      <Confetti count={42} duration={2.6} />
      <div className="relative rounded-3xl border-2 border-border bg-card p-7 shadow-[0_12px_0_var(--answer-shadow)] animate-pop sm:p-12">
        <div className="mx-auto flex items-end justify-center">
          <CapsuleMascot mood="happy" />
          <OintmentMascot mood="happy" />
        </div>
        <p className="mx-auto mb-3 w-fit rounded-full bg-secondary px-4 py-2 text-sm font-extrabold text-secondary-foreground">
          Semua soal selesai!
        </p>
        <h2 className="font-display text-5xl font-extrabold leading-none sm:text-6xl">
          Kalian Semua Hebat!
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg font-bold text-muted-foreground">
          Sekarang kamu makin paham cara menjaga kesehatan kulit. Tos dulu sama Kalpi &amp; Salpi!
        </p>
        <Button variant="play" size="xl" className="mt-8" onClick={onRestart}>
          <RotateCcw /> Main lagi
        </Button>
      </div>
    </section>
  );
}
