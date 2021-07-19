/** @jsxImportSource @emotion/react */
import "./App.css"
import { useBlockCollection } from './hooks/useBlockCollection';
import { BlockEditor } from "./components/BlockEditor/BlockEditor"
import { css } from "@emotion/react";

function App() {
  const { blocks, addBlock, removeBlock, moveBlock, handleSubmit, update } = useBlockCollection({ type: "reconstruct", payload: {
    blocks: [
      {
        id: "test",
        type: "heading",
        value: {
          content: "こんにちｘ"
        }
      },
      {
        id: "ohge",
        type: "text",
        value: {
          content: "本日はお日柄もよく!"
        }
      }
    ]
  } })

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
            update={update}
            remove={() => {
              removeBlock(block.id)
            }}
            moveUp={() => {
              moveBlock({
                id: block.id,
                type: "relative",
                index: -1
              })
            }}
            moveDown={() => {
              moveBlock({
                id: block.id,
                type: "relative",
                index: 1
              })
            }}
          />
        ))}
      </div>
      <div css={css`
        margin-top: 2em;
      `}>
        <button onClick={() => addBlock("heading")}>見出しを追加</button>
        <button onClick={() => addBlock("text")}>文章を追加</button>
        <button onClick={() => addBlock("image")}>画像を追加</button>
        <button onClick={() => addBlock("table")}>テーブルを追加</button>
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
