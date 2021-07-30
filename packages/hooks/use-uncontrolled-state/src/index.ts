import { useCallback, useState } from 'react'

/**
 * if `controlledState` is `undefined` will be uncontrolled using the defaultState
 *
 * @param defaultState
 * @param controlledState
 * @param onChange
 */
export function useUncontrolledState<T>(
  defaultState: T | (() => T),
  controlledState?: T,
  onChange?: (next: T, ...args: any[]) => void
) {
  const [internalState, setInternalState] = useState<T>(defaultState)
  const uncontrolled = controlledState === undefined
  const state = uncontrolled ? internalState : (controlledState as T)

  const tryChangeState = useCallback(
    (newState: T, ...args: any[]) => {
      if (uncontrolled) {
        setInternalState(newState)
      }
      onChange?.(newState, ...args)
    },
    [uncontrolled, onChange]
  )

  return [state, tryChangeState] as const
}