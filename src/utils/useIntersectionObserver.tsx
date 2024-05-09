import { useEffect, useState, RefObject } from "react";

const useIntersectionObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = {}
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isVisible;
};

export default useIntersectionObserver;
