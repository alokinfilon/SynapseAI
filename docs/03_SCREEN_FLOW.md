# SynapseAI
# 03_SCREEN_FLOW.md

**Version:** 1.0.0

**Project:** SynapseAI

**Document Type:** Screen Flow Specification

**Framework:** React Native CLI

**Platform:** Android (Primary)

---

# 1. Purpose

This document defines every screen in the application.

Each screen includes:

- Purpose
- Components
- User interactions
- Navigation
- Future enhancements

This document serves as the UI blueprint before development begins.

---

# 2. Screen Hierarchy

```

Splash Screen
│
▼
Chat Screen
│
├──────────────┐
│              │
▼              ▼
Attachment      Message Actions
Bottom Sheet    Bottom Sheet
│
├─────┬─────┬────────┐
│     │     │        │
▼     ▼     ▼        ▼
Camera Gallery Video Document
│
▼
Preview Screen
│
▼
Chat Screen

```

Future

```

Splash
│
▼
Authentication
│
▼
Chat List
│
▼
Chat Screen
│
├───────────────┐
│               │
▼               ▼
Settings     Profile

```

---

# 3. Splash Screen

## Purpose

Application entry point.

Loads application resources before opening the chat.

---

## Responsibilities

- Initialize theme
- Load fonts
- Load assets
- Initialize mock data
- Navigate to Chat Screen

---

## Components

- Logo
- App Name
- Loading Indicator

---

## Navigation

```

Launch App

↓

Splash

↓

Chat Screen

```

---

# 4. Chat Screen

## Purpose

Primary application screen.

Everything revolves around this screen.

---

## Layout

```

┌────────────────────────────┐
│ Header                     │
├────────────────────────────┤
│                            │
│                            │
│      Message List          │
│                            │
│                            │
├────────────────────────────┤
│ Typing Indicator           │
├────────────────────────────┤
│ Composer                   │
└────────────────────────────┘

```

---

## Components

Header

Message List

Typing Indicator

Composer

Keyboard Handler

Toast Container

---

## User Actions

Send Message

Receive Message

Upload Attachment

Copy Message

Delete Message

Retry Upload

Scroll Messages

---

## Navigation

```

Splash

↓

Chat

↓

Preview

↓

Back to Chat

```

---

# 5. Header

## Purpose

Displays conversation information.

---

## Components

AI Avatar

AI Name

Status

Menu Button

---

Future

Voice Call

Video Call

Chat Info

---

# 6. Message List

## Purpose

Displays the conversation.

---

Supports

Incoming

Outgoing

Images

Videos

Documents

Loading

Typing

System Messages

Date Divider

---

Component

FlatList

---

Scrolling

Newest messages remain at bottom.

---

Future

Infinite History

Search

Bookmarks

---

# 7. Composer

## Purpose

Allows the user to compose messages.

---

Layout

```

┌────────────────────────────┐
│ +   Message Input     Send │
└────────────────────────────┘

```

---

Components

Attachment Button

Text Input

Send Button

---

Future

Voice Button

Emoji Button

Mention

Commands

---

Behavior

No text

↓

Send Hidden

Text Entered

↓

Send Visible

---

# 8. Attachment Bottom Sheet

## Purpose

Allows users to choose attachments.

---

Layout

```

Camera

Gallery

Video

Document

Cancel

```

---

Navigation

```

Chat

↓

Bottom Sheet

↓

Picker

```

---

# 9. Image Preview Screen

## Purpose

Preview image before sending.

---

Components

Image Preview

Caption

Send Button

Cancel

---

Navigation

```

Gallery

↓

Preview

↓

Send

↓

Chat

```

---

# 10. Video Preview Screen

## Purpose

Preview video.

---

Components

Thumbnail

Duration

Caption

Send

Cancel

---

Navigation

```

Video Picker

↓

Preview

↓

Chat

```

---

# 11. Document Preview Screen

## Purpose

Preview selected document.

---

Components

Document Icon

File Name

File Size

Caption

Send

Cancel

---

Navigation

```

Document Picker

↓

Preview

↓

Chat

```

---

# 12. Message Action Bottom Sheet

## Purpose

Appears after long pressing a message.

---

Version 1

Copy

Delete

Retry

Cancel

---

Future

Forward

Share

Pin

React

Star

Edit

---

# 13. Loading Overlay

## Purpose

Displays application loading states.

---

Used For

Uploading

Processing

Future Sync

---

States

Preparing

Uploading

Completed

Failed

---

# 14. Toast

## Purpose

Displays temporary feedback.

---

Examples

Copied

Deleted

Upload Failed

Upload Complete

Coming Soon

---

# 15. Empty Chat State

## Purpose

Displayed when no messages exist.

---

Contains

Welcome Illustration

Greeting

Suggested Prompts

---

Examples

"Ask me anything"

"Summarize a PDF"

"Explain this image"

"Help me write code"

---

# 16. Error State

Purpose

Inform users gracefully.

---

Examples

Unsupported File

Permission Denied

Upload Failed

No Internet

Unexpected Error

---

Each error must provide

Message

Retry

Dismiss

---

# 17. Keyboard Behavior

Keyboard Open

↓

Composer Moves Up

↓

Messages Resize

↓

Typing Continues

↓

Keyboard Closes

↓

Composer Returns

---

# 18. Orientation

Version 1

Portrait Only

Future

Landscape Support

Tablet Layout

---

# 19. Responsive Behavior

Small Phones

Normal Phones

Large Phones

Foldables (Future)

Tablet (Future)

---

# 20. Navigation Principles

- Maximum two taps to complete common actions.
- Back navigation should always return to the previous screen.
- Preview screens should never lose selected media.
- Navigation animations should feel smooth and fast.
- Chat Screen remains the central hub of the application.

---

# 21. Future Screens

Authentication

Chat History

Search

Settings

User Profile

AI Model Selector

Downloads

Image Generation

Voice Conversation

Prompt Library

Saved Chats

Notification Center

---

# 22. Screen Transition Rules

Splash → Fade

Chat → Instant

Bottom Sheet → Slide Up

Preview → Slide Left

Back → Slide Right

Toast → Fade

Typing Indicator → Fade

---

# 23. Screen Responsibilities

| Screen | Responsibility |
|----------|----------------|
| Splash | Initialize application |
| Chat | Main conversation interface |
| Attachment Sheet | Select attachment source |
| Image Preview | Preview image before sending |
| Video Preview | Preview video before sending |
| Document Preview | Preview document before sending |
| Message Actions | Message management |
| Loading Overlay | Upload progress |
| Toast | User feedback |

---

# 24. Design Principles

Every screen should:

- Be lightweight.
- Have a single clear responsibility.
- Load quickly.
- Minimize unnecessary navigation.
- Follow the Design System.
- Maintain visual consistency.
- Provide immediate user feedback.
- Be reusable and backend-independent.

---

# 25. Success Criteria

The screen architecture is considered complete when:

- Every user action maps to a screen.
- Every screen has a single responsibility.
- Navigation is intuitive.
- UI is scalable for future features.
- Components can be reused across screens.
- Backend integration does not require screen redesign.

---

# End of Document