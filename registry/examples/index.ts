import type { ComponentType } from "react";
import AsciiRainDemo from "./ascii-rain-demo";
import ButtonDemo from "./button-demo";
import ToggleDemo from "./toggle-demo";
import SwitchDemo from "./switch-demo";
import InputDemo from "./input-demo";
import TextareaDemo from "./textarea-demo";
import LabelDemo from "./label-demo";
import NativeSelectDemo from "./native-select-demo";
import CheckboxDemo from "./checkbox-demo";
import RadioGroupDemo from "./radio-group-demo";
import SliderDemo from "./slider-demo";
import ToggleGroupDemo from "./toggle-group-demo";
import SelectDemo from "./select-demo";
import InputOTPDemo from "./input-otp-demo";
import InputGroupDemo from "./input-group-demo";
import ButtonGroupDemo from "./button-group-demo";
import FieldDemo from "./field-demo";
import DialogDemo from "./dialog-demo";
import SonnerDemo from "./sonner-demo";
import ContextMenuDemo from "./context-menu-demo";
import DropdownMenuDemo from "./dropdown-menu-demo";
import HoverCardDemo from "./hover-card-demo";
import TooltipDemo from "./tooltip-demo";
import PopoverDemo from "./popover-demo";
import DrawerDemo from "./drawer-demo";
import SheetDemo from "./sheet-demo";
import AlertDialogDemo from "./alert-dialog-demo";
import LoaderDemo from "./loader-demo";
import SkeletonDemo from "./skeleton-demo";
import BackdropDemo from "./backdrop-demo";
import CardDemo from "./card-demo";
import TerminalDemo from "./terminal-demo";
import AsciiChartDemo from "./ascii-chart-demo";
import HeroTerminalDemo from "./hero-terminal-demo";
import AsciiVideoDemo from "./ascii-video-demo";
import AsciiVideoWebcamDemo from "./ascii-video-webcam-demo";
import DitherFieldAsciiDemo from "./dither-field-ascii-demo";
import DitherFieldDemo from "./dither-field-demo";
import DitherFieldFieldsDemo from "./dither-field-fields-demo";
import DitherFieldPatternsDemo from "./dither-field-patterns-demo";
import DitherImageDemo from "./dither-image-demo";
import DitherImagePatternsDemo from "./dither-image-patterns-demo";
import DitherRevealDemo from "./dither-reveal-demo";
import DitherProgressDemo from "./dither-progress-demo";
import ScrambleTextDemo from "./scramble-text-demo";
import DitherFieldProviderDemo from "./dither-field-provider-demo";

/** Every docs example by name; visual regression screenshots each one. */
export const examples: Record<string, ComponentType> = {
  "dither-field-demo": DitherFieldDemo,
  "dither-field-provider-demo": DitherFieldProviderDemo,
  "dither-field-patterns-demo": DitherFieldPatternsDemo,
  "dither-field-fields-demo": DitherFieldFieldsDemo,
  "dither-field-ascii-demo": DitherFieldAsciiDemo,
  "dither-image-demo": DitherImageDemo,
  "dither-image-patterns-demo": DitherImagePatternsDemo,
  "dither-progress-demo": DitherProgressDemo,
  "ascii-video-demo": AsciiVideoDemo,
  "ascii-video-webcam-demo": AsciiVideoWebcamDemo,
  "scramble-text-demo": ScrambleTextDemo,
  "dither-reveal-demo": DitherRevealDemo,
  "ascii-rain-demo": AsciiRainDemo,
  "button-demo": ButtonDemo,
  "toggle-demo": ToggleDemo,
  "switch-demo": SwitchDemo,
  "input-demo": InputDemo,
  "textarea-demo": TextareaDemo,
  "label-demo": LabelDemo,
  "native-select-demo": NativeSelectDemo,
  "checkbox-demo": CheckboxDemo,
  "radio-group-demo": RadioGroupDemo,
  "slider-demo": SliderDemo,
  "toggle-group-demo": ToggleGroupDemo,
  "select-demo": SelectDemo,
  "input-otp-demo": InputOTPDemo,
  "input-group-demo": InputGroupDemo,
  "button-group-demo": ButtonGroupDemo,
  "field-demo": FieldDemo,
  "dialog-demo": DialogDemo,
  "sonner-demo": SonnerDemo,
  "context-menu-demo": ContextMenuDemo,
  "dropdown-menu-demo": DropdownMenuDemo,
  "hover-card-demo": HoverCardDemo,
  "tooltip-demo": TooltipDemo,
  "popover-demo": PopoverDemo,
  "drawer-demo": DrawerDemo,
  "sheet-demo": SheetDemo,
  "alert-dialog-demo": AlertDialogDemo,
  "loader-demo": LoaderDemo,
  "skeleton-demo": SkeletonDemo,
  "card-demo": CardDemo,
  "backdrop-demo": BackdropDemo,
  "terminal-demo": TerminalDemo,
  "ascii-chart-demo": AsciiChartDemo,
  "hero-terminal-demo": HeroTerminalDemo,
};
