"use client";

import { api } from "@/lib";

import { useEffect, useState } from "react";
import { CardCategory } from "../card-category";

interface Category {
  id: number;
  nome: string;
  criado_em: string;
}

type Categories = Category[] | null;

interface CategoriesResponse {
  message: string;
  count: number;
  categorias: Category[];
}

export function CategoryList() {
  const [categories, setCategories] = useState<Categories>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<CategoriesResponse>("/categorias/getall");
      setCategories(response.data.categorias);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
      setError("Não foi possível carregar as categorias. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-lg text-center">Carregando...</p>;
  }

  if (error) {
    return <p className="text-lg text-center text-red-500">{error}</p>;
  }

  if (categories !== null && categories.length === 0) {
    return <p className="text-lg text-center">Nenhuma categoria encontrada.</p>;
  }

  if (categories !== null && categories.length > 0) {
    return (
      <>
        <h1 className="font-bold text-3xl text-center mb-8 md:text-5xl md:mb-12">
          Escolha uma categoria de serviço.
        </h1>

        <div className="grid justify-around content-around grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:grid-cols-4">
          {categories?.map(({ id, nome }) => (
            <CardCategory key={id} category={nome} id={id} />
          ))}
        </div>
      </>
    );
  }
}
