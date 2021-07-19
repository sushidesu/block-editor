/** @jsxImportSource @emotion/react */
import { UpdateFunction, Block } from "../../hooks/useBlockCollection"
import { HeadingBlockEditor } from "./HeadingBlockEditor"
import { TextBlockEditor } from "./TextBlockEditor"
import { ImageBlockEditor } from "./ImageBlockEditor"
import { TableBlockEditor } from "./TableBlockEditor"

export type BlockEditorProps<T extends Block> = {
  block: T,
  update: UpdateFunction<Block>
  remove: () => void
  moveUp: () => void
  moveDown: () => void
}

export function BlockEditor({ block, ...rest }: BlockEditorProps<Block>): JSX.Element | null {
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

