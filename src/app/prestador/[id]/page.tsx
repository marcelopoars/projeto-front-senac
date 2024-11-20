import { Metadata } from "next";

import { api } from "@/lib";
import { ServiceProviderResponse } from "./interfaces";

import { Share } from "./components";
import { User, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

async function getServiceProvider(
  id: string
): Promise<ServiceProviderResponse | null> {
  try {
    const { data } = await api.get(`/prestador/${id}`);
    const prestadorData = data.prestadores ? data.prestadores[0] : null;
    if (!prestadorData) {
      throw new Error("Prestador não encontrado.");
    }
    return prestadorData;
  } catch (error) {
    console.error("Erro ao buscar os dados do prestador:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await getServiceProvider(params.id);

  if (!data || !data.usuario) {
    return {
      title: "Prestador não encontrado",
      description: "Os detalhes do prestador não estão disponíveis.",
    };
  }

  const { usuario, prestador } = data;
  return {
    title: usuario.nome,
    description: prestador.services,
  };
}

export default async function ServiceProviderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getServiceProvider(params.id);

  if (!data) {
    return (
      <section>
        <div className="container px-6 py-12">
          <p className="text-center text-lg text-red-500">
            Não foi possível carregar os detalhes do prestador.
          </p>
        </div>
      </section>
    );
  }

  const { prestador, usuario, categoria } = data;

  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de saber mais informações sobre os seus serviços."
  );
  const whatsappLink = `https://api.whatsapp.com/send?phone=${usuario.telefone}&text=${whatsappMessage}`;

  return (
    <section>
      <div className="container px-6 py-12 md:py-20">
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <div className="w-full h-[250px] bg-zinc-100 flex items-center justify-center md:w-[250px]">
            <User className="size-24 text-sky-500" />
          </div>

          <div className="w-full flex-1 max-w-[800px]">
            <div className="flex items-baseline justify-between mb-12">
              <div>
                <h1 className="font-bold text-3xl">{usuario.nome}</h1>
                <span className="block text-xl">{prestador.atividade}</span>
                <span className="block text-lg text-sky-500">
                  {categoria.nome}
                </span>
              </div>
              <Share />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Descrição dos Serviços
              </h2>
              <p>{prestador.services}</p>
            </div>

            <div className="flex flex-col gap-8 items-start mb-8 border-t pt-8 md:flex-row md:justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-4">Contato</h2>
                <ul className="space-y-4">
                  <li>
                    <strong className="block">Email:</strong>
                    <span>{usuario.email}</span>
                  </li>
                  <li>
                    <strong className="block">Fone/WhatsApp:</strong>
                    <span>{usuario.telefone}</span>
                  </li>
                </ul>
              </div>
              <div>
                <a
                  className="flex items-center justify-center gap-2 bg-green-500 font-semibold py-2 px-4 rounded-full hover:bg-green-700 hover:text-white transition"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {<WhatsappLogo className="size-6" />} WhatsApp
                </a>
              </div>
            </div>

            <div className="mb-8 border-t pt-8">
              <h2 className="text-xl font-semibold mb-4">Links</h2>
              <ul className="space-y-2">
                {prestador.website && (
                  <li>
                    <a
                      className="text-sky-500 underline underline-offset-4 hover:text-sky-600 transition"
                      href={prestador.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {prestador.website}
                    </a>
                  </li>
                )}
                {prestador.instagram && (
                  <li>
                    <a
                      className="text-sky-500 underline underline-offset-4 hover:text-sky-600 transition"
                      href={prestador.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {prestador.instagram}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
