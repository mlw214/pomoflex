/**
 * Request permission to show browser notifications
 * @returns {Promise<boolean>} Whether permission was granted
 */
export const requestPermission = async () => {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    return false;
  }

  const result = await Notification.requestPermission();
  return result === "granted";
};

/**
 * Show a browser notification
 * @param {string} title - Notification title
 * @param {string} body - Notification body text
 */
export const notify = (title, body) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  new Notification(title, { body });
};
