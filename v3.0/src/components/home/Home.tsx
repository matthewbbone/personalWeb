import { Card } from 'react-bootstrap'
import { FC, useEffect, useState, useRef } from 'react'
import styles from './styles.css'
import { Link, To } from 'react-router-dom'
import {
    TileProps,
    RowProps,
    FeaturedProps,
    FeaturedAttr
} from './types'
import {
    ResultRow
} from '../../services/dynamoService/types'
import {
    getDynamoRows,
    getDynamoCols
} from '../../services/dynamoService/DynamoService'
import { getThumbnails } from '../../services/thumbnailService/ThumbnailService'
import profile from './assets/profile.png'
import LeftArrow from './assets/leftarrow.png'
import RightArrow from './assets/rightarrow.png'
let _ = require('lodash')

const Tile: FC<TileProps> = ({
    id,
    thumbnail,
    title,
    date
}) => {

    return (
        <Link to={{ pathname: '/tool', search: `id=${id.toString()}` }} className={styles.tileLink}>
            <Card className={styles.tile}>
                <div className={styles.thumbnailBox}>
                    <Card.Img variant="top" src={thumbnail} className={styles.thumbnail} />
                    <div className={styles.thumbnailDate}>{date}</div>
                </div>
                <Card.Body className={styles.tileBody}>
                    <Card.Title className={styles.tileText}>{title}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
}

const Row: FC<RowProps> = ({
    name,
    ids
}) => {

    const [data, setData] = useState<Array<TileProps>>([])
    const [thumbs, setThumbs] = useState<Array<string>>([])
    const scroller = useRef(null)

    useEffect(() => {

        getThumbnails(ids)
            .then(res => {
                setThumbs(res)
            })

        getDynamoRows({ table: 'ivory-tab-tools', keys: ids })
            .then(res => {

                let tileList: Array<TileProps> = []

                res.forEach((row: ResultRow) => {
                    let tool: TileProps = { id: null, thumbnail: null, title: null, date: null }
                    tool.id = row.id as number
                    tool.title = row.title as string
                    tool.date = row.creationDate as string
                    tileList.push(tool)
                })

                tileList.sort((a, b) => {
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;
                    return 0;
                });

                setData(tileList)
            })

    }, [])

    const scroll = (dir:string) => {
        const end = scroller.current.scrollLeft + (dir == "left" ? -470 : 470)
        scroller.current.animate([
            { scrollLeft: scroller.current.scrollLeft },
            { scrollLeft: end }
        ], {duration: 200})

        let ctr = 1.6

        const frame = ():null => {
            ctr = ctr - .0035
            if (scroller.current) {
                if (
                    (dir == "right" && 
                    (scroller.current.scrollLeft >= end ||
                     scroller.current.scrollLeft >= scroller.current.scrollWidth - scroller.current.clientWidth - 1)) ||
                    (dir == "left" &&
                    (scroller.current.scrollLeft <= end ||
                     scroller.current.scrollLeft <= 0))
                ) {
                    clearInterval(int);
                    return null
                } else if (dir == "right") {
                    scroller.current.scrollLeft = scroller.current.scrollLeft + Math.pow(ctr, 4)
                } else {
                    scroller.current.scrollLeft = scroller.current.scrollLeft - Math.pow(ctr, 4)
                }

            }
        }
        const int = setInterval(frame, 5)
    }

    return (
        <div className={styles.rowContainer}>
            <span className={styles.rowName}>{name}</span>
            <div className={styles.rowScroll}>
                <img className={styles.arrow} src={LeftArrow} width="50px" height="70px" onClick={() => scroll('left')}/>
                <ul className={styles.row} ref={scroller}>
                    {data.map((props, index) =>
                        <Tile
                            id={props.id}
                            thumbnail={thumbs[props.id]}
                            title={props.title}
                            date={props.date}
                            key={index}
                        />)}
                </ul>
                <img className={styles.arrow} src={RightArrow} width="50px" height="70px" onClick={() => scroll('right')}/>
            </div>
        </div>
    )
}

const Featured: FC<FeaturedProps> = ({
    id
}) => {

    const [data, setData] = useState<FeaturedAttr>({} as FeaturedAttr)
    const [thumb, setThumb] = useState<string>()

    return (
        <div className={styles.featured}>
            <div className={styles.featuredBanner}>
                <h1>Matthew <span className={styles.highlight}>B.</span> Bone</h1>
                <h2>Social Data Science, Complexity Economics, Computational Modeling</h2>
            </div>
            <img className={styles.featuredImage} src={profile} />
        </div>
    )
}

export const Home = () => {

    const [blogs, setBlogs] = useState<Array<number>>()
    const [projects, setProjects] = useState<Array<number>>()

    useEffect(() => {
        getDynamoCols({ table: 'ivory-tab-tools', cols: ['id', 'category'] })
            .then(res => {
                setBlogs(res.filter((val: any) => val.category === 'Blog').map((val: any) => val.id))
                setProjects(res.filter((val: any) => val.category !== 'Blog').map((val: any) => val.id))
            })
    }, [])

    return (
        <div className={styles.home}>
            <Featured id={0}></Featured>
            <div className={styles.aboutContainer}>
                <span className={styles.rowName}>About Me</span>
                <div className={styles.about}>
                    <p>
                        I am a Data Scientist and Software Engineer, currently at the <a href='https://www.burningglassinstitute.org/'>Burning Glass Institute</a> where I use advanced data science methods to understand realtime labor market data to consult for companies and universities. I'm also a researcher at the Oxford Internet Institute, working on the <a href='https://www.oii.ox.ac.uk/research/projects/skillscale/'>Skill Scale</a> project that uses online labor market data to predict the future of work. I've previously studied for the MSc in Social Data Science at the University of Oxford where I did research that found an optimal workforce retraining policy for the United Kingdom's green transition. Before Oxford, I spent two years as a software engineer at Capital Group in Los Angeles, following my study at Calvin Univeristy where I studied mathematics and philosphy.
                    </p>
                    <p>
                        I'm broadly interested in using complex systems approaches to understanding social issues and to develop data-driven social policies. I'm particularly interested in using micro data and bayesian techniques to fit and find optimal policies for economic agent-based models. I've previously worked as a research assistant at <a href='https://calvin.edu/news/archive/recent-calvin-grad-publishes-article-in-economics-journal'>Calvin University</a>, <a href="https://newsecosystems.org/">Montclair State</a>, and the <a href='https://www.inet.ox.ac.uk/research/programmes/complexity-economics/'>Institute of New Economic Thinking</a> at the Oxford Martin School.
                    </p>
                    <p></p>
                </div>
            </div>
            {blogs && projects ?
                <div>
                    <Row name="Blog Posts" ids={blogs} />
                    <Row name="Projects" ids={projects} />
                </div> : <div></div>
            }
        </div>
    )
}