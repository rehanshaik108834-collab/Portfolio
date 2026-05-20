import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkGallery.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  code: string;
  img: string;
}

const projects: Project[] = [
  { id: 1, title: "CodePulse", code: "FULL-STACK AI", img: "/image/project-1.png" },
  { id: 2, title: "RepoMind", code: "FASTAPI / RAG", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" },
  { id: 3, title: "Lannent", code: "ARCHITECTURE", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" },
  { id: 4, title: "Nexora", code: "E-COMMERCE", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: 5, title: "NexSync", code: "WEB DASHBOARD", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2616&auto=format&fit=crop" },
  { id: 6, title: "MRI Viz", code: "3D / DATA", img: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2670&auto=format&fit=crop" }
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
          <div className="card" key={project.id}>
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