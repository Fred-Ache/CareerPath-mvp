export type CountryCode = "GH" | "NG";

export type Country = {
  code: CountryCode;
  name: "Ghana" | "Nigeria";
};

export const COUNTRIES: Country[] = [
  { code: "GH", name: "Ghana" },
  { code: "NG", name: "Nigeria" },
];
