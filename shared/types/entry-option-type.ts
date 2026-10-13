import type { IconType } from "react-icons";
import { Dispatch, SetStateAction, useEffect } from "react";

export type EntryOption = {
  icon: IconType;
  title: string;
  description: string;
  arrowIcon: IconType;
  iconContainerClassName: string;
  to: string;
};

export type AddEntryProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};