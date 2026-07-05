import React, { useEffect, useRef } from 'react';

const CanvasParticles = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 65;
    
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const handleResize = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouseInteraction = {
      x: null,
      y: null,
      radius: 170
    };

    const handleMouseMove = (e) => {
      mouseInteraction.x = e.clientX;
      mouseInteraction.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseInteraction.x = null;
      mouseInteraction.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvasWidth || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvasHeight || this.y < 0) this.speedY = -this.speedY;
      }

      draw() {
        const dotColor = theme === 'dark' 
          ? 'rgba(0, 242, 254, 0.35)' 
          : 'rgba(0, 119, 182, 0.25)';
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    initParticles();

    const connectParticles = () => {
      const lineBaseColor = theme === 'dark' ? '0, 242, 254' : '0, 119, 182';

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            let opacity = (1 - (distance / 110)) * 0.15;
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }

        if (mouseInteraction.x !== null) {
          let dxMouse = particlesArray[a].x - mouseInteraction.x;
          let dyMouse = particlesArray[a].y - mouseInteraction.y;
          let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < mouseInteraction.radius) {
            let opacity = (1 - (distanceMouse / mouseInteraction.radius)) * 0.22;
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity})`;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouseInteraction.x, mouseInteraction.y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas id="particleCanvas" ref={canvasRef}></canvas>;
};

export default CanvasParticles;
