export const CarCard = ({ car }) => {
  return (
    <article
      className="
        overflow-hidden
        rounded-[12px]
        border border-[#C3C6D7]
        bg-white
      "
    >
      {/* Image */}
      <div className="relative">
        <img
          src={car.thumbnail}
          alt={car.title}
          className="
            w-full
            h-[216px]
            object-cover
          "
        />

        <span
          className="
            absolute
            top-3
            left-3
            rounded-full
            bg-[#004AC6]
            px-3
            py-1
            text-[12px]
            font-semibold
            text-white
          "
        >
          New Arrival
        </span>

        <span
          className="
            absolute
            top-3
            right-3
            rounded-full
            bg-white
            px-3
            py-1
            text-[12px]
            font-semibold
            text-[#004AC6]
          "
        >
          ★ {car.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between gap-3">
          <h3
            className="
              font-bold
              text-[20px]
              leading-[28px]
              text-[#0B1C30]
            "
          >
            {car.title}
          </h3>

          <p
            className="
              whitespace-nowrap
              font-bold
              text-[20px]
              leading-[28px]
              text-[#004AC6]
            "
          >
            ${car.price.toLocaleString()}
          </p>
        </div>

        <p
          className="
            mt-1
            text-[14px]
            leading-[20px]
            text-[#565E74]
          "
        >
          {car.brand} • {car.description}
        </p>

        <p
          className="
            mt-4
            line-clamp-2
            text-[14px]
            leading-[20px]
            text-[#565E74]
          "
        >
          {car.fullDescription}
        </p>

        <div className="mt-4 flex gap-2">
          {car.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                bg-[#E5EEFF]
                px-3
                py-1
                text-[12px]
                font-semibold
                text-[#565E74]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span
            className="
              text-[14px]
              text-[#565E74]
            "
          >
            In Stock: {car.stock} units
          </span>

          <button
            className="
              h-[54px]
              rounded-[8px]
              bg-[#DCE9FF]
              px-6
              font-semibold
              text-[14px]
              text-[#004AC6]
            "
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};
