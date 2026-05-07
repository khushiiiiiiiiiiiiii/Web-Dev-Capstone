import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { crashed: false }

  static getDerivedStateFromError() { return { crashed: true } }

  render() {
    if (this.state.crashed)
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-2xl mb-4">Something went wrong</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Reload
          </button>
        </div>
      )
    return this.props.children
  }
}

export default ErrorBoundary
