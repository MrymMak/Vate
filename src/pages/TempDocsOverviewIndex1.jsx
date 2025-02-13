import React, { useState } from "react";
import "./TempDocsOverviewCss1.css"

const TempDocsOverviewIndex1 = () => {
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (index) => {
        setOpenSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="template-container">
            <header>
                <h1>Overview Topic</h1>
                <p className="intro">
                    Introduction: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor...
                </p>
            </header>

            <section className="concepts">
                {[1, 2].map((index) => (
                    <div className="concept-box" key={index}>
                        <button className="toggle-btn" onClick={() => toggleSection(index)}>
                            <span># {index} Concept</span>
                            <span className="arrow">{openSections[index] ? "▲" : "▼"}</span>
                        </button>
                        {openSections[index] && (
                            <div className="toggle-content">
                                <p className="sub-text">Sub-text</p>
                                <p>Explanation of the concept</p>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <section className="notes">
                <div className="info">
                    <p>Notes are written here</p>
                </div>
            </section>

            <section className="workflow">
                <h2>Workflow of the feature</h2>
                <div className="workflow-diagram">
                    <p>[Workflow Diagram Placeholder]</p>
                </div>
            </section>

            <section className="related-topics">
                <h2>Related Topics</h2>
                <div className="topics">
                    <div className="topic">XX</div>
                    <div className="topic">XX</div>
                    <div className="topic">XX</div>
                    <div className="topic">XX</div>
                </div>
            </section>
        </div>
    );
};

export default TempDocsOverviewIndex1;