import React from 'react';
import "./about.css"
import {text} from "./aboutText";

function AboutPage() {
    return (
        <div className="container">
            <header>
                <h1 className="title-about">About ConcentrApp</h1>
            </header>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/4LzrZSYNKng?si=ZofySv65bwP16MVZ"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                <main>
                    {text.map((item) => (
                        <section>
                            <h2 className="about">{item.title}</h2>
                            <p>{item.content}</p>
                        </section>
                    ))}
            </main>
            <footer>
                <p>&copy; 2023 ConcentrApp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AboutPage;
