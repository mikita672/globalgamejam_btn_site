import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import TranslatorPage from "./TranslatorPage";
import WordlePage from "./WordlePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/translate" element={<TranslatorPage />} />
        <Route path="/wordle" element={<WordlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
