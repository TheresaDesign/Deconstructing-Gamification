// SVG-Elemente
const segments = document.querySelectorAll('.category');
const wheel = document.querySelector('.wheel');

// ScrollTrigger-Setup
gsap.registerPlugin(ScrollTrigger);

segments.forEach((segment, index) => {
  ScrollTrigger.create({
    trigger: `.text-section:nth-child(${index + 1})`,
    start: "top center",
    end: "bottom center",
    onEnter: () => activateSegment(segment, index),
    onLeaveBack: () => activateSegment(segment, index - 1),
  });
});

function activateSegment(segment, index) {
  // Entferne vorherige aktive Klasse
  segments.forEach((seg) => seg.classList.remove('active'));

  // Aktiviere das neue Segment
  if (segment) {
    segment.classList.add('active');

    // Drehe das Rad
    const rotation = (360 / segments.length) * index;
    gsap.to('.wheel', { rotate: rotation, duration: 1, ease: "power2.out" });
  }
}
