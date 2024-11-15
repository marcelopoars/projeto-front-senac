"use client";

import { api } from "@/lib";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { ChangeEvent, useEffect, useState } from "react";

interface Category {
  id: number;
  nome: string;
}

interface CategoryFilterProps {
  defaultCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  defaultCategory,
  onChange,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<{ categorias: Category[] }>(
        "/categorias/getall"
      );
      setCategories(response.data.categorias);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setError("Não foi possível carregar as categorias. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    onChange(newCategory);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  if (loading)
    return (
      <div className="flex items-center gap-1 animate-pulse">
        <CircleNotch className="size-6 text-zinc-500 animate-spin" />
        <span className="text-zinc-500">Carregando...</span>
      </div>
    );

  if (error) {
    return (
      <option className="text-lg text-center text-red-500">{error}</option>
    );
  }

  return (
    <>
      {!loading && !error && categories.length > 0 && (
        <div className="w-full flex items-center gap-2 self-end md:w-auto lg:self-auto">
          <label htmlFor="category" className="max-md:sr-only text-zinc-600">
            Categoria:
          </label>

          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full min-w-[233px] cursor-pointer border py-2 px-3 hover:bg-zinc-100/80 text-base"
            disabled={loading || !!error || categories.length === 0}
          >
            {categories.map(({ id, nome }) => (
              <option key={id} value={id.toString()}>
                {nome}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
