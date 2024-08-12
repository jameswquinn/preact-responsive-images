import { h, render } from 'preact';
import ResponsiveImage from './components/ResponsiveImage';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to our Preact application with responsive images.</p>
      <ResponsiveImage src="large_original.png" alt="Responsive Image" />
    </div>
  );
}

render(<App />, document.body);
