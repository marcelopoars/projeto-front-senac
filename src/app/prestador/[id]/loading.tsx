import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <section>
      <div className="container px-6 py-12 md:py-20">
        <div className="flex items-center justify-center gap-1 animate-pulse">
          <CircleNotch className="size-6 text-zinc-500 animate-spin" />
          <span className="text-zinc-500">Carregando...</span>
        </div>
      </div>
    </section>
  );
}
