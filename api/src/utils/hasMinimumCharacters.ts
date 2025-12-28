
export default function hasMinimumCharacters(value: string, min = 3): boolean {
  // if there is not string provided, return false
  if (!value) return false;

  const normalized = String(value).trim().replace(/"/g, '');

  // return true or false
  return normalized.length >= min;
}
