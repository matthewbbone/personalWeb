import styles from './App.css';
import Network from './components/Network.js';
import profile from './assets/profile.png';

export const App = () => {
    return (
        <div className={styles.App}>
            <header className={styles.appHeader}>
                <div className={styles.textContainer}>
                    <h1>Matthew B. Bone</h1>
                    <img src={profile} className={styles.profile} />
                    <p>Hey! Welcome to my website. I’m a social data scientist exploring how people interact to form complex social systems—and how we can fix them when they break down. Currently, I’m a Grand Union DTP Scholar at the Oxford Internet Institute, where I research how technology impacts the labor market.</p>
                    <p className={styles.optional}>My work focuses on using online labor data to understand the labor market at the skill or task level. For example, what tasks will disappear due to Generative AI? Which skills will it replace? To answer these questions, I use methods from complex systems, like network analysis, agent-based models, and dynamic systems. I’m also working on ways to calibrate economic models to better predict future trends.</p>
                    <p className={styles.optional}>Before my DPhil, I studied mathematics and philosophy at Calvin University and studied for the MSc in Social Data Science at the OII. Between these, I worked as a software engineer at Capital Group and as a Data Scientist at the Burning Glass Institue. The latter of which I still work with, consulting on international skills development projects.</p>
                    <p>If you're interested in learning more, I write on topics tangential to my research on Substack and you can find all the other typical links below.</p>
                    <div className={styles.linksBox}>
                        <a href="https://matthewbbone.substack.com/" className={styles.link}>Substack</a>
                        <a href="https://scholar.google.com/citations?user=of203AkAAAAJ&hl=en&oi=sra" className={styles.link}>Google Scholar</a>
                        <a href="https://www.linkedin.com/in/matthew-bone-05a73a160/" className={styles.link}>LinkedIn</a>
                        <a href="https://bone-public.s3.amazonaws.com/BoneCurriculumVitae.pdf" className={styles.link}>CV</a>
                        <a href="https://github.com/matthewbbone" className={styles.link}>Github</a>
                    </div>
                </div>
            </header>
            <Network className="network" />
        </div>
    )
}