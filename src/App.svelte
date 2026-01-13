<script>
  // Timer component will be imported here
</script>

<main>
  <h1>Pomoflex</h1>
  <p class="tagline">A flexible pomodoro timer</p>

  <!-- Timer component will go here -->
  <div class="timer-placeholder">
    <span class="time">25:00</span>
    <button>Start</button>
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

  .timer-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
  }

  .time {
    font-size: var(--font-size-timer);
    font-weight: 300;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
</style>