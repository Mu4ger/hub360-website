"use client";

import {
  Children,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, type Transition } from "framer-motion";
import { InteractiveSurface } from "@/components/InteractiveSurface";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type CarouselContextType = {
  index: number;
  setIndex: (newIndex: number) => void;
  itemsCount: number;
  setItemsCount: (newItemsCount: number) => void;
  disableDrag: boolean;
};

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
}

type CarouselProviderProps = {
  children: ReactNode;
  initialIndex?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}: CarouselProviderProps) {
  const [index, setIndex] = useState<number>(initialIndex);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const handleSetIndex = (newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider
      value={{
        index,
        setIndex: handleSetIndex,
        itemsCount,
        setItemsCount,
        disableDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

type CarouselProps = {
  children: ReactNode;
  className?: string;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

export function Carousel({
  children,
  className,
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
  disableDrag = false,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState<number>(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={handleIndexChange}
      disableDrag={disableDrag}
    >
      <div className={cn("group/hover relative", className)}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </CarouselProvider>
  );
}

type CarouselNavigationProps = {
  className?: string;
  classNameButton?: string;
  alwaysShow?: boolean;
};

export function CarouselNavigation({
  className,
  classNameButton,
  alwaysShow,
}: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 flex w-full justify-between px-2",
        className
      )}
    >
      <button
        type="button"
        aria-label="Previous slide"
        className={cn(
          "pointer-events-auto h-fit w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950",
          alwaysShow ? "opacity-100" : "opacity-0 group-hover/hover:opacity-100",
          alwaysShow ? "disabled:opacity-40" : "group-hover/hover:disabled:opacity-40",
          classNameButton
        )}
        disabled={index === 0}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-600 dark:text-zinc-50"
          />
        </svg>
      </button>
      <button
        type="button"
        className={cn(
          "pointer-events-auto h-fit w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950",
          alwaysShow ? "opacity-100" : "opacity-0 group-hover/hover:opacity-100",
          alwaysShow ? "disabled:opacity-40" : "group-hover/hover:disabled:opacity-40",
          classNameButton
        )}
        aria-label="Next slide"
        disabled={index + 1 === itemsCount}
        onClick={() => {
          if (index < itemsCount - 1) {
            setIndex(index + 1);
          }
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-600 dark:text-zinc-50"
          />
        </svg>
      </button>
    </div>
  );
}

type CarouselIndicatorProps = {
  className?: string;
  classNameButton?: string;
};

export function CarouselIndicator({ className, classNameButton }: CarouselIndicatorProps) {
  const { index, itemsCount, setIndex } = useCarousel();

  return (
    <div
      className={cn(
        "absolute bottom-0 z-10 flex w-full items-center justify-center",
        className
      )}
    >
      <div className="flex space-x-2">
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-opacity duration-300",
              index === i ? "bg-zinc-950 dark:bg-zinc-50" : "bg-zinc-900/50 dark:bg-zinc-100/50",
              classNameButton
            )}
          />
        ))}
      </div>
    </div>
  );
}

type CarouselContentProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
};

