import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import TranslatorPage from "./TranslatorPage";
import WordlePage from "./WordlePage";
import MemoPage from "./MemoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/translate" element={<TranslatorPage />} />
        <Route path="/maskle" element={<WordlePage />} />
        <Route path="/memo" element={<MemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
