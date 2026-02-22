export const detectTechStack = (dependencies: Record<string, string>) => {
  const techMap: Record<string, string> = {
    react: "React",
    tailwindcss: "Tailwind",
    typescript: "TypeScript",
    next: "Next.js",
    vite: "Vite",
    mongodb: "MongoDB",
    firebase: "Firebase",
    "framer-motion": "Framer Motion",
    "lucide-react": "Lucide Icons",
    prisma: "Prisma",
  };

  const detected = Object.keys(dependencies)
    .filter((dep) => techMap[dep.toLowerCase()])
    .map((dep) => techMap[dep.toLowerCase()]);

  return [...new Set(detected)];
};
