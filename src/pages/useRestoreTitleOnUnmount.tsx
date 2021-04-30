import { useEffect, useRef } from "react";

const useRestoreTitleOnUnmount = (): void => {
  const initialPageTitle = useRef<string>("");

  function puttingBackTheTitle(): void {
    window.document.title = initialPageTitle.current;
  }

  function effectCallbackForHandlingInitialTitle(): () => void {
    initialPageTitle.current = window.document.title;
    return puttingBackTheTitle;
  }

  useEffect(effectCallbackForHandlingInitialTitle, []);
};

export default useRestoreTitleOnUnmount;
