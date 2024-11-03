export function normalizePhoneNumber(value: string): string {
  const numericValue = value.replace(/\D/g, "");

  if (numericValue.length === 0) {
    return "";
  }

  if (numericValue.length <= 2) {
    return `(${numericValue}`;
  } else if (numericValue.length <= 6) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}`;
  } else if (numericValue.length <= 10) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(
      2,
      6
    )}-${numericValue.slice(6, 10)}`;
  } else {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(
      2,
      7
    )}-${numericValue.slice(7, 11)}`;
  }
}
