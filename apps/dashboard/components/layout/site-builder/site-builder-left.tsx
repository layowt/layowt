'use client'
import SiteBuilderOptions from "./site-builder-options";
import { useAppSelector } from "@/utils/index";
import { currentSection } from '@/store/slices/website-store'
import SiteBuilderSettingsSection from "./sections/settings";
import SiteBuilderPagesSection from "./sections/pages";
import SiteBuilderLayoutSection from "./sections/layout";
import SiteBuilderInsertSection from "./sections/insert";

const sections = {
  pages: SiteBuilderPagesSection,
  layout: SiteBuilderLayoutSection,
  settings: SiteBuilderSettingsSection,
  insert: SiteBuilderInsertSection
};

export default function SiteBuilderOptionsLeft(){
  const currentSelectedSection = useAppSelector(currentSection);
  const SelectedSection = sections[currentSelectedSection];

  return (
    <div className="bg-black-300 flex mt-navbar w-1/6 fixed left-0 bottom-0 border-r border-black-50 z-40">
      <SiteBuilderOptions />
      <div className="p-4 w-full">
        {SelectedSection && <SelectedSection />}
      </div>
    </div>
  )
}