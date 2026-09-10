export function maskEmail(email: string): string {
  const [local = '', domain = ''] = email.split('@');
  if (!domain) return email;

  const maskedLocal =
    local.length <= 2
      ? `${local[0] || ''}*`
      : `${local[0]}***${local[local.length - 1]}`;

  const [domainName = '', tld = ''] = domain.split('.');
  const maskedDomain =
    domainName.length <= 2
      ? `${domainName[0] || ''}*`
      : `${domainName[0]}***${domainName[domainName.length - 1]}`;

  return `${maskedLocal}@${maskedDomain}${tld ? `.${tld}` : ''}`;
}

export function maskPhone(countryCode: string, phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) {
    return `${countryCode} ***`;
  }
  const lastFour = digits.slice(-4);
  return `${countryCode} ***-***-${lastFour}`;
}
