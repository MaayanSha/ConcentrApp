import React from "react";
import FallbackScreen from "./FallbackScreen";
import {useParams} from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <FallbackScreen />;
        }
        const id = this.props.match.params.id;
        if (!/\d+/.test(id)){
            this.props.navigation.navigate('/')
        }
        return this.props.children;
    }
}
export default ErrorBoundary;