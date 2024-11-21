import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

interface ContactInfoProps {
  email: string;
  phone: string;
  whatsappLink: string;
}

export function ContactInfo({ email, phone, whatsappLink }: ContactInfoProps) {
  return (
    <div className="flex flex-col gap-8 items-start mb-8 border-t pt-8 md:flex-row md:justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4">Contato</h2>
        <ul className="space-y-4">
          <li>
            <strong className="block">Email:</strong>
            <span>{email}</span>
          </li>
          <li>
            <strong className="block">Fone/WhatsApp:</strong>
            <span>{phone}</span>
          </li>
        </ul>
      </div>
      <div>
        <a
          className="flex items-center justify-center gap-2 bg-green-500 font-semibold py-2 px-4 rounded-full hover:bg-green-700 hover:text-white transition"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Entre em contato pelo WhatsApp"
        >
          {<WhatsappLogo className="size-6" />} WhatsApp
        </a>
      </div>
    </div>
  );
}
