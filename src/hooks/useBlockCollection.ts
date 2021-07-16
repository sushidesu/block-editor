import { useCallback, useState } from "react"
import { EntityHookProps  } from "./entity"

export type BlockTypes = "heading" | "text" | "image" | "table"

type BlockBase<T, U extends BlockTypes> = {
  id: string
  type: U
  value: T
}

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

export type Block =
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | TableBlock

type ReconstructProps = {
  blocks: Block[]
}

type UpdateFunction<T extends Block> = (props: { id: string, value: T["value"]}) => void

export interface BlockCollecion {
  blocks: Block[]
  addBlock: (type: BlockTypes) => void
  handleSubmit: (func: (blocks: Block[]) => void) => () => void
  update: UpdateFunction<Block>
}

export const useBlockCollection = (props: EntityHookProps<ReconstructProps>): BlockCollecion => {
  const [blocks, setBlocks] = useState<Block[]>(props.type === "create" ? [] : props.payload.blocks)

  const addBlock = useCallback((type: BlockTypes) => {
    switch(type) {
      case "heading":
        const headingBlock: HeadingBlock = {
          id: "",
          type: "heading",
          value: {
            content: ""
          }
        }
        setBlocks(prev => prev.concat(headingBlock))
        break
      case "text":
        const textBlock: TextBlock = {
          id: "",
          type: "text",
          value: {
            content: ""
          }
        }
        setBlocks(prev => prev.concat(textBlock))
        break
      case "image":
        const imageBlock: ImageBlock = {
          id: "",
          type: "image",
          value: {
            imageUrl: ""
          }
        }
        setBlocks(prev => prev.concat(imageBlock))
        break
      case "table":
        const tableBlock: TableBlock = {
          id: "",
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
        setBlocks(prev => prev.concat(tableBlock))
        break
      default:
        break;
    }
  }, [])

  const handleSubmit = (func: (values: Block[]) => void): () => void => {
    return () => {
      func(blocks)
    }
  }

  const update: UpdateFunction<Block> = ({ id, value}) => {
    setBlocks(prev => {
      const targetIndex = blocks.findIndex(b => b.id === id)
      if (targetIndex === -1) {
        return prev
      }
      //@ts-ignore
      prev[targetIndex] = {
        ...prev[targetIndex],
        value: value
      }
      return [...prev]
    })
  }

  return {
    blocks,
    addBlock,
    handleSubmit,
    update
  }
}
