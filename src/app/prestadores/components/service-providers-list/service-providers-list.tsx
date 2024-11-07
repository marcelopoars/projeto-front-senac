"use client";

import React, { useEffect, useState } from "react";

import { ServiceProvidersCard } from "../service-providers-card";
import { CategoryFilter } from "../category-filter";
import { serviceProviders } from "@/lib";

export function ServiceProvidersList() {
  const defaultCategory = "Automotivo";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [filteredProviders, setFilteredProviders] = useState(serviceProviders);

  useEffect(() => {
    setFilteredProviders(
      serviceProviders.filter(
        (provider) => provider.category === selectedCategory
      )
    );
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as typeof selectedCategory);
  };

  return (
    <section>
      <div className="container px-6 py-12">
        <div className="flex flex-col justify-between items-baseline mb-8 lg:flex-row">
          <h1 className="font-bold text-2xl mb-8 md:text-3xl lg:mb-0">
            Encontre um prestador de serviço
          </h1>

          <CategoryFilter
            defaultCategory={"defaultCategory"}
            onChange={handleCategoryChange}
          />
        </div>

        <div className="grid justify-around content-around grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
          {filteredProviders.map(({ id, name, image }) => (
            <ServiceProvidersCard key={id} image={image} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
