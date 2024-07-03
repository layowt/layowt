import { Button } from '~/packages/components/ui/button';
import { FlipWords } from '~/packages/components/ui/flip-words'

export default function WelcomePage(){
  const words = ['solutions', 'storefronts', 'companies'];

  return (
    <div className="text-white font-satoshi flex flex-col gap-y-10 min-h-full w-full bg-black-300 bg-dot-white/[0.2] relative items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col gap-y-4 items-center w-1/2">
        <h1 
          className="text-5xl font-bold text-center" 
          aria-label="Create expeptional user expierences with Layowt."
        >
          <span className='inline-block'>
            Create exceptional 
          </span>
          <FlipWords 
            words={words} 
            className="text-white" 
          /> <br />
          effortlessly with Layowt.
        </h1>
        <p className="max-w-96 text-center text-xl">
          The all-in-one platform <br /> to build visually stunning user expierences.
        </p>
      </div>
      <Button 
        variant='default'
        arrow
        fontSize='lg'
        padding='xl'
        href="/welcome"
      >
        Get started
      </Button>
    </div>
  )
}