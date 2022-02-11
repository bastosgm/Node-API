import { Request, Response } from 'express'
import { Todo } from '../models/Todo'

export const all = async (req: Request, res: Response) => {
  const list = await Todo.findAll()
  res.status(200)
  res.json({ list })
}
export const add = async (req: Request, res: Response) => {
  
}
export const update = async () => {

}
export const remove = async () => {

}