import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkGallery.css';

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: number;
  title: string;
  code: string;
  img: string;
  longDescription?: string;
  features?: string[];
  techStack?: { frontend?: string[]; backend?: string[]; other?: string[] };
  githubLink?: string;
  liveLink?: string;
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "Nexora", 
    code: "MERN / LMS", 
    img: "/image/Nexora.png",
    githubLink: "https://github.com/rehanshaik108834-collab/Online-Learning-Platform",
    longDescription: "A comprehensive Learning Management System (LMS) built with the MERN stack (MongoDB, Express, React, Node.js). This project enables instructors to create and sell online courses while allowing students to browse, purchase, and track their learning progress.\n\nStudents can browse published courses with advanced filtering, view detailed course information, and securely purchase courses with instant checkout. Instructors can create and manage courses, upload media to Cloudinary, edit course details, publish/unpublish courses, and track student purchases and progress.",
    features: [
      "User authentication (signup/login with JWT)",
      "Browse published courses with advanced filtering and sorting",
      "Secure course purchase with instant checkout",
      "Track learning progress per course and lecture",
      "Instructor dashboard to create and manage courses",
      "Upload course media (videos, images) to Cloudinary",
      "Role-Based Access Control (Student vs Instructor)",
      "Real-time upload progress tracking"
    ],
    techStack: {
      frontend: ["React 18.3.1", "Vite", "React Router v6", "Axios", "Tailwind CSS", "Radix UI", "Framer Motion", "React Player"],
      backend: ["Express.js", "Node.js", "MongoDB + Mongoose", "JWT + bcryptjs", "Cloudinary SDK", "Multer", "CORS"]
    }
  },
  { 
    id: 2, 
    title: "Nutrivo", 
    code: "AI / NUTRITION", 
    img: "/image/Nutrivo.png",
    githubLink: "https://github.com/rehanshaik108834-collab/Nutrivo"
  },
  { 
    id: 3, 
    title: "Lannent", 
    code: "GIG PLATFORM", 
    img: "/image/Lannent.png",
    githubLink: "https://github.com/IIIT-Sricity-FSD-2024-2028/40_Lannent"
  },
  { 
    id: 4, 
    title: "CodePulseAI", 
    code: "FULL-STACK AI", 
    img: "/image/codepulseai.png",
    githubLink: "https://github.com/rehanshaik108834-collab/CodePulseAI"
  },
  { 
    id: 5, 
    title: "Nexsync", 
    code: "FULL-STACK WEB", 
    img: "/image/Nexsync.png",
    githubLink: "https://github.com/rehanshaik108834-collab/nexsync_website"
  },
  { 
    id: 6, 
    title: "eEmployeeID", 
    code: "REACT / VITE", 
    img: "/image/project-1.png",
    githubLink: "https://github.com/rehanshaik108834-collab/eEmployeeID"
  },
  { 
    id: 7, 
    title: "Turing Machine Simulator", 
    code: "REACT / D3", 
    img: "/image/Turing-Machine-Simulator.png",
    githubLink: "https://github.com/rehanshaik108834-collab/turing-machine-simulator"
  }
];

