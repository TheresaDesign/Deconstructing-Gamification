//script für das Onboarding

//menü
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const menuLinks = document.querySelectorAll(".menu-dot");

  let visitedSections = new Set(); // Speichert besuchte Abschnitte

  function updateMenu() {
      let viewportCenter = window.innerHeight * 0.5; // Mittelpunkt des Bildschirms
      let currentSection = null;

      sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionId = section.id;

          // Aktuelle Sektion bestimmen (die, die am nächsten zur Mitte ist)
          if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
              currentSection = sectionId;
          }

          // Beim Runterscrollen als besucht markieren, beim Hochscrollen wieder entfernen
          if (rect.top < viewportCenter) {
              visitedSections.add(sectionId);
          } else {
              visitedSections.delete(sectionId);
          }
      });

      // Aktualisiere die Menü-Punkte
      menuLinks.forEach((link) => {
          const targetId = link.getAttribute("href").substring(1);

          if (visitedSections.has(targetId)) {
              link.classList.add("visited");
          } else {
              link.classList.remove("visited");
          }

          if (targetId === currentSection) {
              link.classList.add("active");
          } else {
              link.classList.remove("active");
          }
      });
  }

  window.addEventListener("scroll", updateMenu);
  updateMenu(); // Direkt initialisieren
});



