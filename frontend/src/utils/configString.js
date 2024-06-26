import { format } from "date-fns";
import { es } from "date-fns/locale/es";

const locale = es;

export const capitalize = (str) =>
  str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

export const capitalizeCategory = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const dateFormat = (date, formString) => {
  if (!date) return date;
  return format(date, formString, { locale });
};
