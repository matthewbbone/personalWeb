import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap'
import {
    useState,
    FC,
    BaseSyntheticEvent
} from 'react'
import styles from './styles.css'
import {
    CheckHandler,
    ToolSectionProps
} from './types'
import { postTool } from '../../services/dynamoService/DynamoService'
import { postDataset } from '../../services/datasetService/DatasetService'
import { postThumbnail } from '../../services/thumbnailService/ThumbnailService'
var moment = require('moment');

const ToolLinkSecion: FC = () => {
    return (
        <Form.Group className={styles.formGroup} controlId="formToolLink">
            <Form.Label className={styles.formLabel}>Tool Link:</Form.Label>
            <Form.Control required type="toolLink" placeholder="Enter link to tool" />
        </Form.Group>
    )
}

const DataUploadSection: FC = () => {
    return (
        <Form.Group className={styles.formGroup} controlId="formDataset">
            <Form.Label className={styles.formLabel}>Dataset:</Form.Label>
            <Form.Control required type="file" />
            <Form.Text className={styles.formText}>
                Must be a csv
            </Form.Text>
        </Form.Group>
    )
}

const ToolSection: FC<ToolSectionProps> = ({ setSource, isDataset, setIsDataset }) => {
    return (
        <div>
            <Row>
                <Form.Group className={styles.formGroup} controlId="formTitle">
                    <Form.Label className={styles.formLabel}>Title of New Tool:</Form.Label>
                    <Form.Control required type="title" placeholder="Enter title" />
                </Form.Group>
            </Row>

            <Row>
                <Col>
                    <Form.Group className={styles.formGroup} controlId="formDevelopers">
                        <Form.Label className={styles.formLabel}>Developers:</Form.Label>
                        <Form.Control required type="developers" placeholder="Enter developer names" />
                        <Form.Text className={styles.formText}>
                            Please separate developer names with a comma ","
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className={styles.formGroup} controlId="formHost">
                        <Form.Label className={styles.formLabel}>Host Institution:</Form.Label>
                        <Form.Control required type="host" placeholder="Enter host institution name" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className={styles.formGroup} controlId="formKeywords">
                        <Form.Label className={styles.formLabel}>Keywords:</Form.Label>
                        <Form.Control required type="keywords" placeholder="Enter keywords" />
                        <Form.Text className={styles.formText}>
                            Please separate keywords with a comma ","
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className={styles.formGroup} controlId="formThumbnail">
                        <Form.Label className={styles.formLabel}>Thumbnail:</Form.Label>
                        <Form.Control required type="file" />
                        <Form.Text className={styles.formText}>
                            Keep to ~4:3 aspect ratio
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className={styles.formGroup} controlId="formCategory">
                        <Form.Label className={styles.formLabel}>Category:</Form.Label>
                        <Form.Select required onChange={e => setIsDataset(e.target.value == 'Dataset')}>
                            <option value="Dataset">Dataset</option>
                            <option value="Model">Model</option>
                            <option value="Visualization">Visualization</option>
                            <option value="Blog">Blog</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    {isDataset ? <DataUploadSection /> : <ToolLinkSecion />}
                </Col>
            </Row>

            <Row>
                <Form.Group className={styles.formGroup} controlId="formDescription">
                    <Form.Label className={styles.formLabel}>Description:</Form.Label>
                    <Form.Control required type="description" placeholder="Enter description" as="textarea" rows={5} />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group className={styles.formGroup} controlId="formSourceCheck">
                    <Form.Check
                        className={styles.check}
                        type="checkbox"
                        label="Is this tool related to a source article?"
                        onChange={e => setSource(e.target.checked)}
                    />
                </Form.Group>
            </Row>
        </div>
    )
}

const SourceSection = () => {
    return (
        <div>
            <Row>
                <Form.Group className={styles.formGroup} controlId="formSource">
                    <Form.Label className={styles.formLabel}>Source:</Form.Label>
                    <Form.Control required type="source" placeholder="Enter source name" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group className={styles.formGroup} controlId="formSourceLink">
                    <Form.Label className={styles.formLabel}>Source Link:</Form.Label>
                    <Form.Control required type="sourceLink" placeholder="Enter link to source" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group className={styles.formGroup} controlId="formAuthors">
                    <Form.Label className={styles.formLabel}>Source Authors:</Form.Label>
                    <Form.Control required type="authors" placeholder="Enter author names" />
                    <Form.Text className={styles.formText}>
                        Please separate author names with a comma ","
                    </Form.Text>
                </Form.Group>
            </Row>

            <Row>
                <Col>
                    <Form.Group className={styles.formGroup} controlId="formPublisher">
                        <Form.Label className={styles.formLabel}>Publisher:</Form.Label>
                        <Form.Control required type="publisher" placeholder="Enter publisher name" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className={styles.formGroup} controlId="formPublishDate">
                        <Form.Label className={styles.formLabel}>Publish Date:</Form.Label>
                        <Form.Control required type="publishDate" placeholder="MM-DD-YYYY" />
                    </Form.Group>
                </Col>
            </Row>

        </div>
    )
}

export const Submit = () => {

    const [source, setSource] = useState(false)
    const [isDataset, setIsDataset] = useState(true)
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event: BaseSyntheticEvent) => {

        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        const now = new Date()
        const uniqueId = moment().format("YYYYMMDDHHmm" + Math.floor(Math.random() * (89) + 10).toString())

        if (form.checkValidity() === true) {

            postTool({
                table: 'ivory-tab-tools',
                id: uniqueId,
                title: event.target.formTitle.value,
                toolLink: event.target.formToolLink?.value,
                developers: event.target.formDevelopers.value.split(",").map((val: string) => { return { "S": val.trim() } }),
                creationDate: moment().format("MM-DD-YYYY"),
                category: event.target.formCategory.value,
                keywords: event.target.formKeywords.value.split(",").map((val: string) => { return { "S": val.trim() } }),
                host: event.target.formHost.value,
                description: event.target.formDescription.value,
                source: event.target.formSource?.value,
                sourceLink: event.target.formSourceLink?.value,
                authors: event.target.formAuthors?.value.split(",").map((val: string) => { return { "S": val.trim() } }),
                publisher: event.target.formPublisher?.value,
                publishDate: event.target.formPublishDate?.value
            })

            postThumbnail(uniqueId, event.target.formThumbnail.files[0])
            
            if (isDataset) {
                postDataset(uniqueId, event.target.formDataset?.files[0])
            }

            setValidated(true);
        }

    };

    return (
        <div className={styles.formContainer}>
            <h2>New Tool Sumbission Form</h2>
            <Form noValidate validated={validated} className={styles.form} onSubmit={handleSubmit}>

                <ToolSection setSource={setSource} isDataset={isDataset} setIsDataset={setIsDataset} />

                {
                    source ? <SourceSection /> : <div></div>
                }

                <Button variant="primary" type="submit" disabled={validated}>
                    Submit
                </Button>

            </Form>
        </div>
    );

}