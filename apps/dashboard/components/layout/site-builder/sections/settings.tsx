import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppSelector } from "@/utils/index";
import { website } from "@/store/slices/website-store";
import ModalColorPicker, { ModalColorPickerTrigger } from '@/components/modals/site/modal-color-picker';

export default function SiteBuilderSettingsSection(){
  const site = useAppSelector(website);

  const [state, setState] = useState({
    websitePrimaryColor: site?.websitePrimaryColor || "#ffffff",
    websiteSecondaryColor: site?.websiteSecondaryColor || "#6725f2",
    websiteBackgroundColor: site?.websiteBackgroundColor || "#ffffff"
  });

  const setPrimaryColor = (color: string) => {
    setState({
      ...state,
      websitePrimaryColor: color
    });
  };

  const setSecondaryColor = (color: string) => {
    setState({
      ...state,
      websiteSecondaryColor: color
    });
  }

  const setBackgroundColor = (color: string) => {
    setState({
      ...state,
      websiteBackgroundColor: color
    });
  }

  const sections = [
    {
      title: "Colors",
      items: [
        {
          title: "Primary Color",
          content: (
            <ModalColorPicker 
              color={state.websitePrimaryColor}
              onColorChange={(color) => setPrimaryColor(color)}
              trigger={<ModalColorPickerTrigger color={state.websitePrimaryColor} />}
            />
          ),
          description: "The primary color of the site"
        },
        {
          title: "Secondary Color",
          content: 
            <ModalColorPicker
              color={state.websiteSecondaryColor}
              onColorChange={(color) => setSecondaryColor(color)}
              trigger={<ModalColorPickerTrigger color={state.websiteSecondaryColor} />}
            />,
          description: "The secondary color of the site"
        },
        {
          title: "Accent Color",
          content: '',
          description: "The accent color of the site"
        },
        {
          title: "Background Color",
          content: 
          <ModalColorPicker 
            color={state.websitePrimaryColor}
            onColorChange={(color) => setBackgroundColor(color)}
            trigger={<ModalColorPickerTrigger color={state.websiteBackgroundColor} />}
          />,
          description: "The background color of the site"
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
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="border-b border-black-50"
          >
            <AccordionTrigger className="hover:no-underline font-medium font-satoshi">
              {section.title}
            </AccordionTrigger>
            {section.items.map((item, index) => (
              <AccordionContent key={index} className="text-xs flex w-full justify-between items-center">
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