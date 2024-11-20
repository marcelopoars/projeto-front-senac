import { User } from "@phosphor-icons/react/dist/ssr";

export function Avatar() {
  return (
    <div className="w-full h-[250px] bg-zinc-100 flex items-center justify-center md:w-[250px]">
      <User className="size-24 text-sky-500" />
    </div>
  );
}
