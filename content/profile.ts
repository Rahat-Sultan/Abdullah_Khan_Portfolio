export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceRole = {
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  current: boolean;
  summary: string;
};

export type EducationItem = {
  school: string;
  credential: string;
  years: string;
};

export type ClientProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  /** Public CTA label. Destination URL is never shown to visitors. */
  ctaLabel: string;
  /** Hidden until admin supplies a real destination. Empty means no outbound link. */
  destinationUrl: string;
  images: string[];
  featured: boolean;
  updatedAt: string;
};

export const profile = {
  name: "Abdullah Khan",
  title: "Digital Marketing Specialist",
  location: "Gulberg, Islamabad",
  phone: "+92 334 5759593",
  email: "khaanabdullah415@gmail.com",
  resumePath: "/Abdullah-Khan-Resume.pdf",
  greeting: "Hi, I’m Abdullah Khan – Digital Marketing Specialist",
  intro:
    "Passionate about digital marketing and business growth, I specialize in social media management, WordPress development, Meta Ads, and content strategy. With a strong foundation in Artificial Intelligence, I combine creativity with data-driven insights to build impactful campaigns and deliver measurable results.",
  about: [
    "I am a Digital Marketing Specialist based in Gulberg, Islamabad. My work sits at the intersection of social media, paid advertising, and WordPress — helping brands stay consistent online while turning campaigns into inquiries.",
    "At Aj Digital Agency I support social media management, content creation, post designing, and Meta Ads campaign execution, while assisting with client projects and day-to-day digital marketing operations. That client work spans migration, healthcare, accounting, aesthetics, and travel brands.",
    "Alongside campaign work I bring an academic foundation in Artificial Intelligence (Bachelor of Science, NUML, expected 2026), which I use to stay analytical — tracking performance through Meta Pixel, Events Manager, and platform insights rather than guessing.",
  ],
  social: {
    email: "mailto:khaanabdullah415@gmail.com",
    linkedin: "",
    instagram: "",
  },
  languages: [
    { name: "Urdu", level: "Native Proficiency" },
    { name: "English", level: "Working Proficiency" },
  ],
} as const;

export const skillGroups: SkillGroup[] = [
  {
    title: "Marketing Platforms",
    items: [
      "Meta Ads Manager",
      "Meta Business Suite",
      "Facebook Business Manager",
      "TikTok Ads Manager",
    ],
  },
  {
    title: "Content & Design",
    items: ["Canva Pro", "CapCut", "InShot", "Pixlr", "Remove.bg", "Microsoft Designer"],
  },
  {
    title: "Web & CMS",
    items: ["WordPress CMS", "Elementor"],
  },
  {
    title: "Analytics & Reporting",
    items: [
      "Meta Pixel — website tracking & conversion measurement",
      "Meta Events Manager — event monitoring & data tracking",
      "Meta Business Insights — campaign performance analysis",
      "Facebook Insights — audience & page performance analytics",
      "Instagram Insights — engagement & reach analysis",
      "TikTok Analytics — content & campaign performance tracking",
    ],
  },
];

export const expertise = [
  "Social Media Strategy & Management",
  "Content Creation & Copywriting",
  "Social Media Paid Advertising",
  "Analytics & Performance Tracking",
  "Influencer Marketing & Partnerships",
  "Community Engagement",
  "Brand Development",
  "A/B Testing for Ads",
  "Trend Analysis & Market Research",
];

export const strengths = [
  "Team Collaboration & Coordination",
  "Attention to Detail",
  "Time Management",
  "Effective Communication",
  "Problem Solving",
  "Adaptability",
  "Results-Oriented",
  "Analytical Thinking",
];

export const experience: ExperienceRole[] = [
  {
    id: "aj-digital-agency",
    company: "Aj Digital Agency",
    title: "Social Media Specialist",
    start: "January 2023",
    end: "Present",
    current: true,
    summary:
      "Supported social media management, content creation, post designing, and Meta Ads campaign execution while assisting with client projects and day-to-day digital marketing operations.",
  },
];

export const education: EducationItem[] = [
  {
    school: "National University Of Modern Languages (NUML)",
    credential: "Bachelor of Science in Artificial Intelligence",
    years: "Expected 2026",
  },
  {
    school: "Bahria College Naval Anchorage",
    credential: "ICS",
    years: "2019 – 2021",
  },
  {
    school: "Islamabad Model College For Boys (IMCB G-10/4)",
    credential: "Matric",
    years: "2018",
  },
];

/**
 * Portfolio cards derived from “Key Clients Managed” on the resume.
 * Images and destination URLs are placeholders until the admin portal supplies them.
 */
