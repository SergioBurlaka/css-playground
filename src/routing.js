const routes = {
  "glowing-cart": {
    file: "/src/components/glowing-cart/glowing-cart.html",
    title: "Glowing Cart",
  },
  "sinling-index": {
    file: "/src/components/sinling-index/sinling-index.html",
    title: "Sinling index",
  },
  "sinling-count": {
    file: "/src/components/sinling-count/sinling-count.html",
    title: "Sinling count",
  },
};

const defaultRoute = "glowing-cart";
const routerView = document.querySelector("#router-view");

function getCurrentRoute() {
  const routeName = window.location.hash.replace(/^#\/?/, "");

  return routes[routeName] ? routeName : defaultRoute;
}

function updateActiveLink(routeName) {
  document.querySelectorAll(".site-nav a[href^='#']").forEach((link) => {
    const linkRoute = link.getAttribute("href").replace(/^#\/?/, "");
    link.classList.toggle("active", linkRoute === routeName);
  });

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const childActive = [...dropdown.querySelectorAll("a[href^='#']")].some(
      (link) => link.getAttribute("href").replace(/^#\/?/, "") === routeName,
    );
    dropdown.classList.toggle("is-active", childActive);
  });
}

async function loadRoute(loadHtml) {
  const routeName = getCurrentRoute();
  const route = routes[routeName];

  document.title = route.title;
  await loadHtml(route.file, routerView);
  updateActiveLink(routeName);
}

export async function initRouter(loadHtml) {
  await loadRoute(loadHtml);

  window.addEventListener("hashchange", () => loadRoute(loadHtml));
}
