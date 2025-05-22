import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { gridItems } from "@/data";

const Grid = React.memo(() => {
  return (
    <section id="about">
      <BentoGrid className="relative w-full py-20 px-5">
        {gridItems.map(
          ({ id, title, description, className, titleClassName }) => (
            <BentoGridItem
              key={id}
              id={id}
              title={title}
              description={description}
              className={className}
              titleClassName={titleClassName}
            />
          )
        )}
      </BentoGrid>
    </section>
  );
});

export default Grid;
