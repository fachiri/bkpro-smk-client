const Chat = ({ chats, userId }) => {
  return (
    <>
      {chats.map((chat, idx) => (
        chat.userId === userId ? (
          <div className="chat chat-end" key={idx}>
            <div className="chat-header">
              <time className="text-xs opacity-50 ms-2">12:46</time>
            </div>
            <div className="chat-bubble chat-bubble-accent">{chat.chat}</div>
          </div>
        ) : (
          <div className="chat chat-start" key={idx}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/avatar-placeholder.webp" alt="Avatar" />
              </div>
            </div>
            <div className="chat-header">
              {chat.user.name}
              <time className="text-xs opacity-50 ms-2">12:45</time>
            </div>
            <div className="chat-bubble bg-slate-200 text-accent-content">{chat.chat}</div>
          </div>
        )
      ))}
    </>
  )
}

export default Chat