import React, { Component } from 'react'
import blogStyles from '../../../Blog.module.css'

class Blog0 extends Component {
    render() {
        return (
            <div>
                <h1>State Mobility and Covid Cases</h1>
                <p>
                    This data visualization allows you to explore the mobility data published by <a href="https://www.google.com/covid19/mobility/">Google</a> and the COVID-19 case data from <a href="https://github.com/nytimes/covid-19-data">New York Times</a> at the state-level.
                </p>
                <p>
                    The first plot shows the mobility trends for different classes of areas such as Residential, Workplace, and other categories. The value is the percent change in activity from baseline measurements. For instance, if the value is 50, there has been a 50% increase in mobility, alternatively if there was a -50 there has been a 50% decrease in mobility. The second plot shows the number of cases over the same time period.
                </p>
                <iframe src='https://matthewbbone.github.io/matthewbbone/covidplot.html' className={blogStyles.dataView} scrolling="no"></iframe>
            </div>
        )
    }
}

export default Blog0
