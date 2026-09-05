'use client';
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Dumbbell, LineChart, Utensils, Activity, 
  Flame, Timer, Target, Trophy, Users, TrendingUp, 
  Calendar, Download, CheckCircle, Zap, RotateCcw, Check,
  Sparkles, Play, Pause, Plus, Trash2, X, ArrowRight, Flag,
  ChevronRight, Milestone, Award, HeartPulse, ShieldCheck, Scale, Apple,
  Sun, Moon
} from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [selectedSport, setSelectedSport] = useState('Basketball');
  const [workoutIntensity, setWorkoutIntensity] = useState('Moderate');
  const [selectedMuscle, setSelectedMuscle] = useState('Chest');
  const [trainingGoal, setTrainingGoal] = useState('Hypertrophy');

  // --- REST TIMER STATE ---
  const [restTimeLeft, setRestTimeLeft] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // --- NUTRITION & BMI DYNAMIC STATE ---
  const [dietMode, setDietMode] = useState<'bulking' | 'cutting' | 'maintain'>('bulking');
  const [dietEasterEgg, setDietEasterEgg] = useState<string | null>(null);

  // BMI & TDEE Calculator State
  const [weightKg, setWeightKg] = useState<number>(52);
  const [heightCm, setHeightCm] = useState<number>(165);
  const [age, setAge] = useState<number>(20);
  const [activityMultiplier, setActivityMultiplier] = useState<number>(1.55);

  const calculatedBMI = Number((weightKg / ((heightCm / 100) ** 2)).toFixed(1));

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: isDark ? 'text-yellow-300' : 'text-amber-600' };
    if (bmi < 25) return { label: 'Optimal / Normal', color: isDark ? 'text-yellow-400' : 'text-amber-700' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-pink-500' };
    return { label: 'High Range', color: 'text-orange-500' };
  };

  const isDark = theme === 'dark';
  const bmiStatus = getBMICategory(calculatedBMI);

  // --- Tuned Biometric & Caloric Scaling Engine ---
  const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  const tdee = Math.round(bmr * activityMultiplier);

  const getAdjustedCalories = () => {
    if (dietMode === 'bulking') return tdee + 350;
    if (dietMode === 'cutting') return tdee - 400;
    return tdee;
  };

  const adjustedCalories = getAdjustedCalories();
  const adjustedProtein = Math.round(weightKg * 2.3); 
  const adjustedFats = Math.round((adjustedCalories * 0.27) / 9); 
  const adjustedCarbs = Math.round((adjustedCalories - (adjustedProtein * 4) - (adjustedFats * 9)) / 4);

  const getDietAdvice = () => {
    if (calculatedBMI < 18.5) {
      return {
        title: 'Underweight Restoration Protocol',
        note: 'Your BMI indicates you are under the optimal threshold. High-density caloric foods and heavy compound lifting are prioritized to build lean mass safely.',
        whatToEat: [
          { name: 'Whole Milk, Oats & Peanut Butter Shakes', desc: 'Dense liquid calories that bypass early satiety and boost daily surplus.' },
          { name: 'Red Meat, Rice & Whole Eggs', desc: 'Provides saturated fats, iron, and high biological value amino acids for systemic growth.' },
          { name: 'Avocados, Olive Oil & Nuts', desc: 'Monounsaturated fats to effortlessly add clean calories without excessive stomach volume.' }
        ],
        whatToAvoid: [
          { name: 'Low-Calorie Diet Foods & Salads', desc: 'Fills up your stomach volume without providing the energy required for weight restoration.' },
          { name: 'Skipping Meals', desc: 'Triggers catabolic states where your body burns muscle tissue instead of building.' }
        ]
      };
    }
    return {
      title: 'Athletic Recomposition & Performance Protocol',
      note: 'Your BMI is in the optimal normal range. Macro distribution is fine-tuned strictly for peak athletic power output and muscular hypertrophy.',
      whatToEat: [
        { name: 'Jasmine Rice, Lean Beef & Sweet Potatoes', desc: 'Optimal glycogen replenishment and stable intra-workout energy.' },
        { name: 'Greek Yogurt, Berries & Whey Isolate', desc: 'Rapid muscle protein synthesis and gut health support.' },
        { name: 'Salmon and Quinoa Bowls', desc: 'Balanced omega fatty acids and complete protein sources.' }
      ],
      whatToAvoid: [
        { name: 'Excessive Trans Fats & Fast Food', desc: 'Causes sluggish recovery and increases systemic inflammation.' },
        { name: 'Extreme Starvation Diets', desc: 'Crushes your hormonal profile and destroys strength levels.' }
      ]
    };
  };

  const dynamicAdvice = getDietAdvice();

  const handleDietSwitch = (mode: 'bulking' | 'cutting' | 'maintain') => {
    setDietMode(mode);
    if (mode === 'bulking') {
      setDietEasterEgg(`⚡ BULK MODE ACTIVATED (BMI ${calculatedBMI}): Adjusted target to ${adjustedCalories} kcal. Clean mass acquisition engaged!`);
    } else if (mode === 'cutting') {
      setDietEasterEgg(`🔥 SHRED MODE ACTIVATED (BMI ${calculatedBMI}): Adjusted target to ${adjustedCalories} kcal. Lean shred parameters locked.`);
    } else {
      setDietEasterEgg(`✨ MAINTENANCE MODE ACTIVATED (BMI ${calculatedBMI}): Target set to ${adjustedCalories} kcal. Perfect recomposition homeostasis.`);
    }
  };

  // --- DASHBOARD INTERACTIVE DAILY GOALS ---
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, title: 'Hit Protein Target', completed: true, category: 'Nutrition' },
    { id: 2, title: 'Complete Incline Press Session (4 sets)', completed: true, category: 'Hypertrophy' },
    { id: 3, title: 'Drink 3.5L Hydration Target', completed: false, category: 'Recovery' },
    { id: 4, title: '15-min Post-Workout Mobility & Decompression', completed: false, category: 'PT Protocol' },
  ]);

  const [dashboardEasterEgg, setDashboardEasterEgg] = useState<string | null>(null);

  const toggleDailyGoal = (id: number) => {
    setDailyGoals((prev) => {
      const next = prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g));
      const allDone = next.every((g) => g.completed);
      if (allDone) {
        setDashboardEasterEgg("⚡ CYBERNETIC GOD SPEED MODE UNLOCKED: All daily habits checked off! Your recovery multiplier is running at 110%.");
      } else {
        setDashboardEasterEgg(null);
      }
      return next;
    });
  };

  // --- EXERCISE POOL ---
  const exerciseLibrary: Record<string, { name: string; cue: string; defaultReps: string }[]> = {
    Chest: [
      { name: 'Incline Dumbbell Press', cue: 'Full stretch at bottom, explode up on upper chest fibers', defaultReps: '8-12' },
      { name: 'Flat Barbell Bench Press', cue: 'Tuck elbows 45°, pin scapulae into the bench', defaultReps: '6-8' },
      { name: 'Cable Low-to-High Flyes', cue: 'Scoop elbows up towards midline to target upper pecs', defaultReps: '12-15' },
      { name: 'Weighted Chest Dips', cue: 'Torso angled forward 30°, elbows flare slightly', defaultReps: '8-10' },
      { name: 'Decline Barbell Bench Press', cue: 'Focus driving through lower sternal pec fibers', defaultReps: '8-10' },
    ],
    Back: [
      { name: 'Conventional Deadlift', cue: 'Pull slack out of bar, drive the earth away with feet', defaultReps: '3-5' },
      { name: 'Lat Pulldown (Wide Grip)', cue: 'Pull through your elbows straight to clavicle level', defaultReps: '10-12' },
      { name: 'Bent-Over Barbell Rows', cue: 'Pull directly towards lower abdominal crease', defaultReps: '6-8' },
      { name: 'Weighted Pull-Ups', cue: 'Chest to bar, achieve dead hang on eccentric', defaultReps: '5-8' },
      { name: 'Seated Cable Row (V-Grip)', cue: 'Lead with retracted shoulder blades, avoid rocking', defaultReps: '10-12' },
    ],
    Legs: [
      { name: 'Barbell Back Squat', cue: 'Spine neutral, push knees out over midfoot', defaultReps: '5-8' },
      { name: 'Romanian Deadlift (Barbell)', cue: 'Hinge hips backwards until hamstrings fully load', defaultReps: '8-10' },
      { name: 'Leg Press (Quad Focus)', cue: 'Feet positioned low on plate, avoid lifting lower back', defaultReps: '10-12' },
      { name: 'Bulgarian Split Squat', cue: 'Slight torso forward lean to maximize glute/quad load', defaultReps: '8-10' },
      { name: 'Lying Hamstring Curls', cue: 'Keep hips pinned into bench, curl explosively', defaultReps: '12-15' },
    ],
    Shoulders: [
      { name: 'Standing Barbell Overhead Press', cue: 'Brace core and glutes, push head through window', defaultReps: '5-8' },
      { name: 'Seated Dumbbell Shoulder Press', cue: 'Palms angled slightly inward at 60° plane of scapula', defaultReps: '8-10' },
      { name: 'Dumbbell Lateral Raises', cue: 'Lead with elbows, avoid using body momentum', defaultReps: '12-15' },
      { name: 'Rear Delt Flyes (Machine/Cable)', cue: 'Drive elbows back in line with shoulders, hold contraction', defaultReps: '15' },
      { name: 'Cable Lateral Raise (Behind Back)', cue: 'Constant tension throughout bottom stretch position', defaultReps: '12-15' },
    ],
    Arms: [
      { name: 'Standing Barbell Bicep Curls', cue: 'Lock elbows by sides, full supination on ascent', defaultReps: '8-10' },
      { name: 'Incline Dumbbell Curls', cue: 'Bench at 45°, deep stretch on the long head of bicep', defaultReps: '10-12' },
      { name: 'Hammer Curls (Dumbbell)', cue: 'Neutral grip targets the brachialis for arm thickness', defaultReps: '10-12' },
      { name: 'Triceps Rope Pushdowns', cue: 'Flay rope apart at bottom, lock out triceps hard', defaultReps: '12-15' },
      { name: 'EZ-Bar Skull Crushers', cue: 'Lower to hairline behind crown, stretch long head', defaultReps: '8-10' },
    ]
  };

  const [customRoutine, setCustomRoutine] = useState<Record<string, { name: string; cue: string; defaultReps: string }[]>>({
    Chest: exerciseLibrary.Chest,
    Back: exerciseLibrary.Back,
    Legs: exerciseLibrary.Legs,
    Shoulders: exerciseLibrary.Shoulders,
    Arms: exerciseLibrary.Arms,
  });

  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [easterEgg, setEasterEgg] = useState<{ quote: string; badge: string; icon: string } | null>(null);

  const defaultRestSeconds = trainingGoal === 'Pure Strength' ? 180 : trainingGoal === 'Hypertrophy' ? 90 : 45;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && restTimeLeft !== null && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (restTimeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, restTimeLeft]);

  const triggerRestTimer = (seconds?: number) => {
    const time = seconds !== undefined ? seconds : defaultRestSeconds;
    setRestTimeLeft(time);
    setTimerRunning(true);
  };

  const activeExercises = customRoutine[selectedMuscle] || [];
  const currentCompletedCount = activeExercises.filter((_, idx) => !!completedExercises[`${selectedMuscle}-${trainingGoal}-${idx}`]).length;
  const isRoutineFinished = activeExercises.length > 0 && currentCompletedCount === activeExercises.length;

  const toggleExercise = (idx: number) => {
    const key = `${selectedMuscle}-${trainingGoal}-${idx}`;
    const nextVal = !completedExercises[key];
    const nextState = { ...completedExercises, [key]: nextVal };
    setCompletedExercises(nextState);
    if (nextVal) triggerRestTimer();

    const allDone = activeExercises.every((_, i) => (i === idx ? nextVal : !!nextState[`${selectedMuscle}-${trainingGoal}-${i}`]));
    if (allDone) {
      setEasterEgg({ quote: "Session annihilated. Neon glowing pumps activated. Gains deposited.", badge: "Cyber Titan", icon: "⚡" });
    } else {
      setEasterEgg(null);
    }
  };

  const addExerciseToRoutine = (ex: { name: string; cue: string; defaultReps: string }) => {
    if (activeExercises.some((item) => item.name === ex.name)) return;
    setCustomRoutine((prev) => ({ ...prev, [selectedMuscle]: [...(prev[selectedMuscle] || []), ex] }));
  };

  const removeExerciseFromRoutine = (idx: number) => {
    setCustomRoutine((prev) => ({ ...prev, [selectedMuscle]: prev[selectedMuscle].filter((_, i) => i !== idx) }));
    const updated = { ...completedExercises };
    delete updated[`${selectedMuscle}-${trainingGoal}-${idx}`];
    setCompletedExercises(updated);
  };

  const resetCurrentRoutine = () => {
    setEasterEgg(null);
    setRestTimeLeft(null);
    setTimerRunning(false);
    setCompletedExercises({});
  };

  // --- SPORTS & LEADERBOARD DATA ---
  const sportsData: Record<string, { calories: number; time: string; metric: string; sessions: number; chart: number[] }> = {
    Basketball: { calories: 850, time: '1h 45m', metric: 'Vertical Jump: +2in', sessions: 12, chart: [40, 70, 45, 90, 60, 100, 80] },
    Running: { calories: 620, time: '5h 20m', metric: 'Avg Pace: 5:40/km', sessions: 8, chart: [30, 50, 40, 60, 50, 80, 70] },
    Cycling: { calories: 1200, time: '8h 15m', metric: 'Top Speed: 42km/h', sessions: 6, chart: [60, 80, 50, 90, 70, 100, 90] },
    Swimming: { calories: 950, time: '4h 10m', metric: 'Pace: 1:30/100m', sessions: 10, chart: [50, 40, 60, 80, 50, 70, 60] },
  };
  const currentSportStats = sportsData[selectedSport] || sportsData['Basketball'];

  const leaderboardData = [
    { rank: 1, name: 'Zaid Nizami', points: 14250, trend: '+450', tier: 'Elite', color: isDark ? 'text-yellow-300' : 'text-amber-600', bg: isDark ? 'bg-yellow-400/10 border border-yellow-400/30' : 'bg-amber-100 border border-amber-300' },
    { rank: 2, name: 'Marcus R.', points: 13100, trend: '+120', tier: 'Pro', color: 'text-pink-500', bg: isDark ? 'bg-pink-400/10 border border-pink-400/30' : 'bg-pink-100 border border-pink-300' },
  ];

  const calendarDays = [
    { day: 'Mon', date: 14, workout: 'Chest & Delts', status: 'completed' },
    { day: 'Tue', date: 15, workout: 'Back & Lats', status: 'completed' },
    { day: 'Wed', date: 16, workout: 'Active Recovery', status: 'completed' },
    { day: 'Thu', date: 17, workout: 'Legs & Quads', status: 'pending' },
    { day: 'Fri', date: 18, workout: 'Shoulders & Arms', status: 'pending' },
  ];

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight flex items-center space-x-3">
                  <span className={isDark ? "bg-gradient-to-r from-yellow-300 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]" : "text-gray-900"}>
                    Performance Command Center
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isDark ? 'bg-pink-500/10 text-pink-400 border border-pink-500/40 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-pink-100 text-pink-600 border border-pink-300'}`}>
                    NEON ACTIVE
                  </span>
                </h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Live physiological feedback, habit compliance, and macro progression.</p>
              </div>
              <button onClick={() => setActiveTab('daily-planner')} className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-black font-extrabold text-xs px-5 py-3 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] transition active:scale-95">
                <Dumbbell className="w-4 h-4 text-black" /><span>Launch Workout</span>
              </button>
            </div>

            {dashboardEasterEgg && (
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-orange-500/20 border-yellow-300/50 shadow-[0_0_30px_rgba(250,204,21,0.2)]' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
                <div className="flex items-center space-x-3">
                  <Sparkles className={`w-5 h-5 animate-pulse ${isDark ? 'text-yellow-300' : 'text-amber-600'}`} />
                  <p className={`text-sm font-bold flex-1 ${isDark ? 'text-yellow-200' : 'text-amber-900'}`}>{dashboardEasterEgg}</p>
                  <button onClick={() => setDashboardEasterEgg(null)} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}><X className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className={`p-5 rounded-2xl border transition ${isDark ? 'bg-gray-900/90 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:border-pink-500/60' : 'bg-white border-pink-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>Live Heart Rate</span>
                  <HeartPulse className={`w-4 h-4 animate-pulse ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>142</span>
                  <span className={`text-xs font-bold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>BPM (Zone 3)</span>
                </div>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 to-yellow-300 h-full rounded-full w-[72%] shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border transition ${isDark ? 'bg-gray-900/90 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:border-orange-500/60' : 'bg-white border-orange-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Weekly Volume</span>
                  <Flame className={`w-4 h-4 animate-bounce ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>14,280</span>
                  <span className={`text-xs font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>kg tonnage</span>
                </div>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-300 h-full rounded-full w-[85%] shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border transition ${isDark ? 'bg-gray-900/90 border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.15)] hover:border-yellow-400/60' : 'bg-white border-amber-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>Injury Risk Index</span>
                  <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-yellow-300' : 'text-amber-600'}`} />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-black ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>12</span>
                  <span className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/ 100 (Optimal)</span>
                </div>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full rounded-full w-[12%] shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border transition ${isDark ? 'bg-gray-900/90 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:border-pink-500/60' : 'bg-white border-pink-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>Current Streak</span>
                  <Trophy className={`w-4 h-4 ${isDark ? 'text-yellow-300' : 'text-amber-500'}`} />
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>19</span>
                  <span className={`text-xs font-bold ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>Days Active</span>
                </div>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-300 to-pink-500 h-full rounded-full w-[95%] shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`lg:col-span-2 p-6 rounded-2xl border flex flex-col justify-between ${isDark ? 'bg-gray-900/90 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.1)]' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className={`text-lg font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Activity className={`w-5 h-5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
                        <span>Workout Progression Bridge</span>
                      </h2>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Real-time transition log between completed and pending movements.</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isDark ? 'bg-pink-500/10 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-700 border-pink-200'}`}>
                      Split: Push A
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-950/80 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                        <span>Previous Exercise</span>
                        <CheckCircle className={`w-4 h-4 ${isDark ? 'text-yellow-300' : 'text-amber-600'}`} />
                      </div>
                      <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Incline Dumbbell Press</h3>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Logged: 4 Sets × 38kg (10, 10, 8, 8 reps)</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold pt-2 border-t border-gray-200 dark:border-gray-800">
                        <span className="text-gray-500">RPE: 8.5</span>
                        <span className={`font-bold ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>+2.5kg PR Beat</span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-gradient-to-br from-pink-950/20 to-gray-950 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.15)]' : 'bg-pink-50/50 border-pink-300'}`}>
                      <div className={`flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                        <span>Up Next</span>
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                      <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Weighted Chest Dips</h3>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Target: 4 Sets × Bodyweight + 20kg</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold pt-2 border-t border-gray-200 dark:border-gray-800">
                        <span className="text-gray-500">Rest Interval: 90s</span>
                        <button onClick={() => setActiveTab('daily-planner')} className={`font-bold flex items-center space-x-1 ${isDark ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'}`}>
                          <span>Execute</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></span>
                    <span>CNS Readiness: 94% (Neon Overload Ready)</span>
                  </span>
                  <span>Estimated Duration: 48 mins</span>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isDark ? 'bg-gray-900/90 border-yellow-400/30 shadow-[0_0_20px_rgba(250,204,21,0.1)]' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Target className={`w-5 h-5 ${isDark ? 'text-yellow-300' : 'text-amber-500'}`} />
                      <span>Daily Goals Checklist</span>
                    </h2>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${isDark ? 'text-yellow-300 bg-yellow-400/10 border-yellow-400/30' : 'text-amber-700 bg-amber-100 border-amber-300'}`}>
                      {dailyGoals.filter(g => g.completed).length}/{dailyGoals.length} Done
                    </span>
                  </div>
                  <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Complete all 4 habits today to trigger the neon recovery badge.</p>

                  <div className="space-y-2.5">
                    {dailyGoals.map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => toggleDailyGoal(goal.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition select-none ${
                          goal.completed
                            ? isDark ? 'bg-yellow-950/20 border-yellow-400/30 text-gray-400' : 'bg-amber-50 border-amber-200 text-gray-500'
                            : isDark ? 'bg-gray-950 border-gray-800 text-gray-200 hover:border-yellow-400/40' : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-amber-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition ${
                            goal.completed ? 'bg-yellow-400 border-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.8)]' : isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'
                          }`}>
                            {goal.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <p className={`text-xs font-bold ${goal.completed ? 'line-through text-gray-400' : isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                              {goal.title}
                            </p>
                            <span className="text-[10px] text-gray-500 uppercase font-semibold">{goal.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500">
                  <span>Resets at 00:00 IST</span>
                  <span className={`font-bold ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>+250 XP per Habit</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'daily-planner':
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  <span className={isDark ? "bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]" : "text-gray-900"}>
                    Interactive Daily Target Planner
                  </span>
                </h1>
                <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Select your muscle group, pick exercises, and track rest timers.</p>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center space-x-4 ${isDark ? 'bg-gray-900 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'bg-white border-orange-300 shadow-sm'}`}>
                <div className="p-3 bg-orange-500/20 text-orange-500 rounded-xl">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Rest Timer</span>
                  <div className={`text-2xl font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {restTimeLeft !== null ? formatTimer(restTimeLeft) : '0:00'}
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 pl-2 border-l border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    disabled={restTimeLeft === null || restTimeLeft === 0}
                    className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} disabled:opacity-40 transition`}
                  >
                    {timerRunning ? <Pause className="w-4 h-4 text-orange-500" /> : <Play className="w-4 h-4 text-orange-500" />}
                  </button>
                  <button onClick={() => triggerRestTimer(60)} className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${isDark ? 'bg-gray-800 hover:bg-orange-500 hover:text-black text-gray-300' : 'bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700'}`}>+60s</button>
                  <button onClick={() => triggerRestTimer(90)} className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${isDark ? 'bg-gray-800 hover:bg-orange-500 hover:text-black text-gray-300' : 'bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700'}`}>+90s</button>
                  <button onClick={() => { setRestTimeLeft(null); setTimerRunning(false); }} className="p-1 text-gray-400 hover:text-red-500 transition"><X className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {isRoutineFinished && easterEgg && (
              <div className={`p-6 rounded-3xl border-2 ${isDark ? 'bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-orange-500/20 border-yellow-300/60 shadow-[0_0_35px_rgba(250,204,21,0.3)]' : 'bg-amber-50 border-amber-400'}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl p-3 bg-gray-950/80 rounded-2xl border border-yellow-300/40">{easterEgg.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-black bg-yellow-400 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]">
                          Neon Easter Egg Unlocked
                        </span>
                        <span className="text-xs font-bold text-pink-500">• {easterEgg.badge}</span>
                      </div>
                      <h3 className={`text-lg font-black mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>"{easterEgg.quote}"</h3>
                    </div>
                  </div>
                  <button onClick={resetCurrentRoutine} className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black text-xs px-4 py-2.5 rounded-xl font-extrabold shadow-md transition">
                    <RotateCcw className="w-3.5 h-3.5 text-black" />
                    <span>Run Again</span>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-xs font-bold text-pink-500 uppercase tracking-wider">1. Select Target Muscle</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'].map((muscle) => (
                  <button
                    key={muscle}
                    onClick={() => { setSelectedMuscle(muscle); setEasterEgg(null); }}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border ${
                      selectedMuscle === muscle 
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 border-yellow-300 text-black shadow-[0_0_20px_rgba(236,72,153,0.5)] scale-[1.02]' 
                        : isDark ? 'bg-gray-900 border-gray-800 text-gray-400 hover:border-pink-500/50 hover:text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-pink-400'
                    }`}
                  >
                    {muscle}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-orange-500 uppercase tracking-wider">2. Session Adaptation & Target Rest</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Hypertrophy', label: 'Bodybuilding / Hypertrophy', rest: '90s Rest', desc: 'Max muscle size and fiber tear' },
                  { id: 'Pure Strength', label: 'Pure Strength', rest: '180s Rest', desc: 'Max neuromuscular force' },
                  { id: 'Fat Loss', label: 'Fat Loss & Conditioning', rest: '45s Rest', desc: 'High metabolic conditioning burn' }
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => { setTrainingGoal(goal.id); setEasterEgg(null); }}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      trainingGoal === goal.id 
                        ? isDark ? 'bg-gradient-to-br from-orange-950/40 to-gray-900 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-orange-50 border-orange-400 text-gray-900'
                        : isDark ? 'bg-gray-900 border-gray-800 text-gray-400 hover:border-orange-500/40' : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center justify-between">
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{goal.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${isDark ? 'bg-gray-800 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>{goal.rest}</span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{goal.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold tracking-tight flex items-center space-x-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Dumbbell className="w-5 h-5 text-pink-500" />
                  <span>Your Custom {selectedMuscle} Routine</span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${isDark ? 'bg-gray-800 text-yellow-300 border-yellow-300/30' : 'bg-amber-100 text-amber-800 border-amber-300'}`}>
                    {currentCompletedCount} / {activeExercises.length} Done
                  </span>
                </h2>
                <button onClick={resetCurrentRoutine} className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${isDark ? 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white' : 'bg-white border-gray-300 text-gray-600 hover:text-black'}`}>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeExercises.map((item, idx) => {
                  const exerciseKey = `${selectedMuscle}-${trainingGoal}-${idx}`;
                  const isDone = !!completedExercises[exerciseKey];

                  return (
                    <div key={idx} className={`border p-5 rounded-2xl flex flex-col justify-between transition-all ${isDone ? 'opacity-60 bg-gray-100 dark:bg-gray-950 border-gray-300 dark:border-gray-800' : isDark ? 'bg-gray-900 border-gray-800 hover:border-pink-500/40' : 'bg-white border-gray-200 hover:border-pink-300 shadow-sm'}`}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-bold text-lg ${isDone ? 'line-through text-gray-400' : isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${isDark ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-600 border-pink-200'}`}>{item.defaultReps}</span>
                            <button onClick={() => removeExerciseFromRoutine(idx)} className="text-gray-400 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}><strong className="text-yellow-500">Cue:</strong> {item.cue}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                        <button onClick={() => triggerRestTimer()} className="text-xs text-gray-500 hover:text-orange-500 flex items-center space-x-1 transition">
                          <Timer className="w-3.5 h-3.5 text-orange-500" />
                          <span>Start Rest ({defaultRestSeconds}s)</span>
                        </button>
                        <button onClick={() => toggleExercise(idx)} className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${isDone ? 'bg-green-100 dark:bg-green-900/30 text-green-600 border border-green-400' : 'bg-gradient-to-r from-pink-500 to-orange-500 text-black shadow-md hover:brightness-110'}`}>
                          <Check className="w-3.5 h-3.5 text-black" />
                          <span>{isDone ? 'Finished' : 'Mark Done'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'nutrition':
        const advice = getDietAdvice();
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight flex items-center space-x-3">
                <span className={isDark ? "bg-gradient-to-r from-yellow-300 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]" : "text-gray-900"}>
                  Adaptive BMI-Synced Nutrition Engine
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${isDark ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30' : 'bg-amber-100 text-amber-700 border-amber-300'}`}>
                  NEON MACRO
                </span>
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Your caloric targets and macro splits dynamically adapt based on your BMI, height, weight, and objective.</p>
            </div>

            {dietEasterEgg && (
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-orange-500/20 border-yellow-300/40 shadow-lg' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <p className="text-sm font-bold flex-1">{dietEasterEgg}</p>
                  <button onClick={() => setDietEasterEgg(null)} className="text-gray-400 hover:text-black dark:hover:text-white"><X className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            {/* Interactive BMI & TDEE Control Panel */}
            <div className={`p-6 rounded-2xl border space-y-6 ${isDark ? 'bg-gray-900 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.1)]' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-pink-500/20 text-pink-500 rounded-xl"><Scale className="w-6 h-6" /></div>
                <div>
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Biometric BMI & TDEE Calibration</h2>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Adjust sliders to instantly recompute your caloric baseline and customized nutrition plan.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>Weight: {weightKg} kg</label>
                  <input type="range" min="40" max="140" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="w-full accent-pink-500 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-pink-500 uppercase">Height: {heightCm} cm</label>
                  <input type="range" min="140" max="210" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full accent-pink-500 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-orange-500 uppercase">Age: {age} yrs</label>
                  <input type="range" min="15" max="70" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-orange-500 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className={`p-4 rounded-xl border flex items-center justify-between ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <div>
                    <span className="text-xs text-gray-500 font-bold uppercase">Computed BMI</span>
                    <div className={`text-3xl font-black mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{calculatedBMI}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-bold uppercase">BMI Classification</span>
                    <div className={`text-sm font-bold mt-0.5 ${bmiStatus.color}`}>{bmiStatus.label}</div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-center justify-between ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <div>
                    <span className="text-xs text-gray-500 font-bold uppercase">Estimated Maintenance (TDEE)</span>
                    <div className="text-3xl font-black text-yellow-500 mt-0.5">{tdee} <span className="text-sm font-normal text-gray-500">kcal</span></div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-bold uppercase">Basal Metabolic Rate</span>
                    <div className={`text-sm font-bold mt-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{Math.round(bmr)} kcal/day</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Objective Selector */}
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>Select Objective</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'bulking', title: 'Bulking (Muscle Gain)', tag: 'Surplus Protocol' },
                  { id: 'cutting', title: 'Cutting (Fat Loss)', tag: 'Deficit Protocol' },
                  { id: 'maintain', title: 'Maintain (Recomposition)', tag: 'Isocaloric Protocol' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleDietSwitch(mode.id as any)}
                    className={`p-4 rounded-xl text-left border transition ${
                      dietMode === mode.id 
                        ? isDark ? 'bg-gradient-to-br from-pink-950/40 to-gray-900 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-pink-50 border-pink-400 text-gray-900'
                        : isDark ? 'bg-gray-950 border-gray-800 text-gray-400 hover:border-pink-500/40' : 'bg-white border-gray-200 text-gray-600 hover:border-pink-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{mode.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${isDark ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-600 border-pink-200'}`}>{mode.tag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Adjusted Macro Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`border-t-4 border-t-yellow-400 p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <span className="text-xs font-semibold text-gray-500 uppercase">BMI-Synced Calories</span>
                <div className={`text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{adjustedCalories} <span className="text-sm font-normal text-gray-500">kcal</span></div>
                <p className="text-[11px] text-yellow-500 mt-2 font-semibold">Customized for BMI {calculatedBMI}</p>
              </div>
              <div className={`border-t-4 border-t-pink-500 p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <span className="text-xs font-semibold text-gray-500 uppercase">Protein Target</span>
                <div className={`text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{adjustedProtein}g</div>
                <p className="text-[11px] text-pink-500 mt-2 font-semibold">2.3g/kg bodyweight</p>
              </div>
              <div className={`border-t-4 border-t-orange-500 p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <span className="text-xs font-semibold text-gray-500 uppercase">Carbohydrates</span>
                <div className={`text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{adjustedCarbs}g</div>
                <p className="text-[11px] text-orange-500 mt-2 font-semibold">Glycogen fuel</p>
              </div>
              <div className={`border-t-4 border-t-amber-400 p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <span className="text-xs font-semibold text-gray-500 uppercase">Healthy Fats</span>
                <div className={`text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{adjustedFats}g</div>
                <p className="text-[11px] text-amber-500 mt-2 font-semibold">Hormone balance</p>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className={isDark ? "bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent" : "text-gray-900"}>Multi-Sport Analytics</span>
            </h1>
            <div className="flex overflow-x-auto pb-4 gap-3">
              {Object.keys(sportsData).map((sport) => (
                <button key={sport} onClick={() => setSelectedSport(sport)} className={`whitespace-nowrap px-5 py-2.5 rounded-full font-semibold text-sm transition ${selectedSport === sport ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-black shadow-md' : isDark ? 'bg-gray-900 text-gray-400 border border-gray-800' : 'bg-white text-gray-700 border border-gray-300'}`}>
                  {sport}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-orange-500/30' : 'bg-white border-orange-200 shadow-sm'}`}>
                <span className="text-sm font-semibold text-orange-500 uppercase">Total Burn</span>
                <div className={`text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentSportStats.calories} <span className="text-sm text-gray-500">kcal</span></div>
              </div>
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-pink-200 shadow-sm'}`}>
                <span className="text-sm font-semibold text-pink-500 uppercase">Active Time</span>
                <div className={`text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentSportStats.time}</div>
              </div>
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-gray-900 border-yellow-400/30' : 'bg-white border-amber-200 shadow-sm'}`}>
                <span className="text-sm font-semibold text-yellow-500 uppercase">Key Metric</span>
                <div className="text-2xl font-bold text-yellow-500 mt-2">{currentSportStats.metric}</div>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className={isDark ? "bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent" : "text-gray-900"}>Training Schedule</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {calendarDays.map((day, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${day.status === 'completed' ? isDark ? 'bg-yellow-950/20 border-yellow-400/40' : 'bg-amber-50 border-amber-300' : isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <span className="text-xs font-bold text-yellow-500 uppercase">{day.day}</span>
                  <div className={`text-2xl font-extrabold my-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{day.date}</div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{day.workout}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className={isDark ? "bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent" : "text-gray-900"}>Global Leaderboard</span>
            </h1>
            <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-gray-900 border-pink-500/30' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {leaderboardData.map((user) => (
                  <div key={user.rank} className="grid grid-cols-12 gap-4 p-4 items-center">
                    <div className={`col-span-1 text-center font-bold ${isDark ? 'text-yellow-300' : 'text-amber-600'}`}>{user.rank}</div>
                    <div className={`col-span-5 font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                    <div className="col-span-3 text-right font-extrabold text-pink-500">{user.points.toLocaleString()} pts</div>
                    <div className="col-span-3 text-right"><span className={`px-3 py-1 rounded-full text-xs font-bold ${user.bg} ${user.color}`}>{user.tier}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className={isDark ? "bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent" : "text-gray-900"}>PT Data Export</span>
            </h1>
            <div className={`p-8 rounded-2xl max-w-xl border ${isDark ? 'bg-gray-900 border-orange-500/30' : 'bg-white border-gray-200 shadow-sm'}`}>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Generate and export training logs and biomechanics notes for your physical therapist.</p>
              <button onClick={() => alert("Downloading encrypted workout report...")} className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-black font-extrabold py-3 rounded-xl shadow-md transition">Download PDF Report</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen font-sans transition-colors duration-200 ${isDark ? 'bg-black text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <aside className={`w-full lg:w-64 p-6 flex flex-col justify-between z-10 border-r ${isDark ? 'bg-gray-900/90 border-pink-500/20' : 'bg-white border-gray-200'}`}>
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-yellow-300 via-pink-500 to-orange-500 rounded-xl shadow-md">
                <Activity className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                PulseFit
              </span>
            </div>

            {/* Dark/Light Mode Switch */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-yellow-300 hover:border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.2)]' 
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-gray-700" />}
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'daily-planner', label: 'Daily Planner', icon: Dumbbell },
              { id: 'calendar', label: 'Schedule', icon: Calendar },
              { id: 'analytics', label: 'Sports Analytics', icon: LineChart },
              { id: 'nutrition', label: 'Nutrition', icon: Utensils },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
              { id: 'export', label: 'PT Export', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-yellow-300 border border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.2)] translate-x-1 font-bold'
                        : 'bg-pink-100 text-pink-700 border border-pink-300 font-bold translate-x-1'
                      : isDark
                        ? 'text-gray-400 hover:bg-gray-800/60 hover:text-pink-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-pink-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? isDark ? 'text-yellow-300' : 'text-pink-600' : ''}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className={`pt-6 border-t flex items-center space-x-3 mt-8 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-pink-500 flex items-center justify-center font-black text-black shadow-md">Z</div>
          <div>
            <p className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>Zaid Nizami</p>
            <span className="text-xs font-bold text-yellow-500">JEC Campus • Online</span>
          </div>
        </div>
      </aside>

      <main className={`flex-1 p-6 lg:p-10 overflow-y-auto ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        {renderContent()}
      </main>
    </div>
  );
}