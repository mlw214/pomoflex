import bellSound from "../assets/bell.wav";

let audioElement = null;

/**
 * Play the notification bell sound
 */
export const playBell = () => {
  // Lazy-initialize audio element
  if (!audioElement) {
    audioElement = new Audio(bellSound);
  }

  // Reset to start and play
  audioElement.currentTime = 0;
  audioElement.play().catch(() => {
    // Ignore errors (e.g., user hasn't interacted with page yet)
  });
};
