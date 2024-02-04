import { FC } from "react"

export const Table: FC<{ key: string; value }> = ({ key, value }) => {
  const rows = value.children
  return (
    <div className="mb-2 overflow-x-auto py-4" id={key}>
      <table className="w-full table-auto">
        <thead className="bg-orange-50">
          <tr>
            {rows[0].table_row.cells?.map((cell, i) => (
              <th key={i} className="border px-4 py-2">
                {cell[0].plain_text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, i) => (
            <tr key={i}>
              {row.table_row.cells?.map((cell, j) => (
                <td key={j} className="border px-4 py-2">
                  {cell[0]?.text.link != null ? (
                    <a className="text-blue-600 hover:underline dark:text-blue-500" href={cell[0].text.link}>
                      {cell[0].plain_text}
                    </a>
                  ) : (
                    <text>{cell.length > 0 ? cell[0].plain_text : null}</text>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
