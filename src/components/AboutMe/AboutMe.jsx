import React from 'react'
import Profile from '../../assets/photos/profile.jpg'
import styles from './AboutMe.module.css'
import { useState } from 'react'
import AboutMeImage from '../../assets/photos/image0.jpg'
import AboutMeImageMobile from '../../assets/photos/image0_mobile.jpg'
import NavBar from '../navbar/NavBar'
import { Scrollama, Step } from 'react-scrollama'
import LinkedIn from '../../assets/icons/linkedin.png'
import Github from '../../assets/icons/github.png'

const Section = ({ active, progress }) => {

    return (
        <div className={styles.container}>
            <div className={styles.bottomContainer} style={{ opacity: `${active & progress > 0 ? progress * 5 - 4 : 1}` }}>
                <div>
                    <img src={Profile} className={styles.profile} />
                    <div className={styles.socialLinks}>
                        <div>matthewbbone@gmail.com</div>
                        <a href="https://www.linkedin.com/in/matthew-bone-05a73a160/" target="_blank">
                            <img src={LinkedIn} width="20px" height="20px" className={styles.social} />
                        </a>
                        <a href="https://github.com/matthewbbone" target="_blank">
                            <img src={Github} width="20px" height="20px" className={styles.social} />
                        </a>
                    </div>
                </div>
                <div className={styles.highlightedText}>
                    <h2>About Me</h2>
                    <p>
                        Hello! My name is Matthew Bone, first and foremost, I think of myself as a curious learner with a passion for new ideas and what they can do to improve the world. I’m also a recent graduate of Calvin University with a degree in mathematics and philosophy. In my time as an undergraduate I focused on gaining skills in statistical programming and data science, as well as in understanding discourse ethics and perspectivism. Throughout my time at Calvin I was lucky enough to participate in a wide variety of research projects in domains such as public health, news and media, the philosophy of mathematics, and developmental economics. Altogether these experiences enforced my belief in the efficacy of rigorous research and pursuing lower-case truths, while recognizing there’s always a new way to understand an old problem.
                    </p>
                    <p>
                        When not in the classroom or working on research, I was involved in student organizations such as Rangeela, a cultural performance show, and, most significantly, acting as the co-director of the Calvin Interfaith Alliance. In my time as an interfaith leader on campus, I became passionate about how sharing stories, breaking bread, and learning about others can overcome prejudice and heal divides. This practical experience both informed my study of discourse ethics and perspectivism as well as gave me a cause to champion.
                    </p>
                    <p>
                        After graduating, I moved to Irvine, CA to work for Capital Group, a large investment management firm, in their technology rotational program. Currently, in my first rotation, I am working for the development engineering team where I am helping to improve the underlying system of the company’s technical infrastructure.
                    </p>
                </div>
            </div>
        </div>
    )

}

const AboutMe = () => {

    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const [stepProgress, setStepProgress] = useState(null);
    const [width, setWidth] = useState(window.innerWidth)

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    const onStepProgress = ({ progress }) => {
        console.log('executing')
        setStepProgress(progress)
    }

    return (
        <div className={styles.homePage} style={{ backgroundImage: `url(${width > 600 ? AboutMeImage : AboutMeImageMobile})` }}>

            <NavBar active={currentStepIndex == 0}
                progress={stepProgress} width={width} />

            <Scrollama onStepEnter={onStepEnter} progress onStepProgress={onStepProgress} offset={1}>

                {
                    [
                        <Step data={0} key={0}>
                            <div>
                                <Section
                                    active={currentStepIndex == 0}
                                    progress={stepProgress}></Section>
                            </div>
                        </Step>
                    ]
                }

            </Scrollama>
        </div>
    );
};


export default AboutMe