import { useSearchParams, useNavigate } from "react-router-dom";
import "./TranslatorPage.css";

import tree1 from "./assets/Tree1.png";
import tree2 from "./assets/Tree3.png";
import bush1 from "./assets/Bush_1.png";
import bush2 from "./assets/Bush_2.png";

function TranslatorPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const text = searchParams.get("text") || "";

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="translator-page">
            {/* Decorative background elements */}
            <div className="decorative-elements">
                <img src={tree1} alt="" className="decorative-element tree-1" />
                <img src={tree2} alt="" className="decorative-element tree-2" />
                <img src={bush1} alt="" className="decorative-element bush-1" />
                <img src={bush2} alt="" className="decorative-element bush-2" />
            </div>

            {/* Main content */}
            <div className="translator-content">
                <h1 className="translator-title">Maskoogle</h1>

                <div className="result-container">
                    <p className="result-label">Translation:</p>
                    <div className="result-text">{text}</div>
                </div>

                <button className="back-button" onClick={handleBack}>
                    ← Back to Search
                </button>
            </div>
        </div>
    );
}

export default TranslatorPage;
