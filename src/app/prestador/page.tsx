import { Metadata } from "next";

import { Share } from "./components";

export const metadata: Metadata = {
  title: "Ana Maria",
  description:
    "Sou uma fotógrafa profissional dedicada a capturar momentos únicos com sensibilidade e criatividade.",
};

export default function ServiceProviderDetailsPage() {
  return (
    <section>
      <div className="container px-6 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="font-bold text-3xl">Ana Maria</h1>
          <Share />
        </div>

        <div className="flex flex-col items-start gap-12 md:flex-row">
          <div className="w-full h-[250px] bg-zinc-200 flex items-center justify-center md:w-[250px]">
            LOGO
          </div>

          <div className="flex-1 max-w-[800px]">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-8">
                Descrição dos Serviços
              </h2>

              <p>
                Sou uma fotógrafa profissional dedicada a capturar momentos
                únicos com sensibilidade e criatividade. Com um olhar atento aos
                detalhes, ela oferece um serviço personalizado, garantindo que
                cada foto transmita emoções autênticas e uma narrativa visual
                inesquecível.
              </p>
            </div>

            <div className="mb-8 border-t pt-8">
              <h2 className="text-xl font-semibold mb-4">Contato</h2>

              <ul className="space-y-4">
                <li>
                  <strong className="block">Email:</strong>
                  <span>ana.maria@gmail.com</span>
                </li>
                <li>
                  <strong className="block">Fone/WhatsApp:</strong>
                  <span>(51) 99999-9999</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 border-t pt-8">
              <h2 className="text-xl font-semibold mb-4">Links</h2>
              <ul>
                <li>
                  <span className="min-w-[100px] inline-block font-semibold">
                    Website
                  </span>
                  <a href="https://google.com.br">https://anamaria.com.br</a>
                </li>
                <li>
                  <span className="min-w-[100px] inline-block font-semibold">
                    Instagram
                  </span>
                  <a href="https://instagram.com">
                    https://instagram.com/ana.maria
                  </a>
                </li>
                <li>
                  <span className="min-w-[100px] inline-block font-semibold">
                    Behance
                  </span>
                  <a href="https://behance.net">
                    https://behance.net/ana.maria
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
