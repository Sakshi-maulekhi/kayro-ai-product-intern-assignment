// Format "2026-10-26" -> "Mon, 26 Oct 2026"
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Format "10:00" -> "10:00 AM"
export function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

// Returns true if appointment is within 24 hours from now
export function isWithin24Hours(date, time) {
  const now = new Date();
  const apt = new Date(`${date}T${time}:00`);
  const diffMs = apt - now;
  return diffMs > 0 && diffMs <= 24 * 60 * 60 * 1000;
}

// Returns true if appointment datetime is in the future
export function isFuture(date, time) {
  const now = new Date();
  const apt = new Date(`${date}T${time}:00`);
  return apt > now;
}

// Get today's date string YYYY-MM-DD
// Get today's local date string YYYY-MM-DD
export function getTodayStr() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Human-friendly relative date label
export function getRelativeDate(dateStr) {
  const today = getTodayStr();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const year = tomorrowDate.getFullYear();
  const month = String(tomorrowDate.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrowDate.getDate()).padStart(2, '0');

  const tomorrowStr = `${year}-${month}-${day}`;

  if (dateStr === today) return 'Today';
  if (dateStr === tomorrowStr) return 'Tomorrow';

  return formatDate(dateStr);
}