<script>
  /**
   * TimerDisplay Component
   * Displays the countdown timer in MM:SS format with session type indicator.
   *
   * @prop {number} seconds - Total seconds remaining (0-3599)
   * @prop {'work' | 'break' | 'rollover'} sessionType - Current session type
   */
  export let seconds = 1500; // Default 25 minutes
  export let sessionType = 'work';

  // Format seconds into MM:SS
  $: minutes = Math.floor(seconds / 60);
  $: secs = seconds % 60;
  $: displayTime = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Map session type to display label
  const sessionLabels = {
    work: 'Focus',
    break: 'Break',
    rollover: 'Rollover'
  };

  // Map session type to icon character (accessible fallback)
  const sessionIcons = {
    work: '◆',
    break: '○',
    rollover: '◇'
  };

  $: sessionLabel = sessionLabels[sessionType] || 'Focus';
  $: sessionIcon = sessionIcons[sessionType] || '◆';
</script>

<div class="timer-display" data-session={sessionType}>
  <div class="session-indicator">
    <span class="session-icon" aria-hidden="true">{sessionIcon}</span>
    <span class="session-label">{sessionLabel}</span>
  </div>

  <time class="countdown" datetime="PT{minutes}M{secs}S">
    {displayTime}
  </time>

  <div class="glow" aria-hidden="true"></div>
</div>

<style>
  .timer-display {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .session-indicator {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 500;
    transition: color var(--transition-normal);
  }

  .session-icon {
    font-size: 0.75em;
    transition: color var(--transition-normal);
  }

  .session-label {
    opacity: 0.9;
  }

  .countdown {
    font-size: var(--font-size-timer);
    font-weight: 200;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
    line-height: 1;
    transition: color var(--transition-normal);
    position: relative;
    z-index: 1;
  }

  /* Subtle ambient glow effect */
  .glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.15;
    transition: background-color var(--transition-normal);
    pointer-events: none;
    z-index: 0;
  }

  /* Session type theming */
  [data-session="work"] .session-indicator,
  [data-session="work"] .countdown {
    color: var(--color-work);
  }

  [data-session="work"] .glow {
    background-color: var(--color-work);
  }

  [data-session="break"] .session-indicator,
  [data-session="break"] .countdown {
    color: var(--color-break);
  }

  [data-session="break"] .glow {
    background-color: var(--color-break);
  }

  [data-session="rollover"] .session-indicator,
  [data-session="rollover"] .countdown {
    color: var(--color-rollover);
  }

  [data-session="rollover"] .glow {
    background-color: var(--color-rollover);
  }

  /* Responsive sizing */
  @media (min-width: 480px) {
    .countdown {
      font-size: 5.5rem;
    }

    .glow {
      width: 280px;
      height: 280px;
    }
  }
</style>