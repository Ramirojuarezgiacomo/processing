/* =========================
   DETENER Y ACTIVAR IFRAMES
========================= */
function stopIframesInSection(section) {
  if (!section) return;

  /* ✅ NO tocar TP1 */
  if (section.id === "tp1") return;

  section.querySelectorAll("iframe").forEach(iframe => {
    iframe.dataset.src = iframe.src;
    iframe.src = "about:blank";
  });
}

function activateIframesInSection(section) {
  if (!section) return;

  section.querySelectorAll("iframe").forEach(iframe => {
    if (iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
    } else if (!iframe.src || iframe.src === "about:blank") {
      iframe.src = iframe.getAttribute("src");
    }
  });
}


/* =========================
   SISTEMA DE TABS
========================= */
function openTab(tabId) {

  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  // tab activa actual
  const activeSection =
    document.querySelector(".tab-content.active");

  // detener iframes del tab anterior
  stopIframesInSection(activeSection);

  // limpiar estados
  contents.forEach(c => c.classList.remove("active"));
  buttons.forEach(b => b.classList.remove("active"));

  // activar nueva tab
  const section = document.getElementById(tabId);
  if (!section) return;

  section.classList.add("active");
  activateIframesInSection(section);

  const button =
    document.querySelector(`[onclick="openTab('${tabId}')"]`);

  if (button) button.classList.add("active");

  // cambiar fondo si usás bg-tpX
  document.body.className = "";
  document.body.classList.add(`bg-${tabId}`);

  // actualizar URL
  window.location.hash = tabId;
}


/* =========================
   TAB INICIAL
========================= */
document.addEventListener("DOMContentLoaded", () => {

  // guardar src original
  document.querySelectorAll("iframe").forEach(iframe => {
    iframe.dataset.src = iframe.src;
  });

  const hash = window.location.hash.replace("#", "");

  if (hash && document.getElementById(hash)) {
    openTab(hash);
  } else {
    openTab("tp0");
  }

});



/* =========================
   ABRE IMAGENES
========================= */


document.addEventListener("click", (e) => { 
  const img = e.target.closest("img"); 
  if (!img) return;
  
    // ignorar imágenes dentro del robot
  if (img.closest("#regresar")) return;

  window.open(img.src, "_blank"); 
});

/* cargando */

const messages = [
  "Cargando recursos",
  "Inicializando módulos",
  "Renderizando interfaz",
  "Sincronizando sistema",
  "Casi listo"
];

let i = 0;
const text = document.getElementById("loading-text");

setInterval(() => {
  text.textContent = messages[i % messages.length];
  i++;
}, 1200);

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});
