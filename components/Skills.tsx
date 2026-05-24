import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";

const skillCategories = [
  {
    link: "#",
    text: "Languages",
    items: [
      { name: "C", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
    ]
  },
  {
    link: "#",
    text: "Frontend",
    items: [
      { name: "HTML", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Bootstrap", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "React.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Material UI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" }
    ]
  },
  {
    link: "#",
    text: "Backend",
    items: [
      { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "NestJS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ]
  },
  {
    link: "#",
    text: "Core Concepts",
    items: [
      { name: "Data Structures and Algorithms" },
      { name: "Object-Oriented Programming" },
      { name: "Operating Systems" },
      { name: "Database Management Systems" },
      { name: "Computer Networks" },
      { name: "Theory of Computation" }
    ]
  },
  {
    link: "#",
    text: "Databases",
    items: [
      { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    link: "#",
    text: "Tools & Platforms",
    items: [
      { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Postman", url: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { name: "MATLAB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" },
      { name: "Vercel", url: "https://cdn.simpleicons.org/vercel/white" },
      { name: "Render", url: "https://cdn.simpleicons.org/render/white" },
      { name: "Hugging Face Spaces", url: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" }
    ]
  }
];

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="min-h-[140vh] bg-white text-black font-sans flex flex-col justify-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="projects-banner w-full z-10 md:flex-shrink-0">
        <div className="small-label">
          TECHNICAL CAPABILITIES
        </div>
        <h1>
          CRAFTING <br />
          INTELLIGENT <br />
          EXPERIENCES <br />
          WITH ELEGANCE.
        </h1>
        <div className="bottom-text">
          Engineering modern interfaces with intelligence and precision.
        </div>
      </section>

      <div className="w-full border-t border-black relative overflow-hidden">
        <FlowingMenu
          items={skillCategories}
          speed={3}
          marqueeBgColor="#000000"
        />
      </div>
    </motion.section>
  );
};

export default Skills;
