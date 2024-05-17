import SiteLogo from '@/components/logo';

export default function Loading() {
  return (
    <div className="w-full h-screen text-white font-poppins flex justify-center">
      <div className="flex gap-x-1 w-full justify-center items-center">
        <SiteLogo
          className="p-0"
          showName={false}
        />
        <h1 className="font-bold font-poppins group-hover:text-white/60 duration-300">
          Loading...
        </h1>
      </div>
    </div>
  );
}
