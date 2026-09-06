import { About } from "@/components/home/about";
import { ContactSection } from "@/components/home/contact-section";
import { Experience } from "@/components/home/experience";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { Skills } from "@/components/home/skills";
import { getExperience, getFeaturedProjects, getProfile, getSkillGroups } from "@/lib/data";

// Revalidate the home page every 60 seconds so edits from the admin
// portal appear without a full redeploy.
export const revalidate = 60;

export default async function HomePage() {
  const [profile, skillGroups, roles, featuredProjects] = await Promise.all([
    getProfile(),
    getSkillGroups(),
    getExperience(),
    getFeaturedProjects(3),
  ]);

  return (
    <>
      <Hero profile={profile} />
      <About about={profile.about} />
      <Skills groups={skillGroups} />
      <Experience roles={roles} />
      <FeaturedProjects projects={featuredProjects} />
      <ContactSection name={profile.name} email={profile.email} />
    </>
  );
}
