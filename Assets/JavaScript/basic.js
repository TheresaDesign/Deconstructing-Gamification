function togglePopup() {
    const popup = document.getElementById('popup');
    if (popup.style.display === 'none' || popup.style.display === '') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  }
  
//menu

const chapters = document.querySelectorAll(".chapter-point");
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const index = Array.from(sections).indexOf(entry.target);
      const chapter = chapters[index];

      if (entry.isIntersecting) {
        // Aktivieren des aktuellen Kapitels
        chapters.forEach((c) => c.classList.remove("active"));
        chapter.classList.add("active", "visited");
      } else if (entry.boundingClientRect.bottom < 0 || entry.boundingClientRect.top > window.innerHeight) {
        // Entfernen von "visited", wenn die Section außerhalb des Viewports ist
        chapter.classList.remove("visited");
      }
      chapter.classList.remove("active");
    });
  },
  { threshold: 0.5 }
);


// Beobachten aller Abschnitte
sections.forEach((section) => observer.observe(section));


