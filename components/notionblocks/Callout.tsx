import { SpanText } from "./CommonBlocks"

export const Callout = ({ id, value }) => {
  // Get the icon (emoji is still used for the icon display)
  const icon = value.icon?.emoji || "💡"

  // Map Notion color values to Tailwind styles with dark mode support
  const getCalloutStyle = (color) => {
    const styles = {
      red_background: {
        bg: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-800/50",
        text: "text-red-900 dark:text-red-200",
        iconBg: "bg-red-100 dark:bg-red-800/40",
      },
      gray_background: {
        bg: "bg-gray-50 dark:bg-gray-800/50",
        border: "border-gray-200 dark:border-gray-700/50",
        text: "text-gray-900 dark:text-gray-200",
        iconBg: "bg-gray-100 dark:bg-gray-700/40",
      },
      blue_background: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800/50",
        text: "text-blue-900 dark:text-blue-200",
        iconBg: "bg-blue-100 dark:bg-blue-800/40",
      },
      green_background: {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-800/50",
        text: "text-green-900 dark:text-green-200",
        iconBg: "bg-green-100 dark:bg-green-800/40",
      },
      yellow_background: {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-800/50",
        text: "text-yellow-900 dark:text-yellow-200",
        iconBg: "bg-yellow-100 dark:bg-yellow-800/40",
      },
      orange_background: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        border: "border-orange-200 dark:border-orange-800/50",
        text: "text-orange-900 dark:text-orange-200",
        iconBg: "bg-orange-100 dark:bg-orange-800/40",
      },
      purple_background: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        border: "border-purple-200 dark:border-purple-800/50",
        text: "text-purple-900 dark:text-purple-200",
        iconBg: "bg-purple-100 dark:bg-purple-800/40",
      },
      pink_background: {
        bg: "bg-pink-50 dark:bg-pink-900/20",
        border: "border-pink-200 dark:border-pink-800/50",
        text: "text-pink-900 dark:text-pink-200",
        iconBg: "bg-pink-100 dark:bg-pink-800/40",
      },
      brown_background: {
        bg: "bg-amber-50 dark:bg-amber-900/20",
        border: "border-amber-200 dark:border-amber-800/50",
        text: "text-amber-900 dark:text-amber-200",
        iconBg: "bg-amber-100 dark:bg-amber-800/40",
      },
    }
    return (
      styles[color] || {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800/50",
        text: "text-blue-900 dark:text-blue-200",
        iconBg: "bg-blue-100 dark:bg-blue-800/40",
      }
    )
  }

  const style = getCalloutStyle(value.color)

  return (
    <div className={`my-2 w-full flex rounded-md border ${style.border} ${style.bg} p-4 shadow-sm transition-colors duration-200`}>
      <div className={`mr-4 flex size-8 shrink-0 items-center justify-center rounded-full ${style.iconBg} text-lg transition-colors duration-200`}>{icon}</div>
      <div className={`flex-1 min-w-0 ${style.text} leading-relaxed transition-colors duration-200`}>
        <SpanText text={value.rich_text} id={id} />
      </div>
    </div>
  )
}