const WorkGallery: React.FC = () => {
  const workRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const lettersCanvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workRef.current || !cardsContainerRef.current || !gridCanvasRef.current || !lettersCanvasRef.current || !textContainerRef.current) return;

    let requestRef: number;
    const workSection = workRef.current;
    const cardsContainer = cardsContainerRef.current;
    const gridCanvas = gridCanvasRef.current;
    const lettersCanvas = lettersCanvasRef.current;
    const textContainer = textContainerRef.current;

    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    let moveDistance = window.innerWidth * 5; 
    let currentXPosition = 0;

    // --- Canvas 2D Grid Setup ---
    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) return;

    const resizeGridCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      gridCanvas.width = window.innerWidth * dpr;
      gridCanvas.height = window.innerHeight * dpr;
      gridCanvas.style.width = `${window.innerWidth}px`;
      gridCanvas.style.height = `${window.innerHeight}px`;
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeGridCanvas();

    const drawGrid = (scrollProgress = 0) => {
      gridCtx.fillStyle = 'black';
      gridCtx.fillRect(0, 0, gridCanvas.width / (window.devicePixelRatio || 1), gridCanvas.height / (window.devicePixelRatio || 1));
      
      gridCtx.fillStyle = 'white';
      const dotSize = 1;
      const spacing = 30;
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      const rows = Math.ceil(h / spacing);
      const cols = Math.ceil(w / spacing) + 15;
      
      const offset = (scrollProgress * spacing * 10) % spacing;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          gridCtx.beginPath();
          gridCtx.arc(x * spacing - offset, y * spacing, dotSize, 0, Math.PI * 2);
          gridCtx.fill();
        }
      }
    };

    // --- Three.js Setup ---
    const lettersScene = new THREE.Scene();
    const lettersCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    lettersCamera.position.z = 20;

    const lettersRenderer = new THREE.WebGLRenderer({
      canvas: lettersCanvas,
      antialias: true,
      alpha: true,
    });
    lettersRenderer.setSize(window.innerWidth, window.innerHeight);
    lettersRenderer.setClearColor(0x000000, 0);
    lettersRenderer.setPixelRatio(window.devicePixelRatio);

    const createTextAnimationPath = (yPos: number, amplitude: number) => {
      const points = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        points.push(
          new THREE.Vector3(
            -25 + 50 * t,
            yPos + Math.sin(t * Math.PI) * -amplitude,
            (1 - Math.pow(Math.abs(t - 0.5) * 2, 2)) * -5
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
        new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1, transparent: true, opacity: 0 }) 
      );
      (line as any).curve = curve;
      return line;
    };

    const path = [
      createTextAnimationPath(10, 2),
      createTextAnimationPath(3.5, 1),
      createTextAnimationPath(-3.5, -1),
      createTextAnimationPath(-10, -2),
    ];
    path.forEach(line => lettersScene.add(line));

    textContainer.innerHTML = ''; // Reset container on mount
    
    const letterPositions = new Map();
    path.forEach((line, i) => {
      (line as any).letterElements = Array.from({ length: 15 }, () => {
        const el = document.createElement('div');
        el.className = 'letter';
        el.textContent = ['W', 'O', 'R', 'K'][i];
        textContainer.appendChild(el);
        letterPositions.set(el, {
          current: { x: 0, y: 0 },
          target: { x: 0, y: 0 },
        });
        return el;
      });
    });

    const lineSpeedMultipliers = [0.8, 1, 0.7, 0.9];

    const updateTargetPositions = (scrollProgress = 0) => {
      path.forEach((line, lineIndex) => {
        (line as any).letterElements.forEach((element: any, i: number) => {
          const curve = (line as any).curve;
          const point = curve.getPoint((i / 14 + scrollProgress * lineSpeedMultipliers[lineIndex]) % 1);
          const vector = point.clone().project(lettersCamera);
          const positions = letterPositions.get(element);
          positions.target = {
            x: (-vector.x * 0.5 + 0.5) * window.innerWidth,
            y: (-vector.y * 0.5 + 0.5) * window.innerHeight,
          };
        });
      });
    };

    const updateLetterPositions = () => {
      letterPositions.forEach((positions, element) => {
        const distX = positions.target.x - positions.current.x;
        if (Math.abs(distX) > window.innerWidth * 0.7) {
          positions.current.x = positions.target.x;
          positions.current.y = positions.target.y;
        } else {
          positions.current.x = lerp(positions.current.x, positions.target.x, 0.07);
          positions.current.y = lerp(positions.current.y, positions.target.y, 0.07);
        }
        element.style.transform = `translate(-50%, -50%) translate3d(${positions.current.x}px, ${positions.current.y}px, 0px)`;
      });
    };

    const updateCardsPosition = () => {
      // Find the specific ScrollTrigger for this component
      const st = ScrollTrigger.getAll().find(t => t.trigger === workSection);
      const progress = st ? st.progress : 0;
      
      const targetX = -moveDistance * progress;
      currentXPosition = lerp(currentXPosition, targetX, 0.07);
      gsap.set(cardsContainer, { x: currentXPosition });
    };

    const animate = () => {
      updateLetterPositions();
      updateCardsPosition();
      lettersRenderer.render(lettersScene, lettersCamera);
      requestRef = requestAnimationFrame(animate);
    };

    // --- ScrollTrigger Setup ---
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: workSection,
      start: 'top top',
      end: '+=700%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: self => {
        updateTargetPositions(self.progress);
        drawGrid(self.progress);
      },
    });

    drawGrid(0);
    animate();
    updateTargetPositions(0);

    const handleResize = () => {
      resizeGridCanvas();
      moveDistance = window.innerWidth * 5;
      
      const st = ScrollTrigger.getAll().find(t => t.trigger === workSection);
      const progress = st ? st.progress : 0;
      
      drawGrid(progress);
      lettersCamera.aspect = window.innerWidth / window.innerHeight;
      lettersCamera.updateProjectionMatrix();
      lettersRenderer.setSize(window.innerWidth, window.innerHeight);
      updateTargetPositions(progress);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      lettersRenderer.dispose();
      textContainer.innerHTML = '';
    };
  }, []);

  return (
    <section ref={workRef} id="work" className="work">
      <canvas ref={gridCanvasRef} id="grid-canvas"></canvas>
      <canvas ref={lettersCanvasRef} id="letters-canvas"></canvas>
      <div ref={textContainerRef} className="text-container"></div>
      
      <div ref={cardsContainerRef} className="cards">
        {projects.map((project) => (
          <div 
            className="card cursor-pointer hover:scale-[1.02] transition-transform duration-300" 
            key={project.id}
            onClick={() => {
              if (project.githubLink) window.open(project.githubLink, '_blank');
              else if (project.liveLink) window.open(project.liveLink, '_blank');
            }}
          >
            <div className="card-img">
              <img src={project.img} alt={project.title} />
            </div>
            <div className="card-copy">
              <p>{project.title}</p>
              <p>{project.code}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkGallery;