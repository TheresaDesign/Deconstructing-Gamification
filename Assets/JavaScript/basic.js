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
