const baseRotation = 67; // Ausgangsrotation in Grad

// SVG-Elemente
let segments = Array.from(document.querySelectorAll('.segment')); // Alle Segmente in ein Array
const wheel = document.querySelector('.wheel');

// Segmente umkehren
segments = segments.reverse();

// ScrollTrigger-Setup
gsap.registerPlugin(ScrollTrigger);

// Textblöcke zu Segmenten zuordnen
const totalSegments = segments.length;

document.querySelectorAll('.wheel-information').forEach((block, index) => {
  ScrollTrigger.create({
    trigger: block,
    start: "top center",
    end: "bottom center",
    onEnter: () => activateSegment(index),
    onLeaveBack: () => activateSegment(index - 1),
  });
});

function activateSegment(index) {
  // Index validieren
  if (index < 0 || index >= segments.length) return;

  // Entferne vorherige aktive Klasse
  segments.forEach((seg) => seg.classList.remove('active'));

  // Aktiviere das neue Segment
  const segment = segments[index];
  if (segment) {
    segment.classList.add('active');

    // Drehe das Rad
    const rotation = (-360 / segments.length) * index+ baseRotation;
    gsap.to('.wheel', { rotate: rotation, duration: 1, ease: "power2.out" });
  }
}
