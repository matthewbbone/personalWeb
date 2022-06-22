import React, { Component } from 'react'
import blogStyles from '../../../Blog.module.css'
import CellAuto from './assets/cellauto.png'
import ElemAuto from './assets/elemauto.png'
import LaCorona from './assets/lacorona.png'
import TSPFitness from './assets/TSPfitness.png'
import TSPGrid from './assets/TSPgrid.png'

class Blog3 extends Component {
    render() {
        return (
            <div>
                <h1>SFI's Introduction to Complexity</h1>
                <p>
                    This summer I took the Santa Fe Institute’s Introduction to Complexity Course where I learned about the field of complexity science and the core ideas that drive it. These ideas included fractal geometry, genetic algorithms, cellular automata, networks, and scaling. I found genetic algorithms to be particularly interesting so, in addition to the normal coursework, I developed three implementations of genetic algorithms to solve three types of problems: the traveling salesman problem, finding an “interesting” elementary cellular automata, and a COVID-themed El Farol problem. All of the code for these implementation have been heavily annotated and should be relatively easy to understand.
                </p>
                <h2>Traveling Saleseman</h2>
                <p>
                    The first and easiest one to implement was the traveling salesman problem. I began by setting up a random city generator that would generate N number of cities randomly placed in grid.
                </p>
                <img src={TSPGrid} className={blogStyles.articlePic} />
                <p>
                    Then I created a population of randomly generated possible routes between these cities that began and ended at city 0. Of course the random routes performed terribly with an average route distance of over 10,000 for a map of 20 cities in a 1000x1000 grid. My genetic algorithm was able to find a route of the distance 4279.89 which essentially makes a loop around the cities. The best route I could find by hand was 4258.93. The solution found by the genetic algorithm for the map above was:
                </p>
                <div className={blogStyles.centerDisplay}>[0, 17, 14, 10, 4, 16, 9, 12, 8, 11, 18, 5, 7, 13, 15, 19, 1, 3, 6, 2]</div>
                <p>
                    The best one I could find by hand was:
                </p>
                <div className={blogStyles.centerDisplay}>[0, 17, 14, 10, 4, 11, 8, 18, 12, 16, 9, 7, 5, 13, 15, 19, 1, 3, 6, 2]</div>
                <p>
                    As you can see (especially if you trace it to the map) the solutions are very similar. This indicates that the genetic algorithm is likely to produce good approximations for the traveling salesman problem.
                </p>
                <p>
                    The genetic algorithm I implemented simulated biological evolution but the “organisms” that make up the “population” are routes through these cities. In each generation of this population the shortest routes, or the elites, are selected and pulled into the next generation. Then they “breed” in order to replace the discarded long routes.
                </p>
                <p>
                    The breeding algorithm I used took two parents from the “elite” of the previous generation and iterated through their routes, randomly selecting one or the other’s city for the respective ith index of their child. If this caused a child to revisit a city, it would randomly select a yet-to-be visited city instead. Then there was a random chance that it would mutate by swapping pairs of cities (the likelihood and maximum number of swaps was determined by hyperparameters). Each successive generation was the previous one’s “elite” plus however many of these children were needed to maintain the same population size. The fitness of the population during this process was marked by typical periods of slow and rapid improvement.
                </p>
                <img src={TSPFitness} className={blogStyles.articlePic} />
                <h2>Elementary Cellular Automata</h2>
                <p>
                    For my second genetic algorithm I wanted to incorporate cellular automata but I wasn’t sure what I could use as a measure of fitness. I eventually decided on using <a href='https://en.wikipedia.org/wiki/Elementary_cellular_automaton'>elementary cellular automata</a> and measuring how “interesting” they are. Elementary cellular automata are simple rules, applied to a list of binary values, to produce a new list of binary values. The patterns created by these rules can be visualized by creating a grid where the list of values span the x-dimension in a series of binary-colored tiles and each successive list produced by applying the rule span the y-dimension. Different rules will produce very different patterns in these 2-dimensional grids.
                </p>
                <img src={ElemAuto} className={blogStyles.articlePic} />
                <p>
                    I thought it would be interesting to try and find “interesting” patterns with a genetic algorithm. For instance, one can see above that rule 2 and 9 may be seen as less interesting than rule 1, while rule 10 seems very interesting. However, in order to do this I was going to have to find a way to quantify “interesting”. I eventually decided on using whether or not a rule’s grid had localized minorities as my metric. A localized minority is an nxn square (size determined by a parameter) of the color that is a global minority. For instance, in the above pictures, rule 9 seems to have a majority of black tiles but no significant square areas that are white. On the other hand, rule 10 looks as though it may have a global majority of black but it has localized minorities of white.
                </p>
                <p>
                    Using this metric I was able to semi-consistently find “interesting” looking cellular automata. However, it also often occurred that I just found patterns like rule 2 above with wider stripes of the minority color. These ones I wouldn’t consider interesting but they certainly do fit my formalized definition. An example of a more interesting one can be found below:
                </p>
                <img src={CellAuto} className={blogStyles.articlePic} />
                <p>
                    The genetic algorithm I used for this model was very similar to the one I used for the traveling salesman problem since both routes and rules are just arrays of numbers.
                </p>
                <h2>La Corona Model</h2>
                <p>
                    This model is inspired by the <a href="https://en.wikipedia.org/wiki/El_Farol_Bar_problem">El Farol problem</a> where a population of individuals is deciding whether or not to go to a popular bar based on the number of people that went on the previous times they visited. I generalized this problem to reflect a common problem in the times of Corona, which grocery store to go to. In this problem, the population of individuals must decide which of n grocery stores they should go to based on their past visits. Each grocery store has a max threshold for number of people that should be there at any given time. The goal is for these grocery stores to be at or below this threshold every week. However, this global goal has to be achieved by a group of individuals using limited information and individual genetic algorithms.
                </p>
                <p>
                    This model is far more complex then the previous two because rather than having one genetic algorithm play out on a large population, this model employs a genetic algorithm on a group of strategies for every individual in the population. This means that the discrete genetic algorithms have to adapt to each other in a complex environment. Additionally, this is far more computationally intensive. However, I was able to get some interesting (and successful) results when having a total population near the sum capacity of the grocery stores where the population of individuals would approximate the thresholds for each grocery store.
                </p>
                <img src={LaCorona} className={blogStyles.articlePic} />
                <p>
                    In the above graph you can see how the number of people that visit a given grocery store each week approaches the threshold of the grocery store. This shows that the local genetic algorithms are productively organizing at a global level. In this example there are 60 individuals and the grocery stores have capacities of 10, 20, and 30, respectively. Thus, a perfect solution would be if the genetic algorithm realized 10 people can go to A, 20 to B, and 30 to C each week. An interesting observation that you can’t see graphically is that most individuals are regularly changing grocery stores. In other words, there isn’t a mass of individuals that just go to one grocery store with a minority of individuals churning, rather most of the population is regularly churning. Nevertheless, the population approximates the thresholds.
                </p>
                <h2>Concluding Thoughts</h2>
                <p>
                    Genetic algorithms are an interesting and organic way to produce nondeterministic solutions to changing problems. However, they’re computationally intensive because they require the simulation of evolutionary processes. In my opinion, they have a lot of potential in providing good solutions that are understandable, adaptable, and avoids over-optimization. Since the “best” solutions in a population or group of strategies are always identifiable and are structured in a way that is relevant to the problem, they can be analyzed in a way some machine learning models cannot. Additionally, random information is constantly injected into the optimization process at a parameterized rate and thus one could imagine injecting more randomness as optima are approached to continue searching the solution space. Additionally, this injection of randomness makes genetic algorithms adaptable to a changing environment or solution space, as biological evolution can attest to.
                </p>
                <p>
                    SFI’s Introduction to Complexity was a refreshing and novel way of looking at scientific inquiry relative to what one gets in a traditional college program. The ideas they introduce are the fertilizer to a budding paradigm shift in science that opens up new frontiers. Additionally, the course clearly exemplifies the benefits of interdisciplinary work that pull from disparate domains of knowledge like biology, mathematics, and sociology. The course was an exciting introduction to a new way of thinking that I’m sure will influence my approach to understanding how the world works.
                </p>
            </div>
        )
    }
}

export default Blog3