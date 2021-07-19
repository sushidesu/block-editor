import { ImageBlock } from "../../hooks/useBlockCollection"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"

export function ImageBlockEditor({block, update, remove}: BlockEditorProps<ImageBlock>): JSX.Element {
  return (
    <BlockEditorWrapper
      label={"画像"}
      remove={remove}
    >
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
    </BlockEditorWrapper>
  )
}
