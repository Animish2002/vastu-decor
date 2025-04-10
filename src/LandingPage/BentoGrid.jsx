import { cn } from "../lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import livingRoom from "../assets/livingroom.jpg";
import bedroom from "../assets/bedroom-jpg.jpg";
import kitchen from "../assets/kitchen.jpg";
import bathroom from "../assets/bathroom.jpg";
import wardrobe2 from "../assets/wardrobe2.png";
import painting from "../assets/painting.jpg";

export function BentoGridDemo() {
  return (
    <>
      <div className="text-center mb-16 mt-12">
        <h2 className="text-4xl font-semibold mb-4 text-neutral-900 heading">
          Inspiration for home interior designs
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Give your home a new look with these interior design ideas curated for
          you
        </p>
      </div>
      <BentoGrid className="max-w-7xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </>
  );
}

const items = [
  {
    title: "Living Room",
    description:
      "Create a warm and inviting atmosphere with a stylish living room that reflects your personality.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
        <img
          src={livingRoom}
          alt="Modern living room with comfortable seating and elegant design"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Bedroom",
    description:
      "Transform your bedroom into a serene retreat with elegant furniture, soothing colors and a touch of art.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
        <img
          src={bedroom}
          alt="Elegant bedroom design with soft lighting and comfortable bedding"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "False Ceiling",
    description:
      "Add an extra layer of sophistication to your room with a beautifully designed false ceiling.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
        <img
          src="/api/placeholder/800/500"
          alt="Modern false ceiling with recessed lighting and elegant design"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Wardrobe",
    description:
      "Design a wardrobe that reflects your personal style and adds a touch of glamour to your home.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
        <img
          src={wardrobe2}
          alt="Custom built-in wardrobe with elegant storage solutions"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Kitchen",
    description:
      "Create a kitchen that is both functional and beautiful, with stylish appliances and elegant countertops.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
        <img
          src={kitchen}
          alt="Modern kitchen with high-end appliances and elegant countertops"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Bathrooms",
    description:
      "Transform your bathroom into a luxurious oasis with a stylish tub, elegant fixtures and a touch of art.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
        <img
          src={bathroom}
          alt="Luxury bathroom with modern fixtures and elegant design"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Painting",
    description:
      "Create a home that reflects your love of adventure and travel, with bold colors, eclectic furniture and a touch of the exotic.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden">
        <img
          src={painting}
          alt="Vibrant wall painting and artistic interior design elements"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
