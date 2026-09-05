'use client';
import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Dumbbell, LineChart, Utensils, Activity, 
  AlertTriangle, Flame, Timer, Target, Trophy, Users, TrendingUp, 
  Calendar, FileText, Download, CheckCircle 
} from 'lucide-react';

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [selectedSport, setSelectedSport] = useState('Basketball');
  const [workoutIntensity, setWorkoutIntensity] = useState('Moderate');
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: '', target_muscle: 'CHEST', injury_risk_notes: '', video_url: ''
  });

  // --- MOCK DATA ENGINE ---
  const sportsData = {
    Basketball: { calories: 850, time: '1h 45m', metric: 'Vertical Jump: +2in', sessions: 12, chart: [40, 70, 45, 90, 60, 100, 80] },
    Running: { calories: 620, time: '5h 20m', metric: 'Avg Pace: 5:40/km', sessions: 8, chart: [30, 50, 40, 60, 50, 80, 70] },
    Cycling: { calories: 1200, time: '8h 15m', metric: 'Top Speed: 42km/h', sessions: 6, chart: [60, 80, 50, 90, 70, 100, 90] },
    Swimming: { calories: 950, time: '4h 10m', metric: 'Pace: 1:30/100m', sessions: 10, chart: [50, 40, 60, 80, 50, 70, 60] },
  };
  const currentSportStats = sportsData[selectedSport] || sportsData['Basketball'];

  const leaderboardData = [
    { rank: 1, name: 'Zaid Nizami', points: 14250, trend: '+450', tier: 'Elite', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { rank: 2, name: 'Marcus R.', points: 13100, trend: '+120', tier: 'Pro', color: 'text-gray-300', bg: 'bg-gray-300/10' },
    { rank: 3, name: 'Sarah J.', points: 12850, trend: '+300', tier: 'Pro', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { rank: 4, name: 'David K.', points: 11400, trend: '-50', tier: 'Challenger', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { rank: 5, name: 'Elena V.', points: 10900, trend: '+150', tier: 'Challenger', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  const calendarDays = [
    { day: 'Mon', date: 14, workout: 'Upper Body', status: 'completed' },
    { day: 'Tue', date: 15, workout: 'Basketball', status: 'completed' },
    { day: 'Wed', date: 16, workout: 'Active Recovery', status: 'completed' },
    { day: 'Thu', date: 17, workout: 'Lower Body', status: 'pending' },
    { day: 'Fri', date: 18, workout: 'Running (5km)', status: 'pending' },
    { day: 'Sat', date: 19, workout: 'Rest', status: 'pending' },
    { day: 'Sun', date: 20, workout: 'Yoga & Mobility', status: 'pending' },
  ];

  // --- DATABASE LOGIC ---
  const fetchExercises = () => {
    fetch('http://localhost:5000/api/exercises')
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => console.error('Failed to fetch exercises:', err));
  };

  useEffect(() => { fetchExercises(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ name: '', target_muscle: 'CHEST', injury_risk_notes: '', video_url: '' });
        fetchExercises();
      }
    } catch (error) { console.error('Error adding exercise:', error); }
  };

  // --- DYNAMIC NUTRITION LOGIC ---
  const baseCalories = 2200;
  const getMacros = () => {
    if (workoutIntensity === 'Rest') return { cals: baseCalories, protein: 150, carbs: 200, fats: 88 };
    if (workoutIntensity === 'Low') return { cals: baseCalories + 300, protein: 160, carbs: 250, fats: 95 };
    if (workoutIntensity === 'Moderate') return { cals: baseCalories + 600, protein: 180, carbs: 320, fats: 100 };
    return { cals: baseCalories + 1000, protein: 200, carbs: 450, fats: 110 };
  };
  const currentMacros = getMacros();

  // --- EXPORT LOGIC ---
  const handleExport = () => {
    alert("Generating encrypted PDF report for Physical Therapist...");
  };

  // --- TAB RENDER LOGIC ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Performance Command Center</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-pointer">
                <span className="text-xs font-semibold text-gray-400 uppercase">Live Heart Rate (BLE)</span>
                <div className="text-3xl font-extrabold text-red-400 mt-2">142 <span className="text-sm font-normal">BPM</span></div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-pointer">
                <span className="text-xs font-semibold text-gray-400 uppercase">Weekly Volume</span>
                <div className="text-3xl font-extrabold text-yellow-400 mt-2">14,280 <span className="text-sm font-normal">kg</span></div>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-pointer">
                <span className="text-xs font-semibold text-gray-400 uppercase">Injury Risk</span>
                <div className="text-3xl font-extrabold text-green-400 mt-2">Low <span className="text-sm font-normal">12/100</span></div>
              </div>
            </div>
          </div>
        );
      
      case 'muscle-directory':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Muscle Directory</h1>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-blue-500">Add New Exercise (SQL Server)</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-white transition-colors" placeholder="Exercise Name (e.g., Squat)" />
                  <select name="target_muscle" value={formData.target_muscle} onChange={handleChange} className="bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-white transition-colors">
                    <option value="CHEST">Chest</option>
                    <option value="BACK">Back</option>
                    <option value="SHOULDERS">Shoulders</option>
                    <option value="LEGS">Legs</option>
                    <option value="CORE">Core</option>
                  </select>
                </div>
                <textarea name="injury_risk_notes" value={formData.injury_risk_notes} onChange={handleChange} rows="2" className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-white transition-colors" placeholder="Injury Prevention Notes..."></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-2.5 rounded-lg transition-all">Save to Database</button>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-100">{exercise.name}</h3>
                    <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">{exercise.target_muscle}</span>
                  </div>
                  <div className="bg-yellow-950/30 border border-yellow-800/40 rounded-lg p-3 text-xs text-yellow-300">
                    <div className="flex items-center space-x-1.5 font-semibold mb-1"><AlertTriangle className="w-3.5 h-3.5 text-yellow-400" /><span>Injury Note</span></div>
                    {exercise.injury_risk_notes || 'No notes provided.'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Multi-Sport Analytics</h1>
            <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar">
              {Object.keys(sportsData).map((sport) => (
                <button key={sport} onClick={() => setSelectedSport(sport)} className={`whitespace-nowrap px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${ selectedSport === sport ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105' : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'}`}>{sport}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-2xl transform transition-all hover:scale-105">
                <div className="flex justify-between items-center mb-2"><span className="text-sm font-semibold text-gray-400">Total Burn</span><Flame className="text-orange-500 w-5 h-5" /></div>
                <div className="text-4xl font-extrabold text-white">{currentSportStats.calories} <span className="text-lg font-normal text-gray-500">kcal</span></div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-2xl transform transition-all hover:scale-105">
                <div className="flex justify-between items-center mb-2"><span className="text-sm font-semibold text-gray-400">Active Time</span><Timer className="text-blue-500 w-5 h-5" /></div>
                <div className="text-4xl font-extrabold text-white">{currentSportStats.time}</div>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-2xl transform transition-all hover:scale-105">
                <div className="flex justify-between items-center mb-2"><span className="text-sm font-semibold text-gray-400">Key Metric</span><Target className="text-green-500 w-5 h-5" /></div>
                <div className="text-2xl font-bold text-green-400 mt-2">{currentSportStats.metric}</div>
              </div>
            </div>
          </div>
        );

      case 'nutrition':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Adaptive Meal Engine</h1>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Today's Workout Intensity</h2>
              <div className="flex flex-col md:flex-row gap-3">
                {['Rest', 'Low', 'Moderate', 'High'].map(level => (
                  <button key={level} onClick={() => setWorkoutIntensity(level)} className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all border ${ workoutIntensity === level ? 'bg-orange-500 border-orange-500 text-white scale-[1.02]' : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-600'}`}>{level}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border-t-4 border-t-orange-500 border-x border-b border-gray-800 p-6 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase">Target Calories</span>
                <div className="text-4xl font-extrabold text-white mt-2">{currentMacros.cals}</div>
              </div>
              <div className="bg-gray-900 border-t-4 border-t-red-500 border-x border-b border-gray-800 p-6 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase">Protein</span>
                <div className="text-4xl font-extrabold text-white mt-2">{currentMacros.protein}g</div>
              </div>
              <div className="bg-gray-900 border-t-4 border-t-blue-500 border-x border-b border-gray-800 p-6 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase">Carbs</span>
                <div className="text-4xl font-extrabold text-white mt-2">{currentMacros.carbs}g</div>
              </div>
              <div className="bg-gray-900 border-t-4 border-t-yellow-500 border-x border-b border-gray-800 p-6 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase">Fats</span>
                <div className="text-4xl font-extrabold text-white mt-2">{currentMacros.fats}g</div>
              </div>
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Global Leaderboard</h1>
                <p className="text-gray-400 mt-2">Rankings update dynamically based on weekly volume and consistency.</p>
              </div>
              <button className="flex items-center space-x-2 bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition">
                <Users className="w-4 h-4" /><span>Invite Friends</span>
              </button>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 bg-gray-950/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-1 text-center">Rank</div>
                <div className="col-span-5">Athlete</div>
                <div className="col-span-3 text-right">Weekly Points</div>
                <div className="col-span-3 text-right">Status</div>
              </div>
              <div className="divide-y divide-gray-800/50">
                {leaderboardData.map((user) => (
                  <div key={user.rank} className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-800/50 transition-colors ${user.rank === 1 ? 'bg-blue-900/10' : ''}`}>
                    <div className="col-span-1 flex justify-center">
                      {user.rank === 1 ? <Trophy className="w-6 h-6 text-yellow-400 drop-shadow-md" /> : <span className="font-bold text-gray-500">{user.rank}</span>}
                    </div>
                    <div className="col-span-5 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-xs text-white">{user.name.charAt(0)}</div>
                      <span className={`font-bold ${user.rank === 1 ? 'text-blue-400' : 'text-gray-200'}`}>{user.name}</span>
                    </div>
                    <div className="col-span-3 text-right flex flex-col items-end">
                      <span className="font-extrabold text-gray-100">{user.points.toLocaleString()}</span>
                      <div className="flex items-center space-x-1 text-xs text-green-400"><TrendingUp className="w-3 h-3" /><span>{user.trend}</span></div>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.bg} ${user.color}`}>{user.tier}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Training Schedule</h1>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {calendarDays.map((day, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${day.status === 'completed' ? 'bg-green-900/10 border-green-900/30' : 'bg-gray-900 border-gray-800'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase">{day.day}</span>
                    {day.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="text-2xl font-extrabold text-white mb-2">{day.date}</div>
                  <div className={`text-sm font-medium ${day.status === 'completed' ? 'text-green-400' : 'text-gray-300'}`}>
                    {day.workout}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold tracking-tight">PT Data Export</h1>
            <p className="text-gray-400">Securely generate and export your biomechanics and volume history for your physical therapist.</p>
            
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-2xl">
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-800">
                <div className="p-3 bg-blue-600/20 rounded-xl"><FileText className="w-8 h-8 text-blue-500" /></div>
                <div>
                  <h3 className="text-xl font-bold text-white">Monthly Progress Report</h3>
                  <p className="text-sm text-gray-400">Includes volume trends, injury notes, and mobility metrics.</p>
                </div>
              </div>
              <button 
                onClick={handleExport}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-3 rounded-xl transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  // --- MAIN LAYOUT ---
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-950 text-gray-100 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between z-10">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20"><Activity className="w-6 h-6 text-white" /></div>
            <span className="text-xl font-bold tracking-wide">PulseFit</span>
          </div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-blue-600/20 text-blue-400 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}><LayoutDashboard className="w-5 h-5" /><span>Dashboard</span></button>
            <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'calendar' ? 'bg-blue-600/20 text-blue-400 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}><Calendar className="w-5 h-5" /><span>Schedule</span></button>
            <button onClick={() => setActiveTab('muscle-directory')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'muscle-directory' ? 'bg-blue-600/20 text-blue-400 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}><Dumbbell className="w-5 h-5" /><span>Muscle Directory</span></button>
            <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'analytics' ? 'bg-blue-600/20 text-blue-400 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}><LineChart className="w-5 h-5" /><span>Sports Analytics</span></button>
            <button onClick={() => setActiveTab('nutrition')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'nutrition' ? 'bg-blue-600/20 text-blue-400 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}><Utensils className="w-5 h-5" /><span>Nutrition</span></button>
            <button onClick={() => setActiveTab('leaderboard')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'leaderboard' ? 'bg-blue-600/20 text-blue-400 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}><Trophy className="w-5 h-5" /><span>Leaderboard</span></button>
            <button onClick={() => setActiveTab('export')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'export' ? 'bg-blue-600/20 text-blue-400 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}><Download className="w-5 h-5" /><span>PT Export</span></button>
          </nav>
        </div>
        
        <div className="pt-6 border-t border-gray-800 flex items-center justify-between group cursor-pointer mt-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold shadow-md">Z</div>
            <div>
              <p className="text-sm font-semibold leading-tight group-hover:text-blue-400 transition-colors">Zaid Nizami</p>
              <span className="text-xs text-green-400">JEC Campus • Online</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-gray-950">
        {renderContent()}
      </main>
      
    </div>
  );
}