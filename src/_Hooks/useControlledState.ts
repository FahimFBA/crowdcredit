import { useCallback, useEffect, useState } from "react";
import { IUseControlledStateProps } from "./_Types";

export const useControlledState = ({
  controlledState,
  onStateChange,
}: IUseControlledStateProps) => {
  const [localState, setLocalState] = useState<boolean>(
    controlledState ?? false,
  );

  useEffect(() => {
    if (controlledState !== undefined) {
      setLocalState(controlledState);
    }
  }, [controlledState]);

  const handleStateChange = useCallback(
    (newState: boolean) => {
      return onStateChange ? onStateChange(newState) : setLocalState(newState);
    },
    [onStateChange],
  );

  return [localState, handleStateChange] as const;
};
