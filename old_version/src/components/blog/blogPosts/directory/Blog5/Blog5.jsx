import React, { Component } from 'react'
import DetectPic from './assets/detectionPic.png'
import blogStyles from '../../../Blog.module.css'

class Blog5 extends Component {
    render() {
        return (
            <div>
                <h1>Community Detection with the PhilosopherNet</h1>
                <img src={DetectPic} className={blogStyles.titlePic} />
                <p>
                    Community detection is an especially important technique for social network analysis. Oftentimes, when working with large social networks scraped from the web, we’re interested in which groups the subjects belong. However, we often don’t have reliable indicators of community membership.
                </p>
                <p>
                    For instance, let’s say we collected data on all of my friends on Facebook and also all of their friends. In other words, we collected all Facebook members one or two degrees away from me (and their friendship status to other individuals in the data set). The goal is to find all the members of my soccer team, called Fusion Soccer. Luckily, a few of the people on my team are quite proud of their membership on the team and have added it to their “about me” info. Unfortunately, most of my teammates are ambivalent about their membership or at least are Facebook shy about it and haven’t added it to their info. How can we find all of these missing team members with just the info we’ve collected?
                </p>
                <p>
                    If there are no individual traits (e.g. “about me” info) that indicate team membership than our only recourse is to try some community detection algorithms to understand the social network we’ve collected and help identify the team. Community detection relies on the assumption that those within a community are more likely to be connected to those within the same community than those outside it. For now, let’s assume all the people on my soccer team are friends on Facebook (why wouldn’t they be?). Then community detection is a rather simple task. We simply need to find a group of individuals that are all Facebook friends with each other that includes myself and all of the individuals that indicated they belong to Fusion soccer.
                </p>
                <p>
                    However, even in this maximally simplified situation we can’t be sure that this community is the soccer team. For instance, what if there was an ex-team member that quit last year but was still Facebook friends with everyone on the team. Then the analysis would indicate they’re part of the team even though that’s not true. Moreover, what if all of the team members went to the same high school in which everyone was friends with each other on Facebook? Then the entire high school would be considered part of the team. We can begin to see why community detection is a hard task.
                </p>
                <p>
                    Community detection not only requires that there is an affinity within groups, but that the affinity is sufficiently contrasting to the network of relationships outside the community. There are a number of different ways to detect the communities within a network using nothing but the network structure.
                </p>
                <p>
                    In the below visualization I’ve applied four very different community detection algorithms on the Philosopher Network I collected (<a href="https://www.matthewbbone.com/philnetviz.html">see here</a>). Luckily enough, the philosopher network is split quite nicely into two similarly sized groups, Analytic and Continental philosophers. For simplicity’s sake, I filtered out all philosophers that didn’t belong to these two schools. Using this reduced network, I had a great test network with which I can compare the communities detected to the actual communities (analytic and continental).
                </p>
                <p>
                    I used both out-of-the-box options from the <a href="https://networkx.org/documentation/stable/reference/algorithms/community.html">NetworkX</a> python package and re-implemented them myself so that I could get a better understanding of how they work. Most of them I was able to successfully re-implement with demonstrably similar results, with the exception of the Clauset-Newman-Moore Greedy Algorithm, in which my custom version does considerably worse. I’ve included some simple descriptions of each algorithm below but to see the full (but messy) implementations in python, you can go <a href="https://github.com/matthewbbone/philosophernet/blob/master/commDetect.ipynb">here</a>.
                </p>
                <h2>Kernighan-Lin Bisection</h2>
                <p>
                    This method wasn’t originally intended to be a community detection algorithm, rather, its purpose was to divide a graph into two partitions with the minimal number of connections between the partitions. In the original <a href="http://xilinx.asia/_hdl/4/eda.ee.ucla.edu/EE201A-04Spring/kl.pdf">paper</a>, the example they use are circuit boards. The components of an electronic circuit are printed onto multiple circuit cards but connections between these cards are relatively costly. Therefore, finding ways to divide these connected components onto different cards with minimal cross-card connections was desirable.
                </p>
                <p>
                    This heuristic method can be used effectively for community detection when you know a graph contains two similarily sized groups. Luckily this is the case with the philosopher subnetwork of analytical and continental philosophers. This method starts by bisecting the graph into two separate groups of nodes, usually at random. Then for each node it calculates the number of edges it shares with its ingroup and its outgroup. To reduce the number of edges between groups it’s best to have minimal outgroup edges. On the otherhand, having many ingroup edges means if the node was moved into the other group it would then have many outgroup edges which is undesirable. Therefore, this method takes the difference between the number of outgroup edges and ingroup edges as it’s heuristic (D = OUT - IN). For each group it finds the nodes with the maximal difference between their number of outgroup edges and ingroup edges then swaps them. This is the optimal single swap for minimizing outgroup edges. It then recalculates the number of ingroup edges and outgroup edges for every node and again identifies the optimal swap. It can repeat this n times and approaches an optimal solution.
                </p>
                <h2>Clauset Newman Moore Greedy Algorithm</h2>
                <p>
                    This algorithm is a greedy agglomerative method that was initially developed to work on large networks with relative efficiency. It has a significant computational advantage over a previous algorithm which optimized for modularity. It’s runtime is O(mdlog(n)) where m is the number of edges, d is the hierachical depth of the community structure, and n is the number of nodes. For sparse, hierarchical networks (i.e. m ~ n and d ~ log(n)) this runs in near linear time O(nlog(n)^2). In the original <a href="http://ece-research.unm.edu/ifis/papers/community-moore.pdf">paper</a> they use a massive network with 400,000 vertices and 2 million edges which was previously unassailble by the original algorithm.
                </p>
                <p>
                    This algorithm starts with every node in a network as a community of its own. It then then iterativley combines two neighboring communities such that it maximizes the modularity of the network. The modularity of the network is a heuristic that compares the number of edges within a community to what would be expected in a random network with the same number of nodes and edges. The higher the modularity, the more densely connected the communities in the network are. A “good” breakdown of a network into communities should have a high modularity. This algorithm optimizes on modularity by initially calculating the change in modularity that would occur if it were to combine each pair of communities in the network. The pair with the largest positive change in modularity is combined into an aggregated community (hence it’s “greedy”) that sums the component communities edges. Then the network is updated by calculating the change in modularity that would occur for combining the new community with any of the ones that were initially neighboring the component communities and then removing the component communities. The algorithm continues until there is just one community but the hierachical community structure is saved. The breakdown that has the highest modularity is the “solution”.
                </p>
                <h2>Semi-synchronous Label Propagation</h2>
                <p>
                    This algorithm attempts to combine the benefits of both synchronous and asynchronous label propagation community detection, the original paper can be found <a href="https://arxiv.org/pdf/1103.4550.pdf">here</a>. Label propagation is a technique in which all nodes are initialized with a unique label then the label for each node is updated to reflect the label of the majority of its neighbors. This algorithm starts by using a graph coloring algorithm to group nodes such that no node is adjacent to any of the other nodes in its group. This allows for semi-synchronous label propagation because all the nodes in a group can be updated asynchronously while the groups can be updated synchronously.
                </p>
                <p>
                    This approach avoids the shortcomings of each previous algorithm, the synchronous approach didn’t guarantee termination while the asynchronous performed worse. This algorithm was shown to perform equally well as synchronous and was proven to always terminate. The algorithm starts with grouping the nodes as mentioned above. It can then iterate through each groups’ nodes in parallel, updating them based on the labels of their neighbors. It is done sequentially here. When there is a tie for the most common label amongst a node’s neighbors one of the labels is chosen at random. The pass over the groups is repeated until all nodes have stopped changing labels or they only change due to a tie.
                </p>
                <h2>Asynchronous Fluid Communities</h2>
                <p>
                    This algorithm is a physics-based propagation approach that is both computationally cheap and scalable, the original paper can be found <a href="https://arxiv.org/pdf/1703.09307.pdf">here</a>. It is particularly useful because it is performant propagation algorithm that allows the user to select how many communities exist. This allows for community detection and multiple levels of granularity.
                </p>
                <p>
                    The algorithm works by choosing N communities and randomly choosing N nodes to assign a community. Then it iterates through the nodes in a random order and uses a localized evaluation to determine whether each node should be assigned a new community. The evaluation looks at all of the nodes neighbors and for each community that’s represented in the group of neighboring nodes, the number of neighboring nodes that belong to that community are summed and weighted by the communities density. The density is the inverse of the global number of nodes in the community. The community that has the largest weighted sum amongs the neighbors is the node’s new community. Ties go to the node’s original community else randomly selected from the tied communities. This method is inspired by the physics of fluid or gaseous material which expand to fill the space (in this case the graph).
                </p>
                <iframe src='https://matthewbbone.github.io/matthewbbone/detect.html' className={blogStyles.dataView} scrolling="no"></iframe>
            </div>
        )
    }
}

export default Blog5