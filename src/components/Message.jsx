import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// La respuesta del bot es un mensaje markdown por lo que se necesita un componente que lo renderice correctamente.

const Message = ({ text, sender }) => {
  const isUser = sender === "user";
  const [think, replaceText] = text.split("</think>");
  console.log("think", think);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {isUser ? (
        <div className="max-w-[70%] p-3 rounded-lg bg-blue-500 text-white">
          {text}
        </div>
      ) : (
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg w-fit prose-sm overflow-auto">
          <ReactMarkdown
            components={{
              // eslint-disable-next-line
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={a11yDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="md-post-code" {...props}>
                    {children}
                  </code>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          >
            {replaceText}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Message;
