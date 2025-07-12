import { FC } from "react"

export const Table: FC<{ key: string; value }> = ({ key, value }) => {
  const rows = value.children
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm" id={key}>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {rows[0].table_row.cells?.map((cell, i) => (
                <th key={i} className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  {cell[0].plain_text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.slice(1).map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {row.table_row.cells?.map((cell, j) => (
                  <td key={j} className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                    {cell[0]?.text.link != null ? (
                      <a className="text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800" href={cell[0].text.link}>
                        {cell[0].plain_text}
                      </a>
                    ) : (
                      <span>{cell.length > 0 ? cell[0].plain_text : null}</span>
                    )}
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
