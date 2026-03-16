function animateLaserBeam(fromElement, toElement) {
  const fromRect = fromElement.getBoundingClientRect();
  const toRect = toElement.getBoundingClientRect();

  const startX = fromRect.left + fromRect.width / 2;
  const startY = fromRect.top + fromRect.height / 2;
  const endX = toRect.left + toRect.width / 2;
  const endY = toRect.top + toRect.height / 2;

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  const distance = Math.hypot(deltaX, deltaY);
  const laser = document.createElement("div");
  laser.classList.add("laser-line");
  laser.style.width = `${distance}px`;
  laser.style.left = `${startX}px`;
  laser.style.top = `${startY}px`;
  laser.style.transform = `rotate(${angle}deg)`;

  document.body.appendChild(laser);

  setTimeout(() => {
    laser.remove();
  }, 800);
}
