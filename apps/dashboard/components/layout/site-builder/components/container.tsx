import type { DivType } from "@/types/components/Div"

export default function ContainerComponent(
  component: DivType
) {
  return (
    <div className="">
      {component.data?.children}
    </div>
  )
}