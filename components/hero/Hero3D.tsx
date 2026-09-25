"use client";
import { useEffect, useRef } from "react";

/**
 * 3D network globe for the home hero: dotted sphere, gold hub nodes, arcs with
 * travelling pulses, a chapter orbit ring and a parallax starfield.
 * three.js is loaded on demand so it never blocks the page text.
 */
export default function Hero3D() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const el = mount.current;
      if (disposed || !el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;
      const GOLD = new THREE.Color("#f7b800");

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      // Round, soft point sprite
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.35, "rgba(255,255,255,.8)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      const dot = new THREE.CanvasTexture(c);

      const world = new THREE.Group();
      scene.add(world);
      const globe = new THREE.Group();
      world.add(globe);
      const R = 2.6;

      // Dotted sphere (Fibonacci distribution)
      const N = small ? 650 : 1400;
      const sphere: InstanceType<typeof THREE.Vector3>[] = [];
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = Math.PI * (3 - Math.sqrt(5)) * i;
        const v = new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(R);
        sphere.push(v);
        pos.set([v.x, v.y, v.z], i * 3);
      }
      const dotsGeo = new THREE.BufferGeometry();
      dotsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const dotsMat = new THREE.PointsMaterial({ size: 0.07, map: dot, color: 0xc9d4ff, transparent: true, opacity: 0.75, depthWrite: false });
      globe.add(new THREE.Points(dotsGeo, dotsMat));

      // Dark core so the back of the globe reads as further away
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(R * 0.985, 48, 48),
        new THREE.MeshBasicMaterial({ color: 0x0d1650, transparent: true, opacity: 0.55 })
      );
      globe.add(core);

      // Gold hubs
      const HUBS = small ? 22 : 36;
      const hubs: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < HUBS; i++) hubs.push(sphere[Math.floor(((i * 7919) % N + (i * 131) % 97) % N)].clone().multiplyScalar(1.01));
      const hubGeo = new THREE.BufferGeometry().setFromPoints(hubs);
      const hubMat = new THREE.PointsMaterial({ size: 0.26, map: dot, color: GOLD, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      globe.add(new THREE.Points(hubGeo, hubMat));

      // Arcs with a travelling pulse
      const arcMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: GOLD } },
        vertexShader: `
          attribute float aP; attribute float aOff; varying float vP; varying float vOff;
          void main(){ vP=aP; vOff=aOff; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `
          uniform float uTime; uniform vec3 uColor; varying float vP; varying float vOff;
          void main(){
            float head = fract(uTime*0.25 + vOff);
            float d = vP - head;
            float pulse = smoothstep(-0.18, 0.0, d) * (1.0 - smoothstep(0.0, 0.02, d));
            float a = 0.12 + pulse * 0.95;
            gl_FragColor = vec4(uColor, a);
          }`,
      });
      const ARCS = small ? 16 : 30;
      for (let i = 0; i < ARCS; i++) {
        const a = hubs[i % HUBS];
        const b = hubs[(i * 5 + 3) % HUBS];
        if (a.distanceTo(b) < 0.8) continue;
        const mid = a.clone().add(b).multiplyScalar(0.5);
        mid.setLength(R * (1.12 + a.distanceTo(b) * 0.12));
        const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(64);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        geo.setAttribute("aP", new THREE.BufferAttribute(new Float32Array(pts.map((_, k) => k / 64)), 1));
        geo.setAttribute("aOff", new THREE.BufferAttribute(new Float32Array(pts.length).fill((i * 0.37) % 1), 1));
        globe.add(new THREE.Line(geo, arcMat));
      }

      // Chapter orbit ring with 6 satellites
      const orbit = new THREE.Group();
      orbit.rotation.set(1.15, 0.25, -0.35);
      world.add(orbit);
      const ringR = R * 1.42;
      orbit.add(
        new THREE.Mesh(new THREE.TorusGeometry(ringR, 0.009, 8, 256), new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.55 }))
      );
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(R * 1.62, 0.005, 8, 256), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 }));
      ring2.rotation.set(1.35, -0.4, 0.5);
      world.add(ring2);
      const sats: InstanceType<typeof THREE.Sprite>[] = [];
      for (let i = 0; i < 6; i++) {
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: GOLD, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
        s.scale.setScalar(0.42);
        orbit.add(s);
        sats.push(s);
      }

      // Starfield (moves less than the globe for depth)
      const S = small ? 350 : 800;
      const starPos = new Float32Array(S * 3);
      for (let i = 0; i < S; i++) starPos.set([(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 24, -Math.random() * 18 - 2], i * 3);
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.08, map: dot, color: 0xffffff, transparent: true, opacity: 0.6, depthWrite: false }));
      scene.add(stars);

      // Layout: globe on the right on desktop, above the text on phones
      const layout = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
        const visW = visH * camera.aspect;
        if (w >= 1024) {
          // right half, clear of the headline; diameter ≈ half the hero height
          world.position.set(visW * 0.24, visH * 0.01, 0);
          world.scale.setScalar(visH / 10);
        } else {
          // phones/tablets: smaller, tucked into the top-right corner behind the navbar
          world.position.set(visW * 0.34, visH * 0.3, 0);
          world.scale.setScalar(Math.min(0.55, visW / 9.5));
        }
      };
      layout();
      const ro = new ResizeObserver(layout);
      ro.observe(el);

      // Pointer + scroll
      const target = { x: 0, y: 0 };
      const cur = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let raf = 0;
      let visible = true;
      let t = 0;
      let last = performance.now();
      const frame = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!reduce) t += dt;
        cur.x += (target.x - cur.x) * 0.05;
        cur.y += (target.y - cur.y) * 0.05;
        const sy = window.scrollY;

        globe.rotation.y = t * 0.12 + sy * 0.0012 + cur.x * 0.35;
        world.rotation.x = 0.28 + cur.y * 0.18;
        world.rotation.z = -0.12 + cur.x * -0.06;
        orbit.rotation.z = -0.35 + t * 0.1;
        sats.forEach((s, i) => {
          const a = t * 0.35 + (i / 6) * Math.PI * 2;
          s.position.set(Math.cos(a) * ringR, Math.sin(a) * ringR, 0);
          s.scale.setScalar(0.34 + Math.sin(t * 3 + i) * 0.06);
        });
        hubMat.size = 0.24 + Math.sin(t * 2) * 0.04;
        arcMat.uniforms.uTime.value = t;
        stars.position.x = -cur.x * 0.6;
        stars.position.y = cur.y * 0.4 + sy * 0.002;
        stars.rotation.z = t * 0.01;

        renderer.render(scene, camera);
        if (visible && !reduce) raf = requestAnimationFrame(frame);
      };

      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      });
      io.observe(el);
      raf = requestAnimationFrame(frame);
      el.style.opacity = "1";

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        scene.traverse((o) => {
          const m = o as unknown as { geometry?: { dispose(): void }; material?: { dispose(): void } };
          m.geometry?.dispose();
          m.material?.dispose();
        });
        dot.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mount} aria-hidden="true" className="absolute inset-0 opacity-0 transition-opacity duration-1000" />;
}
