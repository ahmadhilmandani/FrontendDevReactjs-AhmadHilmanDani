import { IconArrowNarrowLeft, IconBowl, IconCup, IconMapPin, IconStarFilled } from "@tabler/icons-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Detail() {
  const { id, price, openTime, closedTime } = useParams()
  const [restaurantData, setRestaurantData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const currentTime = Date.now()


  useEffect(() => {
    axios.get('https://restaurant-api.dicoding.dev/detail/' + id)
      .then((response) => {
        setRestaurantData(response.data.restaurant)
        console.log(response.data.restaurant)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [])
  if (isLoading) {
    return (
      <div className='w-full h-full bg-slate-400'>
        {/* <Card restaurantData={{ city: 'medan' }} /> */}
      </div>
    )
  }

  return (
    <div className="lg:flex items-start gap-10 w-full lg:p-12 p-4 lg:relative">
      <div className="lg:w-[50vw] lg:sticky z-[10] top-10 left-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-brand-blue font-semibold flex items-center gap-2">
          <Link to='/' className="block hover:p-2 hover:bg-brand-blue/10 transition-all rounded-full">
            <IconArrowNarrowLeft />
          </Link>
          {restaurantData.name}
        </h1>
        <div className="flex flex-wrap items-center mt-10 gap-5">
          <div className="mt-4 flex items-center gap-2">
            <IconStarFilled size={20} className='text-brand-blue' stroke={0} />
            <div className="font-semibold text-xl">{restaurantData.rating}</div>
          </div>
          <div className={currentTime >= openTime && currentTime < closedTime ? "bg-brand-green/10 px-8 py-2 flex gap-2 items-center w-fit rounded-full" : "px-8 py-2 bg-brand-red/10 flex gap-2 items-center w-fit rounded-full"}>
            {
              currentTime >= openTime && currentTime < closedTime ?
                (<>
                  <div className="w-4 aspect-square rounded-full bg-brand-green"></div>
                  <div className="tracking-wide font-semibold text-brand-green">OPEN</div>
                </>)
                :
                (<>
                  <div className="w-4 aspect-square rounded-full bg-brand-red"></div>
                  <div className="tracking-wide font-semibold text-brand-bg-brand-red">CLOSED</div>
                </>)
            }
          </div>
          <div className="flex items-center gap-2">
            <IconMapPin stroke={1.5} className="stroke-brand-blue" />
            <div className="break-words text-brand-blue">{restaurantData.address}, {restaurantData.city}</div>
          </div>
        </div>
        <div className="w-full aspect-video bg-cover bg-no-repeat bg-center mt-8" style={{ backgroundImage: `url(https://restaurant-api.dicoding.dev/images/medium/${restaurantData.pictureId})` }}></div>
      </div>
      <div className="flex-1">
        <div className="mt-6">
          <small className="text-sm text-brand-grey tracking-wide">Price:</small>
          <div className="text-brand-blue font-semibold text-4xl px-6 py-4 bg-brand-grey/5 mt-2">Rp. {price}</div>
        </div>
        <div className="mt-12">
          <div className="flex gap-2 items-center">
            <div className="p-2 rounded-full bg-indigo-100/60 w-fit">
              <IconBowl className="stroke-indigo-600" />
            </div>
            <h3 className="text-indigo-600 tracking-wide font-semibold">Foods Menu:</h3>
          </div>
          <ol>
            {restaurantData.menus.foods.map((foodItem, index) => {
              return (
                <li className="mt-3 list-decimal list-inside text-indigo-600 tracking-wide" key={index}>{foodItem.name}</li>
              )
            })}
          </ol>
        </div>
        <div className="mt-12">
          <div className="flex gap-2 items-center">
            <div className="p-2 rounded-full bg-fuchsia-100/60 w-fit">
              <IconCup className="stroke-fuchsia-600" />
            </div>
            <h3 className="text-fuchsia-600 tracking-wide font-semibold">Drinks Menu:</h3>
          </div>
          <ol>
            {restaurantData.menus.drinks.map((foodItem, index) => {
              return (
                <li className="mt-3 list-decimal list-inside text-fuchsia-600 tracking-wide" key={index}>{foodItem.name}</li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Detail