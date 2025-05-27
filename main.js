// Animate skill bars filling on scroll within view
document.addEventListener("DOMContentLoaded", () => {
  const skillFills = [
    { selector: ".js-fill", width: "90%" },
    { selector: ".css-fill", width: "85%" },
    { selector: ".react-fill", width: "80%" },
    { selector: ".responsive-fill", width: "95%" },
  ];

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function animateSkills() {
    skillFills.forEach(({ selector, width }) => {
      const el = document.querySelector(selector);
      if (el && isInViewport(el) && !el.classList.contains("animated")) {
        el.style.animation = `fillBar 1.8s forwards ease-in-out`;
        el.style.width = width;
        el.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", animateSkills);
  animateSkills(); // Also run on load in case visible
});

// Animation keyframe for skill bar fill
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes fillBar {
      from { width: 0; }
      to { width: var(--target-width, 80%); }
    }
  `;
document.head.appendChild(styleSheet);

// Scrollspy using IntersectionObserver for Navbar active link highlighting
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a.nav-link");

  function clearActive() {
    navLinks.forEach((link) => link.classList.remove("active"));
  }

  function setActive(id) {
    clearActive();
    const activeLink = document.querySelector(`nav a.nav-link[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // IntersectionObserver options
  const observerOptions = {
    root: null,
    rootMargin: "-70px 0px -70% 0px", // Adjust navbar height offset and bottom margin for earlier detection
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});
