import { Request, Response } from 'express'
import { Todo } from '../models/Todo'

export const all = async (req: Request, res: Response) => {
  const list = await Todo.findAll()
  res.status(200)
  res.json({ list })
}
export const add = async (req: Request, res: Response) => {
  if(req.body.title) {
    const task = Todo.build({
      title: req.body.title
    })
    await task.save()
    res.status(201).json({task})
  } else {
    res.json({ Error: 'Não foi possível adicionar nova task'})
  }
}
export const update = async () => {

}
export const remove = async () => {

}