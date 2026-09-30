import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Music2, i as RotateCcw, n as VolumeX, o as Check, r as Volume2, s as ArrowRight, t as X } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-4zi73iZC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			play: "bg-primary text-primary-foreground shadow-[0_7px_0_var(--button-shadow)] hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-1 active:shadow-[0_3px_0_var(--button-shadow)]",
			answer: "h-auto min-h-16 justify-start whitespace-normal border-2 border-border bg-card px-5 py-4 text-left text-base font-bold text-card-foreground shadow-[0_4px_0_var(--answer-shadow)] hover:-translate-y-0.5 hover:border-primary hover:bg-accent",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9",
			xl: "h-14 rounded-xl px-8 text-base font-extrabold"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var quiz = [
	{
		question: "Kurap biasanya berbentuk…",
		answers: [
			"Garis lurus",
			"Lingkaran",
			"Segitiga",
			"Bintik kecil"
		],
		correct: 1,
		explanation: "Karena kurap biasanya muncul sebagai bercak berbentuk lingkaran dan disebabkan oleh jamur."
	},
	{
		question: "Biang keringat lebih mudah muncul saat…",
		answers: [
			"Cuaca panas",
			"Cuaca dingin",
			"Sedang tidur",
			"Sesudah makan"
		],
		correct: 0,
		explanation: "Biang keringat mudah muncul ketika tubuh panas dan banyak berkeringat."
	},
	{
		question: "Sebelum memakai obat kulit, langkah pertama adalah…",
		answers: [
			"Memakai parfum",
			"Menggaruk kulit",
			"Cuci tangan",
			"Menutup dengan kain"
		],
		correct: 2,
		explanation: "Mencuci tangan sebelum menggunakan obat kulit membantu menjaga kebersihan dan mencegah kotoran masuk ke area yang sedang diobati."
	}
];
function getAudioCtx() {
	const AudioCtx = window.AudioContext ?? window.webkitAudioContext;
	return AudioCtx ? new AudioCtx() : null;
}
function playTone(kind) {
	const ctx = getAudioCtx();
	if (!ctx) return;
	(kind === "wrong" ? [210, 160] : kind === "finish" ? [
		523,
		659,
		784,
		1046
	] : [523, 784]).forEach((frequency, index) => {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = kind === "wrong" ? "square" : "sine";
		osc.frequency.value = frequency;
		const start = ctx.currentTime + index * .12;
		gain.gain.setValueAtTime(1e-4, start);
		gain.gain.exponentialRampToValueAtTime(.13, start + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, start + .18);
		osc.connect(gain).connect(ctx.destination);
		osc.start(start);
		osc.stop(start + .2);
	});
	setTimeout(() => void ctx.close(), 900);
}
function playClapping() {
	const ctx = getAudioCtx();
	if (!ctx) return;
	const now = ctx.currentTime;
	for (let i = 0; i < 6; i++) {
		const start = now + i * .11;
		const bufferSize = Math.floor(ctx.sampleRate * .06);
		const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
		const data = buffer.getChannelData(0);
		for (let j = 0; j < bufferSize; j++) data[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / bufferSize, 2);
		const source = ctx.createBufferSource();
		source.buffer = buffer;
		const filter = ctx.createBiquadFilter();
		filter.type = "bandpass";
		filter.frequency.value = 1600 + i * 120;
		filter.Q.value = 1.2;
		const gain = ctx.createGain();
		gain.gain.setValueAtTime(1e-4, start);
		gain.gain.exponentialRampToValueAtTime(.35, start + .005);
		gain.gain.exponentialRampToValueAtTime(1e-4, start + .06);
		source.connect(filter).connect(gain).connect(ctx.destination);
		source.start(start);
		source.stop(start + .07);
	}
	setTimeout(() => void ctx.close(), 1200);
}
function CapsuleMascot({ small = false, mood = "neutral" }) {
	const size = small ? 72 : 128;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 120 120",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		role: "img",
		"aria-label": "Kalpi, maskot kapsul",
		className: "animate-float",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "115",
				rx: "7",
				ry: "4.5",
				fill: "#2D1B3D"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "70",
				cy: "115",
				rx: "7",
				ry: "4.5",
				fill: "#2D1B3D"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "40",
					y: "8",
					width: "40",
					height: "100",
					rx: "20",
					fill: "#FFFDF7",
					stroke: "#2D1B3D",
					strokeWidth: "3.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 28 C40 16 80 16 80 28 L80 58 L40 58 Z",
					fill: "#A855F7",
					stroke: "#2D1B3D",
					strokeWidth: "3.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "40",
					y1: "58",
					x2: "80",
					y2: "58",
					stroke: "#2D1B3D",
					strokeWidth: "3.5"
				})
			] }),
			mood === "happy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M47 69 Q52 64 57 69",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M63 69 Q68 64 73 69",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			})] }) : mood === "sad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M47 73 Q52 68 57 73",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M63 73 Q68 68 73 73",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "52",
					cy: "70",
					rx: "6",
					ry: "7",
					fill: "#FFFDF7",
					stroke: "#2D1B3D",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "53",
					cy: "71",
					r: "3",
					fill: "#2D1B3D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "54",
					cy: "69",
					r: "1.1",
					fill: "#FFFDF7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "68",
					cy: "70",
					rx: "6",
					ry: "7",
					fill: "#FFFDF7",
					stroke: "#2D1B3D",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "69",
					cy: "71",
					r: "3",
					fill: "#2D1B3D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "69",
					r: "1.1",
					fill: "#FFFDF7"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "46",
				cy: "82",
				r: "3.5",
				fill: "#F472B6",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "74",
				cy: "82",
				r: "3.5",
				fill: "#F472B6",
				opacity: "0.55"
			}),
			mood === "happy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M50 83 Q60 95 70 83",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}) : mood === "sad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M53 92 Q60 86 67 92",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M53 84 Q60 91 67 84",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			})
		]
	});
}
function OintmentMascot({ small = false, mood = "neutral" }) {
	const size = small ? 72 : 128;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 120 120",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		role: "img",
		"aria-label": "Salpi, maskot salep",
		className: "animate-float [animation-delay:-1.5s]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "48",
				cy: "115",
				rx: "7",
				ry: "4.5",
				fill: "#2D1B3D"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "72",
				cy: "115",
				rx: "7",
				ry: "4.5",
				fill: "#2D1B3D"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M50 12 L70 12 L88 100 C88 108 32 108 32 100 Z",
					fill: "#FCD34D",
					stroke: "#2D1B3D",
					strokeWidth: "3.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "50",
					y: "4",
					width: "20",
					height: "12",
					rx: "2",
					fill: "#FB923C",
					stroke: "#2D1B3D",
					strokeWidth: "3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "42",
					y1: "55",
					x2: "78",
					y2: "55",
					stroke: "#2D1B3D",
					strokeWidth: "1.5",
					opacity: "0.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "44",
					y1: "62",
					x2: "76",
					y2: "62",
					stroke: "#2D1B3D",
					strokeWidth: "1.5",
					opacity: "0.4"
				})
			] }),
			mood === "happy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M47 77 Q52 72 57 77",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M63 77 Q68 72 73 77",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			})] }) : mood === "sad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M47 81 Q52 76 57 81",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M63 81 Q68 76 73 81",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "52",
					cy: "78",
					rx: "6",
					ry: "7",
					fill: "#FFFDF7",
					stroke: "#2D1B3D",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "53",
					cy: "79",
					r: "3",
					fill: "#2D1B3D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "54",
					cy: "77",
					r: "1.1",
					fill: "#FFFDF7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "68",
					cy: "78",
					rx: "6",
					ry: "7",
					fill: "#FFFDF7",
					stroke: "#2D1B3D",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "69",
					cy: "79",
					r: "3",
					fill: "#2D1B3D"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "77",
					r: "1.1",
					fill: "#FFFDF7"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "44",
				cy: "90",
				r: "3.5",
				fill: "#F472B6",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "76",
				cy: "90",
				r: "3.5",
				fill: "#F472B6",
				opacity: "0.55"
			}),
			mood === "happy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M51 91 Q60 103 69 91",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}) : mood === "sad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M53 100 Q60 94 67 100",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M53 92 Q60 99 67 92",
				stroke: "#2D1B3D",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				fill: "none"
			})
		]
	});
}
function BrandLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		role: "img",
		"aria-label": "Logo Twentiva",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "8",
			fill: "#F472B6"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 11 H24 M16 11 V24",
			stroke: "#FBCFE8",
			strokeWidth: "4.5",
			strokeLinecap: "round"
		})]
	});
}
function Confetti({ count = 36, duration = 2 }) {
	const pieces = Array.from({ length: count });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 overflow-hidden",
		children: pieces.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
			className: cn("absolute top-0 h-3 w-2", i % 4 === 0 ? "bg-primary" : i % 4 === 1 ? "bg-secondary" : i % 4 === 2 ? "bg-sky" : "bg-success"),
			style: {
				left: `${i * 47 % 100}%`,
				animation: `confetti-fall ${duration + i % 4 * .3}s linear ${-(i % 5) * .18}s infinite`,
				["--drift"]: `${(i % 2 ? 1 : -1) * (15 + i % 50)}px`
			}
		}, i))
	});
}
function QuizPage() {
	const [screen, setScreen] = (0, import_react.useState)("intro");
	const [questionIndex, setQuestionIndex] = (0, import_react.useState)(0);
	const [wrongIndex, setWrongIndex] = (0, import_react.useState)(null);
	const [solved, setSolved] = (0, import_react.useState)(false);
	const [showPraise, setShowPraise] = (0, import_react.useState)(false);
	const [mood, setMood] = (0, import_react.useState)("neutral");
	const [soundOn, setSoundOn] = (0, import_react.useState)(true);
	const [musicOn, setMusicOn] = (0, import_react.useState)(false);
	const musicTimer = (0, import_react.useRef)(null);
	const playMusicNote = (0, import_react.useCallback)(() => {
		if (!soundOn) return;
		const ctx = getAudioCtx();
		if (!ctx) return;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "sine";
		osc.frequency.value = [
			262,
			330,
			392,
			330
		][Math.floor(Date.now() / 700) % 4] ?? 262;
		gain.gain.setValueAtTime(.025, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + .45);
		osc.connect(gain).connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + .45);
		setTimeout(() => void ctx.close(), 600);
	}, [soundOn]);
	(0, import_react.useEffect)(() => {
		if (musicOn && screen !== "intro") musicTimer.current = window.setInterval(playMusicNote, 700);
		return () => {
			if (musicTimer.current) window.clearInterval(musicTimer.current);
		};
	}, [
		musicOn,
		playMusicNote,
		screen
	]);
	const choose = (index) => {
		if (solved) return;
		if (index === (quiz[questionIndex] ?? quiz[0]).correct) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-hidden bg-background px-4 py-5 sm:px-6 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute -left-14 top-16 h-36 w-36 rounded-full border-[24px] border-accent opacity-70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute -right-10 bottom-12 h-32 w-32 rotate-12 rounded-3xl bg-secondary/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex max-w-5xl items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-display text-xl font-extrabold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-8 w-8 shrink-0" }), " Twentiva"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": musicOn ? "Matikan musik" : "Nyalakan musik",
						title: musicOn ? "Matikan musik" : "Nyalakan musik",
						onClick: () => setMusicOn((v) => !v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: cn(musicOn && "text-primary") })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": soundOn ? "Matikan suara" : "Nyalakan suara",
						title: soundOn ? "Matikan suara" : "Nyalakan suara",
						onClick: () => setSoundOn((v) => !v),
						children: soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {})
					})]
				})]
			}),
			screen === "intro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, { onStart: () => {
				setScreen("quiz");
				setMusicOn(true);
			} }),
			screen === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizStage, {
				item: quiz[questionIndex] ?? quiz[0],
				index: questionIndex,
				wrongIndex,
				solved,
				mood,
				onChoose: choose,
				onNext: next
			}),
			screen === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finish, { onRestart: restart }),
			showPraise && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PraisePopup, {})
		]
	});
}
function PraisePopup() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, {
			count: 36,
			duration: 1.8
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative animate-pop rounded-3xl border-2 border-success bg-card p-7 text-center shadow-[0_12px_0_var(--answer-shadow)] sm:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-9 w-9 text-primary-foreground" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl font-extrabold text-foreground sm:text-5xl",
					children: "Kamu Hebat!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-xs font-bold text-muted-foreground",
					children: "Jawabanmu tepat. Lanjutkan!"
				})
			]
		})]
	});
}
function Intro({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-5xl place-items-center py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full text-center animate-pop",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-xl items-end justify-center -space-x-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapsuleMascot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OintmentMascot, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mb-3 w-fit rounded-full bg-secondary px-4 py-2 text-sm font-extrabold text-secondary-foreground",
					children: "Uji pemahamanmu: benar atau salah?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl font-extrabold leading-none text-foreground sm:text-7xl",
					children: "Yuk, bermain!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-md text-lg font-bold text-muted-foreground",
					children: "Angkat tangan kalau kamu yakin. Temukan jawaban yang benar bersama Kalpi & Salpi!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "play",
					size: "xl",
					className: "mt-8",
					onClick: onStart,
					children: ["Mulai kuis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm font-bold text-muted-foreground",
					children: "3 soal · Coba sampai benar"
				})
			]
		})
	});
}
function QuizStage({ item, index, wrongIndex, solved, mood, onChoose, onNext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative z-10 mx-auto max-w-3xl py-8 sm:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-7 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-3 flex-1 overflow-hidden rounded-full bg-card shadow-inner",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary transition-all duration-500",
					style: { width: `${(index + (solved ? 1 : 0)) / quiz.length * 100}%` }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 text-sm font-extrabold text-muted-foreground",
				children: [
					index + 1,
					" / ",
					quiz.length
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative rounded-3xl border-2 border-border bg-card p-5 shadow-[0_10px_0_var(--answer-shadow)] sm:p-9",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute -right-1 -top-20 flex items-end sm:-right-2 sm:-top-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapsuleMascot, {
						small: true,
						mood
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OintmentMascot, {
						small: true,
						mood
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 text-sm font-extrabold uppercase text-primary",
					children: ["Soal ", index + 1]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl",
					children: item.question
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid gap-3 sm:grid-cols-2",
					children: item.answers.map((answer, answerIndex) => {
						const isWrong = wrongIndex === answerIndex;
						const isCorrect = solved && answerIndex === item.correct;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "answer",
							disabled: solved,
							onClick: () => onChoose(answerIndex),
							className: cn(isWrong && "animate-wiggle border-destructive bg-destructive/10 text-destructive", isCorrect && "border-success bg-success-soft text-foreground shadow-[0_4px_0_var(--success)]"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-sm", isWrong && "bg-destructive text-destructive-foreground", isCorrect && "bg-success text-primary-foreground"),
								children: isWrong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : String.fromCharCode(65 + answerIndex)
							}), answer]
						}, answer);
					})
				}),
				wrongIndex !== null && !solved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					className: "mt-6 flex items-center gap-3 rounded-xl bg-destructive/10 p-4 font-extrabold text-destructive animate-wiggle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }), " Belum tepat. Ayo coba lagi!"]
				}),
				solved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					className: "mt-6 rounded-xl border-2 border-success bg-success-soft p-5 animate-pop",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-end -space-x-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapsuleMascot, {
								small: true,
								mood: "happy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OintmentMascot, {
								small: true,
								mood: "happy"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-display text-xl font-extrabold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "rounded-full bg-success p-1 text-primary-foreground" }), " Tepat sekali!"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-semibold text-muted-foreground",
							children: item.explanation
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "play",
						size: "lg",
						className: "mt-5 w-full sm:w-auto",
						onClick: onNext,
						children: [
							index === quiz.length - 1 ? "Lihat hasil" : "Soal berikutnya",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
						]
					})]
				})
			]
		})]
	});
}
function Finish({ onRestart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-3xl place-items-center py-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, {
			count: 42,
			duration: 2.6
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative rounded-3xl border-2 border-border bg-card p-7 shadow-[0_12px_0_var(--answer-shadow)] animate-pop sm:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex items-end justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapsuleMascot, { mood: "happy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OintmentMascot, { mood: "happy" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mb-3 w-fit rounded-full bg-secondary px-4 py-2 text-sm font-extrabold text-secondary-foreground",
					children: "Semua soal selesai!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-5xl font-extrabold leading-none sm:text-6xl",
					children: "Kalian Semua Hebat!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-md text-lg font-bold text-muted-foreground",
					children: "Sekarang kamu makin paham cara menjaga kesehatan kulit. Tos dulu sama Kalpi & Salpi!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "play",
					size: "xl",
					className: "mt-8",
					onClick: onRestart,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Main lagi"]
				})
			]
		})]
	});
}
//#endregion
export { QuizPage as component };
