import Company from "#models/company"
import Post from "#models/post"
import ApiResponse from "#models/utils/ApiResponse"
import File from "#models/file"
import Account from "#models/account"
import Like from "#models/like"
import Comment from "#models/comment"

export class PostService {
  // Your code here


  async create(companyId:string,data: any) {
    const {  files,...postData } = data

    const company=await Company.findBy('slug',companyId)

    if(!company){
      return ApiResponse.notFound("Ressrouce Not Found")
    }

  
    try {
      const post = await Post.create({
        ...postData,
        slug: crypto.randomUUID(),
      })
  
      if (Array.isArray(files) && files.length > 0) {
        const createdFiles = await Promise.all(
          files.map(file => File.create(file))
        )
  
        const fileIds = createdFiles.map(f => f.id)
  
        await post.related('files').attach(fileIds)
      }
      await post.related('company').associate(company)

  
      await post.load('files')
  
      return ApiResponse.success("Post created successfully", post)
    } catch (error) {
      console.error(error)
      return ApiResponse.error("Failed to create post", error)
    }
  }
  

  async editPost(postId: string, data: any) {

    const {  files,...postData } = data

    const post=await Post.findBy('slug',postId)

    if(!post){
      return ApiResponse.notFound("Ressrouce Not Found")
    }

  
    try {
       await post.merge(postData).save()
  
      if (Array.isArray(files) && files.length > 0) {
        const createdFiles = await Promise.all(
          files.map(file => File.create(file))
        )
  
        const fileIds = createdFiles.map(f => f.id)
  
        await post.related('files').attach(fileIds)
      }
  
      await post.load('files')
  
      return ApiResponse.success("successfully", post)
    } catch (error) {
      console.error(error)
      return ApiResponse.error("Failed to update post", error)
    }

  }

  async delete(postId: string) {

    const post = await Post.findBy("slug", postId)
    if (!post) {
      return ApiResponse.notFound("ressource Not found")
    }

    try {

      await  post.delete()

      return ApiResponse.success("Success")
    } catch (error) {
      return ApiResponse.error(error)
    }

  }

  async getPostDetails(postId: string) {

    const post = await Post.findBy('slug', postId)

    if (!post) {
      return ApiResponse.notFound("Ressource Not Found")
    }

    return ApiResponse.success("Success", post)
  }

  async getAllCompaniesPost(company: Company) {

    await   company.load('posts')

    const {posts,activeDetails}=company


    return ApiResponse.success("Success", {posts,activeDetails})
  }

  async commentPost(data:any){

    const {accountId,postId}=data
    const account= await Account.find(accountId)

    const post = await Post.find(postId)

    if(!account || !post){
      return ApiResponse.badRequest("badRequest , User cannot Comment")
    }

    const comment=new Comment()

    comment.text=data.text


    await comment.related('account').associate(account)

    await comment.related('post').associate(post)

    return ApiResponse.success("Success")

  }

  async likePost(data:any){

    const {accountId,postId}=data
    const account= await Account.find(accountId)

    const post = await Post.find(postId)

    if(!account || !post){
      return ApiResponse.badRequest("badRequest")
    }

    const like=new Like()

    await like.related('account').associate(account)

    await like.related('post').associate(post)

    return ApiResponse.success("Success")

  }


  async unLikePost(data:any){

    const {accountId,postId}=data

    const like = await Like.query().where('account_id',accountId).andWhere('post_id',postId).first()

    if(!like){
        return ApiResponse.badRequest('badRequest')
    }

    await like.delete()

    return ApiResponse.success("Success")
  }
}

