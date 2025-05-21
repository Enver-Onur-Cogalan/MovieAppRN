# 🎬 Movie Library App

A beautifully designed movie browser app built with React Native.  
Users can browse movies, view details, explore actor profiles, and manage their favorite films.

---

## 🛠️ Technologies Used

- **React Native CLI** – Mobile app development
- **Zustand** – Global state management
- **Firebase Auth + Firestore** – User authentication & storing favorites
- **Axios** – API requests to [The Movie Database (TMDb)](https://www.themoviedb.org/)
- **React Navigation** – Stack & Tab navigation structure
- **Lottie React Native** – Animations for loading, empty states, etc.
- **React Native Vector Icons** – Icons used throughout UI
- **Reanimated & Animatable** – Smooth transitions and effects
- **Linear Gradient** – For overlay and visual polish
- **AsyncStorage** – Local data persistence

---

## 📂 Folder Structure

```txt
src/
├── assets/              # Animation files
│   └── animations/
├── components/          # Reusable UI components
│   ├── common/          # GoBackButton, SearchBar, KeyboardRefreshWrapper, Header
│   ├── modal/           # FilterModal, ActorCreditsModal, ConfirmDeleteModal
│   └── movie/           # MovieCard, HorizontalMovieList, CastCard, FavoriteMovieCard, HorizontalMovieCard,
├── navigation/          # Stack & Tab navigators
├── screens/             # Main app screens
│   ├── auth/            # Login & Register
│   ├── stack/           # MovieDetail, ActorDetail
│   └── tabs/            # Home, Search, Favorites, Profile
├── services/            # API service files
├── state/               # Zustand stores
├── theme/               # Color & font theme configs
└── utils/               # Helpers (e.g. calculateAge, genreMap)
```

---

### 👤 Registered Accounts

- Email: test@movie.com Password: 123456
- Email: test2@movie.com Password: 123456

---

## 📱 App Screens & Features

### 🏠 Home Screen
- Lists “Our Picks” and “Popular Movies”
- FlatList with styled MovieCards
- Pull-to-refresh implemented

### 🔍 Search Screen
- Live search powered by TMDb API
- Filter by genre and rating
- Lottie animation when no results

### ❤️ Favorites Screen
- Movies saved via Firebase Firestore
- Filter + Search within favorites
- Swipe-to-delete animation 
- Empty screen animation when list is empty

### 👤 Profile Screen
- Logout & Delete account
- Modal with password input for deletion

### 🔐 Login / Register Screens
- Firebase authentication
- Email/password validation
- Loading animation during auth

### 🎞️ Movie Detail Screen
- Displays poster, rating, release year, description, cast
- Heart icon to favorite/unfavorite
- Reanimated actor list

### 🎭 Actor Detail Screen
- Actor’s photo, name, birthplace, biography, film count
- Horizontal scroll for known films
- “Show all” modal for full filmography

---

## 🔧 Setup & Installation

```bash
git clone https://github.com/Enver-Onur-Cogalan/MovieAppRN.git
cd MovieAppRN

npm install
# or
yarn install
```

### 🔑 Add Your TMDb API Key
Create a `.env` file or directly inside the `api.js` file:

```js
const TMDB_API_KEY = 'YOUR_API_KEY';
```

### ▶️ Run on Android
```bash
npx react-native run-android
```

### ▶️ Run on iOS
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

> ⚠️ Firebase config must also be set properly (check `firebase.js`)

---

## 📸 Screenshots

### 🔐 Login & Register

| Login | Register |
|-------|----------|
| ![Login Screen](https://github.com/user-attachments/assets/cb127968-0981-4082-b129-6b63dea5665b) | ![Register Screen](https://github.com/user-attachments/assets/36317f09-4285-4c97-9992-e54032166599) |

### 🏠 Home Screen

| Home Page |
|-----------|
| ![Home Screen](https://github.com/user-attachments/assets/eead5308-be07-4b6e-bea3-ed4b439d9401) |

### 🔍 Search Screen

| Search | Filtered Search |
|--------|----------------|
| ![Search Screen 1](https://github.com/user-attachments/assets/72e5a05d-32e9-44cc-8403-8941592c37b5) | ![Search Screen 2](https://github.com/user-attachments/assets/0fc05af2-369e-4581-ba48-a5a7af4147ad) |

### ❤️ Favorites Screen

| Favorites | Filtered Favorites |
|------------|--------------------|
| ![Favorites Screen 1](https://github.com/user-attachments/assets/8c61bf5d-3146-44da-bbfb-89f6c1f7c329) | ![Favorites Screen 2](https://github.com/user-attachments/assets/cb2ddadc-fdb7-44a0-85e6-ddc5f365a3a8) |

### 👤 Profile Screen

| Profile |
|--------|
| ![Profile Screen](https://github.com/user-attachments/assets/10333035-54b5-4623-b021-047277e693f0) |

### 🎞️ Movie Detail Screen

| Header Information | Actor List |
|--------------|----------------|
| ![MovieDetailScreen 1](https://github.com/user-attachments/assets/4f16cda0-7b0c-48b5-bfc9-a6c5108338d5) | ![MovieDetailScreen 2](https://github.com/user-attachments/assets/386795e5-80c8-429b-bdf4-87ca46f4d6ac)
 |

### 🎭 Actor Detail & Modal

| Actor Info | Known For | Modal |
|-------------|------------|--------|
| ![Actor Detail Screen 1](https://github.com/user-attachments/assets/980087a4-6104-4d3d-867e-07b5da2a7389) | ![Actor Detail Screen 2](https://github.com/user-attachments/assets/4c5f30cc-4e29-4869-a02e-349e58879387) | ![Actor Detail Screen 3](https://github.com/user-attachments/assets/db2f4be0-5a90-4720-9bec-5cff2c2d04c7) |

---

## ⚙️ Additional Notes

- Application is optimized for dark mode
- Modular structure enables scalability
- StatusBar is styled consistently across all screens
- Modal UX enhances user interaction without leaving screen
- Favorites screen supports swipe-to-delete interaction
  
  🔹 In the Search and Favorites screens, the search input field is visible by default instead of appearing after a button press.

🎯 This design choice was made intentionally to improve user experience by reducing the number of taps needed to initiate a search. Given that these screens are meant to explore content, having immediate access to the input field was prioritized over strict adherence to the sketch.

📌 If required, the input visibility can easily be toggled through a button interaction — however, the current solution offers a cleaner and more modern UX.

---

## 🙌 Acknowledgements

Special thanks to the TMDb API team and Firebase community.

---

## 📬 Contact

**Enver Onur Çoğalan**  
[GitHub](https://github.com/Enver-Onur-Cogalan) • [LinkedIn](https://www.linkedin.com/in/onurcogalan/) 
