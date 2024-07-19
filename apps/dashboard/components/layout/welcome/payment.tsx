import Back from "@layowt/components/src/back"
import { useHash } from "./welcome-wrapper"

export default function WelcomePagePayment(){
  const { updateHash } = useHash();

  return (
    <div className="px-10 flex flex-col gap-y-4">
      <Back 
        onClick={() => updateHash('#payment-plans')}
        className="absolute top-4 left-4" 
      />
      <div className="flex flex-col gap-y-2"> 
        Payment Page
      </div>
    </div>
  )
}