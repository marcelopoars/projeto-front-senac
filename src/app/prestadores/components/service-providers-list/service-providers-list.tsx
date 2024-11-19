"use client";

import { Suspense, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryFilter } from "../category-filter";
import { ServiceProvidersCard } from "../service-providers-card";
import { api } from "@/lib";

type Provider = {
  prestador: {
    id: number;
    nome: string;
    categoria: string;
    email: string;
    telefone: string;
    cidade: string;
    estado: string;
    cpf_cnpj: string;
    atividade: string;
    services: string;
    logo: string;
    instagram: string;
    website: string;
    usuario_id: number;
  };
};

export function ServiceProvidersListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategoryId = searchParams.get("categoria") || "10";

  const [selectedCategory, setSelectedCategory] = useState<string>(
    String(initialCategoryId)
  );
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async (category: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<{ prestadores: Provider[] }>(
        `/categorias/prestadores/${category}`
      );
      setFilteredProviders(response.data.prestadores);
    } catch (error) {
      console.error("Erro ao buscar prestadores:", error);
      setError("Não foi possível carregar os prestadores. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    router.push(`/prestadores?categoria=${newCategory}`);
  };

  return (
    <section>
      <div className="container px-6 py-12">
        <div className="flex flex-col justify-between items-baseline mb-8 lg:flex-row">
          <h1 className="font-bold text-2xl mb-8 md:text-4xl lg:mb-0">
            Encontre um prestador de serviço
          </h1>

          <CategoryFilter
            defaultCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {loading && (
          <div className="py-12">
            <p className="text-lg text-center">Carregando prestadores...</p>
          </div>
        )}

        {error && (
          <div className="py-12">
            <p className="text-lg text-center text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && filteredProviders.length === 0 && (
          <div className="py-12">
            <p className="text-lg text-center">
              Nenhum prestador nesta categoria.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid justify-around content-around grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:grid-cols-4">
            {filteredProviders.map(({ prestador: { id, nome, atividade } }) => (
              <ServiceProvidersCard key={id} id={id.toString()} name={nome} role={atividade} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ServiceProvidersList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceProvidersListContent />
    </Suspense>
  );
}
