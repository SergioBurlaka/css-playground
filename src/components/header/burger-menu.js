document.addEventListener('click', (event) => {
  const burger = event.target.closest('.burger-icon');

  if (burger) {
    burger.classList.toggle('active');
    return;
  }

  if (!event.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.burger-icon.active').forEach((icon) => {
      icon.classList.remove('active');
    });
  }
});
