import { useEffect, useState } from 'react';

export default function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning walk', streak: 7 },
    { id: 2, name: 'Deep work', streak: 5 },
    { id: 3, name: 'Reading', streak: 9 },
  ]);
  const [timer, setTimer] = useState({ minutes: 25, seconds: 0, mode: 'Focus', isRunning: false });

  useEffect(() => {
    if (!timer.isRunning) return undefined;
    const interval = setInterval(() => {
      setTimer((current) => {
        if (current.seconds > 0) return { ...current, seconds: current.seconds - 1 };
        if (current.minutes > 0) return { ...current, minutes: current.minutes - 1, seconds: 59 };
        const nextMode = current.mode === 'Focus' ? 'Break' : 'Focus';
        return { mode: nextMode, minutes: nextMode === 'Focus' ? 25 : 5, seconds: 0, isRunning: false };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const toggleTimer = () => setTimer((current) => ({ ...current, isRunning: !current.isRunning }));
  const resetTimer = () => setTimer({ minutes: 25, seconds: 0, mode: 'Focus', isRunning: false });

  return (
    <div className="app-shell">
      <div className="panel hero-panel">
        <div>
          <p className="eyebrow">Daily consistency & focus</p>
          <h1>Habit & Focus Timer</h1>
        </div>
      </div>

      <div className="panel">
        <h2>Habit streaks</h2>
        {habits.map((habit) => (
          <div key={habit.id} className="transaction-row">
            <span>{habit.name}</span>
            <strong>{habit.streak} days</strong>
          </div>
        ))}
      </div>

      <div className="panel">
        <h2>{timer.mode} mode</h2>
        <div className="timer-display">
          {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
        </div>
        <div className="button-row">
          <button className="primary" onClick={toggleTimer}>{timer.isRunning ? 'Pause' : 'Start'}</button>
          <button className="secondary" onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}
