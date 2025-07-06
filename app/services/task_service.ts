import Project from '#models/project'
import TeamMember from '#models/team_member'
import Task from '#models/task'
import ApiResponse from '#models/utils/ApiResponse'
import crypto from 'node:crypto'
import File from '#models/file'


export default class TaskService {
  public async create(projectId: string, data: any) {
    const { assigneeId, attachements, ...taskData } = data

    const project = await Project.findBy('slug', projectId)
    if (!project) {
      return ApiResponse.notFound('Project not found')
    }

    // Vérification facultative de l'assignee
    if (assigneeId) {
      const projectMember = await TeamMember.find(assigneeId)
      if (!projectMember || projectMember.projectId !== project.id) {
        return ApiResponse.error("The assignee doesn't have access to this project")
      }
      taskData.assigneeId = assigneeId
    }

    const task = await Task.create({
      slug: crypto.randomUUID(),
      ...taskData,
      projectId: project.id,
    })

    console.log(attachements);

    if (Array.isArray(attachements) && attachements.length > 0) {
      const createdFiles = await Promise.all(
        attachements.map(attachement => File.create(attachement))
      )

      const fileIds = createdFiles.map(f => f.id)

      await task.related('attachments').attach(fileIds)
      await task.load('attachments')
    }

    return ApiResponse.success('Task created successfully', task)
  }


  public async update(taskSlug: string, data: any) {
    const { assigneeId,attachements, ...taskData } = data

    const task = await Task.findBy('slug', taskSlug)
    if (!task) {
      return ApiResponse.notFound('Task not found')
    }

    // Si assigneeId est fourni, on vérifie qu’il appartient bien au projet
    if (assigneeId) {
      const projectMember = await TeamMember.find(assigneeId)
      if (!projectMember || projectMember.projectId !== task.projectId) {
        return ApiResponse.error("The assignee doesn't have access to this project")
      }

      taskData.assigneeId = assigneeId
    }

    task.merge(taskData)
    await task.save()

     if (Array.isArray(attachements) && attachements.length > 0) {
      const createdFiles = await Promise.all(
        attachements.map(attachement => File.create(attachement))
      )

      const fileIds = createdFiles.map(f => f.id)

      await task.related('attachments').attach(fileIds)
      await task.load('attachments')
    }

    return ApiResponse.success('Task updated successfully', task)
  }


  public async getAllProjectTask(projectId: number) {

    const project = await Project.findBy('slug', projectId)

    if (!project) {
      return ApiResponse.notFound('Project not found')
    }

    const tasks = await Task.query().where('project_id', project.id)
      .preload('project')
      .preload('assignee')
      .preload('step')

    return ApiResponse.success('List of tasks', tasks)
  }

  public async delete(taskSlug: string) {
    const task = await Task.findBy('slug', taskSlug)
    if (!task) {
      return ApiResponse.notFound('Task not found')
    }

    await task.delete()
    return ApiResponse.success('Task deleted successfully')
  }

  public async getTaskDetails(taskSlug: string) {
    const task = await Task.findBy('slug', taskSlug)
    if (!task) {
      return ApiResponse.notFound('Task not found')
    }

    await task.load('step')
    await task.load('assignee')
    await task.load('project')

    return ApiResponse.success('Success', task)
  }
}
