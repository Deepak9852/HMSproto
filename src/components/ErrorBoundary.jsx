import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // TODO: send to logging service
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error', error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{ padding: 20 }}>
          <h2>Something went wrong.</h2>
          <div style={{ marginTop: 8, marginBottom: 12 }}>
            <strong>Error:</strong>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
          </div>
          <button onClick={this.reset}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
