import { createRoot } from "react-dom/client";
import { App } from "./App"

require('./index.css')

const root = createRoot(document.getElementById("root"))

root.render(
    <App />
);