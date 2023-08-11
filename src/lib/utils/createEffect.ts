import { browser } from '$app/environment';

export const createEffect = (...initialDeps: any[]) => {
  let diff = JSON.stringify(initialDeps);

  return (callback: () => void, deps?: any[], allowServerSide = false) => {
    if (JSON.stringify(deps) !== diff && ((!allowServerSide && browser) || allowServerSide)) {
      diff = JSON.stringify(deps);
      callback();
    } else if (!deps) {
      diff = '';
    }
  };
};
