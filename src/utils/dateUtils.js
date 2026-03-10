/**
 * Date utility functions.
 * Keeps date logic centralised — easy to swap for a date library (e.g. date-fns)
 * if more complex operations are needed later.
 */

/**
 * Format a Date object as "Mon DD, YYYY" e.g. "Mar 15, 2026"
 */
export const formatDateShort = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  });
};

/**
 * Format a Date object as "MM/DD/YYYY" e.g. "03/15/2026"
 */
export const formatDateNumeric = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day:   '2-digit',
    year:  'numeric',
  });
};

/**
 * Number of nights between two dates.
 * Returns 0 if either date is missing or end <= start.
 */
export const getNights = (from, to) => {
  if (!from || !to) return 0;
  const diff = to.getTime() - from.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
};

/**
 * Build a human-readable date range string.
 * e.g. "Mar 15 → Mar 18, 2026"
 */
export const formatDateRange = (from, to) => {
  if (!from) return 'Select dates';
  if (!to)   return formatDateShort(from) + ' →';
  const fromStr = from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const toStr   = to.toLocaleDateString('en-US',   { month: 'short', day: 'numeric', year: 'numeric' });
  return `${fromStr} → ${toStr}`;
};

/**
 * Returns today's Date with time zeroed out.
 */
export const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Add N days to a date. Returns a new Date (does not mutate).
 */
export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};
