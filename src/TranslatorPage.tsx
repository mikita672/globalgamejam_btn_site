import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TranslatorPage.css";

import tree1 from "./assets/Tree1.png";
import tree2 from "./assets/Tree3.png";
import bush1 from "./assets/Bush_1.png";
import bush2 from "./assets/Bush_2.png";

import mask1 from "./assets/Mask_recharge_1.png";
import mask2 from "./assets/Mask_recharge_2.png";
import mask3 from "./assets/Mask_recharge_3.png";
import mask4 from "./assets/Mask_recharge_4.png";
import mask5 from "./assets/Mask_recharge_5.png";

const maskFrames = [mask1, mask2, mask3, mask4, mask5];

function TranslatorPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [maskFrame, setMaskFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMaskFrame((prev) => (prev + 1) % maskFrames.length);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="translator-page">
      <div className="translator-decorative-elements">
        <img src={tree1} alt="" className="translator-decorative-element translator-tree-1" />
        <img src={tree2} alt="" className="translator-decorative-element translator-tree-2" />
        <img src={bush1} alt="" className="translator-decorative-element translator-bush-1" />
        <img src={bush2} alt="" className="translator-decorative-element translator-bush-2" />
      </div>

      <div className="translator-content">
        <h1 className="translator-title">Mask Translator</h1>

        <div className="translator-mask-character">
          <img src={maskFrames[maskFrame]} alt="Mask character" />
        </div>

        <div className="translator-input-section">
          <label className="translator-label">Enter text to translate:</label>
          <textarea
            className="translator-input"
            placeholder="Type something here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
          />
        </div>

        {inputText && (
          <div className="result-container">
            <p className="result-label">Translation:</p>
            <div className="result-text">{inputText}</div>
          </div>
        )}

        <button className="translator-back-button" onClick={handleBack}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default TranslatorPage;
