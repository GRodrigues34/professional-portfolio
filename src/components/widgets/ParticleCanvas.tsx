import React, { useEffect, useRef } from 'react';

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  isAccent: boolean;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      connectRadius: 210,
    };

    const count = 68;
    const nodes: NodePoint[] = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.3 + 1.0,
        isAccent: i % 4 === 0,
      });
    }

    const handleResize = () => {
      if (!canvas?.parentElement) return;
      const newW = canvas.parentElement.clientWidth || window.innerWidth;
      const newH = canvas.parentElement.clientHeight || window.innerHeight;
      if (width > 0 && height > 0) {
        for (const n of nodes) {
          n.x = (n.x / width) * newW;
          n.y = (n.y / height) * newH;
        }
      }
      width = canvas.width = newW;
      height = canvas.height = newH;
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const linkDist = 148;

    const draw = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) n.x = width;
          else if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          else if (n.y > height) n.y = 0;

          // Node dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = n.isAccent ? 'rgba(255, 85, 0, 0.55)' : 'rgba(250, 248, 245, 0.28)';
          ctx.fill();

          // Peer-to-peer constellation mesh
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDist * linkDist) {
              const d = Math.sqrt(d2);
              const alpha = (1 - d / linkDist) * 0.14;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle =
                n.isAccent && n2.isAccent
                  ? `rgba(255, 85, 0, ${alpha * 1.5})`
                  : `rgba(250, 248, 245, ${alpha})`;
              ctx.lineWidth = 0.65;
              ctx.stroke();
            }
          }

          // Cursor node connections
          if (mouse.active) {
            const mdx = mouse.x - n.x;
            const mdy = mouse.y - n.y;
            const md2 = mdx * mdx + mdy * mdy;
            if (md2 < mouse.connectRadius * mouse.connectRadius) {
              const md = Math.sqrt(md2);
              const alpha = (1 - md / mouse.connectRadius) * 0.52;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(255, 85, 0, ${alpha})`;
              ctx.lineWidth = 0.95;
              ctx.stroke();
            }
          }
        }

        // Draw cursor node core when active
        if (mouse.active) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 85, 0, 0.85)';
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        absolute inset-0 w-full h-full pointer-events-none z-0
      "
      aria-hidden="true"
    />
  );
};
