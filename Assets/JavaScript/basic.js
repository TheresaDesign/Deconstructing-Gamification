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
        chapters.forEach((chapter) => chapter.classList.remove("active"));
        if (chapters[index]) {
          chapters[index].classList.add("active");
        }
      }
    });
  },
  { threshold: 0.5 } // Aktiviert, wenn 50% der Section im Viewport sind
);

sections.forEach((section) => observer.observe(section));
