import Back from "@layowt/components/src/back"
import { useHashContext } from './welcome-wrapper-context';

export default function WelcomePagePayment(){
  const { planContext, setHash } = useHashContext();

  return (
    <div className="px-10 flex flex-col gap-y-4">
      <Back 
        onClick={() => setHash('#payment-plans')}
        className="absolute top-4 left-4" 
      />
      <div className="flex flex-col gap-y-2"> 
        Payment Page: {planContext.id}
      </div>
    </div>
  )
}