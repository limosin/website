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
    return <div className="atlas-content-table-empty">No table data available</div>
  }

  // Check if we have header row
  const hasHeader = rows.length > 0 && rows[0]?.table_row?.cells?.length > 0
  const headerRow = hasHeader ? rows[0] : null
  const dataRows = hasHeader ? rows.slice(1) : rows

  return (
    <div className="atlas-content-table" id={id}>
      <div className="atlas-content-table__scroll">
        <table>
          {hasHeader && (
            <thead>
              <tr>
                {headerRow.table_row.cells?.map((cell, i) => (
                  <th key={i}>{renderCellContent(cell, `${id || "table"}-header-${i}`)}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {dataRows.map((row, i) => (
              <tr key={i}>
                {row.table_row.cells?.map((cell, j) => (
                  <td key={j}>{renderCellContent(cell, `${id || "table"}-row-${i}-cell-${j}`)}</td>
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
function renderCellContent(cell: Array<RichTextItem>, cellId: string) {
  if (!cell || cell.length === 0) {
    return <span className="atlas-content-table__empty">—</span>
  }

  // Handle rich text content using SpanText component for consistency
  return <SpanText text={cell} id={cellId} />
}
