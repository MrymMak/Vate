import React, { useEffect } from "react";
import "./temp-docs-overview-css-1.css";

const TempDocsOverviewIndex1 = () => {
    useEffect(() => {
        // Equivalent to script.js functionality in React
        const buttons = document.querySelectorAll(".toggle-btn");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const content = button.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    button.querySelector(".arrow").textContent = "▼";
                } else {
                    content.style.display = "block";
                    button.querySelector(".arrow").textContent = "▲";
                }
            });
        });

        return () => {
            // Cleanup event listeners on component unmount
            buttons.forEach((button) => {
                button.removeEventListener("click", () => { });
            });
        };
    }, []);

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
                <div className="concept-box">
                    <button className="toggle-btn">
                        <span>#1 Concept</span>
                        <span className="arrow">▼</span>
                    </button>
                    <div className="toggle-content">
                        <p className="sub-text">Sub-text</p>
                        <p>Explanation of the concept</p>
                    </div>
                </div>
                <div className="concept-box">
                    <button className="toggle-btn">
                        <span>#2 Concept</span>
                        <span className="arrow">▼</span>
                    </button>
                    <div className="toggle-content">
                        <p className="sub-text">Sub-text</p>
                        <p>Explanation of the concept</p>
                    </div>
                </div>
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