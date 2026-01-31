import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const maskFrames = [mask1, mask2, mask3, mask4, mask5];

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [maskFrame, setMaskFrame] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setMaskFrame((prev) => (prev + 1) % maskFrames.length);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/translate?text=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="search-page">
            <div className="decorative-elements">
                <img src={tree1} alt="" className="decorative-element tree-1" />
                <img src={tree2} alt="" className="decorative-element tree-2" />
                <img src={bush1} alt="" className="decorative-element bush-1" />
                <img src={bush2} alt="" className="decorative-element bush-2" />
            </div>

            <div className="search-content">
                <h1 className="search-title">Maskoogle</h1>

                <form className="search-form" onSubmit={handleSubmit}>
                    <div className="search-input-wrapper">
                        <img src={tree3} alt="" className="tree-3" />
                        <div className="mask-character">
                            <img src={maskFrames[maskFrame]} alt="Mask character" />
                        </div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for something..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchPage;
