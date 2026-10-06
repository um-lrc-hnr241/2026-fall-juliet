/* Progressive enhancement: without JavaScript, all stop articles remain readable. */
(() => {
  const cards = Array.from(document.querySelectorAll(".stop-card"));
  const progress = document.getElementById("journey-progress");
  const previous = document.getElementById("previous-stop");
  const next = document.getElementById("next-stop");
  const scene = document.querySelector(".travel-scene");
  const stopLinks = Array.from(document.querySelectorAll(".journey-stops a"));
  if (!cards.length || !progress || !previous || !next) return;

  let current = 0;

  function showStop(index, moveFocus = false) {
    current = Math.max(0, Math.min(index, cards.length - 1));
    cards.forEach((card, cardIndex) => {
      card.hidden = cardIndex !== current;
    });
    const stopName = cards[current].querySelector(".stop-kicker").textContent.replace(/^\d+\s*·\s*/, "");
    progress.textContent = `Stop ${current + 1} of ${cards.length}: ${stopName}`;
    stopLinks.forEach((link, linkIndex) => {
      if (linkIndex === current) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
    });
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
    if (scene) {
      scene.dataset.stop = String(current + 1);
      scene.classList.remove("is-moving");
      void scene.offsetWidth;
      scene.classList.add("is-moving");
    }
    if (moveFocus) cards[current].querySelector("h3").focus({ preventScroll: true });
  }

  cards.forEach((card, index) => {
    const heading = card.querySelector("h3");
    if (heading) heading.tabIndex = -1;
    const link = document.querySelector(`.journey-stops a[href="#${card.id}"]`);
    if (link) link.addEventListener("click", () => showStop(index));
  });

  previous.addEventListener("click", () => showStop(current - 1));
  next.addEventListener("click", () => showStop(current + 1));
  showStop(0);
})();
