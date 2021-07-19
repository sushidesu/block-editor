import { HeadingBlock } from "../../hooks/useBlockCollection"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"

export function HeadingBlockEditor({ block, update, remove }: BlockEditorProps<HeadingBlock>): JSX.Element {
  return (
    <BlockEditorWrapper
      label={"見出し"}
      remove={remove}
    >
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
    </BlockEditorWrapper>
  )
}
