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

      if (entry.isIntersecting) {
        // Füge die Klasse "active" hinzu, um den aktuellen Punkt zu markieren
        if (chapters[index]) {
          chapters[index].classList.add("active");
        }

        // Setze für alle vorherigen Punkte die aktive Farbe, falls sie noch nicht aktiv sind
        for (let i = 0; i <= index; i++) {
          chapters[i].classList.add("visited"); // Hinzufügen, wenn bereits durchgescrollt
        }
      }
    });
  },
  { threshold: 0.5 } // Aktiviert, wenn 50% der Section im Viewport sind
);

sections.forEach((section) => observer.observe(section));

