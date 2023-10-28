import Card from "../components/Card"
import { useEffect, useState } from "react"
import axios from "axios"

function Home() {
  const [loading, setLoading] = useState(true)
  const [restaurantsData, setRestaurantsData] = useState([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setRestaurantsData([])
    axios.get('https://restaurant-api.dicoding.dev/list')
      .then(function (responseAllRestaurant) {
        console.log(responseAllRestaurant)
        for (let index = 0; index < responseAllRestaurant.data.restaurants.length; index++) {
          if (index % 3 != 0) {
            responseAllRestaurant.data.restaurants[index].open_time = new Date().setHours(8, 0, 0)
            responseAllRestaurant.data.restaurants[index].closed_time = new Date().setHours(16, 0, 0)
            if (index % 2 == 0) {
              responseAllRestaurant.data.restaurants[index].price = 10000
            }
            else {
              responseAllRestaurant.data.restaurants[index].price = 20000
            }
          }
          else {
            responseAllRestaurant.data.restaurants[index].open_time = new Date().setHours(16, 0, 0)
            responseAllRestaurant.data.restaurants[index].closed_time = new Date().setHours(22, 0, 0)
            if (index % 2 == 0) {
              responseAllRestaurant.data.restaurants[index].price = 40000
            }
            else {
              responseAllRestaurant.data.restaurants[index].price = 80000
            }
          }
          setRestaurantsData(prevData => [...prevData, responseAllRestaurant.data.restaurants[index]])
        }
      })
      .catch(function (error) {
        setIsError(error)
        console.log(isError);
      })
      .finally(function () {
        setLoading(false)
        console.log(restaurantsData)
      });
  }, [])



  if (loading) {
    return (
      <div className='w-full min-h-screen bg-slate-400'>
        {/* <Card restaurantData={{ city: 'medan' }} /> */}
      </div>
    )
  }

  return (
    <div className="bg-white w-full relative">
      <header className="lg:px-12 pt-12 px-4">
        <h1 className="text-6xl font-light text-brand-dark">Restaurant</h1>
        <p className="mt-4 text-xl w-full lg:w-[50vw] text-brand-grey font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit, sed do eiusmod tempor ut  incididunt labore et dolore magna aliqua.</p>
      </header>

      <nav className="border-y border-brand-grey/40 mt-12 mb-16 py-5 lg:px-12 px-4 lg:flex justify-between flex-wrap sticky z-10 bg-white top-0 left-0">
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="text-brand-grey font-semibold">Filter By:</div>
          <div className="flex items-center gap-1 border-b-[1.3px] pb-[8px] border-brand-grey/40 w-fit">
            <input type="radio" name="openNow" id="openNow" />
            <label htmlFor="openNow" className="text-brand-blue text-sm ">Open Now</label>
          </div>
          <div className="border-b-[1.3px] pb-[8px] border-brand-grey/40 text-brand-blue">
            <select className="text-brand-blue" name="" id="">
              <option className="text-brand-blue" value="null">Price</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 15.000</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 30.000</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 60.000</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 100.000</option>
            </select>
          </div>
          <div className="border-b-[1.3px] pb-[8px] border-brand-grey/40 text-brand-blue">
            <select className="text-brand-blue" name="" id="">
              <option className="text-brand-blue" value="null">Categories</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 15.000</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 30.000</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 60.000</option>
              <option className="text-brand-blue" value="">Kurang dari Rp. 100.000</option>
            </select>
          </div>
        </div>

        <div className="border px-8 py-2 border-brand-grey/60 text-brand-grey/60 text-[10px] cursor-pointer hover:text-brand-grey hover:bg-brand-grey/20 transition-all text-center lg:mt-0 mt-6">
          CLEAR ALL
        </div>
      </nav>


      <h2 className="text-4xl font-light mb-12 px-12">All Restaurant</h2>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24 mt-6 lg:px-12 pb-12">
        {restaurantsData.map((item) => {
          return <Card restaurantData={item} key={item.id} />
        })}
      </div>
    </div>
  )
}

export default Home
