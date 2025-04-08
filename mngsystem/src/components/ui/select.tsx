import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import * as React from "react"

import { cn } from "../lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border-2 bg-white px-4 py-3",
        "text-base font-semibold text-gray-800 shadow-md transition-all duration-200",
        "hover:bg-green-50/50 hover:border-green-400",
        "focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600",
        "dark:hover:bg-green-900/20 dark:hover:border-green-500",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-6 w-6 text-green-600 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-xl border-2 bg-white shadow-xl",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          "dark:bg-gray-800 dark:border-gray-600",
          position === "popper" &&
            "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-3",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full select-none items-center rounded-lg py-2.5 pl-10 pr-4 text-base",
        "cursor-pointer transition-all duration-150",
        "hover:bg-green-100 hover:text-green-800",
        "focus:bg-green-100 focus:text-green-800",
        "dark:hover:bg-green-900/30 dark:hover:text-green-300",
        "dark:focus:bg-green-900/30 dark:focus:text-green-300",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex h-5 w-5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText className="font-medium">{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,

  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
