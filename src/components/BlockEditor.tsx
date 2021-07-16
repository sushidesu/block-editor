/** @jsxImportSource @emotion/react */
import { useCallback, useState } from "react"
import { css } from "@emotion/react"
import { Block, HeadingBlock, ImageBlock, TableBlock, TableRow, TextBlock } from "../hooks/useBlockCollection"

export type Props = {
  block: Block
}

export function BlockEditor({ block }: Props): JSX.Element | null {
  switch(block.type) {
    case "heading":
      return <HeadingBlockEditor {...block} />
    case "text":
      return <TextBlockEditor {...block} />
    case "image":
      return <ImageBlockEditor {...block} />
    case "table":
      return <TableBlockEditor {...block} />
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

function HeadingBlockEditor(block: HeadingBlock): JSX.Element {
  const [content, setContent] = useState<string>(block.value.content)
  return (
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>見出し</label>
      <input value={content} onChange={e => {
        setContent(e.target.value)
      }} />
    </div>
  )
}

function TextBlockEditor(block: TextBlock): JSX.Element {
  const [content, setContent] = useState<string>(block.value.content)
  return (
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>文章</label>
      <input value={content} onChange={e => {
        setContent(e.target.value)
      }} />
    </div>
  )
}

function ImageBlockEditor(block: ImageBlock): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>(block.value.imageUrl)
  return (
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>画像</label>
      <input value={imageUrl} onChange={e => {
        setImageUrl(e.target.value)
      }} />
    </div>
  )
}

function TableBlockEditor(block: TableBlock): JSX.Element {
  const [rows, setRows] = useState<TableRow[]>(block.value.rows)
  const addRow = useCallback(() => {
    setRows(prev => prev.concat({ title: "", body: "" }))
  }, [])
  return (
    <div css={blockWrapperStyle}>
      <label css={labelStyle}>テーブル</label>
      <table>
        <tbody>
          {rows.map((row, i) => (
            <TableRowEditor key={i} {...row} />
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>追加</button>
    </div>
  )
}

function TableRowEditor({ title, body }: TableRow): JSX.Element {
  const [row, setRow] = useState<TableRow>({ title, body })

  return (
    <tr>
      <th>
        <input value={row.title} onChange={e => {
          setRow(prev => ({
            ...prev,
            title: e.target.value
          }))
        }} />
      </th>
      <td>
        <input value={row.body} onChange={e => {
          setRow(prev => ({
            ...prev,
            body: e.target.value
          }))
        }} />
      </td>
    </tr>
  )
}
