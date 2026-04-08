# 📦 Post Viewer (Angular + NgRx)

## 🚀 Overview
A reactive Angular application that demonstrates **state-driven UI composition** using NgRx and RxJS.

The application fetches posts from an API and enriches them with images from an external source, combining both streams into a unified UI model.

---

## 🧠 Key Concepts Demonstrated

### Reactive Data Composition
Posts and images are fetched independently and combined using RxJS:

- Decoupled data sources  
- Declarative UI transformation  
- Avoids mutation-heavy logic  

---

### Derived State with NgRx
The UI consumes **derived state** rather than raw API responses:

- Selectors compute display values  
- UI remains independent of backend shape  
- Predictable state transitions  

---

### Controlled Side Effects
NgRx Effects are used for:

- Fetching posts  
- Fetching images  
- Preventing redundant API calls  

---

### Deterministic Image Mapping
Each post is assigned an image using a modulo-based mapping:

```ts
imageUrl = images[post.id % images.length]
```

This ensures:
- Stable UI across reloads  
- No randomness or flicker  
- Consistent visual identity  

---

## ⚙️ Architecture Overview

The app consists of two primary components:

### 1. PostViewerGridWrapperComponent
- Acts as container  
- Handles orchestration of data streams  
- Connects UI to store  

### 2. PostViewerCardComponent
- Displays individual post  
- Handles interaction (click, tooltip)  
- Cycles through post properties  

---

### State Management (NgRx)
- Store holds posts and UI state  
- Effects manage API calls  
- Selectors expose derived data  

---

### Design Decisions

#### Why a Single Service?
- Avoided unnecessary abstraction for demo scope  
- Prioritized clarity and readability  

#### Why Combine Streams Instead of Mutating Store?
- Keeps store normalized  
- Avoids redundant writes  
- Makes transformation explicit and testable  

---

## ✨ Features

- 📊 Responsive grid layout  
- 🖼 Dynamic image enrichment  
- ⚡ Reactive UI updates  
- 🎯 Click-based state transitions  
- 💫 Skeleton loading state  
- 🌙 Dark-themed modern UI  
- ♿ Keyboard accessibility  

---

## 🧩 Tech Stack

- Angular (Standalone Components)
- NgRx (Store + Effects)
- RxJS
- Angular Material
- Pixabay API

---

## 🛠 Getting Started

Clone the repository: git clone https://github.com/Chandu9494/post-viewer.git 


Install dependencies:
npm install

Run the app:

npm start
Visit:
http://localhost:4200/

---

## 🧪 Testing

Run unit tests:
npm test


---

## 🏗 Build
npm run build


---

## 🎯 What This Project Showcases

This project focuses on:

- Thinking in **streams instead of imperative flows**  
- Designing UI as a **function of state**  
- Making **intentional architectural trade-offs**  
- Balancing **simplicity vs scalability**  

---

## 🚀 Future Improvements

- Move derived mapping into memoized selectors  
- Add pagination / infinite scroll  
- Introduce error handling states  
- Improve test coverage  
- Enhance accessibility further  

---

## 💬 Closing Note

This project is not just about rendering posts —  
it demonstrates how to build **scalable, reactive frontend systems using Angular and NgRx**.

