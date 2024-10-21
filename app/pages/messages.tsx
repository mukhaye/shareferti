"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MessageList from "@/components/MessageList"

export default function Messages() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    if (session && selectedUser) {
      fetchMessages()
    }
  }, [session, selectedUser])

  const fetchMessages = async () => {
    const res = await fetch(`/api/messages?userId=${selectedUser.id}`)
    const data = await res.json()
    setMessages(data)
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newMessage,
        receiverId: selectedUser.id,
      }),
    })

    if (res.ok) {
      setNewMessage("")
      fetchMessages()
    }
  }

  if (!session) {
    return <div>Please sign in to access messages.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      {selectedUser ? (
        <>
          <h2 className="text-xl mb-4">Conversation with {selectedUser.name}</h2>
          <MessageList messages={messages} currentUserId={session.user.id} />
          <div className="mt-4 flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow mr-2"
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </>
      ) : (
        <p>Select a user to start messaging</p>
      )}
    </div>
  )
}
