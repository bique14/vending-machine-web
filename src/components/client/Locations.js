import { useEffect, useState } from 'react'

import config from '../../config.json'

const Skeleton = () => {
  const skeltonNumber = [1, 2, 3, 4, 5, 6]

  return (
    <div className="pb-20 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {skeltonNumber.map((i) => SkeletonItem(i))}
    </div>
  )
}

const SkeletonItem = (index) => {
  return (
    <div
      key={index}
      className="skelton-item border h-20 border-gray-300 rounded shadow-lg py-6"
    ></div>
  )
}

const Location = (name, slug) => {
  return (
    <div
      key={slug}
      className="item-card border border-gray-300 rounded flex justify-center cursor-pointer shadow-lg py-6 hover:bg-gray-200"
    >
      <a className="font-bold" href={`${slug}`}>
        {name}
      </a>
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
      <header className="text-center py-10">
        <h1 className="text-3xl font-bold md:text-4xl cursor-default">
          Locations
        </h1>
      </header>
      {locations.length === 0 ? (
        <Skeleton />
      ) : (
        <div className="pb-20 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {locations.map((l, _) => Location(l.name, l.slug))}
        </div>
      )}
    </div>
  )
}

export default Locations
