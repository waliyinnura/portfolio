import { memo } from "react";
import dynamic from "next/dynamic";
import { gridItems } from "@/data";

const BentoGrid = dynamic(() =>
  import("./ui/BentoGrid").then((mod) => mod.BentoGrid)
);
const BentoGridItem = dynamic(() =>
  import("./ui/BentoGrid").then((mod) => mod.BentoGridItem)
);

/**
 * The Grid component.
 *
 * @remarks
 * This component renders the grid section of the website. It displays a
 * responsive grid with a set of items.
 *
 * @returns The JSX element for the grid component.
 */
const Grid = memo(() => {
  return (
    <section id="about">
      <BentoGrid className="relative w-full py-20 px-5">
        {gridItems.map(
          ({ id, title, description, className, titleClassName, bgImage }) => (
            <BentoGridItem
              key={id}
              id={id}
              title={title}
              description={description}
              className={className}
              titleClassName={titleClassName}
              bgImage={bgImage}
            />
          )
        )}
      </BentoGrid>
    </section>
  );
});

Grid.displayName = "Grid";

export default Grid;
