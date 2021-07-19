import { TextBlock } from "../../hooks/useBlockCollection"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"

export function TextBlockEditor({ block, update, remove }: BlockEditorProps<TextBlock>): JSX.Element {
  return (
    <BlockEditorWrapper
      label="文章"
      remove={remove}
    >
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
    </BlockEditorWrapper>
  )
}