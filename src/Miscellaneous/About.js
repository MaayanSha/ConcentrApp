import React from 'react';
import "./about.css"

function AboutPage() {
    return (
        <div className="container">
            <header>
                <h1 className="title-about">About ConcentrApp</h1>
                <p className="piska">Welcome to ConcentrApp, a powerful tool designed to streamline the process of conducting surveys and gathering data for researchers. With our app, researchers can easily create custom-made questionnaires, prompt them at pre-assigned times to subjects' personal mobile devices, and collect real-time responses and self-reports.</p>
            </header>
                <main>
                <section>
                    <h2 className="about">Effortless Questionnaire Creation</h2>
                    <p className="piska">Our app empowers researchers to create tailored questionnaires effortlessly. Whether you need to design surveys for academic studies, market research, or any other purpose, our intuitive interface allows you to craft custom questions with various response types. From multiple-choice and Likert scale to open-ended questions, you have the flexibility to capture the data you need.</p>
                </section>

                <section>
                    <h2 className="about">Real-Time Prompting and Self-Reporting</h2>
                    <p className="piska">Gone are the days of manual data collection. Our app takes advantage of mobile technology by seamlessly delivering questionnaires to subjects' personal mobile devices at pre-assigned times. This ensures timely and convenient data collection, as respondents can answer questions whenever and wherever they choose. By enabling real-time self-reporting, our app eliminates the need for researchers to rely on memory or manual data entry.</p>
                </section>

                <section>
                    <h2 className="about">Comprehensive Data Analysis</h2>
                    <p className="piska">We understand the importance of data analysis in research. Our app provides researchers with a range of powerful tools to make sense of the collected data. Visualize your findings with interactive charts and graphs, examine response patterns, and gain valuable insights into your research subjects. Our built-in statistical analysis capabilities help you identify trends, correlations, and other key metrics, allowing you to draw meaningful conclusions from your data.</p>
                </section>

                <section>
                    <h2 className="about">Efficient Experiment Management</h2>
                    <p className="piska">Managing multiple experiments can be a daunting task. Our app simplifies experiment management with user-friendly dashboards. Keep track of all your ongoing and completed experiments, review participant lists, and monitor response rates from a centralized location. With our streamlined interface, you can stay organized and focused on your research goals.</p>
                </section>

                <section>
                    <h2 className="about">Secure and Reliable</h2>
                    <p className="piska">We take data security seriously. Our app ensures that all data collected is stored securely, adhering to the highest industry standards. Your participants' privacy and confidentiality are paramount to us, and we employ robust encryption protocols to safeguard their personal information.</p>
                </section>

                <section>
                    <h2 className="about">Seamless Data Export</h2>
                    <p className="piska">Exporting your research data shouldn't be a hassle. Our app allows you to effortlessly export your collected data in various formats, such as CSV or Excel, for further analysis or integration with other research tools. Share your findings with colleagues, import data into statistical software, or generate reports—all with just a few clicks.</p>
                </section>

                <section>
                    <h2 className="about">Join Our Research Community</h2>
                    <p className="piska">Our app is built with researchers in mind, aiming to enhance the efficiency and effectiveness of data collection. Join our vibrant research community and unlock the potential of seamless, real-time questionnaire administration. Collaborate with fellow researchers, share best practices, and contribute to the advancement of knowledge in your field.
                    </p>
                </section>

                <section>
                    <h2 className="about">Start Streamlining Your Research Today</h2>
                    <p className="piska">Embrace the power of our research questionnaire app and revolutionize the way you conduct studies. Say goodbye to outdated paper-based surveys and manual data entry. With our app, you can design, administer, and analyze questionnaires with ease, all in one centralized platform. Take the next step in your research journey and sign up today.</p>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 ConcentrApp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AboutPage;
