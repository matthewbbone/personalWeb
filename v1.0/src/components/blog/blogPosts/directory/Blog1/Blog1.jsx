import React, { Component } from 'react'
import Lang from './assets/lang.png'
import blogStyles from '../../../Blog.module.css'

class Blog1 extends Component {
    render() {
        return (
            <div>
                <h1>Language Competition:<br />An Abrams-Strogatz inspired agent-based model</h1>
                <img src={Lang} className={blogStyles.titlePic} />
                <p className={blogStyles.italic}>
                    In this post I present a netLogo model I developed while going through the Santa Fe Institute’s Complexity Science course. At the bottom of the page there are links to download the model’s source code and to a website that lets you run netLogo models online.
                </p>
                <h2>What is it?</h2>
                <p>
                    This model is loosely-inspired by the paper “Agent Based Models of Language Competition” by Vazquez, Castello, and San Miguel. This paper compares a few different types of language competition models using 2d lattices and complex networks. I used the paper as a guide for building a simple model in netLogo. My model is a square lattice that simulates an environment in which individuals, or patches, can interact. Each patch is a local individual that is influenced by surrounding patches (which patches is determined by the connectivity parameter). The blue and red represents the language of that individual. In this model there is no possibility of bilingual individuals.
                </p>
                <h2>How it works</h2>
                <p>
                    Each patch is an individual that speaks either language A or B. The patches are red if they speak language A and blue if they speak language B. In the setup, the grid has red and blue patches setup randomly in the grid where the percent of patches that are red is equal to ‘int-percent-A’.
                </p>
                <p>
                    For each step, every patch checks the patches within a certain radius of it. This radius is equal to the diagonal of the square lattice multiplied by ‘connectivity’. Therefore, when ‘connectivity’ is 1, it means the 2d lattice is fully connected. The smaller connectivity is, the more localized each patches reference space becomes.
                </p>
                <p>
                    The higher proportion of patches within the radius that are red/speak language A, the more likely the patch is to switch to A. All else equal, twice the number of patches in the radius that speak A, twice the probability the patch will switch to A. However, this is weighted by ‘A-prestige’ and ‘B-prestige’ and altered by the volatility parameter.
                </p>
                <h2>Parameters</h2>
                <p>
                    Connectivity – a measure of local-global connectivity where larger values correspond to more connected state-spaces. At very low connectivity (usually less than .03) this may cause an error since the patches don’t reference any other patches.
                </p>
                <p>
                    A-prestige & B-prestige: prestige refers to “a symmetry breaking parameter favoring the state associated with one or the other language which accounts for the differences in the social status between the two languages in competition” (Vazquez, et al.). What’s important here is relative prestige. However, I’ve found that the model is very sensitive to these parameters so even very small preferences towards one or the other results in a strong domination of the more prestigious language.
                </p>
                <p>
                    Init-percent-A – this is the initial percent of patches that speak language A
                </p>
                <p>
                    Volatility – this parameter “determines the functional form of the switching probability” (Vazquez, et al.). Essentially, it multiplies the probability of switching to the opposite patch by its value. (e.g. if there was a 20% chance that a patch would switch given the patches nearby and the prestige of each language but volatility = .5 then there would be a 10% chance the patch would switch)
                </p>
                <h2>Things to Try</h2>
                <p>
                    Parameterization: connectivity = .05 A-prestige = 1 B-prestige = 1 init-percent-A = .15 volatility = .05
                </p>
                <p>
                    This often results in a persisting, localized, minority language.
                </p>
                <h2>References</h2>
                <p>
                    F Vasquez, X Castello, and M San Migue. “Agent Based Models of Language Competition: Macroscopic descriptions and order-disorder transitions” Journal of Statistical Mechanics (2010)
                </p>
                <p>
                    Download Model File <a href="https://raw.githubusercontent.com/matthewbbone/netlogo-analyses/master/LanguageComp.nlogo?token=AGJ5ACCBZZTKI7ILBRPNUQC7PD65I">Here</a> (save with file extension .nlogo)
                </p>
                <p>
                    Run the Model <a href="https://netlogoweb.org/launch#https://netlogoweb.org/assets/modelslib/Sample%20Models/Chemistry%20&%20Physics/Boiling.nlogo">Here</a>
                </p>
                <p>
                    The structure of this model followed one of the models from the default Models Library that came with NetLogo called “Altruism”. You can read more about the model <a href="https://ccl.northwestern.edu/rp/each/index.shtml">here</a>.
                </p>
            </div>
        )
    }
}

export default Blog1
