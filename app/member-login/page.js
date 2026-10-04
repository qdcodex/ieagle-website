import PageHero from "@/components/PageHero";
import MemberLoginPanel from "@/components/MemberLoginPanel";

export const metadata = { title: "Member Log in — iEagles Business Network" };

export default function MemberLogin() {
  return (
    <>
      <PageHero eyebrow="Members" title="Member Log in" subtitle="One sign-in for all iEagles members." />
      <MemberLoginPanel />
    </>
  );
}
