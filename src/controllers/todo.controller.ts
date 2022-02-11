import { Request, Response } from 'express'
import { Todo } from '../models/Todo'

//will show all tasks
export const all = async (req: Request, res: Response) => {
  const list = await Todo.findAll()
  res.status(200) // to show OK
  res.json({ list })
}

//will add a new task
export const add = async (req: Request, res: Response) => {
  if(req.body.title) {
    const task = Todo.build({ //not required await
      title: req.body.title
    })
    await task.save()
    res.status(201).json({task}) // to show CREATED
  } else {
    res.json({error: 'could not add task'})
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
      //true,1 = false,0 - may appear in some apis
      //turns it into lowerCase so that define only those options
      //if none of the options is present, the current value of keeps
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
    res.json({error: 'Item not found :('})
  }
}
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  let task = await Todo.findByPk(id)
  if(task) {
    await task.destroy() //not required save() method
  }
  res.json({})
}