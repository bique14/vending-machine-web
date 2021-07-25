import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import '../../styles/vending-machine.css'
import config from '../../config.json'

const Skelton = () => {
  return (
    <>
      <header className="py-10 flex justify-center">
        <h1 className="skelton-item text-3xl font-bold md:text-4xl w-1/2 h-10 bg-gray-200"></h1>
      </header>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => SkeletonItem(i))}
      </div>
    </>
  )
}

const SkeletonItem = (index) => {
  return (
    <div
      key={index}
      className="border border-gray-300 rounded shadow-lg flex flex-col"
    >
      <div className="skelton-item rounded h-44 bg-gray-200"></div>
      <div className="border-t border-gray-300 p-2">
        <div className="flex flex-col cursor-default">
          <div className="skelton-item bg-gray-200 w-32 h-6"></div>
          <div className="flex justify-between mt-1">
            <div className="skelton-item bg-gray-200 w-14 h-6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Item = ({ slug, name, image, price, quantity }) => {
  return (
    <div
      key={slug}
      className="item-card border border-gray-300 rounded shadow-lg flex flex-col  hover:bg-gray-100"
    >
      <img alt={`item-${slug}`} src={image} className="rounded" />
      <div className="border-t border-gray-300 p-2">
        <div className="flex flex-col cursor-default">
          <span
            className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap"
            href={`${slug}`}
          >
            {name}
          </span>
          <div className="flex justify-between mt-1">
            <span className="text-sm whitespace-nowrap md:text-base">
              {price} THB
            </span>
            <span className="text-xs text-gray-400 self-center">{`(${quantity.remaining}/${quantity.total})`}</span>
          </div>
        </div>
        <button className="bg-green-500 w-full rounded font-bold text-white py-1 my-2 hover:bg-green-600">
          buy
        </button>
      </div>
    </div>
  )
}

const VendingMachine = () => {
  const [vendingMachine, setVendingMachine] = useState({})
  const { location } = useParams()

  useEffect(() => {
    async function fetchVendingMachine() {
      const response = await fetch(`${config.HOST_SERVICE}/${location}`)
      const its = await response.json()
      setVendingMachine(its[0])
    }

    fetchVendingMachine()
  }, [location])

  return (
    <div className="h-full w-9/12 mx-auto">
      <a className="absolute left-0 px-3 py-1 cursor-pointer" href={'/'}>
        {'< back'}
      </a>
      {Object.keys(vendingMachine).length === 0 ? (
        <Skelton />
      ) : (
        <>
          <header className="text-center py-10">
            <h1 className="text-3xl font-bold md:text-4xl cursor-default">
              {vendingMachine.name}
            </h1>
          </header>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {vendingMachine.items.map((i, _) => Item(i))}
          </div>
        </>
      )}
    </div>
  )
}

export default VendingMachine
