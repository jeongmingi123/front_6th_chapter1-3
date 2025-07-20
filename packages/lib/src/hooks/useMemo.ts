/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

type MemoizedValue<T> = {
  deps: DependencyList;
  value: T;
};

export function useMemo<T>(factory: () => T, deps: DependencyList, equals = shallowEquals): T {
  const memoRef = useRef<MemoizedValue<T> | null>(null);

  const hasDepsChanged = !memoRef.current || !equals(deps, memoRef.current.deps);

  if (hasDepsChanged) {
    const newValue = factory();
    memoRef.current = { deps, value: newValue };
  }

  return memoRef.current!.value;
}
