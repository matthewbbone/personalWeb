import './App.css';
import Network from './components/Network';
import profile from './assets/profile.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Text-Container">
          <h1>Matthew Bone</h1>
          <img src={profile} className="Profile"/>
          <p>Hey! Welcome to my website. I’m a social data scientist exploring how people interact to form complex social systems—and how we can fix them when they break down. Currently, I’m a Grand Union DTP Scholar at the Oxford Internet Institute, where I research how technology impacts the labor market.</p>
          <p>My work focuses on using online labor data to understand the labor market at the skill or task level. For example, what tasks will disappear due to Generative AI? Which skills will it replace? To answer these questions, I use methods from complex systems, like network analysis, agent-based models, and dynamic systems. I’m also working on ways to calibrate economic models to better predict future trends.</p>
          <p>Before my DPhil, I studied mathematics and philosophy at Calvin University and studied for the MSc in Social Data Science at the OII. Between these, I worked as a software engineer at Capital Group and as a Data Scientist at the Burning Glass Institue. The latter of which I still work with, consulting on international skills development projects.</p>
          <p>If you're interested in learning more, I write on topics tangential to my research on Substack and you can find all the other typical links below.</p>
          <div className="Links-Box">
            <a href="https://matthewbbone.substack.com/" className="Link">Substack</a>
            <a href="https://scholar.google.com/citations?user=of203AkAAAAJ&hl=en&oi=sra" className="Link">Google Scholar</a>
            <a href="https://www.linkedin.com/in/matthew-bone-05a73a160/" className="Link">LinkedIn</a>
            <a href="https://bone-public.s3.amazonaws.com/BoneCurriculumVitae.pdf" className="Link">CV</a>
            <a href="https://github.com/matthewbbone" className='Link'>Github</a>
          </div>
        </div>
      </header>
      <Network className="network"/>
    </div>
  );
}

export default App;
