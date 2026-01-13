<script>
  import TimerDisplay from "./components/TimerDisplay.svelte";
  import {
    timer,
    timerState,
    timerSeconds,
    sessionType,
    isPaused,
    breakDeficit,
    completedPomodoros,
  } from "./stores/timer.js";

  // Format seconds to human-readable duration
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.round(seconds / 60);
    return `${mins} min`;
  };

  // Preset break durations (in seconds)
  const BREAK_PRESETS = [
    { seconds: 5 * 60, label: "5 min" },
    { seconds: 10 * 60, label: "10 min" },
    { seconds: 15 * 60, label: "15 min" },
  ];

  // Filter presets to only show those <= current deficit
  $: availablePresets = BREAK_PRESETS.filter((p) => p.seconds <= $breakDeficit);
  $: showAllButton =
    $breakDeficit > 0 &&
    !availablePresets.some((p) => p.seconds === $breakDeficit);
</script>

<main>
  <h1>Pomoflex</h1>
  <p class="tagline">A flexible pomodoro timer</p>

  <TimerDisplay seconds={$timerSeconds} sessionType={$sessionType} />

  <div class="controls">
    {#if $timerState === "idle"}
      <button on:click={timer.start}>Start</button>
    {:else if $timerState === "work"}
      {#if $isPaused}
        <button on:click={timer.resume}>Resume</button>
      {:else}
        <button on:click={timer.pause}>Pause</button>
      {/if}
      <button class="secondary" on:click={timer.stop}>Stop</button>
    {:else if $timerState === "rollover"}
      <div class="break-selector">
        <span class="break-label">Take a break:</span>
        <div class="break-options">
          {#each availablePresets as preset (preset.seconds)}
            <button
              class="break-option"
              on:click={() => timer.takeBreak(preset.seconds)}
            >
              {preset.label}
            </button>
          {/each}
          {#if showAllButton}
            <button class="break-option" on:click={() => timer.takeBreak()}>
              All ({formatDuration($breakDeficit)})
            </button>
          {/if}
        </div>
      </div>
      <button class="secondary" on:click={timer.skipBreak}>Skip</button>
    {:else if $timerState === "break"}
      <button class="secondary" on:click={timer.stop}>End Break</button>
    {/if}
  </div>

  <div class="stats">
    <span class="stat">
      <span class="stat-value">{$completedPomodoros}</span>
      <span class="stat-label">completed</span>
    </span>
    {#if $breakDeficit > 0}
      <span class="stat">
        <span class="stat-value">{formatDuration($breakDeficit)}</span>
        <span class="stat-label">banked</span>
      </span>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
  }

  h1 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin: 0;
  }

  .tagline {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin: 0;
  }

  .controls {
    display: flex;
    gap: var(--spacing-md);
  }

  .secondary {
    background-color: var(--color-bg-elevated);
    color: var(--color-text);
  }

  .secondary:hover {
    background-color: var(--color-bg-elevated-hover);
  }

  .stats {
    display: flex;
    gap: var(--spacing-xl);
    margin-top: var(--spacing-md);
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .stat-value {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-text);
  }

  .stat-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .break-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .break-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }

  .break-options {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    justify-content: center;
  }

  .break-option {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
    background-color: var(--color-break);
    color: var(--color-bg);
  }

  .break-option:hover {
    filter: brightness(0.9);
  }
</style>
