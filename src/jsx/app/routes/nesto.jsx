


const source = "http://localhost:8000/_/_api_/data/?format=json";

export default class App extends React.Component {

    state = { data: [] };

    static defaultProps = {
        source: ''
    };

    static propTypes() {
        source: React.PropTypes.string
    };

    loadAuthors() {
        fetch(source)
            .then(response => response.json())
            .then(data => this.setState({ results: data }))
            .catch(err => console.error(source, err.toString()))
    }

    componentDidMount() {
        this.loadAuthors()
    }

    render() {
        const renderData = this.props.results.map(function(result) {
            return (
                <div>
                    <p>{result._id}</p>
                    <p>{result._source.quote}</p>
                    <p>{result._source.author}</p>
                </div>
            )
        });
        return (
            <Container id='body'>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <PanelContainer>
                                <Panel>
                                    <PanelBody className='text-center'>
                    {renderData}
                                    </PanelBody>
                                </Panel>
                            </PanelContainer>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

