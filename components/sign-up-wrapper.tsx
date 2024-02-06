'use client';

import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Button } from '@/components/ui/button';
import SignUpForm from '@/components/sign-up-form';

/**
 * Renders the sign-up component.
 *
 * @returns The sign-up component JSX.
 */
export default function signUpComponent() {
  // useState will infer the type based on the initial value
  const [featureClicked, setFeatureClicked] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const handleFeatureClick = (feature: string) => {
    if (featureClicked && feature === selectedFeature) {
      setFeatureClicked(false);
      setSelectedFeature('');
      return;
    }
    setFeatureClicked(true);
    setSelectedFeature(feature);
  };

  const features = [
    {
      id: 1,
      label: 'No domain needed',
      slug: 'no-domain-needed',
      component: 'NoDomainNeeded',
      description: 'Get started with a free subdomain and no upfront costs.',
      icon: 'domain',
    },
    {
      id: 2,
      label: 'Page Builder',
      slug: 'page-builder',
      component: 'PageBuilder',
      description:
        'Create beautiful, responsive websites with our drag and drop builder.',
      icon: 'page',
    },
    {
      id: 3,
      label: 'Self Hosting',
      slug: 'self-hosting',
      component: 'SelfHosting',
      description:
        'Host your website on your own server, or use our hosting service.',
      icon: 'server',
    },
    {
      id: 4,
      label: 'AI assistance',
      slug: 'ai-assistance',
      component: 'AIAssistance',
      description: 'Get help from our AI to build your website.',
      icon: 'robot',
    },
    {
      id: 5,
      label: 'Analytics',
      slug: 'analytics',
      component: 'Analytics',
      description: "Track your website's performance with our analytics tools.",
      icon: 'analytics',
    },
  ];

  let buttonClasses =
    'mx-5 bg-transparent border border-white rounded-lg px-4 py-2';

  return (
    <div className="flex h-screen gap-x-20 items-center justify-center text-white px-10">
      <div className="flex flex-col gap-y-8 max-h-[316px] w-80 lg:w-auto">
        <div className="">
          <div className="flex flex-col gap-y-3">
            <h1 className="{Cairo}text-xl md:text-3xl lg:text-5xl xl:text-7xl font-medium">
              Starting your online <br />
              journey has never been <br />
              easier.
            </h1>
            <span>
              Everything you need to kickstart your business, in one
              application.
            </span>
          </div>
        </div>
        <div className="max-w-[44rem]">
          <Marquee pauseOnHover>
            {features.map((feature) => (
              <Button
                key={feature.id}
                className={
                  buttonClasses +
                  (selectedFeature === feature.component ? ' bg-red-500' : '')
                }
                onClick={() => handleFeatureClick(feature.component)}
              >
                <span>{feature.label}</span>
              </Button>
            ))}
          </Marquee>
        </div>
      </div>
      <SignUpForm />
    </div>
  );
}
