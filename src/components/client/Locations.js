import { useEffect, useState } from 'react'
import config from '../../config.json'

const Location = (name, key) => {
  return (
    <div
      key={key}
      className="border border-black rounded flex justify-center cursor-pointer hover:bg-gray-200"
    >
      <span className="font-bold">{name}</span>
    </div>
  )
}

const Locations = () => {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch(`${config.HOST_SERVICE}`)
      const ls = await response.json()
      setLocations(ls)
    }

    fetchLocations()
  }, [])

  return (
    <div className="h-full w-9/12 mx-auto">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Locations</h1>
      </header>
      <div className="grid grid-cols-3 gap-4">
        {locations.map((l, _) => Location(l.name, l.slug))}
      </div>
    </div>
  )
}

export default Locations
