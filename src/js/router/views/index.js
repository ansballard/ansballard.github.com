import { loadView } from "../utils";

export function index() {
  loadView(import("./index.md"));
}

export function notFound() {
  loadView(import("./404.md"));
}

export function projects() {
  loadView(import("./projects").then(_ => _.default));
  // hack because es modules are exported as { default, _esModule: true}
}
