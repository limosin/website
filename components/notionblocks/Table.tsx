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
    return <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-500">No table data available</div>
  }

  // Check if we have header row
  const hasHeader = rows.length > 0 && rows[0]?.table_row?.cells?.length > 0
  const headerRow = hasHeader ? rows[0] : null
  const dataRows = hasHeader ? rows.slice(1) : rows

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm" id={id}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          {hasHeader && (
            <thead className="bg-orange-50">
              <tr>
                {headerRow.table_row.cells?.map((cell, i) => (
                  <th key={i} className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    {renderCellContent(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className={`divide-y divide-gray-200 bg-white ${!hasHeader ? "border-t-0" : ""}`}>
            {dataRows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                {row.table_row.cells?.map((cell, j) => (
                  <td key={j} className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
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
    return <span className="text-gray-400">—</span>
  }

  // Handle rich text content using SpanText component for consistency
  return <SpanText text={cell} id={`cell-${Math.random()}`} />
}
