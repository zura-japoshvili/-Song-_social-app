export interface conversationInt {
    conversationId: string,
    user: {
        _id: string,
        username: string,
        firstName: string,
        lastName: string
        email: string,
        password: string,
        profilePicture: string,
        coverPicture: string,
        followers: [],
        followings: [],
        isAdmin: boolean
    }
}