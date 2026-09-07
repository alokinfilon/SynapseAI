# SynapseAI
# 07_FOLDER_STRUCTURE.md

**Version:** 1.0.0

**Project:** SynapseAI

**Document Type:** Folder Structure & Project Organization

**Framework:** React Native CLI

**Language:** TypeScript

---

# 1. Purpose

This document defines the complete folder organization for the SynapseAI frontend.

It establishes:

- Directory hierarchy
- File naming conventions
- Import rules
- Ownership of folders
- Feature organization
- Scalability guidelines

Every developer working on the project must follow this structure.

---

# 2. Design Goals

The project structure must be:

- Feature-first
- Modular
- Predictable
- Scalable
- Easy to navigate
- Easy to maintain
- Backend-ready

---

# 3. Root Directory

```
SynapseAI/

android/

ios/

src/

assets/

docs/

tests/

scripts/

.gitignore

README.md

package.json

tsconfig.json

babel.config.js

metro.config.js

eslint.config.js

.prettierrc
```

---

# 4. Source Directory

```
src/

app/

features/

shared/

navigation/

services/

theme/

hooks/

utils/

types/

constants/

store/
```

---

# 5. App Directory

Responsible for application startup.

```
app/

App.tsx

providers/

config/

bootstrap/

```

Responsibilities

- App initialization
- Global providers
- Bootstrapping
- Configuration

---

# 6. Features Directory

Every business feature owns itself.

```
features/

chat/

attachments/

preview/

splash/

settings/ (Future)

history/ (Future)

authentication/ (Future)
```

No feature should directly depend on another feature.

---

# 7. Feature Structure

Every feature follows the same layout.

```
feature-name/

components/

screens/

hooks/

services/

types/

constants/

utils/

data/

index.ts
```

Example

```
chat/

components/

ChatHeader.tsx

Composer.tsx

MessageBubble.tsx

TypingIndicator.tsx

MessageList.tsx

screens/

ChatScreen.tsx

hooks/

useChat.ts

services/

chat.service.ts

types/

message.types.ts

constants/

chat.constants.ts

utils/

chat.helpers.ts

data/

mockMessages.ts

index.ts
```

---

# 8. Shared Directory

Contains reusable code.

```
shared/

components/

hooks/

utils/

types/

constants/

animations/

```

Shared code must never contain feature-specific logic.

---

# 9. Shared Components

```
shared/components/

Button/

Avatar/

Text/

Input/

Icon/

Divider/

Loader/

Toast/

Modal/

BottomSheet/

ProgressBar/
```

Every component should have:

```
Button/

Button.tsx

Button.styles.ts

Button.types.ts

index.ts
```

---

# 10. Theme Directory

```
theme/

colors.ts

typography.ts

spacing.ts

radius.ts

elevation.ts

shadows.ts

animations.ts

index.ts
```

Only design tokens belong here.

No business logic.

---

# 11. Navigation Directory

```
navigation/

RootNavigator.tsx

navigation.types.ts

routes.ts
```

Future

```
AuthNavigator.tsx

MainNavigator.tsx

SettingsNavigator.tsx
```

---

# 12. Services Directory

Global services only.

```
services/

mock/

api/

storage/

permissions/

clipboard/

```

Feature-specific services belong inside their feature.

---

# 13. Hooks Directory

Global reusable hooks.

```
hooks/

useTheme.ts

useKeyboard.ts

useDebounce.ts

usePermission.ts
```

Feature hooks belong inside their feature.

---

# 14. Utils Directory

Pure utility functions.

```
utils/

date.ts

files.ts

strings.ts

validation.ts

device.ts
```

Utilities must never import React components.

---

# 15. Constants Directory

Global constants.

```
constants/

app.ts

routes.ts

permissions.ts

limits.ts
```

Feature constants stay inside their feature.

---

# 16. Types Directory

Global TypeScript types.

```
types/

common.ts

api.ts

navigation.ts
```

Feature models belong inside features.

---

# 17. Store Directory

Current

```
store/

index.ts
```

Future

```
store/

chat/

settings/

user/

theme/
```

---

# 18. Assets Directory

```
assets/

images/

icons/

illustrations/

fonts/

animations/

videos/

audio/
```

Do not place assets inside feature folders unless they are feature-exclusive.

---

# 19. Documentation Directory

```
docs/

01_REQUIREMENTS.md

02_USER_FLOW.md

03_SCREEN_FLOW.md

04_INFORMATION_ARCHITECTURE.md

05_FRONTEND_ARCHITECTURE.md

06_COMPONENT_SPECIFICATION.md

07_FOLDER_STRUCTURE.md

...
```

Documentation should evolve with the project.

---

# 20. Tests Directory

```
tests/

unit/

integration/

e2e/

fixtures/
```

Future

```
components/

features/

services/
```

---

# 21. Naming Conventions

Folders

```
chat

attachments

preview
```

Files

```
ChatScreen.tsx

MessageBubble.tsx

Composer.tsx
```

Hooks

```
useChat.ts

useUpload.ts
```

Services

```
chat.service.ts

upload.service.ts
```

Types

```
message.types.ts
```

Constants

```
chat.constants.ts
```

---

# 22. Import Rules

Preferred

```
Feature

↓

Shared

↓

Theme

↓

Utils
```

Avoid

```
Feature A

↓

Feature B
```

If multiple features need shared logic, move it to `shared`.

---

# 23. Barrel Exports

Every major folder should expose an `index.ts`.

Example

```
components/

Button/

Avatar/

Loader/

index.ts
```

Import

```
import {
  Button,
  Avatar,
  Loader,
} from "@/shared/components";
```

---

# 24. Path Aliases

Use aliases instead of long relative paths.

Preferred

```
@/app

@/features

@/shared

@/theme

@/utils

@/hooks

@/types

@/services

@/assets
```

Avoid

```
../../../../components
```

---

# 25. Code Ownership

Feature folders own:

- Components
- Hooks
- Services
- Types
- Constants
- Mock data

Shared folders own:

- Generic UI
- Generic utilities
- Generic hooks

---

# 26. Scalability Rules

Every new feature must:

- Have its own folder.
- Own its own components.
- Own its own services.
- Own its own hooks.
- Avoid dependencies on other features.

---

# 27. Anti-Patterns

Avoid:

❌ Giant components

❌ Shared business logic

❌ Circular imports

❌ Deep relative imports

❌ Duplicate utilities

❌ Hardcoded design values

❌ Random folder creation

---

# 28. Future Expansion

The structure should support:

- AI model selection
- Voice chat
- Image generation
- Authentication
- Notifications
- Offline mode
- Team workspaces
- Plugins
- Search
- Cloud sync

without restructuring existing folders.

---

# 29. Success Criteria

The folder structure is successful when:

- Every file has an obvious location.
- Features remain isolated.
- Shared code is reusable.
- Imports remain clean.
- New developers can understand the project quickly.
- The project scales without reorganization.

---

# End of Document