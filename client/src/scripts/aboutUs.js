import React from "react";

export default function About() {
    return (
        <div className="about-container" id="about-container">
            <h1 id="contact-h1" className="about-h1">About Us</h1>
            <br /> <br />
            <details className="about-details">
                <summary id="summary-1" className="summary">Mostafa Ali</summary>
                <ul className="summary-list">
                    <li>
                        <p className="about-summary">Student In Faculty Of Computer Science And Artificial Intelligence, Cairo University</p>
                    </li>
                    <li>
                        <p className="about-summary">Undergraduate Computer Science Student</p>
                    </li>
                    <li>
                        <p className="about-summary">Student At Information Systems Department</p>
                    </li>
                    <li>
                        <p className="about-summary">Contact Number: (+20)112 819 5095</p>
                    </li>
                    <li>
                        <p className="about-summary">Contact Email: mostafaali55589@gmail.com</p>
                    </li>
                </ul>
            </details>
            <br />
            <details className="about-details">
                <summary id="summary-2" className="summary">Abd El-Gafour Nasser</summary>
                <ul className="summary-list">
                    <li>
                        <p className="about-summary">Student In Faculty Of Computer Science And Artificial Intelligence, Cairo University</p>
                    </li>
                    <li>
                        <p className="about-summary">UndergraduateComputer Science Student </p>
                    </li>
                    <li>
                        <p className="about-summary">Student At Information Systems Department</p>
                    </li>
                    <li>
                        <p className="about-summary">Contact Number: (+20)155 686 8406</p>
                    </li>
                    <li>
                        <p className="about-summary">Contact Email: oppadnasser@gmail.com</p>
                    </li>
                </ul>
            </details>
        </div>
    );
}