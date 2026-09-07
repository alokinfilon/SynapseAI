# SynapseAI
# 08_DATA_MODELS.md

**Version:** 1.0.0

**Project:** SynapseAI

**Document Type:** Data Models

**Framework:** React Native CLI

**Language:** TypeScript

---

# 1. Purpose

This document defines every data model used inside SynapseAI.

It acts as the single source of truth for:

- UI
- Mock Data
- Services
- State Management
- Future Backend APIs

All features should follow these models.

---

# 2. Core Models

The application is built around:

```
Conversation

↓

Message

↓

Attachment

↓

AI Response
```

---

# 3. User

```ts
User
```

Properties

| Field | Type |
|---------|------|
| id | string |
| name | string |
| avatar | string |
| role | "user" \| "assistant" |
| isOnline | boolean |

---

# 4. Conversation

```ts
Conversation
```

Properties

| Field | Type |
|---------|------|
| id | string |
| title | string |
| createdAt | Date |
| updatedAt | Date |
| lastMessage | Message |
| messages | Message[] |

---

# 5. Message

```ts
Message
```

Properties

| Field | Type |
|---------|------|
| id | string |
| conversationId | string |
| sender | User |
| type | MessageType |
| content | string |
| attachment | Attachment |
| status | MessageStatus |
| createdAt | Date |

---

# 6. Message Types

Supported

```
text

image

video

document

system

typing
```

Future

```
audio

voice

location

contact

gif

sticker

code

markdown
```

---

# 7. Message Status

Current

```
sending

sent

failed
```

Future

```
delivered

read

seen
```

---

# 8. Attachment

```ts
Attachment
```

Properties

| Field | Type |
|---------|------|
| id | string |
| type | AttachmentType |
| uri | string |
| name | string |
| size | number |
| mimeType | string |
| thumbnail | string |

---

# 9. Attachment Types

Current

```
image

video

document
```

Future

```
audio

voice

pdf

zip

excel

word

powerpoint
```

---

# 10. Upload

```ts
Upload
```

Properties

| Field | Type |
|---------|------|
| id | string |
| progress | number |
| state | UploadState |
| attachment | Attachment |

---

# 11. Upload States

```
preparing

uploading

processing

completed

failed
```

---

# 12. AI Response

```ts
AIResponse
```

Properties

| Field | Type |
|---------|------|
| id | string |
| message | Message |
| model | string |
| generatedAt | Date |

---

# 13. Typing State

```ts
TypingState
```

Properties

| Field | Type |
|---------|------|
| isTyping | boolean |
| startedAt | Date |

---

# 14. Preview

```ts
Preview
```

Properties

| Field | Type |
|---------|------|
| attachment | Attachment |
| caption | string |

---

# 15. Theme

```ts
Theme
```

Properties

| Field | Type |
|---------|------|
| mode | light |
| primaryColor | string |
| background | string |

Future

```
dark
```

---

# 16. Mock Response

Current frontend development uses mock responses.

Example

```
User

↓

Message

↓

Delay

↓

AI Response
```

No backend dependency.

---

# 17. Validation Rules

Message

- id required
- sender required
- createdAt required

Attachment

- uri required
- type required

Upload

- progress 0–100

---

# 18. Relationships

```
Conversation

↓

Messages[]

↓

Attachment?

↓

Preview
```

---

# 19. Serialization

Dates should be stored as:

```
ISO 8601
```

Example

```
2026-09-01T09:15:20Z
```

---

# 20. Future Models

Planned

- Settings
- AIModel
- Notification
- VoiceRecording
- AudioMessage
- ChatFolder
- Prompt
- SearchResult
- Workspace
- Plugin

---

# 21. Versioning

Every model should remain backward compatible.

New fields should be optional unless absolutely required.

Breaking changes should increment the model version.

---

# 22. Success Criteria

The data layer is complete when:

- Every screen uses these models.
- Mock services use the same contracts.
- Future backend APIs match these models.
- Components remain independent of backend implementation.
- No duplicate model definitions exist.

---

# End of Document