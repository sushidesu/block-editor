import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { EntityHookProps  } from "./entity"
import { removeElementFromArray } from "../utils/removeElementFromArray"

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

export type UpdateFunction<T> = (props: {
  id: string
  mutation: (prev: T) => T
}) => void

export interface BlockCollecion {
  blocks: Block[]
  addBlock: (type: BlockTypes) => void
  removeBlock: (id: string) => void
  handleSubmit: (func: (blocks: Block[]) => void) => () => void
  update: UpdateFunction<Block>
}

export const useBlockCollection = (props: EntityHookProps<ReconstructProps>): BlockCollecion => {
  const [blocks, setBlocks] = useState<Block[]>(props.type === "create" ? [] : props.payload.blocks)

  const addBlock = useCallback((type: BlockTypes) => {
    switch(type) {
      case "heading":
        const headingBlock: HeadingBlock = {
          id: uuidv4(),
          type: "heading",
          value: {
            content: ""
          }
        }
        setBlocks(prev => prev.concat(headingBlock))
        break
      case "text":
        const textBlock: TextBlock = {
          id: uuidv4(),
          type: "text",
          value: {
            content: ""
          }
        }
        setBlocks(prev => prev.concat(textBlock))
        break
      case "image":
        const imageBlock: ImageBlock = {
          id: uuidv4(),
          type: "image",
          value: {
            imageUrl: ""
          }
        }
        setBlocks(prev => prev.concat(imageBlock))
        break
      case "table":
        const tableBlock: TableBlock = {
          id: uuidv4(),
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

  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const targetIndex = prev.findIndex(block => block.id === id)
      if (targetIndex === -1) {
        return prev
      }
      return removeElementFromArray(prev, targetIndex)
    })
  }, [])

  const handleSubmit = (func: (values: Block[]) => void): () => void => {
    return () => {
      func(blocks)
    }
  }

  const update: UpdateFunction<Block> = ({ id, mutation }) => {
    setBlocks(prev => {
      const targetIndex = prev.findIndex(b => b.id === id)
      if (targetIndex === -1) {
        return prev
      }
      const target = prev[targetIndex]
      const newBlock = mutation(target)
      const newBlocks = [...prev]
      newBlocks[targetIndex] = {
        ...newBlock
      }
      return newBlocks
    })
  }

  return {
    blocks,
    addBlock,
    removeBlock,
    handleSubmit,
    update
  }
}
