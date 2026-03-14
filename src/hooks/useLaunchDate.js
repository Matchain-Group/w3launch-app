export const useLaunchDate = () => {
  const envDate = import.meta.env.VITE_LAUNCH_DATE;
  if (envDate) {
    const parsed = new Date(envDate);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};
