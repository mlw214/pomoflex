<script>
  import TimerDisplay from './components/TimerDisplay.svelte';

  // Timer state - will be replaced by timer store
  let seconds = 1500; // 25 minutes
  let sessionType = 'work';
</script>

<main>
  <h1>Pomoflex</h1>
  <p class="tagline">A flexible pomodoro timer</p>

  <TimerDisplay {seconds} {sessionType} />

  <!-- Controls placeholder - will be separate component -->
  <button>Start</button>
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
</style>