import { Metadata } from "next";

import { ContributorsList } from "./components";

export const metadata: Metadata = {
  title: "Contributors",
  description: "Desenvolvedores que contribuiram neste projeto.",
};

export default function ContributorsPage() {
  return (
    <section className="flex h-full">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-xl text-center font-semibold mb-5">Contributors</h1>

        <ContributorsList />
      </div>
    </section>
  );
}
