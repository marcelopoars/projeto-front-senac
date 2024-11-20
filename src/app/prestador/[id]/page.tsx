import { Metadata } from "next";
import Image from "next/image";

import { api } from "@/lib";
import { ServiceProviderResponse } from "./interfaces";

import { Share } from "./components";

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

  return (
    <section>
      <div className="container px-6 py-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <div className="w-full h-[250px] bg-zinc-200 flex items-center justify-center md:w-[250px]">
            {prestador.logo ? (
              <Image
                src={prestador.logo}
                alt={`${usuario.nome} Logo`}
                width={250}
                height={250}
                className="object-contain"
              />
            ) : (
              <span>LOGO</span>
            )}
          </div>

          <div className="w-full flex-1 max-w-[800px]">
            <div className="flex items-baseline justify-between mb-8">
              <h1 className="font-bold text-3xl">{usuario.nome}</h1>
              <Share />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-8">
                Descrição dos Serviços
              </h2>
              <p>Atividade: {prestador.atividade}</p>
              <p>Categoria: {categoria.nome}</p>
            </div>

            <div className="mb-8 border-t pt-8">
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
