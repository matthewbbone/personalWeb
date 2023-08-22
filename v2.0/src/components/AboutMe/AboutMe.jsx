import React from 'react'
import Profile from '../../assets/photos/profile.jpg'
import styles from './AboutMe.module.css'
import { useState, useRef, useEffect} from 'react'
import AboutMeImage from '../../assets/photos/image0.jpg'
import NavBar from '../navbar/NavBar'
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
                        Welcome to my personal website! I’m Matthew Bone, a software developer, social researcher, and an adventurer currently based in Los Angeles. In the Fall of 2022, I will begin my MSc in Social Data Science at Oxford University. There I’m hoping to explore computational methods for social research, emerging technology regulation, and whether it’s possible to replace coffee with Earl Grey tea. 
                    </p>
                    <p>
                        I graduated from Calvin University in 2020, studying mathematics and philosophy, and have since worked as a software developer at Capital Group, a large asset manager. In college, I participated in research spanning public health, news and journalism, economics, and the philosophy of mathematics. In my last year, I helped found and lead an interfaith student organization that promoted religious diversity on a predominantly Christian campus. This work continued into my career as I acted as an intercommunity coordinator for Capital Group’s Muslim community, leading events focused on religious and cultural bridge-building. This was done while participating in a rotational tech leadership program where I developed software and participated in emerging tech research.
                    </p>
                    <p>
                        Outside of work and the classroom, I try to walk up big hills, catch waves with some plywood, and run in circles. 
                    </p>
                </div>
            </div>
        </div>
    )

}

const AboutMe = () => {

    const [width, setWidth] = useState(window.innerWidth)
    const [pos, setPos] = useState(0)

    document.body.onscroll = () => {
        if (document.body.scrollHeight == window.innerHeight) {
            setPos(0)
        } else {
            setPos(window.scrollY / (document.body.scrollHeight - window.innerHeight))
        }
        setPos(window.scrollY / (document.body.scrollHeight - window.innerHeight))
        //setPos((window.scrollY + window.innerHeight )/ document.body.scrollHeight)
    }

    return (
        <div className={styles.homePage} style={{ backgroundImage: `url(${AboutMeImage})` }}>

            <NavBar active={true}
                progress={pos} width={width} />

            <div>
                <Section
                    active={true}
                    progress={pos}></Section>
            </div>

        </div>
    );
};


export default AboutMe