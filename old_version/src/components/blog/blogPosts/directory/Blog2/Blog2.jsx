import React, { Component } from 'react'
import Police from './assets/police.jpg'
import blogStyles from '../../../Blog.module.css'

class Blog2 extends Component {
    render() {
        return (
            <div>
                <h1>Numbers don't lie...</h1>
                <img src={Police} className={blogStyles.titlePic} />
                <p>
                    Over the past week or so America has seen a wave of in-person protests and well-intended social media posts in the wake of George Floyd’s death. Often unverified information about racial inequality, systematic injustice, and police brutality has overwhelmed everyone’s news and social media feeds whether liberal or conservative.
                </p>
                <p>
                    Personally, I’m sympathetic to the Black Lives Matter movement and think that there is overwhelming evidence of historical, systematic racism in America. However, I was interested in seeing the statistics that would run counter to my political commitments and so I found an article by the Daily Wire called <a href="https://www.dailywire.com/news/new-study-no-racial-bias-police-involved-shootings-james-barrett">“6 Facts from New Study Finding NO RACIAL BIAS Against Blacks in Police Shootings“</a>.
                </p>
                <p>
                    I wasn’t disappointed as the very first reported statistic in the article was “Police are not more likely to fire on blacks than whites. In fact, blacks are 20% less likely to be fired on”. This was very much counter to what I thought was true. Thankfully, the author, James Barrett, included a link to the study which was titled <a href="https://www.nber.org/papers/w22399">“An Empirical Analysis of Racial Differences in Police Use of Force”</a> by Harvard Professor, <a href="https://scholar.harvard.edu/fryer/home">Roland G. Fryer</a>.
                </p>
                <p>
                    After reading through this study I found what I believe is the statistic that was reported by the Daily Wire, “blacks are 27.4 percent less likely to be shot at by police relative to non-black, non-Hispanics.” (the value may be different due to an update the author made in January 2018). However, this was directly followed with, “This coefficient is measured with considerable error and not statistically significant”. In other words, it’s not actually known whether this study’s data set indicates a difference in treatment between races. Reporting this as the truth is misleading.
                </p>
                <p>
                    Moreover, the paper is divided into two parts that have contradictory results; that black and hispanic individuals are more likely to have non-lethal force used on them in police encounters but they are not more likely to have lethal force used. However, these findings were based on two very different data sets. The part on non-lethal force used a data set from New York’s ‘Stop and Frisk’ <a href="https://www1.nyc.gov/site/nypd/stats/reports-analysis/stopfrisk.page">database</a>. While the part on lethal force used a data set collected from multiple police departments in the US which the paper said “is likely not a representative set of cities”.
                </p>
                <p>
                    In other words, the underlying data provides some evidence about policing in the United States but it is extremely limited. However, the Daily Wire article ends with this statement:
                </p>
                <p>
                    “The reality, as Prof. Fryer and others have found, is that our law enforcement is largely composed of men and women doing their best to protect the lives of citizens, handling what are often life and death situations as fairly and safely as they can”
                </p>
                <p>
                    This misconstrues both the findings and scope of the study. A more accurate claim would have to acknowledge the limitations and contradictory findings of the paper. Such as “The study shows that, in the New York Stop and Frisk program, non-lethal force was disproportionately used against blacks and hispanics while in Houston, there doesn’t seem to be evidence for racial bias in lethal police shootings.”
                </p>
                <p>
                    Reporting statistics is easy and commands respect due to our intuition that numbers are somehow more objective than words. However, it’s important to recognize that every reported statistic relied on data that was non-optimally collected and on simplifying assumptions. Therefore, it’s important to report on these statistics accurately and with the necessary context so that individuals understand their limitations. That means, it’s important to understand the statistics you cite and spread, especially when they pertain to important issues such as racism in the United States.
                </p>
            </div>
        )
    }
}

export default Blog2
