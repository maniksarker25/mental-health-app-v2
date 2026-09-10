export interface CountryCode {
  code: string;
  label: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
  { code: '+1', label: 'United States / Canada', flag: '🇺🇸' },
  { code: '+44', label: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', label: 'Australia', flag: '🇦🇺' },
  { code: '+64', label: 'New Zealand', flag: '🇳🇿' },
  { code: '+353', label: 'Ireland', flag: '🇮🇪' },
  { code: '+49', label: 'Germany', flag: '🇩🇪' },
  { code: '+33', label: 'France', flag: '🇫🇷' },
  { code: '+880', label: 'Bangladesh', flag: '🇧🇩' },
  { code: '+91', label: 'India', flag: '🇮🇳' },
];
