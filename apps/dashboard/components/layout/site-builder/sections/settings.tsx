import { use, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppSelector, useAppDispatch } from "@/utils/index";
import { setWebsite, website } from "@/store/slices/website-store";
import ModalColorPicker, { ModalColorPickerTrigger } from '@/components/modals/site/modal-color-picker';
import { updateWebsite } from '@/actions/websites/update';

export default function SiteBuilderSettingsSection(){
  const dispatch = useAppDispatch();
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

    // temporarily set the background color of the site until 
    // the user clicks off of the popover
    if(!site.websiteId) return;

    // set the local store value of the bg color to the new color
    dispatch(setWebsite({
      ...site,
      websiteBackgroundColor: color
    }))

    // debounce timer to only save the color after the user has stopped
    // changing the color for 1 second

    //updateWebsite(site.websiteId, {
    //  websiteBackgroundColor: color
    //})
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
              fieldValue={{ websitePrimaryColor: state.websitePrimaryColor }}
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
              fieldValue={{ websiteSecondaryColor: state.websiteSecondaryColor }}
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
            color={state.websiteBackgroundColor}
            onColorChange={(color) => setBackgroundColor(color)}
            trigger={<ModalColorPickerTrigger color={state.websiteBackgroundColor} />}
            fieldValue={{ websiteBackgroundColor: state.websiteBackgroundColor }}
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
