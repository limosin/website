import { FC } from "react"
import { SpanText } from "./CommonBlocks"

interface RichTextItem {
  type: string
  text?: {
    content: string
    link?: {
      url: string
    }
  }
  plain_text: string
  href?: string
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
}

interface TableProps {
  id?: string
  value: {
    children: Array<{
      table_row: {
        cells: Array<Array<RichTextItem>>
      }
    }>
  }
}

export const Table: FC<TableProps> = ({ id, value }) => {
  const rows = value.children

  // Early return if no rows
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-center text-gray-500 dark:text-gray-400 transition-colors">
        No table data available
      </div>
    )
  }

  // Check if we have header row
  const hasHeader = rows.length > 0 && rows[0]?.table_row?.cells?.length > 0
  const headerRow = hasHeader ? rows[0] : null
  const dataRows = hasHeader ? rows.slice(1) : rows

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/20 transition-colors" id={id}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          {hasHeader && (
            <thead className="bg-orange-50 dark:bg-orange-900/30 transition-colors">
              <tr>
                {headerRow.table_row.cells?.map((cell, i) => (
                  <th key={i} className="border-b border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                    {renderCellContent(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800 transition-colors ${!hasHeader ? "border-t-0" : ""}`}>
            {dataRows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                {row.table_row.cells?.map((cell, j) => (
                  <td key={j} className="border-b border-gray-200 dark:border-gray-600 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                    {renderCellContent(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Helper function to render cell content with proper rich text support
function renderCellContent(cell: Array<RichTextItem>) {
  if (!cell || cell.length === 0) {
    return <span className="text-gray-400 dark:text-gray-500 transition-colors">—</span>
  }

  // Handle rich text content using SpanText component for consistency
  return <SpanText text={cell} id={`cell-${Math.random()}`} />
}
