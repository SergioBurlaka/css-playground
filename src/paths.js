export function resolveAsset(path) {
  const base = import.meta.env.BASE_URL;
  const normalized = path.replace(/^\//, "");

  return `${base}${normalized}`;
}
