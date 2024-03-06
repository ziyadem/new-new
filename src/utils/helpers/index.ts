export const formatNum = (num: number) =>
  new Intl.NumberFormat("jA-JP").format(+num);

export const formatPhone = (num: string | number): string => {
  return String(num)
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3 $4-$5");
};

export const generateSku = (
  ikpu: string,
  name: string,
  date: Date = new Date()
): string => {
  const formatDate = `${date.getFullYear().toString().substring(2, 4)}${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${date.getDate()}${date.getSeconds()}`;

  return `${ikpu}-${name.substring(0, 3)}-${formatDate}`;
};

export const fromFormatPhone = (phone: string) =>
  phone?.split(/[+ ()-]/).join("");

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

export const navigate = (path: string): void => {
  window.location.href = path;
};
