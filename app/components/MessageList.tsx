export default function MessageList({ messages, currentUserId }) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 rounded ${
            message.senderId === currentUserId ? "bg-blue-100 ml-auto" : "bg-gray-100"
          }`}
          style={{ maxWidth: "70%" }}
        >
          <p>{message.content}</p>
          <small className="text-gray-500">
            {new Date(message.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )
}
