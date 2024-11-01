export const normalizeCpf = (value: string) => {
  value = value.replace(/\D/g, "");

  if (value.length > 11) value = value.slice(0, 11);

  return value
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};
