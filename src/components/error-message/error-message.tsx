interface ErrorMessageProps {
  error: string | undefined;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="relative">
      <span
        className="block text-red-500 text-sm mt-2 absolute left-0 -bottom-6"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </span>
    </div>
  );
}
