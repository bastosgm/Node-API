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
export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  let task = await Todo.findByPk(id)
  if(task) {
     
    if(req.body.title) {
      task.title = req.body.title
    }

    if(req.body.done) {
      //true,1 = false,0 opcional em apis
      //reduz a lowerCase para facilitar o switch
      //caso nao seja nenhuma das options, o valor atual de mantém
      switch(req.body.done.toLowerCase()) { 
      case 'true':
      case '1':
        task.done = true
        break
      case 'false':
      case '0':
        task.done = false
        break
      }
    }
     await task.save()
     res.json({task})
  } else {
    res.json({Error: 'Item not found :('})
  }
}
export const remove = async () => {

}