import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileIntro } from "@/features/profile/components/profile-intro";
import { ProfileSections } from "@/features/profile/components/profile-sections";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <ProfileHeader />
      <div className="px-5 pb-8 pt-2">
        <ProfileIntro />
        <ProfileSections />
      </div>
    </main>
  );
}
