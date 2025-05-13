import File from "#models/file"
import ApiResponse from "#models/utils/ApiResponse"

export class FileService {
  // Your code here

  async create(data: any) {

    const file = await File.create(data)
    console.log(file);
    
    return ApiResponse.success("Success",file)
  }

  async delete(fileId: string) {

    const file = await File.find(fileId)
    console.log("dans le service");
    
    console.log(file)
    if (!file) {
      return ApiResponse.notFound("Ressource Not Found")
    }

    await file.delete()
    return ApiResponse.success("Success", "Files deleted successfully")
  }
}