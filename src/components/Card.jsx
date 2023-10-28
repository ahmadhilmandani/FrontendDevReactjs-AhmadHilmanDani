/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import { IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';

function Card({ restaurantData }) {
  const currentTime = Date.now()

  const decimalRating = restaurantData.rating % 1
  const temptArr = []

  for (let index = 1; index <= Math.ceil(restaurantData.rating); index++) {
    if (index != Math.ceil(restaurantData.rating)) {
      temptArr.push(index)
    }
    else {
      temptArr.push(decimalRating)
    }
  }

  return (
    <div className="w-full min-h-[360px] flex flex-col justify-between gap-6 mt-16 md:mt-0 px-4 lg:px-0">
      <div>
        <div className="w-full aspect-[16/12] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(https://restaurant-api.dicoding.dev/images/medium/${restaurantData.pictureId})` }}></div>
        <h2 className="text-brand-blue font-semibold text-lg line-clamp-2 mt-3">
          {restaurantData.name}
        </h2>
        <div className="mt-3 flex gap-1">
          {temptArr.map((item, index) => {
            if (Number.isInteger(item)) {
              return (
                <IconStarFilled size={16} className='text-brand-blue' stroke={0} key={index} />
              )
            }
            else {
              return (
                <IconStarHalfFilled size={16} className='text-brand-blue' stroke={0} key={index} />
              )
            }
          })}
        </div>
        <div className="flex justify-between mt-3">
          <small className="text-[10px] uppercase text-brand-grey">{restaurantData.city}
            ·
            Rp. {restaurantData.price}
          </small>
          <div>
            {
              currentTime >= restaurantData.open_time && currentTime < restaurantData.closed_time ?
                (
                  <div className="flex items-center gap-2">
                    <div className="w-2 aspect-square rounded-full bg-brand-green"></div>
                    <small className="text-[10px] text-brand-grey uppercase">open now</small>
                  </div>
                ) :
                (
                  <div className="flex items-center gap-2">
                    <div className="w-2 aspect-square rounded-full bg-brand-red"></div>
                    <small className="text-[10px] text-brand-grey uppercase">closed</small>
                  </div>
                )
            }
          </div>
        </div>
      </div>
      <Link to={'/' + restaurantData.id + '/' + restaurantData.price + '/' + restaurantData.open_time + '/' + restaurantData.closed_time} className="block bg-brand-blue text-center w-full uppercase text-white py-3 text-xs tracking-wider cursor-pointer hover:bg-brand-blue/90 transition-all">
        learn more
      </Link>
    </div>
  )
}

export default Card