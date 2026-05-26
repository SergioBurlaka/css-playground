const routes = {
  "furniture-shop": {
    file: "/partials/furniture-shop.html",
    title: "Furniture Shop",
  },
  "glowing-cart": {
    file: "/partials/glowing-cart.html",
    title: "Glowing Cart",
  },
};

const defaultRoute = "furniture-shop";
const routerView = document.querySelector("#router-view");

async function loadHtml(file, element) {
  const response = await fetch(file);

  if (response.ok) {
    element.innerHTML = await response.text();
    return;
  }

  element.innerHTML = `<p>Could not load ${file}.</p>`;
}

function getCurrentRoute() {
  const routeName = window.location.hash.replace(/^#\/?/, "");

  return routes[routeName] ? routeName : defaultRoute;
}

function updateActiveLink(routeName) {
  document.querySelectorAll("[data-route-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.routeLink === routeName);
  });
}

async function loadRoute() {
  const routeName = getCurrentRoute();
  const route = routes[routeName];

  document.title = route.title;
  await loadHtml(route.file, routerView);
  updateActiveLink(routeName);
}

async function loadIncludes() {
  const includes = [...document.querySelectorAll("[data-include]")];

  await Promise.all(
    includes.map((element) => {
      const file = element.getAttribute("data-include");

      return loadHtml(file, element);
    }),
  );
}

await loadIncludes();
await loadRoute();

window.addEventListener("hashchange", loadRoute);