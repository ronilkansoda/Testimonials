import { useState } from 'react'

function App() {
  const [data, setData] = useState<string>('')

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/api/data');
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <>
      <div>
        <button onClick={fetchData}>Fetch Message</button>
        <p>Data : {data ? data : "No Data"}</p>
      </div>
    </>
  )
}

export default App
