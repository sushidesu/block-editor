/** @jsxImportSource @emotion/react */
import "./App.css"
import { useBlockCollection, BlockBase, BlockCollection } from "./hooks/useBlock";
import { BlockEditor } from "./components/BlockEditor/BlockEditor"
import { css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid"

export type HeadingBlock = BlockBase<{ content: string }, "heading">
export type TextBlock = BlockBase<{ content: string }, "text">
export type ImageBlock = BlockBase<{ imageUrl: string }, "image">
export type TableBlock = BlockBase<{
  rows: TableRow[]
}, "table">

export type TableRow = {
  title: string
  body: string
}

export type CustomBlock =
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | TableBlock

export type UpdateCustomBlock = BlockCollection<CustomBlock>["updateBlock"]

function App() {
  const { blocks, addBlock, removeBlock, moveBlock, handleSubmit, updateBlock } = useBlockCollection<CustomBlock>({
    blockInitializer: (type) => {
      switch (type) {
        case "heading":
          const headingBlock: HeadingBlock = {
            id: uuidv4(),
            type: "heading",
            value: {
              content: ""
            }
          }
          return headingBlock
        case "text":
          const textBlock: TextBlock = {
            id: uuidv4(),
            type: "text",
            value: {
              content: ""
            }
          }
          return textBlock
        case "image":
          const imageBlock: ImageBlock = {
            id: uuidv4(),
            type: "image",
            value: {
              imageUrl: ""
            }
          }
          return imageBlock
        case "table":
          const tableBlock: TableBlock = {
            id: uuidv4(),
            type: "table",
            value: {
              rows: [
                {
                  title: "",
                  body: ""
                }
              ]
            }
          }
          return tableBlock
        default:
          throw Error("invalid type")
      }
    }
  })

  return (
    <div css={css`
      max-width: 600px;
      margin: 0 auto;
    `}>
      <h1>Editor</h1>
      <div css={css`
        & > * + * {
          margin-top: 1em;
        }
      `}>
        {blocks.map((block) => (
          <BlockEditor
            key={block.id}
            block={block}
            update={updateBlock}
            remove={() => {
              removeBlock({ id: block.id })
            }}
            moveUp={() => {
              moveBlock({
                id: block.id,
                type: "relative",
                offset: -1
              })
            }}
            moveDown={() => {
              moveBlock({
                id: block.id,
                type: "relative",
                offset: 1
              })
            }}
          />
        ))}
      </div>
      <div css={css`
        margin-top: 2em;
      `}>
        <button onClick={() => addBlock({ type: "heading" })}>見出しを追加</button>
        <button onClick={() => addBlock({ type: "text" })}>文章を追加</button>
        <button onClick={() => addBlock({ type: "image" })}>画像を追加</button>
        <button onClick={() => addBlock({ type: "table" })}>テーブルを追加</button>
      </div>
      <div css={css`
        margin-top: 2em;
      `}>
        <button onClick={handleSubmit(blocks => {
          console.log(blocks)
        })}>OK</button>
      </div>
    </div>
  );
}

export default App;
