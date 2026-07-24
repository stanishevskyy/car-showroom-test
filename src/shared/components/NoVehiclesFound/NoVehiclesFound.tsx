import type { FC } from 'react';

type Props = {
  title?: string;
  description?: string;
};

export const NoVehiclesFound: FC<Props> = ({
  title = 'No vehicles found',
  description = 'Try changing your search or filter criteria.',
}) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-[#C3C6D7] bg-white px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-[#12213A]">{title}</h2>

      <p className="mt-2 max-w-md text-[#565E74]">{description}</p>
    </div>
  );
};
