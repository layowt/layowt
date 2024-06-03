import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppSelector } from "@/utils/index";
import { website } from "@/store/slices/website-store";

export default function SiteBuilderSettingsSection(){
  const site = useAppSelector(website)

  const sections = [
    {
      title: "Colors",
      items: [
        {
          title: "Primary Color",
          content: site?.websitePrimaryColor,
          description: "The primary color of the site"
        },
        {
          title: "Secondary Color",
          content: site?.websiteSecondaryColor,
          description: "The secondary color of the site"
        }
      ]
    },
    {
      title: "Favicon",
      items: [
        {
          title: "Upload Favicon",
          description: "Upload a favicon for the site"
        }
      ]
    }
  ]
  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="text-heading-xl">
        Site Settings
      </h2>
      <Accordion type="single" collapsible className="overflow-y-scroll">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-black-50">
            <AccordionTrigger className="hover:no-underline font-bold">
              {section.title}
            </AccordionTrigger>
            {section.items.map((item, index) => (
              <AccordionContent key={index} className="text-xs flex w-full justify-between">
                <span>
                  {item.title}
                </span>
                <span>
                  {item.content}
                </span>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}