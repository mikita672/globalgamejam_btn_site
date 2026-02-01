import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";

import tree1 from "./assets/Tree1.png";
import tree3 from "./assets/Tree2.png";
import tree2 from "./assets/Tree3.png";
import bush1 from "./assets/Bush_1.png";
import bush2 from "./assets/Bush_2.png";

import mask1 from "./assets/Mask_recharge_1.png";
import mask2 from "./assets/Mask_recharge_2.png";
import mask3 from "./assets/Mask_recharge_3.png";
import mask4 from "./assets/Mask_recharge_4.png";
import mask5 from "./assets/Mask_recharge_5.png";

import alphabetIcon from "./assets/alphabet.png";
import translateIcon from "./assets/translate.png";

const maskFrames = [mask1, mask2, mask3, mask4, mask5];

function SearchPage() {
    const [maskFrame, setMaskFrame] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setMaskFrame((prev) => (prev + 1) % maskFrames.length);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="search-page">
            <div className="search-decorative-elements">
                <img src={tree1} alt="" className="search-decorative-element search-tree-1" />
                <img src={tree2} alt="" className="search-decorative-element search-tree-2" />
                <img src={bush1} alt="" className="search-decorative-element search-bush-1" />
                <img src={bush2} alt="" className="search-decorative-element search-bush-2" />
            </div>

            <div className="search-content">
                <h1 className="search-title">Maskoogle</h1>

                <div className="search-input-wrapper">
                    <img src={tree3} alt="" className="search-tree-3" />
                    <div className="mask-character">
                        <img src={maskFrames[maskFrame]} alt="Mask character" />
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for something..."
                        readOnly
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                    />

                    {isFocused && (
                        <div className="search-suggestions">
                            <Link to="/maskle" className="suggestion-item">
                                <img src={alphabetIcon} alt="" className="suggestion-icon" />
                                <span className="suggestion-text">Maskle</span>
                            </Link>
                            <Link to="/translate" className="suggestion-item">
                                <img src={translateIcon} alt="" className="suggestion-icon" />
                                <span className="suggestion-text">Mask Translator</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
