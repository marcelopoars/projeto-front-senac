import { Share } from "./components";

export default function ServiceProviderDetailsPage() {
  return (
    <section>
      <div className="container px-6 py-12">
        <h1 className="font-bold mb-8 text-3xl">Ana Maria</h1>

        <div className="flex gap-12">
          <div className="size-[250px] bg-zinc-200 flex items-center justify-center">
            LOGO
          </div>

          <div className="max-w-[800px]">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Descrição dos Serviços
                </h2>
                <Share />
              </div>

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
