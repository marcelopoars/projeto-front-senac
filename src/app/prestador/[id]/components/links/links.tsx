interface LinksProps {
  website: string;
  socialMedia: string;
}

export function Links({ website, socialMedia }: LinksProps) {
  return (
    <div className="mb-8 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Links</h2>
      <ul className="space-y-2">
        {website && (
          <li>
            <a
              className="text-sky-500 underline underline-offset-4 hover:text-sky-600 transition"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {website}
            </a>
          </li>
        )}
        {socialMedia && (
          <li>
            <a
              className="text-sky-500 underline underline-offset-4 hover:text-sky-600 transition"
              href={socialMedia}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialMedia}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
