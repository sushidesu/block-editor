/** @jsxImportSource @emotion/react */
import { CustomBlock, UpdateCustomBlock } from "../../App"
// import { UpdateFunction, Block } from "../../hooks/useBlockCollection"
import { HeadingBlockEditor } from "./HeadingBlockEditor"
import { TextBlockEditor } from "./TextBlockEditor"
import { ImageBlockEditor } from "./ImageBlockEditor"
import { TableBlockEditor } from "./TableBlockEditor"

export type BlockEditorProps<T extends CustomBlock> = {
  block: T,
  update: UpdateCustomBlock
  remove: () => void
  moveUp: () => void
  moveDown: () => void
}

export function BlockEditor({ block, ...rest }: BlockEditorProps<CustomBlock>): JSX.Element | null {
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

