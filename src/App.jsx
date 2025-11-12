import { useTranslation } from "react-i18next";
import { Button } from "./components/ui/button";

function App() {
  const { t, i18n } = useTranslation();

  return <h1>{t("Welcome to React")}</h1>;
}

export default App;
