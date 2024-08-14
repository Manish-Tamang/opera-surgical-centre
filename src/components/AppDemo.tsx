"use client"
import { useState } from 'react';
import Image from 'next/image';
import OIP from '../../src/images/OIP.jpg'; // Ensure this path is correct

import { AppScreen } from '@/components/AppScreen';

const prices = [
  // Your prices array
];

function Chart({
  className,
  activePointIndex,
  onChangeActivePointIndex,
  width: totalWidth,
  height: totalHeight,
  paddingX = 0,
  paddingY = 0,
  gridLines = 6,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  activePointIndex: number | null;
  onChangeActivePointIndex: (index: number | null) => void;
  width: number;
  height: number;
  paddingX?: number;
  paddingY?: number;
  gridLines?: number;
}) {
  // Your Chart component implementation
}

export function AppDemo() {
  let [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  let activePriceIndex = activePointIndex ?? prices.length - 1;
  let activeValue = prices[activePriceIndex];
  let previousValue = prices[activePriceIndex - 1];
  let percentageChange =
    activePriceIndex === 0
      ? null
      : ((activeValue - previousValue) / previousValue) * 100;

  return (
    <AppScreen>
      <AppScreen.Body>
        <div className="p-4">
          <Image
            src={OIP} // Path to your image file
            alt="Description of the image" // Add an alt description
            width={500} // Set the desired width
            height={300} // Set the desired height
          />
        </div>
      </AppScreen.Body>
    </AppScreen>
  );
}