//Ton bei Videos
document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video");

  videos.forEach(video => {
    console.log("Video gefunden:", video); // Debugging: Prüft, ob beide Videos erkannt werden

    video.addEventListener("click", function () {
      console.log("Video geklickt:", video); // Debugging: Zeigt Klicks an
      if (video.muted) {
        video.muted = false;
        video.play();
      } else {
        video.muted = true;
      }
    });
  });
});


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
  const showElementBtns = document.querySelectorAll(".elementpic");
  const modal = document.querySelector(".image-modal");
  const modalImage = document.querySelector(".modal-image");
  const modalVideo = document.querySelector(".modal-video");
  const modalVideoSource = modalVideo.querySelector("source");
  const closeModal = document.querySelector(".close");

  showElementBtns.forEach(button => {
      button.addEventListener("click", function () {
          const mediaSrc = button.getAttribute("data-image");

          if (mediaSrc.endsWith(".mp4")) { 
              // VIDEO ANZEIGEN
              modalImage.style.display = "none";  // Bild verstecken
              modalVideo.style.display = "block"; // Video anzeigen
              modalVideoSource.src = mediaSrc;
              modalVideo.load();  // Video neu laden
              modalVideo.play();  // Autoplay starten
          } else { 
              // BILD ANZEIGEN
              modalVideo.style.display = "none"; // Video verstecken
              modalImage.style.display = "block"; // Bild anzeigen
              modalImage.src = mediaSrc;
          }

          modal.style.display = "flex";
      });
  });

  // Modal schließen per Button
  if (closeModal) {
    console.log("Close-Button gefunden!");
    closeModal.addEventListener("click", function (e) {
        console.log("Close-Button wurde geklickt!");
        modal.style.display = "none";
        modalImage.src = "";
    });
  } else {
    console.log("Close-Button nicht gefunden!");
  }

  // Modal schließen, wenn außerhalb des Inhalts geklickt wird
  modal.addEventListener("click", function (e) {
      if (e.target === modal) {
          modal.style.display = "none";
          modalImage.src = "";
          modalVideo.pause();
          modalVideo.currentTime = 0;
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const closeButtons = document.querySelectorAll(".close"); // Alle Close-Buttons holen
  const modals = document.querySelectorAll(".image-modal"); // Alle Modals holen

  closeButtons.forEach(closeButton => {
      closeButton.addEventListener("click", function (e) {
          console.log("Close-Button wurde geklickt!"); // Debugging-Check
          e.stopPropagation(); // Verhindert, dass das Modal sich durch einen anderen Klick schließt

          // Nächstes Eltern-Modal finden und schließen
          const modal = closeButton.closest(".image-modal");
          if (modal) {
              modal.style.display = "none";
          }
      });
  });

  // Optional: Modal durch Klick außerhalb schließen
  modals.forEach(modal => {
      modal.addEventListener("click", function (e) {
          if (e.target === modal) {
              modal.style.display = "none";
          }
      });
  });
});


//script dimensions
const texts = [
  {
    id: "performance",
    title: "Performance / Measurements",
    content: "All elements within this dimension provide some form of feedback to the user. Whether it's a progress bar within a course or the hearts indicating how many mistakes have been made—this dimension ensures the user receives constant feedback. If missing, learners may feel disoriented, as their actions lack visible responses.",
    usage: "5/5 elements are heavily"
  },
  {
    id: "ecological",
    title: "Ecological",
    content: "The relevance of this dimension heavily depends on the application or game in question. These elements represent unique characteristics that some games incorporate, while others may not, or they may implement them in entirely different ways. If this dimension is absent, the game environment may feel static, reducing engagement as it lacks meaningful interaction with the user.",
    usage: "3/5 elements are moderately"
  },
  {
    id: "social",
    title: "Social",
    content: "This dimension focuses on interaction between players. Its elements are designed to encourage engagement and communication. If there is no opportunity or necessity for users to interact with one another, long-term isolation may occur, which can hinder the learning experience. This category supports both extrinsic motivation and intrinsic motivation, as social exchange is particularly important in a learning context.",
    usage: "4/4 elements are widely"
  },
  {
    id: "personal",
    title: "Personal",
    content: "This dimension revolves around how a user engages with their environment and to what extent they can personalize and shape it. If missing, it can lead to demotivation, as the user's actions within the game lack personal impact or purpose.",
    usage: "5/5 elements are heavily"
  },
  {
    id: "fictional",
    title: "Fictional Engagement",
    content: "This dimension is about creating context. It considers both the user’s perspective (narrative) and the environment (storytelling) to form a cohesive experience. If this dimension—or even just one of its elements—is missing, the sense of meaning and purpose within the immersive environment is lost. This, in turn, affects the overall quality of the user experience.",
    usage: "0/2 elements are "
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



// Javascript für das scrollen des GUIs
let scale = 1; // Start-Zoom-Wert

window.addEventListener("load", function () {
  setTimeout(() => {
    const box = document.getElementById("side-box-image");
    if (box) {
      centerScrollPosition();
    } else {
      console.error("scrollBox nicht gefunden!");
    }
  }, 100);
});

function centerScrollPosition() {
  const box = document.getElementById("scrollBox");
  const gui = document.getElementById("gui-mobile");

  if (!box || !gui) {
    console.error("Elemente nicht gefunden!");
    return;
  }

  // Echte Abmessungen des Elements mit Skalierung berechnen
  const scaledWidth = gui.offsetWidth * scale;
  const scaledHeight = gui.offsetHeight * scale;

  // Setze die Scroll-Position, um das Element mittig zu platzieren
  box.scrollLeft = (scaledWidth - box.clientWidth) / 2;
  box.scrollTop = (scaledHeight - box.clientHeight) / 2;
}

function zoomIn() {
  scale += 0.1;
  applyZoom();
}

function zoomOut() {
  scale = Math.max(0.5, scale - 0.1);
  applyZoom();
}

function resetZoom() {
  scale = 1;
  applyZoom();
}

function applyZoom() {
  const gui = document.getElementById("gui-mobile");
  const box = document.getElementById("gui-mobile");

  if (!gui || !box) return;

  // Setze die Skalierung
  gui.style.transform = `scale(${scale})`;
  gui.style.transformOrigin = "center";

  // Stelle sicher, dass die Mitte nach dem Zoomen korrekt bleibt
  setTimeout(centerScrollPosition, 50);
}




//dropdown boxen
function toggleDropdown(element) {
  element.classList.toggle("active");
}

//userjourney
document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const contents = document.querySelectorAll(".userjourney-content");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  function updateCarousel() {
      contents.forEach((content, index) => {
          content.classList.toggle("active", index === currentIndex);
      });

      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === contents.length - 1;
  }

  prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
      }
  });

  nextButton.addEventListener("click", () => {
      if (currentIndex < contents.length - 1) {
          currentIndex++;
          updateCarousel();
      }
  });

  updateCarousel();
});

