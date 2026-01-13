import { writable, derived, get } from "svelte/store";

/**
 * Timer State Machine
 *
 * States:
 * - idle: No timer running
 * - work: 25 min work session counting down
 * - rollover: Work ended, waiting for user to take break (countdown)
 * - break: User is on break (variable duration from deficit)
 *
 * Transitions:
 * - idle → work (user starts)
 * - work → rollover (work timer ends)
 * - rollover → break (user opts to take break)
 * - rollover → work (timeout expires, auto-start new work)
 * - break → idle (break ends)
 */

// Duration constants (in seconds)
export const DURATIONS = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
  rollover: 60, // 1 minute rollover window
};

// Long break interval (every N pomodoros)
export const LONG_BREAK_INTERVAL = 4;

// Internal state
const createTimerStore = () => {
  const { subscribe, set, update } = writable({
    state: "idle", // idle | work | rollover | break
    seconds: DURATIONS.work, // seconds remaining
    breakDeficit: 0, // accumulated break time (seconds)
    completedPomodoros: 0, // count of completed work sessions
    isPaused: false, // whether timer is paused (only applies to work state)
  });

  let intervalId = null;

  const clearTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const startCountdown = () => {
    clearTimer();
    intervalId = setInterval(tick, 1000);
  };

  const tick = () => {
    const currentState = get({ subscribe });

    // Don't tick if paused (interval should be cleared, but defensive check)
    if (currentState.isPaused) return;

    const newSeconds = currentState.seconds - 1;

    // Handle timer expiration based on current state
    if (newSeconds <= 0) {
      clearTimer();

      switch (currentState.state) {
        case "work": {
          // Work complete → enter rollover window
          const newPomodoros = currentState.completedPomodoros + 1;
          const earnedBreak =
            newPomodoros % LONG_BREAK_INTERVAL === 0
              ? DURATIONS.longBreak
              : DURATIONS.shortBreak;

          set({
            state: "rollover",
            seconds: DURATIONS.rollover,
            breakDeficit: currentState.breakDeficit + earnedBreak,
            completedPomodoros: newPomodoros,
            isPaused: false,
          });

          // Start rollover countdown after state update
          startCountdown();
          break;
        }

        case "rollover": {
          // Rollover expired → auto-start new work session
          set({
            state: "work",
            seconds: DURATIONS.work,
            breakDeficit: currentState.breakDeficit,
            completedPomodoros: currentState.completedPomodoros,
            isPaused: false,
          });

          // Start work countdown after state update
          startCountdown();
          break;
        }

        case "break":
          // Break complete → return to idle
          set({
            state: "idle",
            seconds: DURATIONS.work,
            breakDeficit: currentState.breakDeficit,
            completedPomodoros: currentState.completedPomodoros,
            isPaused: false,
          });
          break;

        default:
          break;
      }
    } else {
      // Normal tick - just decrement seconds
      update((state) => ({ ...state, seconds: newSeconds }));
    }
  };

  return {
    subscribe,

    /**
     * Start a work session from idle state
     */
    start: () => {
      const currentState = get({ subscribe });
      if (currentState.state !== "idle") return;

      set({
        ...currentState,
        state: "work",
        seconds: DURATIONS.work,
        isPaused: false,
      });

      startCountdown();
    },

    /**
     * Take a break during rollover window
     * @param {number} duration - Optional custom break duration (defaults to full deficit)
     */
    takeBreak: (duration) => {
      const currentState = get({ subscribe });
      if (currentState.state !== "rollover") return;

      // Clamp requested duration to valid range
      const requestedDuration = duration ?? currentState.breakDeficit;
      const breakDuration = Math.min(
        Math.max(0, requestedDuration),
        currentState.breakDeficit,
      );

      if (breakDuration <= 0) {
        // No deficit, go back to idle
        clearTimer();
        set({
          ...currentState,
          state: "idle",
          seconds: DURATIONS.work,
          isPaused: false,
        });
        return;
      }

      clearTimer();
      set({
        state: "break",
        seconds: breakDuration,
        breakDeficit: currentState.breakDeficit - breakDuration,
        completedPomodoros: currentState.completedPomodoros,
        isPaused: false,
      });

      startCountdown();
    },

    /**
     * Skip rollover and start new work session immediately
     */
    skipBreak: () => {
      const currentState = get({ subscribe });
      if (currentState.state !== "rollover") return;

      clearTimer();
      set({
        ...currentState,
        state: "work",
        seconds: DURATIONS.work,
        isPaused: false,
      });

      startCountdown();
    },

    /**
     * Pause the current work session
     */
    pause: () => {
      const currentState = get({ subscribe });
      if (currentState.state !== "work" || currentState.isPaused) return;

      clearTimer();
      update((state) => ({ ...state, isPaused: true }));
    },

    /**
     * Resume a paused work session
     */
    resume: () => {
      const currentState = get({ subscribe });
      if (currentState.state !== "work" || !currentState.isPaused) return;

      update((state) => ({ ...state, isPaused: false }));
      startCountdown();
    },

    /**
     * Stop the timer and return to idle
     */
    stop: () => {
      clearTimer();
      update((state) => ({
        ...state,
        state: "idle",
        seconds: DURATIONS.work,
        isPaused: false,
      }));
    },

    /**
     * Reset all progress (pomodoros and deficit)
     */
    reset: () => {
      clearTimer();
      set({
        state: "idle",
        seconds: DURATIONS.work,
        breakDeficit: 0,
        completedPomodoros: 0,
        isPaused: false,
      });
    },

    /**
     * Cleanup function - call when component unmounts
     */
    destroy: () => {
      clearTimer();
    },
  };
};

export const timer = createTimerStore();

// Derived stores for convenience
export const timerState = derived(timer, ($timer) => $timer.state);
export const timerSeconds = derived(timer, ($timer) => $timer.seconds);
export const breakDeficit = derived(timer, ($timer) => $timer.breakDeficit);
export const completedPomodoros = derived(
  timer,
  ($timer) => $timer.completedPomodoros,
);
export const isPaused = derived(timer, ($timer) => $timer.isPaused);

// Map state to session type for TimerDisplay component
export const sessionType = derived(timer, ($timer) => {
  switch ($timer.state) {
    case "work":
      return "work";
    case "break":
      return "break";
    case "rollover":
      return "rollover";
    default:
      return "work";
  }
});
