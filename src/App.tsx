import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import TranslatorPage from "./TranslatorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/translate" element={<TranslatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
