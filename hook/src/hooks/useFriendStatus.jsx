import React, { useState, useEffect } from 'react'

function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null)

    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }

    useEffect(() => {
        // ChatAPI.subscribleToFriendStatus(friendID,handleStatusChange)

        return () => {
            // ChatAPI.unsubsribleFromFriendStatus(friendID,handleStatusChange)
        }
    })
    return isOnline
}

export default useFriendStatus
