import { FC } from "react"

export const Table: FC<{ key: any; value: any }> = ({ key, value }) => {
  const rows = value.children
  return (
    <div className="mb-2 overflow-x-auto py-4">
      <table className="w-full table-auto" id={key}>
        <thead>
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
                  {cell[0].text.link != null ? (
                    <a className="text-blue-600 hover:underline dark:text-blue-500" href={cell[0].text.link}>
                      {cell[0].plain_text}
                    </a>
                  ) : (
                    cell[0].plain_text
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
