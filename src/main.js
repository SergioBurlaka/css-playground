
async function loadHtml(file, element) {
  const response = await fetch(file)

  if (response.ok) {
    element.innerHTML = await response.text()
    return
  }

  element.innerHTML = `<p>Could not load ${file}.</p>`
}


async function loadIncludes() {
  const includes = [...document.querySelectorAll("[data-include]")]

  await Promise.all(
    includes.map((element) => {
      const file = element.getAttribute("data-include")

      return loadHtml(file, element)
    }),
  )
}

await loadIncludes()