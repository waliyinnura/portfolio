import React from 'react';
import { FloatingDock } from '@/components/ui/FloatingDock';
import { IconHome, IconHourglass, IconInfoCircle } from '@tabler/icons-react';

export function FloatingDockComponents({heroRef}:{heroRef: React.RefObject<HTMLElement | null> }) {
  const links = [
    {
      title: 'Home',
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },

    {
      title: 'About',
      icon: <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#about',
    },
    {
      title: 'Experiences',
      icon: <IconHourglass className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#experiences',
    },
  ];
  return (
    <div className="relative flex h-[35rem] w-full items-center justify-center">
      <FloatingDock items={links} heroRef={heroRef}/>
    </div>
  );
}
