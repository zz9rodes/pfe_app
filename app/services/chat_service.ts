import Account from "#models/account";
import Chat from "#models/chat";
import ChatMember from "#models/chat_member";
import ApiResponse from "#models/utils/ApiResponse";
import { ChatType } from "#models/utils/index";
import { log } from "console";

export class ChatService {
  async create(data: any) {
    const chat = await Chat.create(data)
    return ApiResponse.success("Success", chat)
  }

  async delete(chatId: number) {
    console.log("dans le service");
    
    const chat = await Chat.find(chatId)

    if (!chat) {
      return ApiResponse.notFound("Chat Not Found")
    }

    await chat.delete()

    return ApiResponse.success("Chat Delete Successfully")
  }

  public async createChatMember(data: any) {
    const { chatId, memberIds } = data

    const chat = await Chat.find(chatId)
    if (!chat) {
      return ApiResponse.notFound('Chat not found')
    }

    if (chat.type === ChatType.PRIVATE) {
      const currentCount = await chat.related('members').query().count('* as total')
      const total = Number(currentCount[0].$extras.total || 0)

      if ((total + memberIds.length) > 2) {
        return ApiResponse.error('A private chat cannot have more than two members')
      }
    }

    const existingMembers = await chat.related('members').query().select('member_id')
    const existingIds = existingMembers.map((m) => m.memberId)

    const newMembers = memberIds.filter((id: number) => !existingIds.includes(id))

    if (newMembers.length === 0) {
      return ApiResponse.error('All provided members are already in the chat')
    }

    const membersToInsert = newMembers.map((id: number) => ({
      chatId: chat.id,
      memberId: id,
    }))

    console.log(memberIds);
    

    await ChatMember.createMany(membersToInsert)

    return ApiResponse.success('Members added successfully', {
      addedCount: newMembers.length,
      memberIds: newMembers,
    })
  }

  async deleteMember(memberId: number) {

    const member = await ChatMember.find(memberId)

    if (!member) {
      return ApiResponse.notFound("member Not Found")
    }

    await member.delete()
    return ApiResponse.success("member Delete Successfully")
  }

  
  public async getChatsByAccount(accountId: number) {
  const chats = await Chat.query()
    .whereHas('members', (query) => {
      query.where('member_id', accountId)
    })
    // .preload('members', (query) => {
    //   query.preload('account') 
    // })
    // .preload('lastMessage') 
    // .orderBy('updated_at', 'desc') 

    console.log("les chats");
    console.log(chats);
    
    

  return ApiResponse.success('Chats fetched successfully', chats)
}

}