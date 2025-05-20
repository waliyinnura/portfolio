"use client";

import { useModal, ModalProvider } from "./AnimatedModal";
import { AnimatePresence, motion } from "motion/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";
import { TimelineEntry } from "../Timeline";

const ImageGridWithModal = ({ item }: { item: TimelineEntry }) => {
  const { open, setOpen } = useModal();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4">
        {item.img.map(
          (
            image: string | StaticImport,
            index: React.Key | null | undefined
          ) => (
            <Image
              key={index}
              src={image}
              alt={item.company + "image" + index}
              width={500}
              height={500}
              priority={true}
              className="aspect-square w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] cursor-pointer"
              onClick={() => openModal(image as string)}
              style={{ width: "auto", height: "auto" }}
            />
          )
        )}
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative dark: bg-neutral-400 p-2 shadow-lg rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Selected"
                  width={800}
                  height={800}
                  className="object-cover rounded-xl"
                  style={{ width: "auto", height: "auto" }}
                  priority={true}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedImageGridModal = ({ item }: { item: TimelineEntry }) => (
  <ModalProvider>
    <ImageGridWithModal item={item} />
  </ModalProvider>
);

export default AnimatedImageGridModal;
