import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timer = useRef(null);
  const dialog = useRef(null);

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
      <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining}
                     onReset={handleReset}
        />
        <section className="challenge">
          <h2>{title}</h2>
          <p className="clallenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
          </p>
          <p>
            <button onClick={timerStarted ? handleStop : handleStart}>
              {timerStarted ? 'Stop' : 'Start'} Challenge
            </button>
          </p>
          <p className={timerStarted ? 'active' : undefined}>
            Time is running... / Timer inactive
          </p>
        </section>
      </>
  );
}