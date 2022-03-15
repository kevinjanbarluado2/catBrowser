import { Alert } from 'react-bootstrap';

const Header = (props) => {
    return (
        <header>
            <Alert variant="info">
                <Alert.Heading>{props.title}</Alert.Heading>
                <p>
               This is a test React App which ables to fetch cats from the Cat API
                </p>
                <hr />
                <p className="mb-0">
                    Developed by Kevin
                </p>
            </Alert>
        </header>
    )

}
Header.defaultProps = {
    title: 'Cat App'
}
export default Header