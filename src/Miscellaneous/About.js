import React from 'react';
import "./about.css"
import {text} from "./aboutText";
import AboutSlider from "./AboutSlider";

function AboutPage() {
    return (
        <div className="container">
            <AboutSlider />
            <footer>
                <p>&copy; 2023 ConcentrApp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AboutPage;

// <iframe width="560" height="315" src="https://www.youtube.com/embed/4LzrZSYNKng?si=ZofySv65bwP16MVZ"
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowFullScreen></iframe>
// <main>
//     {text.map((item) => (
//         <section>
//             <h2 className="about">{item.title}</h2>
//             <p>{item.content}</p>
//         </section>
//     ))}
// </main>