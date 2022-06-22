import React, { Component } from 'react'
import blogStyles from '../../../Blog.module.css'
import Whitehead from './assets/whitehead.png'

class Blog4 extends Component {

    render() {

        var isMobile = window.matchMedia("(min-width: 600px)")
        console.log(isMobile)

        return (
            <div>
                <h1>Philosopher Network Visualization</h1>
                <div className={blogStyles.centerDisplay}>“The safest general characterization of the European philosophical tradition is that it consists of a series of footnotes to Plato”<br /> Alfred N. Whitehead</div>
                <div className={blogStyles.dynamicShuffle}>
                    <div>
                        <p>
                            This quote, by one of my favorite mathematicians turned philosophers, is an often used, yet often unattributed, phrase for describing the history of philosophy, tongue-in-cheek. Like all good generalizations it has a grain of truth. Namely, that much of Western philosophy is written as a response to ideas presented in the work of Plato. Aristotle, being the student of Plato, is perhaps the first and most influential figure to pen a footnote to the work of Plato. However, the influence these two philosophical giants had was preceded and anteceded by vast array of brilliant minds which each added their own take to be engrained into the history of philosophy.
                        </p>
                        <p>
                            When studying a single philosopher, it is easy to understand who influenced them by who they critique and cite in their own work. It takes a bit more work to see whom they have influenced, in turn. However, if one wanted to understand the influences and influence a given philosopher had which is two or more degrees removed, it would take a deep dive into the work of many philosophers.
                        </p>
                        <p>
                            Clearly, Plato’s ideas have propagated directly and indirectly throughout most of the work of Western philosophy. But what about the lesser known philosophers? What is the influence of Victor Cousin? Of Giovanni Gentile? Of Alfred N. Whitehead? These philosophers don’t seem to stand quite as tall as Plato, Descartes, or Heidegger but they did have an influence.
                        </p>
                        <p>
                            Wikipedia provides us with a method to roughly approximate the indirect influence philosophers have throughout western philosophy. Many influential philosophers have a wikipedia page that lists their direct influences and those they directly influenced. Additionally, each of those listed are hyperlinked to their wiki page. This provides a way to scrape together an influence network of all the philosophers with wikipedia pages. To be clear, using wikipedia as a data source is hardly an accurate way to understand the influences incorporated into a given philosophers work. Most philosophers have read the works of far more than what is listed as their influences. Hence, this proxy should be seen as an interesting but non-consequential approximation to the influence network of philosophers with wikipedia pages.
                        </p>
                        <p>
                            Over the past few months, I’ve used some of my free time to scrape this influence network off of wikipedia, along with the birth and death dates of each philosopher. I used a python package called beautiful soup to parse the wiki pages’ html and iteratively build the network from it’s starting node, Rene Descartes. This resulted in a network of 774 unique philosophers with 3970 influence connections, i.e. nodes and edges. Then I used a package in R called visNetwork to create a visualization ordering the philosophers chronologically from left to right (not to scale).
                        </p>
                        <p>
                            When you select a given philosopher, whether by drop down list or clicking on their node, it highlights them and all of the philosophers they’ve influenced, 2 degrees removed. For instance, Victor Cousin influenced Ralph Waldo Emerson, who in turn influenced Karl Marx. So perhaps, a bit of Cousin lives on in the work of Emerson and Karl Marx who are philosophical giants.
                        </p>
                    </div>
                    <img src={Whitehead} className={blogStyles.articlePic} style={{width: "200px", marginTop: "20px", marginBottom: "20px"}}/>
                </div>
                <iframe src='https://matthewbbone.github.io/matthewbbone/philosophernet.html' className={blogStyles.dataView} scrolling="no"></iframe>
                <p>
                My goal for this project was to get some experience with webscraping and to develop an original network that I can use for future projects. Additionally, creating this visualization helped me to learn some basic network visualization tools like the visNetwork package in R and gephi. I was surprised at how simple webscraping actually was, however, handling non-standardized dates for birth and death required a lot of iterative fixes to my data collection process before I got sufficiently consistent date extractions. There’s definitely some improvements that could be made to this dataset, like capturing the last few dates that I failed to extract. Additionally, it would be feasible to collect significantly more information from the wikipedia pages but I’m dissuaded by the amount of work it took to extract something as simple as dates. However, I do hope to comeback to this network in the future.
                </p>
            </div>
        )
    }
}

export default Blog4