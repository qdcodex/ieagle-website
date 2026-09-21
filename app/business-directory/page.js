import PageHero from "@/components/PageHero";
import BusinessExplorer from "@/components/BusinessExplorer";

export const metadata = { title: "Business Directory — iEagle" };

export default function BusinessDirectory() {
  return (
    <>
      <PageHero eyebrow="Business Directory" title="Find a member business" subtitle="Filter by state, district, important area, category or company." />
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <BusinessExplorer />
        </div>
      </section>
    </>
  );
}
