import { Metadata } from "next";
import { ServiceProvidersList } from "./components";

export const metadata: Metadata = {
  title: "Prestadores",
  description: "Encontre um prestador de serviço.",
};

export default function ProviderListingPage() {
  return <ServiceProvidersList />;
}
