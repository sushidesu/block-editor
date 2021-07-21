import { HeadingBlock } from "../../domain/CustomBlock"
import { BlockEditorProps } from "./BlockEditor"
import { BlockEditorWrapper } from "./BlockEditorWrapper"

export function HeadingBlockEditor({ block, update, ...rest }: BlockEditorProps<HeadingBlock>): JSX.Element {
  return (
    <BlockEditorWrapper
      label={"見出し"}
      {...rest}
    >
      <input defaultValue={block.value.content} onBlur={(e) => {
        update({
          id: block.id,
          mutation: (prev) => {
            return {
              ...prev,
              content: e.target.value
            }
          }
        })
      }}/>
    </BlockEditorWrapper>
  )
}
