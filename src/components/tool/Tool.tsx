import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { parseParams } from '../../helper/utils'
import {
    CanvasProps,
    DescriptionProps,
    BasicInfoProps
} from './types'
import { getDynamoRows } from '../../services/dynamoService/DynamoService'
import styles from './styles.css'
import { Dataset } from '../dataset/Dataset'

const Canvas: FC<CanvasProps> = ({
    id,
    toolLink,
    isDataset,
    isBlog
}) => {

    const [html,  setHTML] = useState<string>("")

    fetch(toolLink)
        .then(response => response.text())
        .then(content => {
            // Here you can parse or manipulate the content as needed
            setHTML(content);
            console.log(content)
        });

    return (
        <div className={styles.canvas}>
            {
                isDataset ?
                    <Dataset id={id} />
                    :
                    isBlog ?
                    <div className={styles.blogContainer}>
                        <div dangerouslySetInnerHTML={{ __html: html }} className={styles.blog}></div>
                    </div>
                    :
                    <iframe src={toolLink} className={styles.frame}></iframe>
                    
            }
        </div>
    )
}

const Description: FC<DescriptionProps> = ({
    description
}) => {
    return (
        <div className={styles.description}><span className={styles.highlight}>Description: </span>{description}</div>
    )
}

const BasicInfo: FC<BasicInfoProps> = ({
    title,
    developers,
    creationDate,
    category,
    keywords,
    host,
    source,
    sourceLink,
    authors,
    publisher,
    publishDate
}) => {
    return (
        <div className={styles.basicInfo}>
            <div className={styles.toolInfo}>
                <div><span className={styles.highlight}>Title: </span>{title}</div>
                <div><span className={styles.highlight}>Developers: </span>{developers}</div>
                <div><span className={styles.highlight}>Date: </span>{creationDate}</div>
                <div><span className={styles.highlight}>Category: </span>{category}</div>
                <div><span className={styles.highlight}>Keywords: </span>{keywords}</div>
                <div><span className={styles.highlight}>Host: </span>{host}</div>
            </div>
            <div className={styles.sourceInfo}>
                <div><span className={styles.highlight}>Source: </span><a href={sourceLink}>{source}</a></div>
                <div><span className={styles.highlight}>Authors: </span>{authors}</div>
                <div><span className={styles.highlight}>Publisher: </span>{publisher}</div>
                <div><span className={styles.highlight}>Date: </span>{publishDate}</div>
            </div>
        </div>
    )
}


export const Tool: FC = () => {

    const [title, setTitle] = useState<string>()
    const [basic, setBasic] = useState<BasicInfoProps>()
    const [description, setDescription] = useState<DescriptionProps>()
    const [canvas, setCanvas] = useState<CanvasProps>()

    const params = parseParams(location.search)

    useEffect(() => {
        getDynamoRows({ table: 'ivory-tab-tools', keys: [parseInt(params['id'])] })
            .then((res) => {

                setTitle(res[0].title)

                let tempBasic = {} as BasicInfoProps
                tempBasic.authors = res[0].authors?.join(', ')
                tempBasic.category = res[0].category
                tempBasic.creationDate = res[0].creationDate
                tempBasic.developers = res[0].developers.join(', ')
                tempBasic.host = res[0].host
                tempBasic.keywords = res[0].keywords.join(', ')
                tempBasic.publishDate = res[0].publishDate
                tempBasic.publisher = res[0].publisher
                tempBasic.source = res[0].source
                tempBasic.sourceLink = res[0].sourceLink
                tempBasic.title = res[0].title
                setBasic(tempBasic)

                let tempDescription = {} as DescriptionProps
                tempDescription.description = res[0].description
                setDescription(tempDescription)

                let tempCanvas = {} as CanvasProps
                tempCanvas.id = res[0].id
                tempCanvas.toolLink = res[0].toolLink
                tempCanvas.isDataset = res[0].category == 'Dataset'
                tempCanvas.isBlog = res[0].category == 'Blog'
                setCanvas(tempCanvas)
            })
    }, [])

    return (
        <div className={styles.tool}>
            <Canvas {...canvas} />
            <div className={styles.infoContainer}>
                <h1 className={styles.title}>{title}</h1>
                <Description {...description} />
                <BasicInfo {...basic} />
            </div>
        </div>
    )
}