import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "@/utils/i18n";

createRoot(document.getElementById("root")).render(<App />);
