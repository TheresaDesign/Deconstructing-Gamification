//script für das Onboarding
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    document.body.classList.add("scrolled");
  }
});




// Javascript für das scrollen des deconstructing teils
window.onload = function() {
  const box = document.getElementById('scrollBox');
  centerScrollPosition(box); // Scrollposition beim Laden der Seite zentrieren
};

let scale = 1; // Initialer Zoom-Wert

function zoomIn() {
  scale += 0.1; // Vergrößern
  applyZoom();
}

function zoomOut() {
  scale -= 0.1; // Verkleinern
  applyZoom();
}

function resetZoom() {
  scale = 1; // Zurück auf Standardzoom
  applyZoom();

  const box = document.getElementById('scrollBox');
  centerScrollPosition(box); // Scrollposition zurücksetzen
}

function applyZoom() {
  const gui = document.getElementById('gui');
  gui.style.transform = `scale(${scale})`;
  gui.style.transformOrigin = 'center'; // Zoom von der Mitte aus
}

function centerScrollPosition(box) {
  box.scrollLeft = (box.scrollWidth - box.clientWidth) / 2; // Horizontal mittig
  box.scrollTop = (box.scrollHeight - box.clientHeight) / 2; // Vertikal mittig
}

//GUI
document.addEventListener("DOMContentLoaded", function () {
  const showImageBtn = document.querySelector(".box-continue");
  const modal = document.querySelector(".modalGUI");
  const closeModal = document.querySelector(".close");

  // Sicherstellen, dass das Modal standardmäßig geschlossen ist
  modal.style.display = "none"; 

  showImageBtn.addEventListener("click", function () {
      modal.style.display = "flex"; // Modal öffnen
  });

  closeModal.addEventListener("click", function () {
      modal.style.display = "none"; // Modal schließen
  });

  // Schließen bei Klick außerhalb des Bildes
  modal.addEventListener("click", function (e) {
      if (e.target === modal) {
          modal.style.display = "none";
      }
  });
});


//modal elemente
document.addEventListener("DOMContentLoaded", function () {
  const showImageBtns = document.querySelectorAll(".elementpic");
  const modal = document.querySelector(".image-modal");
  const modalImage = document.querySelector(".modal-image");
  const closeModal = document.querySelector(".close");

  // Modal öffnen
  showImageBtns.forEach(button => {
      button.addEventListener("click", function () {
          const imageSrc = button.getAttribute("data-image");
          modalImage.src = imageSrc;
          modal.style.display = "flex";
      });
  });

  // Modal schließen per Button
  if (closeModal) {
      closeModal.addEventListener("click", function (e) {
          e.stopPropagation(); // Verhindert, dass das Modal durch einen Klick auf sich selbst geschlossen wird
          modal.style.display = "none";
          modalImage.src = "";
      });
  }

  // Modal schließen, wenn außerhalb des Bildes geklickt wird
  modal.addEventListener("click", function (e) {
      if (e.target === modal) {
          modal.style.display = "none";
          modalImage.src = "";
      }
  });

  // Test, ob der Close-Button gefunden wurde
  console.log("Close-Button gefunden:", closeModal);
});


//script diemnsions
const texts = [
  {
    id: "performance",
    title: "Performance / Measurements",
    content: "All elements within this dimension provide some form of feedback to the user. Whether it's a progress bar within a course or the hearts indicating how many mistakes have been made—this dimension ensures the user receives constant feedback. If missing, learners may feel disoriented, as their actions lack visible responses.",
    usage: "5/5 elements are heavily used by Duolingo"
  },
  {
    id: "ecological",
    title: "Ecological",
    content: "The relevance of this dimension heavily depends on the application or game in question. These elements represent unique characteristics that some games incorporate, while others may not, or they may implement them in entirely different ways. If this dimension is absent, the game environment may feel static, reducing engagement as it lacks meaningful interaction with the user.",
    usage: "3/5 elements are moderately used by Duolingo"
  },
  {
    id: "social",
    title: "Social",
    content: "This dimension focuses on interaction between players. Its elements are designed to encourage engagement and communication. If there is no opportunity or necessity for users to interact with one another, long-term isolation may occur, which can hinder the learning experience. This category supports both extrinsic motivation and intrinsic motivation, as social exchange is particularly important in a learning context.",
    usage: "4/4 elements are widely used by Duolingo"
  },
  {
    id: "personal",
    title: "Personal",
    content: "This dimension revolves around how a user engages with their environment and to what extent they can personalize and shape it. If missing, it can lead to demotivation, as the user's actions within the game lack personal impact or purpose.",
    usage: "5/5 elements are heavily used by Duolingo"
  },
  {
    id: "fictional",
    title: "Fictional Engagement",
    content: "This dimension is about creating context. It considers both the user’s perspective (narrative) and the environment (storytelling) to form a cohesive experience. If this dimension—or even just one of its elements—is missing, the sense of meaning and purpose within the immersive environment is lost. This, in turn, affects the overall quality of the user experience.",
    usage: "0/2 elements are used by Duolingo"
  }
];

let currentIndex = 0;

function updateContent() {
  const current = texts[currentIndex];
  const activeDimension = document.getElementById(current.id);

  // Setze den Textinhalt
  document.querySelector(".box-dimension h4").textContent = current.title;
  document.querySelector(".box-dimension p").textContent = current.content;
  document.querySelector("#bold span").textContent = current.usage;

  // Hole die Hintergrundfarbe des aktiven Elements
  const bgColor = window.getComputedStyle(activeDimension).backgroundColor;

  // Setze die Farbe der Überschrift
  document.querySelector(".box-dimension h4").style.color = bgColor;
  document.querySelector(".box-dimension p span").style.color = bgColor;

  // Alle Dimensionen zurücksetzen
  document.querySelectorAll(".dimension").forEach(dim => {
    dim.style.width = "15%"; // Standardgröße
    dim.style.transition = "width 0.3s ease";
  });

  // Aktuelle Dimension vergrößern
  activeDimension.style.width = "40%";
}




// Event Listener für Buttons
document.querySelectorAll(".left").forEach((button, index) => {
  button.addEventListener("click", () => {
    currentIndex = index === 0 ? (currentIndex - 1 + texts.length) % texts.length : (currentIndex + 1) % texts.length;
    updateContent();
  });
});

// Starte mit dem ersten Text
updateContent();
