import { serviceProviders } from "@/api";
import { ServiceProvidersCard } from "./components";

export default function ProviderListingPage() {
  console.log(serviceProviders);

  return (
    <section>
      <div className="container px-6 py-12">
        <div className="flex justify-between items-baseline mb-8">
          <h1 className="font-bold text-3xl">
            Selecione o prestador de serviço
          </h1>

          <div className="flex items-center gap-2">
            <label htmlFor="category">Categoria: </label>
            <select
              name="category"
              id="category"
              className="cursor-pointer border py-2 px-3 hover:bg-zinc-100/80 text-base"
            >
              <option value="Automotivo">Automotivo</option>
              <option value="Beleza">Beleza</option>
              <option value="Consultoria">Consultoria</option>
              <option value="Fotografia">Fotografia</option>
              <option value="Jardinagem">Jardinagem</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>

        <div className="grid justify-around content-around grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          {serviceProviders.map(({ id, name, image }) => (
            <article key={id}>
              <ServiceProvidersCard image={image} name={name} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
