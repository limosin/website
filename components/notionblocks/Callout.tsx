import { SpanText } from "./CommonBlocks"

export const Callout = ({ id, value }) => {
  // Get the icon (emoji is still used for the icon display)
  const icon = value.icon?.emoji || "💡"

  // Map Notion color values to Tailwind styles
  const getCalloutStyle = (color) => {
    const styles = {
      red_background: { bg: "bg-red-50", border: "border-red-200", text: "text-red-900", iconBg: "bg-red-100" },
      gray_background: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-900", iconBg: "bg-gray-100" },
      blue_background: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", iconBg: "bg-blue-100" },
      green_background: { bg: "bg-green-50", border: "border-green-200", text: "text-green-900", iconBg: "bg-green-100" },
      yellow_background: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-900", iconBg: "bg-yellow-100" },
      orange_background: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-900", iconBg: "bg-orange-100" },
      purple_background: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-900", iconBg: "bg-purple-100" },
      pink_background: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-900", iconBg: "bg-pink-100" },
      brown_background: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", iconBg: "bg-amber-100" },
    }
    return styles[color] || { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", iconBg: "bg-blue-100" }
  }

  const style = getCalloutStyle(value.color)

  return (
    <div className={`my-2 w-full flex rounded-md border ${style.border} ${style.bg} p-4 shadow-sm`}>
      <div className={`mr-4 flex size-8 shrink-0 items-center justify-center rounded-full ${style.iconBg} text-lg`}>{icon}</div>
      <div className={`flex-1 min-w-0 ${style.text} leading-relaxed`}>
        <SpanText text={value.rich_text} id={id} />
      </div>
    </div>
  )
}