export const projects: ClientProject[] = [
  {
    id: "az-migration",
    slug: "az-migration",
    title: "AZ Migration (Pvt.) Ltd.",
    category: "Website & Social",
    summary:
      "Designed and developed the company’s WordPress website and managed Facebook, Instagram, and TikTok platforms.",
    highlights: [
      "Planned and executed Meta Ads campaigns",
      "Enhanced brand visibility and audience engagement",
      "Maintained a consistent digital presence across all channels",
    ],
    ctaLabel: "View campaign",
    destinationUrl: "",
    images: [],
    featured: true,
    updatedAt: "2026-08-01",
  },
  {
    id: "noor-medical-complex",
    slug: "noor-medical-complex",
    title: "Noor Medical Complex",
    category: "Social & Ads",
    summary:
      "Managed Facebook and Instagram accounts, created and scheduled social media content, and optimized Meta Ads.",
    highlights: [
      "Executed and optimized Meta Ads campaigns",
      "Increased brand awareness and audience engagement",
      "Supported digital marketing initiatives",
    ],
    ctaLabel: "View campaign",
    destinationUrl: "",
    images: [],
    featured: true,
    updatedAt: "2026-07-20",
  },
  {
    id: "aah-accounting",
    slug: "aah-accounting-services",
    title: "AAH Accounting Services",
    category: "Paid Social",
    summary:
      "Managed Facebook and Instagram marketing and executed high-performing Meta Ads campaigns.",
    highlights: [
      "Increased brand visibility",
      "Generated quality business inquiries",
    ],
    ctaLabel: "View campaign",
    destinationUrl: "",
    images: [],
    featured: true,
    updatedAt: "2026-07-10",
  },
  {
    id: "glamorous-aesthetic",
    slug: "glamorous-aesthetic-clinic",
    title: "Glamorous Aesthetic Clinic",
    category: "Creative & Ads",
    summary:
      "Designed social media posts and marketing visuals, managed Meta Business Suite, and handled Meta Ads campaigns.",
    highlights: [
      "Optimized Facebook and Instagram pages",
      "Scheduled and published social media content",
    ],
    ctaLabel: "View campaign",
    destinationUrl: "",
    images: [],
    featured: false,
    updatedAt: "2026-06-15",
  },
  {
    id: "grace-medical",
    slug: "grace-medical-centre",
    title: "Grace Medical Centre",
    category: "Social Management",
    summary:
      "Managed Facebook and Instagram accounts and planned social content while maintaining a consistent brand identity.",
    highlights: [
      "Increased audience engagement",
      "Strengthened the clinic’s online presence",
    ],
    ctaLabel: "View campaign",
    destinationUrl: "",
    images: [],
    featured: false,
    updatedAt: "2026-05-01",
  },
  {
    id: "zkd-visa",
    slug: "zkd-visa-services",
    title: "ZKD Visa Services & Travel (Private) Limited",
    category: "Social & Campaigns",
    summary:
      "Managed social platforms, created engaging content, and supported digital marketing campaigns.",
    highlights: [
      "Increased brand visibility",
      "Improved audience engagement",
    ],
    ctaLabel: "View campaign",
    destinationUrl: "",
    images: [],
    featured: false,
    updatedAt: "2026-04-01",
  },
];

export const services = [
  {
    id: "social",
    title: "Social Media Strategy & Management",
    description:
      "Day-to-day platform management across Facebook, Instagram, and TikTok — planning, publishing, and keeping a consistent brand presence.",
  },
  {
    id: "content",
    title: "Content Creation & Copywriting",
    description:
      "Post design and copy for campaigns, including visuals produced in Canva Pro, CapCut, InShot, Pixlr, Remove.bg, and Microsoft Designer.",
  },
  {
    id: "ads",
    title: "Social Media Paid Advertising",
    description:
      "Meta Ads campaign execution and optimization, with TikTok Ads Manager support and A/B testing for ads.",
  },
  {
    id: "wordpress",
    title: "WordPress & Elementor",
    description:
      "WordPress CMS builds and landing presence using Elementor — used in client work such as company website development.",
  },
  {
    id: "analytics",
    title: "Analytics & Performance Tracking",
    description:
      "Tracking and reporting through Meta Pixel, Events Manager, Business Insights, Facebook Insights, Instagram Insights, and TikTok Analytics.",
  },
  {
    id: "growth",
    title: "Brand Development & Research",
    description:
      "Community engagement, brand development, influencer marketing & partnerships, and trend analysis with market research.",
  },
];

export function featuredProjects(limit = 3): ClientProject[] {
  return [...projects]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, limit);
}
