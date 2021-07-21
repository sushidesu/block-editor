import { ImageBlock } from "../../domain/CustomBlock"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"

export function ImageBlockEditor({block, update, ...rest}: BlockEditorProps<ImageBlock>): JSX.Element {
  return (
    <BlockEditorWrapper
      label={"画像"}
      {...rest}
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
