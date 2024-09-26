import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { themeSwitch } from "@/store";
import { ThemeTypesEnum } from "@/types/enum";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.system.mode);

  useEffect(() => {
    document.documentElement.classList.toggle(
      ThemeTypesEnum.DARK,
      theme === ThemeTypesEnum.DARK,
    );
  }, [theme]);

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeTypesEnum.LIGHT
        ? ThemeTypesEnum.DARK
        : ThemeTypesEnum.LIGHT;
    dispatch(themeSwitch(newTheme));
  };

  return { theme, toggleTheme };
};
