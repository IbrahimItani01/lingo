import { auth } from "@clerk/nextjs/server"

const allowedIds = [
    "user_2kyLjkFlg6P3UJPHezDITMLzacE",
]


export const isAdmin = ()=>{
    const {userId} = auth();

    if (!userId){
        return false;
    }

    return allowedIds.indexOf(userId) !== -1;
}