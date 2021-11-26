import React, { useState, useEffect } from 'react'
import useFriendStatus from './useFriendStatus'

function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friendID)

    useEffect(() => {
        // 订阅及取消订阅好友状态 伪代码
        // ChatAPI.subscribeToFriendStatus(props.friend.id,handleStatusChange)
        // return ()=>{
        // 	ChatAPI.unsubscribeFromFriendStatus(props.friend.id,handleStatusChange)
        // }
    })
    // 初始状态为 null ，比只用布尔值多一种状态
    if (isOnline === null) {
        return 'Loading...'
    }
    return isOnline ? 'online' : 'offline'
}

export default FriendStatus
