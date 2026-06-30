"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function Dock({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) {
  let mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-[#1a1a1a]/80 border border-white/10 px-4 pb-3 backdrop-blur-md",
        className
      )}
    >
      {items.map((item, idx) => (
        <DockIcon mouseX={mouseX} key={idx} href={item.href} title={item.title}>
          {item.icon}
        </DockIcon>
      ))}
    </div>
  );
}

function DockIcon({
  mouseX,
  title,
  icon,
  href,
  children,
}: {
  mouseX: any;
  title: string;
  icon?: React.ReactNode;
  href: string;
  children: React.ReactNode;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className="relative block">
      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square w-10 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors relative"
      >
        {children}
        
        {hovered && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] whitespace-nowrap opacity-100 transition-opacity">
            {title}
          </div>
        )}
      </motion.div>
    </a>
  );
}
