import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';
import { useApp } from '../../context/AppContext';
import { Search, Send, ArrowLeft, MessageSquare } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { conversations, currentUser, sendMessage } = useApp();
  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConvId);

  const filteredConversations = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;
    sendMessage(activeConvId, inputText.trim());
    setInputText('');
  };

  return (
    <AppLayout showRightSidebar={false} maxWidth="full">
      <div className="h-[calc(100vh-8.5rem)] min-h-[520px] bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg overflow-hidden flex shadow-2xs">
        {/* Left column: Conversation list */}
        <div
          className={`w-full md:w-80 border-r border-[#E9E6E0] dark:border-[#272E3B] flex flex-col ${
            showMobileChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header & Search */}
          <div className="p-4 border-b border-[#E9E6E0] dark:border-[#272E3B] space-y-3">
            <h2 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] flex items-center gap-2">
              <span>Direct Dialogues</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
            </h2>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-[#77736E] dark:text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FFFFFF] dark:bg-[#111620] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Conversation rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E9E6E0] dark:divide-[#272E3B]">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#77736E] dark:text-[#9CA3AF]">
                No dialogues match your search.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = conv.id === activeConvId;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => {
                      setActiveConvId(conv.id);
                      setShowMobileChat(true);
                    }}
                    className={`w-full text-left p-4 transition-colors flex items-start gap-3 ${
                      isActive
                        ? 'bg-[#EFF6FF] dark:bg-[#1E293B]/60 border-l-2 border-[#2563EB]'
                        : 'hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]'
                    }`}
                  >
                    <AuthorAvatar
                      name={conv.participant.name}
                      avatar={conv.participant.avatar}
                      size="md"
                      clickable={false}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-semibold text-[#191919] dark:text-[#F3F4F6] truncate">
                          {conv.participant.name}
                        </span>
                        <span className="text-[10px] text-[#77736E] dark:text-[#9CA3AF] shrink-0">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-[#EAB308] shrink-0 self-center" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Active conversation thread */}
        <div
          className={`flex-1 flex flex-col bg-[#FFFFFF] dark:bg-[#151A24] ${
            !showMobileChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#E9E6E0] dark:border-[#272E3B] flex items-center justify-between bg-[#FFFFFF] dark:bg-[#151A24]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden text-[#77736E] hover:text-[#191919] dark:hover:text-white p-1"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <AuthorAvatar
                    name={activeConversation.participant.name}
                    avatar={activeConversation.participant.avatar}
                    username={activeConversation.participant.username}
                    size="sm"
                  />
                  <div>
                    <h3 className="font-semibold text-xs text-[#191919] dark:text-[#F3F4F6] leading-tight">
                      {activeConversation.participant.name}
                    </h3>
                    <p className="text-[10px] text-[#77736E] dark:text-[#9CA3AF]">
                      @{activeConversation.participant.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF9F6] dark:bg-[#0E121A]">
                <div className="text-center my-2">
                  <span className="text-[11px] text-[#77736E] dark:text-[#9CA3AF] bg-[#F1EFEA] dark:bg-[#1E2430] px-2.5 py-1 rounded">
                    End-to-end writer correspondence
                  </span>
                </div>

                {activeConversation.messages.map((msg) => {
                  const isMine = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2.5 rounded-lg text-xs sm:text-sm leading-relaxed ${
                          isMine
                            ? 'bg-[#2563EB] text-white rounded-br-none'
                            : 'bg-[#FFFFFF] dark:bg-[#1E2430] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#2D3546] rounded-bl-none shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-[#77736E] dark:text-[#9CA3AF] mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Message Composer */}
              <form
                onSubmit={handleSend}
                className="p-3 bg-[#FFFFFF] dark:bg-[#151A24] border-t border-[#E9E6E0] dark:border-[#272E3B] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Write a thoughtful reply to ${activeConversation.participant.name}...`}
                  className="flex-1 px-4 py-2 text-xs sm:text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs uppercase tracking-wider font-medium disabled:opacity-40 transition-colors inline-flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#77736E] dark:text-[#9CA3AF]">
              <MessageSquare size={40} className="mb-2 text-[#E9E6E0] dark:text-[#272E3B]" />
              <p className="text-sm font-serif-display text-[#191919] dark:text-[#F3F4F6]">
                Select a conversation
              </p>
              <p className="text-xs">
                Exchange private reflections with fellow writers.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
