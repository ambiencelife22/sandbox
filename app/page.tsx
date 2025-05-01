import React from 'react'

// const [version, setVersion] = useState<string>('1.10.1.22.26.03.25.01')
import Page from "../app/clarity-canvas-map/page"
import Page2 from "../app/courses-new/page"

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* <h1>Sandbox</h1>
      <p>Hi!</p> */}
      <Page2/>
    </div>
  )
}

export default Home;
