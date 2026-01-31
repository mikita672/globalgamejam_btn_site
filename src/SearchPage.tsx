import { useState } from 'react';
import './SearchPage.css';

// Import assets
import tree1 from './assets/Tree1.png';
import tree2 from './assets/Tree2.png';
import tree3 from './assets/Tree3.png';
import bush1 from './assets/Bush_1.png';
import bush2 from './assets/Bush_2.png';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="search-page">
            {/* Decorative background elements */}
            <div className="decorative-elements">
                <img src={tree1} alt="" className="decorative-element tree-1" />
                <img src={tree2} alt="" className="decorative-element tree-2" />
                <img src={tree3} alt="" className="decorative-element tree-3" />
                <img src={bush1} alt="" className="decorative-element bush-1" />
                <img src={bush2} alt="" className="decorative-element bush-2" />
            </div>

            {/* Main search content */}
            <div className="search-content">
                <h1 className="search-title">Jamm</h1>

                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for something..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchPage;