//verbesserung
document.addEventListener("DOMContentLoaded", function () {
  const verbesserung = document.querySelectorAll(".verbesserung-content");
  const vorButton = document.getElementById("vor");
  const nachButton = document.getElementById("nach");
  let currentIndex = 0;

  // Anfangszustand setzen
  function updateCarousel() {
    verbesserung.forEach((content, index) => {
      content.style.display = index === currentIndex ? "flex" : "none";
    });

    // Buttons aktivieren/deaktivieren
    vorButton.disabled = currentIndex === 0;
    nachButton.disabled = currentIndex === verbesserung.length - 1;
  }

  // Event Listener für Buttons
  vorButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nachButton.addEventListener("click", function () {
    if (currentIndex < verbesserung.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initiales Update ausführen
  updateCarousel();
});

//verbesserung2
document.addEventListener("DOMContentLoaded", function () {
  const verbesserung = document.querySelectorAll(".verbesserung-content2");
  const vorButton = document.getElementById("zurück");
  const nachButton = document.getElementById("nächstes");
  let currentIndex = 0;

  // Anfangszustand setzen
  function updateCarousel() {
    verbesserung.forEach((content, index) => {
      content.style.display = index === currentIndex ? "flex" : "none";
    });

    // Buttons aktivieren/deaktivieren
    vorButton.disabled = currentIndex === 0;
    nachButton.disabled = currentIndex === verbesserung.length - 1;
  }

  // Event Listener für Buttons
  vorButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nachButton.addEventListener("click", function () {
    if (currentIndex < verbesserung.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initiales Update ausführen
  updateCarousel();
});


//retention
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".retention-buttons"); // Die Flexbox um alle Elemente
  const knoepfe = document.querySelectorAll(".retention-knopf");

  knoepfe.forEach((knopf) => {
    const button = knopf.querySelector("h4"); // Korrigierte Selektion
    const content = knopf.querySelector(".retention-content");
    const images = knopf.querySelectorAll(".retention-img img");
    const buttons = knopf.querySelectorAll(".retention-content button");
    const prevButton = buttons[0];
    const nextButton = buttons[1];
    let currentIndex = 0;

    // Öffnen/Schließen der Content-Box und Umsortierung in der Flexbox
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const isOpen = content.style.display === "flex";

      // Schließt alle anderen offenen Boxen
      knoepfe.forEach((k) => k.querySelector(".retention-content").style.display = "none");

      // Zeigt den geklickten an oder versteckt ihn
      content.style.display = isOpen ? "none" : "flex";

      // Falls geöffnet, ans Ende der Flexbox verschieben
      if (!isOpen) {
        container.appendChild(knopf);
      }
    });

    // Schließen bei Klick außerhalb
    document.addEventListener("click", function (event) {
      if (!knopf.contains(event.target) && content.style.display === "flex") {
        content.style.display = "none";
      }
    });

    // Verhindert das Schließen beim Klicken innerhalb der Box
    content.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    // Funktion zum Anzeigen des aktuellen Bildes
    function updateImage() {
      images.forEach((img, index) => {
        img.style.display = index === currentIndex ? "block" : "none";
      });

      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === images.length - 1;
    }

    // Navigation
    prevButton.addEventListener("click", function (event) {
      event.stopPropagation();
      if (currentIndex > 0) {
        currentIndex--;
        updateImage();
      }
    });

    nextButton.addEventListener("click", function (event) {
      event.stopPropagation();
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage();
      }
    });

    updateImage(); // Initial setzen
  });
});



//wheel overlay
document.addEventListener("DOMContentLoaded", function () {
  const showWheelBtn = document.querySelector(".show-wheel");
  const overlay = document.getElementById("wheelOverlay");
  const closeOverlayBtn = document.querySelector(".close-overlay");

  // Overlay sicherstellen, dass es standardmäßig ausgeblendet ist
  overlay.style.display = "none";

  showWheelBtn.addEventListener("click", function () {
    overlay.style.display = "flex";
  });

  closeOverlayBtn.addEventListener("click", function () {
    overlay.style.display = "none";
  });

  // Klick außerhalb des Bildes schließt das Overlay
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
});