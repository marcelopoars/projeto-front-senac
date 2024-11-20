import { api } from "@/lib";
import { createWhatsAppLink } from "@/utils";
import { Metadata } from "next";
import { Avatar, ContactInfo, Links, Share } from "./components";
import { ServiceProviderResponse } from "./interfaces";

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

  const whatsappLink = createWhatsAppLink({
    phone: usuario.telefone,
    message: "Olá! Gostaria de saber mais informações sobre os seus serviços.",
  });

  return (
    <section>
      <div className="container px-6 py-12 md:py-20">
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
          <Avatar />

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

            <ContactInfo
              email={usuario.email}
              phone={usuario.telefone}
              whatsappLink={whatsappLink}
            />

            <Links
              website={prestador.website}
              socialMedia={prestador.instagram}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
