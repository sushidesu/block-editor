/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { UpdateFunction, Block, HeadingBlock, ImageBlock, TableBlock, TableRow, TextBlock } from "../hooks/useBlockCollection"

export type Props = {
  block: Block
  update: UpdateFunction<Block>
  remove: () => void
}

export function BlockEditor({ block, ...rest }: Props): JSX.Element | null {
  switch(block.type) {
    case "heading":
      return <HeadingBlockEditor block={block} {...rest} />
    case "text":
      return <TextBlockEditor block={block} {...rest} />
    case "image":
      return <ImageBlockEditor block={block} {...rest} />
    case "table":
      return <TableBlockEditor block={block} {...rest} />
    default:
      return null
  }
}

const blockWrapperStyle = css`
  padding: 10px 12px;
  box-shadow: 0 4px 8px rgba(73, 73, 60, 0.1);
`

const labelStyle = css`
  display: block;
  font-weight: bold;
`

type BlockEditorProps<T extends Block> = {
  block: T,
  update: UpdateFunction<Block>
  remove: () => void
}

function HeadingBlockEditor({ block, update, remove }: BlockEditorProps<HeadingBlock>): JSX.Element {
  return (
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>見出し</label>
      <input defaultValue={block.value.content} onBlur={(e) => {
        update({ id: block.id, mutation: (prev) => {
          if (prev.type === "heading") {
            return ({
              ...prev,
              value: {
                content: e.target.value
              }
            })
          } else {
            return prev
          }
        } })
      }}/>
      <button onClick={remove}>X</button>
    </div>
  )
}

function TextBlockEditor({ block, update, remove }: BlockEditorProps<TextBlock>): JSX.Element {
  return (
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>文章</label>
      <input defaultValue={block.value.content} onBlur={(e) => {
        update({
          id: block.id,
          mutation: (prev) => {
            if (prev.type === "text") {
              return ({
                ...prev,
                value: {
                  content: e.target.value,
                }
              })
            } else {
              return prev
            }
          }
        })
      }} />
      <button onClick={remove}>X</button>
    </div>
  )
}

function ImageBlockEditor({block, update, remove}: BlockEditorProps<ImageBlock>): JSX.Element {
  return (
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>画像</label>
      <input defaultValue={block.value.imageUrl} onBlur={(e) => {
        update({
          id: block.id,
          mutation: (prev) => {
            if (prev.type === "image") {
              return {
                ...prev,
                value: {
                  ...prev.value,
                  imageUrl: e.target.value
                }
              }
            } else {
              return prev
            }
          }
        })
      }} />
      <button onClick={remove}>X</button>
    </div>
  )
}

function TableBlockEditor({block, update, remove}: BlockEditorProps<TableBlock>): JSX.Element {
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
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>テーブル</label>
      <table>
        <tbody>
          {block.value.rows.map((row, i) => (
            <TableRowEditor key={i} row={row} update={rowUpdater(i)} />
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>追加</button>
      <button onClick={removeRow} >削除</button>
      <button onClick={remove}>X</button>
    </div>
  )
}

type TableRowEditorProps = {
  row: TableRow
  update: (mutation: (prev: TableRow) => TableRow) => void
}

function TableRowEditor({ row, update }: TableRowEditorProps): JSX.Element {
  return (
    <tr>
      <th>
        <input defaultValue={row.title} onBlur={e => {
          update(prev => ({
            ...prev,
            title: e.target.value
          }))
        }} />
      </th>
      <td>
        <input defaultValue={row.body} onBlur={e => {
          update(prev => ({
            ...prev,
            body: e.target.value
          }))
        }} />
      </td>
    </tr>
  )
}
