'use client';

import Image from 'next/image';
import {
  Fuel,
  Users,
  CarFront,
  Settings2Icon,
  CableCar,
  DoorOpen,
} from 'lucide-react';

export default function VehicleCard({ vehicle }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const formatNumber = (num) =>
    new Intl.NumberFormat('en-GB').format(num);

  return (
    <div
      className="
        bg-white rounded-lg overflow-hidden
        border border-gray-200
        transition-transform duration-300
        hover:-translate-y-1
        card-shadow
      "
    >
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold">
            {vehicle.year} • {vehicle.regDate}
          </span>
        </div>

        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
            {vehicle.make}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Finance Details */}
        <div className="bg-[#F2F3F3] rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">From</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(vehicle.monthlyPrice)}
            </span>
          </div>

          <div className="text-xs text-gray-600 mb-1">
            Per month (inc. VAT)
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-gray-700">
              <span className="font-semibold">
                {formatPrice(vehicle.initialPayment)}
              </span>{' '}
              initial payment
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">
                {vehicle.contractMonths}
              </span>{' '}
              month contract
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">
                {formatNumber(vehicle.mileagePerYear)}
              </span>{' '}
              miles p/a
            </div>
            <div className="text-gray-700 whitespace-nowrap">
              <span className="font-semibold">
                {vehicle.deliveryDate}
              </span>{' '}
              delivery
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Info icon={<Fuel />} text={vehicle.fuelType} />
          <Info icon={<DoorOpen />} text={`${vehicle.doors} doors`} />
          <Info icon={<Settings2Icon />} text={vehicle.transmission} />
          <Info icon={<Users />} text={`${vehicle.seats} seats`} />
          <Info icon={<CarFront />} text={vehicle.bodyType} />
          <Info icon={<CableCar />} text={vehicle.engineSize} />
        </div>

        {/* Action */}
        <button
          className="
            w-full bg-white text-blue-600 hover:bg-gray-50 transition-colors duration-300
            font-semibold py-2.5 rounded-lg cursor-pointer
            border border-blue-600 text-sm
          "
        >
          Apply for finance
        </button>
      </div>
    </div>
  );
}

       /*  helper */
function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-700">
      {icon}
      <span>{text}</span>
    </div>
  );
}
