export function roundToTwoDecimals(num: number) {
  return Math.round(num * 100) / 100;
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(parseInt(dateString));
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval > 1 ? 's' : ''} ago`;
  }
  return `${Math.floor(seconds)} second${seconds !== 1 ? 's' : ''} ago`;
}

export function formatTimeFromNow(dateString: string): string {
  console.log('🚀 ~ formatTimeFromNow ~ dateString:', dateString);
  const date = new Date(parseInt(dateString));
  console.log('🚀 ~ formatTimeFromNow ~ date:', date);
  const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `in ${interval} year${interval > 1 ? 's' : ''}`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `in ${interval} month${interval > 1 ? 's' : ''}`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `in ${interval} day${interval > 1 ? 's' : ''}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `in ${interval} hour${interval > 1 ? 's' : ''}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `in ${interval} minute${interval > 1 ? 's' : ''}`;
  }
  return `in ${Math.floor(seconds)} second${seconds !== 1 ? 's' : ''}`;
}

export function truncateString(str: string, maxLength: number = 6): string {
  if (str.length <= maxLength) {
    return str; // Return the original string if it's shorter than or equal to maxLength
  }
  return `${str.slice(0, maxLength)}...`; // Return the truncated string with "..."
}
export function convertToSeconds(relativeDelay: string): number | string {
  // Check if the input is a valid number
  const numericValue = Number(relativeDelay);
  if (!isNaN(numericValue)) {
    return relativeDelay;
  }

  // Remove whitespace and convert to lowercase
  const trimmedDelay = relativeDelay.replace(/\s/g, '').toLowerCase();

  // Regular expression to match the input format
  const regex = /^(\d+)([smhd]?)$/;
  const match = trimmedDelay.match(regex);

  // If the input doesn't match the expected format, return 0
  if (!match) {
    return 0;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 3600;
    case 'd':
      return value * 86400;
    default:
      throw new Error('Invalid unit');
  }
}

export function getCurrentDateTime(): string {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hour}:${minute}`;
}
