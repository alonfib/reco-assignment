import { useCallback, useEffect, useState } from "react";

function useInfiniteScroll(targetRef: React.RefObject<HTMLElement>, initialPage: number, callback: () => Promise<void>) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  

  useEffect(() => {
    const handleScroll = async () => {
      if (!hasScrolledToBottom && targetRef.current && targetRef.current.scrollHeight > targetRef.current.clientHeight) {
        const target = targetRef.current;
        const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 100;
        
        if (isAtBottom && target.clientHeight < target.scrollHeight) {
          setCurrentPage(currentPage + 1);
          setHasScrolledToBottom(true);
          callback();
        }
      }
      
    };
  
    if (targetRef.current) {
      targetRef.current.addEventListener("scroll",  handleScroll);
    }

    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [targetRef, callback, hasScrolledToBottom, currentPage]);

  const resetBottomScrollFlag = () => {
    setHasScrolledToBottom(false);
  };

  const resetPageCount = () => {
    setCurrentPage(1);
  };

  return { resetBottomScrollFlag, currentPage, resetPageCount };
}

export default useInfiniteScroll;