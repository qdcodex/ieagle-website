import PageHero from "@/components/PageHero";
import MemberLoginPanel from "@/components/MemberLoginPanel";

export const metadata = { title: "Member Log in — iEagle" };

export default function MemberLogin() {
  return (
    <>
      <PageHero eyebrow="Members" title="Member Log in" subtitle="Choose your member category and sign in." />
      <MemberLoginPanel />
    </>
  );
}
