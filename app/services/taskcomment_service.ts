import TaskComment from '#models/task_comment'
import Task from '#models/task'
import ApiResponse from '#models/utils/ApiResponse'

export default class TaskCommentService {
  public async create(data: any) {
    
    const {authorId}=data

    const task = await Task.find(data.taskId)
    if (!task) {
      return ApiResponse.notFound('Task not found')
    }

    const comment = await TaskComment.create({
      text: data.text,
      taskId: task.id,
      authorId,
    })

    return ApiResponse.success('Comment added successfully', comment)
  }

  public async getAllByTask(taskId: number) {
       const task = await Task.findBy('slug',taskId)
    if (!task) {
      return ApiResponse.notFound('Task not found')
    }

    await task.load('comments',(query)=>{
      query.preload('author').orderBy('created_at', 'asc')
    })

      return ApiResponse.success("Success",task)
  }

  public async delete(commentId: number) {
    const comment = await TaskComment.find(commentId)
    if (!comment) return ApiResponse.notFound('Comment not found')


    await comment.delete()
    return ApiResponse.success('Comment deleted')
  }
}
