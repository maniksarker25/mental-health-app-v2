# 🌿 Mental Health Anonymous (Mobile App)

> **Care, shared quietly.**
> A privacy-first mobile application built with **React Native (Expo SDK 54)**, **NativeWind (Tailwind CSS)**, **Expo Router (v6)**, and **Redux Toolkit + RTK Query**.

---

## 📱 Features

- **Zero Identity Tracking**: No accounts, no sign-ups, and zero sender metadata attached to shared packets.
- **Curated Topic Library**: Educational packets covering Anxiety, Depression, Stress & Burnout, Substance Abuse, Grief & Loss, Dementia, Trauma, and Eating Disorders.
- **3-Step Send Flow**:
  1. **Destination**: Select Email or SMS with country code selection and live validation.
  2. **Supportive Note**: Add an optional warm message (with 240 char limit and suggestion prompts) or skip.
  3. **Review & Medical Disclaimer**: Masked preview of all parameters, medical disclaimer agreement, and anonymous dispatch.
- **On-Device History**: Masked delivery logs stored strictly on the local device with clear history capability.
- **Delivery Updates**: Local notification preference toggles.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Expo](https://expo.dev) (SDK 54) + React Native (0.81+) + React 19
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (v6+) File-based routing (`app/`)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS v3/v4)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query
- **Local Persistence**: [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- **Icons**: [@expo/vector-icons](https://icons.expo.fyi/) (Ionicons, Feather, MaterialCommunityIcons)
- **Forms & Validation**: React Hook Form + Zod
- **Feedback & Toasts**: `react-native-toast-message`

---

## 📂 Project Structure

```
├── app/                              # Expo Router file-based routes
│   ├── _layout.tsx                   # Root layout (Providers, Splash, Toast)
│   ├── +not-found.tsx                # 404 handler
│   ├── index.tsx                     # Entry / Splash screen
│   ├── onboarding.tsx                # 3-slide onboarding carousel
│   ├── (tabs)/                       # Bottom tab navigation
│   │   ├── _layout.tsx
│   │   ├── home.tsx                  # Topics catalog
│   │   ├── history.tsx               # Masked send history
│   │   └── settings.tsx              # Settings & local data management
│   ├── topics/
│   │   └── [id].tsx                  # Topic details & packet checklist
│   └── send/
│       ├── recipient.tsx             # Step 1: Recipient & channel selector
│       ├── message.tsx               # Step 2: Supportive note & suggestions
│       ├── review.tsx                # Step 3: Summary review & disclaimer
│       └── success.tsx               # Confirmation screen
│
├── components/                       # Modular UI Components
│   ├── ui/
│   │   ├── shared/                   # AppButton, AppHeader, AppCard, PrivacyNotice, States
│   │   ├── inputs/                   # InputField, TextAreaField
│   │   ├── layouts/                  # ScreenWrapper
│   │   └── modals/                   # CountryPickerModal
│   ├── topic/                        # TopicCard, TopicIcon
│   └── send/                         # DeliveryMethodSelector
│
├── store/                            # Redux State Management
│   ├── index.ts                      # Store configuration
│   ├── hooks.ts                      # Typed useAppDispatch / useAppSelector
│   ├── slices/
│   │   ├── appSlice.ts               # Onboarding, notifications, history with AsyncStorage sync
│   │   └── shareSlice.ts             # Selected topic, recipient, message
│   └── api/
│       └── baseApi.ts                # RTK Query (getTopics, getTopicById, createAnonymousShare)
│
├── types/                            # Domain TypeScript interfaces
├── data/                             # Curated topics and country codes
├── utils/                            # Formatting, masking, and Zod validators
├── constants/                        # Theme colors & design tokens
├── assets/                           # Illustrations and images
├── global.css                        # Tailwind CSS directives
├── metro.config.js                   # Metro config with NativeWind wrapper
├── tailwind.config.js                # Tailwind CSS palette & styling tokens
├── app.json                          # Expo configuration
└── tsconfig.json                     # TypeScript configuration with @/* path alias
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
# Start Expo development server
npm start

# Run on iOS Simulator (macOS required)
npm run ios

# Run on Android Emulator / Connected Device
npm run android

# Run on Web browser
npm run web
```
