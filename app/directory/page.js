import PageHero from "@/components/PageHero";
import DirectoryExplorer from "@/components/DirectoryExplorer";

export const metadata = { title: "Directory — iEagle" };

export default function Directory() {
  return (
    <>
      <PageHero eyebrow="Directory" title="Find your chapter" subtitle="Chapters by state and district." />
      <DirectoryExplorer />
    </>
  );
}
