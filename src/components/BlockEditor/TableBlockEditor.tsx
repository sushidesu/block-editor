import { TableBlock, TableRow } from "../../domain/CustomBlock"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"
import { TableRowEditor } from "./TableRowEditor"

export function TableBlockEditor({block, update, ...rest}: BlockEditorProps<TableBlock>): JSX.Element {
  const addRow = () => {
    update({
      id: block.id,
      mutation: (prev) => {
        if (prev.type === "table") {
          return {
            ...prev,
            value: {
              ...prev.value,
              rows: prev.value.rows.concat({ title: "", body: "" })
            }
          }
        } else {
          return prev
        }
      }
    })
  }
  const removeRow = () => {
    update({
      id: block.id,
      mutation: (prev) => {
        if (prev.type === "table") {
          return {
            ...prev,
            value: {
              ...prev.value,
              rows: prev.value.rows.slice(0, prev.value.rows.length-1)
            }
          }
        } else {
          return prev
        }
      }
    })
  }
  const rowUpdater: (index: number) => (mutation: (prev: TableRow) => TableRow) => void = (index) => (rowMutation) => {
    update({
      id: block.id,
      mutation: (prev) => {
        if (prev.type === "table") {
          const newRows = [...prev.value.rows]
          newRows[index] = rowMutation(newRows[index])
          return {
            ...prev,
            value: {
              ...prev.value,
              rows: newRows
            }
          }
        } else {
          return prev
        }
      }
    })
  }
  return (
    <BlockEditorWrapper
      label="テーブル"
      {...rest}
    >
      <table>
        <tbody>
          {block.value.rows.map((row, i) => (
            <TableRowEditor key={i} row={row} update={rowUpdater(i)} />
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>追加</button>
      <button onClick={removeRow} >削除</button>
    </BlockEditorWrapper>
  )
}
