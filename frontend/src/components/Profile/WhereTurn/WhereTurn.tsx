import WhereTurnCity from '@/components/Profile/WhereTurn/WhereTurnCity/WhereTurnCity.tsx';
import WhereTurnCard from '@/components/Profile/WhereTurn/WhereTurnCard/WhereTurnCard.tsx';

export const WhereTurn = () => {
  return (
    <div className='flex w-full flex-col items-center'>
      <h2 className='mb-4 text-2xl font-medium'>Потребности центров крови</h2>
      <WhereTurnCity />
      <WhereTurnCard />
    </div>
  );
};
