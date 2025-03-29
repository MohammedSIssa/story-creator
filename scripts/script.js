function toggleBgDropdown() {
  const bgDropdown = document.getElementById("bgDropdown");
  bgDropdown.style.display =
    bgDropdown.style.display === "flex" ? "none" : "flex";
}

function changeBackground(className) {
  const container = document.getElementById("storyContainer");
  const bgMovable = document.getElementById("bgMovable");
  container.className = `container ${className}`;
  bgMovable.className = className;
  bgMovable.style["background-position"] = "center";
  bgMovable.style["background-size"] = "cover";
  bgMovable.style.transform = "scale(1.0)";
  toggleBgDropdown();
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function addTextBox(tag) {
  const container = document.getElementById("storyContainer");
  const textBox = document.createElement(tag);
  textBox.classList.add("textbox");
  textBox.innerText = isMobile() ? "" : "نص جديد";
  textBox.style.left = "5%";
  textBox.style.top = "80px";
  container.appendChild(textBox);
  toggleDropdown();
  dragElement(textBox);
  enableEditing(textBox);
}

function dragElement(el) {
  let startX, startY, initialX, initialY;

  function startDrag(event) {
    event.preventDefault();
    startX = event.type.includes("touch")
      ? event.touches[0].clientX
      : event.clientX;
    startY = event.type.includes("touch")
      ? event.touches[0].clientY
      : event.clientY;
    initialX = el.offsetLeft;
    initialY = el.offsetTop;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", stopDrag);
  }

  function drag(event) {
    let clientX = event.type.includes("touch")
      ? event.touches[0].clientX
      : event.clientX;
    let clientY = event.type.includes("touch")
      ? event.touches[0].clientY
      : event.clientY;

    let deltaX = clientX - startX;
    let deltaY = clientY - startY;

    el.style.left = `${initialX + deltaX}px`;
    el.style.top = `${initialY + deltaY}px`;
  }

  function stopDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }

  el.addEventListener("mousedown", startDrag);
  el.addEventListener("touchstart", startDrag);
}

function enableEditing(el) {
  function startEditing() {
    el.contentEditable = true;
    el.focus();
  }

  function stopEditing() {
    el.contentEditable = false;
  }

  el.addEventListener("dblclick", startEditing);
  el.addEventListener("touchstart", startEditing, { passive: true }); // يعمل عند اللمس على الهاتف
  el.addEventListener("click", startEditing);

  el.addEventListener("blur", stopEditing);
}

function toggleFontDropdown() {
  const fontDropdown = document.getElementById("fontDropdown");
  fontDropdown.style.display =
    fontDropdown.style.display === "flex" ? "none" : "flex";
}

function changeFont(font) {
  const textElements = document.querySelectorAll(".textbox");
  textElements.forEach((el) => {
    el.style.fontFamily = font;
  });
  toggleFontDropdown();
}

document.addEventListener("contextmenu", function (event) {
  event.preventDefault(); // Prevents scrolling down on spacebar press
  document.querySelectorAll("button").forEach((button) => {
    if (!button.classList.contains("saveBtn")) {
      button.style.display = button.style.display === "none" ? "block" : "none";
    }
  });
});
function toggleCustomBgPopup() {
  const popup = document.getElementById("customBgPopup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}

function setCustomBackground() {
  const input = document.getElementById("imgurUrlInput").value.trim();
  const bgMovable = document.getElementById("bgMovable");

  if (
    input.startsWith("http") &&
    (input.includes("imgur.com") ||
      input.includes(".jpg") ||
      input.includes(".png"))
  ) {
    bgMovable.style.backgroundImage = `url('${input}')`;
    toggleCustomBgPopup(); // Hide popup
  } else {
    alert("Please enter a valid Imgur image URL!");
  }
}

// Make background draggable
function enableBgDragging() {
  const bg = document.getElementById("bgMovable");
  let startX, startY, initialX, initialY;

  function startDrag(event) {
    event.preventDefault();
    startX = event.type.includes("touch")
      ? event.touches[0].clientX
      : event.clientX;
    startY = event.type.includes("touch")
      ? event.touches[0].clientY
      : event.clientY;
    initialX = parseInt(bg.style.backgroundPositionX) || 0;
    initialY = parseInt(bg.style.backgroundPositionY) || 0;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", stopDrag);
  }

  function drag(event) {
    let clientX = event.type.includes("touch")
      ? event.touches[0].clientX
      : event.clientX;
    let clientY = event.type.includes("touch")
      ? event.touches[0].clientY
      : event.clientY;

    let deltaX = clientX - startX;
    let deltaY = clientY - startY;

    bg.style.backgroundPositionX = `${initialX + deltaX}px`;
    bg.style.backgroundPositionY = `${initialY + deltaY}px`;
  }

  function stopDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }

  bg.addEventListener("mousedown", startDrag);
  bg.addEventListener("touchstart", startDrag);
}

// Call function to activate dragging
enableBgDragging();

let scale = 1;
const bgMovable = document.getElementById("bgMovable");
function zoomBackground(event) {
  event.preventDefault();
  const zoomFactor = 0.1;
  scale += event.deltaY < 0 ? zoomFactor : -zoomFactor;
  scale = Math.max(0.5, Math.min(3, scale));
  bgMovable.style.transform = `scale(${scale})`;
}
bgMovable.addEventListener("wheel", zoomBackground);
let touchStartDistance = 0;
function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
bgMovable.addEventListener("touchstart", (event) => {
  if (event.touches.length === 2) {
    touchStartDistance = getDistance(event.touches);
  }
});
bgMovable.addEventListener("touchmove", (event) => {
  if (event.touches.length === 2) {
    event.preventDefault();
    const newDistance = getDistance(event.touches);
    const zoomFactor = 0.005;
    scale *= 1 + (newDistance - touchStartDistance) * zoomFactor;
    scale = Math.max(0.5, Math.min(3, scale));
    bgMovable.style.transform = `scale(${scale})`;
    touchStartDistance = newDistance;
  }
});

function pasteContent() {
  navigator.clipboard.readText().then((text) => {
    const imgInput = document.getElementById("imgurUrlInput");
    imgInput.value = text;
    setCustomBackground();
    toggleBgDropdown();
  });
}

function centerText() {
  const container = document.querySelector(".container");
  if (!container) return;

  const textboxes = document.querySelectorAll(".textbox");

  requestAnimationFrame(() => {
    textboxes.forEach((textbox) => {
      const textboxWidth = textbox.clientWidth;

      textbox.style.left = "50%";
      textbox.style.transform = "translateX(-50%)";

      textbox.style.width = textboxWidth + "px";
    });
  });
}

document.querySelector("button.center-x").addEventListener("click", () => {
  centerText();
});
