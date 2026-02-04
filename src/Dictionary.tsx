import { useState } from "react";
import "./Dictionary.css";
import bookIcon from "./assets/book.png";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface DictionaryProps {
    className?: string;
}

function Dictionary({ className = "" }: DictionaryProps) {
    const [showDictionary, setShowDictionary] = useState(false);

    return (
        <>
            <button
                className={`dictionary-button ${className}`}
                onClick={() => setShowDictionary(true)}
                title="Dictionary"
            >
                <img src={bookIcon} alt="Dictionary" className="dictionary-icon" />
            </button>

            {showDictionary && (
                <div
                    className="dictionary-overlay"
                    onClick={() => setShowDictionary(false)}
                >
                    <div
                        className="dictionary-popup"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="dictionary-header">
                            <h2 className="dictionary-title">Dictionary</h2>
                            <button
                                className="dictionary-close"
                                onClick={() => setShowDictionary(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="dictionary-grid">
                            {ALPHABET.map((letter) => (
                                <div key={letter} className="dictionary-item">
                                    <span className="dict-normal">{letter}</span>
                                    <span className="dict-arrow">→</span>
                                    <span className="dict-obfuscated">{letter}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dictionary;
