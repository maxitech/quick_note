import { Delta, Op } from 'quill/core'

export interface Notebook {
  id: string
  content:
    | {
        ops: Op[]
      }
    | Delta
}
