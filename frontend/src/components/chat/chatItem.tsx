import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
        wordBreak: "break-word",
       
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.jpg" alt="openai" width={"60px"} />
      </Avatar>
      <Box sx={{ width: "100%", maxWidth: "100%",overflow: "hidden"   }}>
        {!messageBlocks && (
          <Typography
            sx={{
              fontSize: "20px",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              width: "100%",
              whiteSpace: "pre-wrap",   // <-- Add this
             overflow: "hidden", 
            }}
          >
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, idx) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={idx}
                style={coldarkDark}
                language="javascript"
                customStyle={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  margin: 0,
                  padding: "12px",
                  borderRadius: "8px",
                  overflowX: "auto", 
                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={idx}
                sx={{
                  fontSize: "20px",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%",
                  whiteSpace: "pre-wrap",   // <-- Add this
                  overflow: "hidden", 
                }}
              >
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
        wordBreak: "break-word",
       
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1]?.[0]}
      </Avatar>
      <Box sx={{ width: "100%", maxWidth: "100%",overflow: "hidden"  }}>
        {!messageBlocks && (
          <Typography
            sx={{
              fontSize: "20px",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              width: "100%",
              whiteSpace: "pre-wrap",   // <-- Add this
             overflow: "hidden", 
            }}
          >
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, idx) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={idx}
                style={coldarkDark}
                language="javascript"
                customStyle={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  margin: 0,
                  padding: "12px",
                  borderRadius: "8px",
                  overflowX: "auto", 
                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={idx}
                sx={{
                  fontSize: "20px",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%",
                  whiteSpace: "pre-wrap",   // <-- Add this
                  overflow: "hidden", 
                }}
              >
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;