export function CarouselContent({ children, className, transition }: CarouselContentProps) {
  const { index, setItemsCount } = useCarousel();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const itemsLength = Children.count(children);

  useEffect(() => {
    if (!itemsLength) {
      return;
    }
    setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }

    const measure = () => setViewportWidth(el.clientWidth);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("orientationchange", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  const slideWidth = viewportWidth;
  const offset = slideWidth > 0 ? -index * slideWidth : 0;

  return (
    <div ref={viewportRef} className="w-full overflow-hidden">
      <motion.div
        ref={trackRef}
        animate={{ x: offset }}
        transition={
          transition || {
            type: "tween",
            ease: [0.22, 1, 0.36, 1],
            duration: 0.48,
          }
        }
        className={cn("flex items-stretch", className)}
        style={{
          width: itemsLength && slideWidth ? itemsLength * slideWidth : "100%",
        }}
      >
        {Children.map(children, (child, i) => (
          <div
            key={i}
            className="flex shrink-0 justify-center px-2 sm:px-3 md:px-4"
            style={{
              width: slideWidth > 0 ? slideWidth : `${100 / Math.max(itemsLength, 1)}%`,
            }}
          >
            <div className="h-full w-full min-w-0 max-w-[min(84vw,420px)] sm:max-w-[min(78vw,460px)] md:max-w-[min(66vw,500px)] xl:max-w-[min(54vw,560px)]">
              {child}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

type CarouselItemProps = {
  children: ReactNode;
  className?: string;
};

export function CarouselItem({ children, className }: CarouselItemProps) {
  return <div className={cn("min-w-0", className)}>{children}</div>;
}

/** Letters-style slide: large radius, ~40px padding, first slide blue. */
export function BentoLettersSlide({
  isHighlight,
  children,
}: {
  isHighlight: boolean;
  children: React.ReactNode;
}) {
  return (
    <InteractiveSurface
      intensity={5}
      className={`flex min-h-[300px] flex-col rounded-[2.25rem] p-6 sm:min-h-[340px] sm:p-7 ${
        isHighlight
          ? "bg-[linear-gradient(160deg,#6a8eb3_0%,#4f7398_100%)] text-white"
          : "hub-glass text-hub-ink dark:text-white"
      }`}
    >
      <div className="flex flex-1 flex-col">{children}</div>
    </InteractiveSurface>
  );
}

type SwipeCardCarouselProps = {
  children: ReactNode;
  hint?: string;
  fadeFromClass?: string;
  lettersStyle?: boolean;
};

export function SwipeCardCarousel({
  children,
  hint = "Swipe or use arrows to explore",
  fadeFromClass = "from-white dark:from-[var(--hub-dark-1)]",
  lettersStyle = false,
}: SwipeCardCarouselProps) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);

  return (
    <div className="relative mt-10">
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r sm:w-16 ${fadeFromClass} to-transparent`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l sm:w-16 ${fadeFromClass} to-transparent`}
      />

      <div className="relative -mx-1 px-1 pb-20 pt-1 sm:pb-24">
        <Carousel initialIndex={0} onIndexChange={setActive} disableDrag>
          <CarouselContent className={cn(lettersStyle ? "gap-0" : "gap-0")}>
            {slides.map((child, i) => (
              <CarouselItem key={i}>
                <motion.div
                  animate={{
                    scale: active === i ? 1 : lettersStyle ? 0.985 : 0.97,
                    opacity: active === i ? 1 : lettersStyle ? 0.88 : 0.72,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: lettersStyle ? 300 : 360,
                    damping: lettersStyle ? 34 : 32,
                    mass: 0.65,
                  }}
                  className={cn(
                    "h-full transition-[box-shadow] duration-500 ease-out",
                    active === i
                      ? lettersStyle
                        ? "shadow-[0_24px_60px_-28px_rgba(46,74,112,0.22)] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
                        : "shadow-[0_20px_50px_-28px_rgba(46,74,112,0.35)] dark:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.5)]"
                      : "shadow-[0_8px_30px_-20px_rgba(46,74,112,0.12)] dark:shadow-[0_8px_30px_-16px_rgba(0,0,0,0.35)]"
                  )}
                >
                  {child}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation
            alwaysShow={lettersStyle}
            className={cn(
              "px-1 sm:px-3 md:px-4",
              lettersStyle
                ? "top-[44%] -translate-y-1/2"
                : "top-auto bottom-2 translate-y-0 sm:bottom-3"
            )}
            classNameButton="border border-black/[0.08] bg-white text-hub-ink shadow-sm transition hover:bg-black/[0.03] disabled:opacity-30 dark:border-white/12 dark:bg-[var(--hub-dark-2)] dark:text-white dark:hover:bg-white/5"
          />
          <CarouselIndicator className="-bottom-6 pb-0.5 sm:-bottom-7" />
        </Carousel>
      </div>
      <p className="mt-2 text-center text-xs text-black/40 dark:text-white/40">{hint}</p>
    </div>
  );
}
