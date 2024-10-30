"use client";

import { ChangeEvent, useState } from "react";

interface CategoryFilterProps {
  defaultCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  defaultCategory,
  onChange,
}: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    onChange(newCategory);
  };

  return (
    <div className="flex items-center gap-2 self-end lg:self-auto">
      <label htmlFor="category" className="text-zinc-600">
        Categoria:
      </label>
      <select
        name="category"
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
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
  );
}
