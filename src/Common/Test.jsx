import React from 'react'
import { useSocket } from '../config/SocketContext'

export const Test = () => {
    
    const socket=useSocket()
    
    const handleSendMessage=()=>{
        const payload={
           adminId:"6639f856566f0534b415e88f",
           data:"printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into" ,
           userId:"663a0472566f0534b415e89d"
        }
        socket.emit("newOrder",payload)
    }

  return (
    <div>


      <button onClick={handleSendMessage} className='text-white bg-black'>Test Socket</button>  
    </div>
  )
}
