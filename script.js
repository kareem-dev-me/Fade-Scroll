"use strict";
const sections = document.querySelectorAll(".scroll-section");

sections.forEach((section) => {
  // Specify The Transition Time
  const time = section.dataset.time;
  if (time) {
    section.style.transitionDuration = `${time}s`;
  }
  // Add Init Class
  section.classList.add(section.dataset.initialClass);
  // Observer Options
  const options = {
    root: null,
    threshold: [0.3, 0.01],
  };
  //   Observer Callback
  const callback = ([entry], observer) => {
    const element = entry.target;
    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
      element.style.opacity = "1";
      section.classList.remove(section.dataset.initialClass);
      if (element.dataset.stop) {
        observer.unobserve(element);
      }
    } else if (!entry.isIntersecting && entry.intersectionRatio < 0.01) {
      element.style.opacity = "0";
      section.classList.add(section.dataset.initialClass);
    }
  };
  //   The Observer Instance
  const observer = new IntersectionObserver(callback, options);
  observer.observe(section);
});
