# SynapseAI
# 02_USER_FLOW.md

**Version:** 1.0.0

**Project:** SynapseAI

**Document Type:** User Flow

**Platform:** React Native CLI

---

# 1. Purpose

This document defines every user interaction inside the SynapseAI application.

It explains how a user navigates through the application and how every major feature behaves.

This document does not describe implementation details.

---

# 2. Primary User Journey

```
Open App
      │
      ▼
Splash Screen
      │
      ▼
Chat Screen
      │
      ▼
User Sends Message
      │
      ▼
AI Typing
      │
      ▼
Streaming Response
      │
      ▼
Conversation Continues
```

---

# 3. Application Entry Flow

```
Launch App
      │
      ▼
Load Assets
      │
      ▼
Initialize Theme
      │
      ▼
Load Mock Conversation
      │
      ▼
Open Chat Screen
```

Future

```
Launch App
      │
      ▼
Authentication
      │
      ▼
Load Conversations
      │
      ▼
Open Last Chat
```

---

# 4. Chat Flow

```
User Opens Chat

↓

Conversation Loaded

↓

Scroll to Bottom

↓

User Types Message

↓

Press Send

↓

Message Appears Instantly

↓

AI Typing Indicator

↓

Streaming Response

↓

Response Completed
```

---

# 5. Text Message Flow

```
Tap Input

↓

Keyboard Opens

↓

Type Message

↓

Send Button Enabled

↓

Tap Send

↓

Clear Input

↓

Insert User Bubble

↓

Show Typing

↓

Show AI Response
```

---

# 6. Attachment Flow

```
Tap +

↓

Attachment Bottom Sheet

↓

Choose Attachment

↓

Open Picker

↓

Select File

↓

Preview Screen

↓

Optional Caption

↓

Send

↓

Uploading

↓

Completed

↓

Message Appears
```

---

# 7. Camera Flow (Future)

```
Tap +

↓

Camera

↓

Capture Image

↓

Preview

↓

Caption

↓

Send
```

---

# 8. Gallery Flow

```
Tap +

↓

Gallery

↓

Select Image(s)

↓

Preview

↓

Caption

↓

Send
```

---

# 9. Video Flow

```
Tap +

↓

Video Picker

↓

Choose Video

↓

Preview

↓

Caption

↓

Send
```

---

# 10. Document Flow

```
Tap +

↓

Document Picker

↓

Select Document

↓

Preview

↓

Caption

↓

Send
```

Supported

- PDF
- DOC
- DOCX
- PPT
- XLS
- TXT
- ZIP

---

# 11. Image Preview Flow

```
Image Selected

↓

Open Preview

↓

Zoom

↓

Add Caption

↓

Send

↓

Return to Chat
```

---

# 12. Video Preview Flow

```
Video Selected

↓

Generate Thumbnail

↓

Show Duration

↓

Caption

↓

Send
```

---

# 13. Document Preview Flow

```
Document Selected

↓

Show

Icon

Name

Size

Extension

↓

Caption

↓

Send
```

---

# 14. AI Response Flow

Frontend Simulation

```
User Message

↓

Typing Animation

↓

Streaming Begins

↓

Words Appear

↓

Message Completed
```

Future

```
User Message

↓

API Request

↓

AI Response

↓

Stream Tokens

↓

Completed
```

---

# 15. Typing Flow

```
AI Starts Thinking

↓

Typing Indicator

↓

Streaming Starts

↓

Typing Ends
```

---

# 16. Streaming Flow

Example

```
H

↓

He

↓

Hel

↓

Hello

↓

Hello,

↓

Hello, how

↓

Hello, how can I help you?
```

---

# 17. Long Press Flow

```
Long Press Message

↓

Bottom Sheet

↓

Copy

Delete

Retry
```

Future

```
Forward

Pin

React

Edit

Star
```

---

# 18. Copy Message Flow

```
Long Press

↓

Copy

↓

Clipboard Updated

↓

Toast

"Copied"
```

---

# 19. Delete Message Flow

```
Long Press

↓

Delete

↓

Confirmation

↓

Remove Message
```

---

# 20. Retry Flow

```
Upload Failed

↓

Retry Button

↓

Uploading

↓

Success
```

---

# 21. Upload Flow

```
Preparing

↓

Uploading

↓

Processing

↓

Completed
```

Future

```
Queued

↓

Uploading

↓

Virus Scan

↓

Cloud Sync

↓

Completed
```

---

# 22. Auto Scroll Flow

```
New Message

↓

Check User Position

↓

If Bottom

↓

Auto Scroll

Else

↓

Show

"New Messages"
```

---

# 23. Keyboard Flow

```
Tap Input

↓

Keyboard Opens

↓

Composer Moves

↓

User Types

↓

Keyboard Closes

↓

Composer Returns
```

---

# 24. Empty Chat Flow

```
Open Chat

↓

No Messages

↓

Show Welcome Card

↓

Example Prompts

↓

User Starts Chatting
```

---

# 25. Error Flow

Unsupported File

```
Select File

↓

Validate

↓

Unsupported

↓

Show Error
```

Large File

```
Select File

↓

Too Large

↓

Show Warning
```

Upload Failed

```
Uploading

↓

Failure

↓

Retry
```

---

# 26. Loading Flow

```
Open Screen

↓

Skeleton Loader

↓

Conversation Loaded

↓

Hide Loader
```

---

# 27. Future Chat History Flow

```
Open App

↓

History

↓

Select Chat

↓

Load Conversation

↓

Continue Chat
```

---

# 28. Future Settings Flow

```
Settings

↓

Theme

↓

Notifications

↓

Language

↓

About
```

---

# 29. Future Voice Flow

```
Hold Mic

↓

Recording

↓

Release

↓

Preview

↓

Send
```

---

# 30. Future Image Generation Flow

```
User Prompt

↓

Generate Image

↓

Loading

↓

Image Appears

↓

Download

↓

Share
```

---

# 31. User Flow Principles

The application should always follow these principles.

- Every interaction should require the minimum number of taps.
- Messages should appear instantly.
- Users should always receive visual feedback.
- Animations should feel smooth and purposeful.
- No action should block the interface.
- Navigation should always be predictable.
- The user should never lose typed content accidentally.
- Every upload should provide progress feedback.
- Errors should provide recovery options.

---

# 32. User Experience Goals

The user should feel that:

- The application is fast.
- The interface is familiar.
- Sending messages is effortless.
- AI responses feel natural.
- File sharing is as simple as chatBot application.
- The application behaves consistently across all message types.

---

# End of Document