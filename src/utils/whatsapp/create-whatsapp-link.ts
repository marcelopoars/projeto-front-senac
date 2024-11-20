interface createWhatsAppLinkProps {
  phone: string;
  message: string;
}

export function createWhatsAppLink({
  phone,
  message,
}: createWhatsAppLinkProps): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
}
