
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import MainContent from './components/MainContent';

// http://api.aladhan.com/v1/timingsByCity/:date
function App() {

  return (
    <div style={{width: '100vw'}}>
      <Container maxWidth="xl">
        <MainContent />
      </Container>
    </div>
  )
}

export default App
