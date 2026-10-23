import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/newsreader/400.css'
import '@fontsource/newsreader/500.css'
import '@fontsource/newsreader/400-italic.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-mono/500.css'
import './index.css'
import Deck from './Deck'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Deck />
  </StrictMode>,
)
