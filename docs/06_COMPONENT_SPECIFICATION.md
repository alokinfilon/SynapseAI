# SynapseAI
# 06_COMPONENT_SPECIFICATION.md

**Version:** 1.0.0

**Project:** SynapseAI

**Document Type:** Component Specification

**Framework:** React Native CLI

**Language:** TypeScript

---

# 1. Purpose

This document defines every reusable UI component used in SynapseAI.

For each component it specifies:

- Purpose
- Responsibilities
- Properties (Props)
- States
- Variants
- User interactions
- Accessibility
- Future enhancements

This document serves as the single source of truth for all reusable components.

---

# 2. Component Categories

The application is composed of four categories of components.

```
Components

│

├── Layout Components

├── Chat Components

├── Input Components

├── Feedback Components

├── Attachment Components

└── Utility Components
```

---

# 3. Component Design Principles

Every component must be:

- Reusable
- Stateless whenever possible
- Small and focused
- Easily testable
- Theme-driven
- Accessible
- Performance optimized

---

# 4. Layout Components

## ChatHeader

### Purpose

Displays the AI avatar, title, connection status, and optional actions.

### Contains

- Avatar
- AI Name
- Status
- Menu Button

### States

- Default
- Loading
- Offline (Future)

### Future

- Voice Call
- Video Call
- Model Selector

---

## ScreenContainer

Used as the root wrapper for every screen.

Responsibilities

- Safe Area
- Background
- Keyboard handling
- Padding

---

## KeyboardAvoidContainer

Handles keyboard movement.

Responsibilities

- Keyboard avoidance
- Smooth animations
- Platform differences

---

# 5. Chat Components

## MessageList

Purpose

Displays all conversation messages.

Uses

FlatList

Supports

- Text
- Image
- Video
- Document
- Typing
- Date Divider
- System Message

Features

- Auto scroll
- Virtualization
- Pagination (Future)

---

## MessageBubble

Purpose

Displays one message.

Variants

```
Outgoing

Incoming

Image

Video

Document

System
```

States

- Sending
- Sent
- Failed
- Streaming

Future

- Edited
- Pinned
- Starred
- Forwarded

---

## MessageTimestamp

Displays

- Time
- Date

Future

- Delivered
- Read
- Seen

---

## TypingIndicator

Purpose

Shows AI typing.

Animation

Three animated dots.

States

- Hidden
- Visible

---

## DateDivider

Separates messages by date.

Examples

Today

Yesterday

Monday

15 Jan 2026

---

# 6. Input Components

## Composer

Primary message composer.

Contains

- Attachment Button
- Input Field
- Send Button

Behavior

Empty Input

↓

Send Hidden

Text Available

↓

Send Visible

Future

- Voice Button
- Emoji
- Mentions
- Slash Commands

---

## MessageInput

Purpose

Text entry.

Features

- Multiline
- Auto grow
- Placeholder
- Character limit (Future)

States

- Empty
- Focused
- Disabled

---

## SendButton

Purpose

Send messages.

States

- Hidden
- Enabled
- Disabled
- Loading

---

## AttachmentButton

Purpose

Open attachment options.

Behavior

Tap

↓

Bottom Sheet

---

# 7. Attachment Components

## AttachmentBottomSheet

Contains

- Camera
- Gallery
- Video
- Document
- Cancel

Future

- Audio
- Location
- Contact

---

## ImagePreview

Purpose

Preview image before sending.

Contains

- Image
- Caption
- Send

Supports

- Zoom
- Pan

---

## VideoPreview

Contains

- Video Player
- Thumbnail
- Duration
- Caption
- Send

---

## DocumentPreview

Contains

- File Icon
- File Name
- File Size
- Caption
- Send

---

## UploadProgress

Purpose

Display upload progress.

States

Preparing

Uploading

Processing

Completed

Failed

---

# 8. Feedback Components

## Toast

Purpose

Temporary notifications.

Examples

Copied

Deleted

Upload Complete

Upload Failed

---

## Loader

Purpose

Display loading state.

Variants

Small

Medium

Large

Fullscreen

---

## EmptyState

Purpose

Shown when chat is empty.

Contains

Illustration

Welcome Text

Suggested Prompts

---

## ErrorView

Purpose

Displays recoverable errors.

Contains

Icon

Title

Description

Retry Button

---

# 9. Utility Components

## Avatar

Purpose

Displays AI avatar.

Variants

Small

Medium

Large

---

## Icon

Purpose

Central icon wrapper.

Supports

SVG

PNG

Future

Lottie

---

## Divider

Purpose

Visual separator.

Variants

Horizontal

Vertical

---

## BottomSheet

Reusable bottom sheet.

Used By

Attachment Picker

Message Actions

Future Menus

---

## Modal

Reusable modal.

Future Uses

Permissions

Delete Confirmation

Settings

---

# 10. Common Component States

Every interactive component should support:

- Default
- Hover (Future)
- Pressed
- Focused
- Disabled
- Loading
- Error

---

# 11. Component Communication

```
Screen

↓

Feature Component

↓

Shared Component

↓

Native Component
```

Shared components must never communicate directly with services.

---

# 12. Props Guidelines

Components should receive data only through props.

Avoid

- Global dependencies
- Hidden state
- Direct service calls

Example

```
<MessageBubble

message={message}

onPress={handlePress}

onLongPress={handleLongPress}

/>
```

---

# 13. Accessibility

Every component should provide:

- Accessibility Label
- Accessibility Hint
- Accessibility Role
- Touch Target ≥ 44dp
- Keyboard accessibility (Future)

---

# 14. Animation Guidelines

Animations should be:

- Short
- Smooth
- Meaningful

Examples

Typing

Toast

Bottom Sheet

Upload Progress

Streaming Text

Avoid unnecessary animations.

---

# 15. Performance Rules

Components should:

- Use React.memo where appropriate
- Avoid unnecessary rerenders
- Avoid inline functions when possible
- Keep props minimal
- Lazy load heavy components

---

# 16. Component Naming

Components

```
MessageBubble

TypingIndicator

ChatHeader

Composer

Avatar

BottomSheet
```

Props

```
message

isLoading

onPress

onSend

disabled
```

Handlers

```
handleSend

handleUpload

handleRetry

handleDelete
```

---

# 17. Future Components

Planned additions:

- VoiceRecorder
- AudioPlayer
- ImageViewer
- PDFViewer
- MarkdownRenderer
- CodeBlock
- SyntaxHighlighter
- PromptCard
- AIModelSelector
- SearchBar
- ChatSearch
- VoiceWaveform
- ReactionBar
- ContextMenu
- MentionPicker

---

# 18. Success Criteria

The component library is complete when:

- Every UI element is reusable.
- Components have a single responsibility.
- Business logic is separated from presentation.
- Components follow the design system.
- New screens can be built by composing existing components.
- Components are backend-independent and future-proof.

---

# End of Document