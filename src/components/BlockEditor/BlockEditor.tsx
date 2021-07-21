/** @jsxImportSource @emotion/react */
import { CustomBlock } from "../../domain/CustomBlock"
import { BlockBase, UpdateBlockFunction } from "../../hooks/useBlock"
import { HeadingBlockEditor } from "./HeadingBlockEditor"
import { TextBlockEditor } from "./TextBlockEditor"
import { ImageBlockEditor } from "./ImageBlockEditor"
import { TableBlockEditor } from "./TableBlockEditor"

export type BlockEditorProps<Block extends BlockBase<any, any>> = {
  block: Block,
  update: UpdateBlockFunction<CustomBlock>
  remove: () => void
  moveUp: () => void
  moveDown: () => void
}

export type Props<Block extends BlockBase<any,any>> = {
  block: Block,
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

