import { Button } from "~/packages/components/ui/button";

export default function ButtonPage(){
  return (
    <div className="flex flex-col gap-5 w-fit">
      <Button>
        Default
      </Button>
      <Button variant="secondary">
        Secondary
      </Button>
      <Button variant="tertiary">
        Tertiary
      </Button>
    </div>
  )
}