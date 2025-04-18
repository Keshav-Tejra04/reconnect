import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Mentorship from './pages/Mentorship';
import Discussion from './pages/Discussion'; 
import Collaboration from './pages/Collaboration';
import Jobs from './pages/Jobs';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import './styles/main.css';
import Resume from './pages/Resume';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/discussion" element={<Discussion />} /> 
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;