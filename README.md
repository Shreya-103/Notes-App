# 📝 Notes App

A responsive and user-friendly Notes App built using React that allows users to create, manage, 
and persist notes efficiently. The app uses local storage to save data, 
ensuring notes remain even after refreshing the page.

🔗 **Live Demo:** https://shreya-103.github.io/Notes-App

## 🚀 Features

* ➕ Add new notes with title and content
* ❌ Delete notes instantly
* ✏️ Edit existing notes
* 📌 Pin important notes
* 👀 Full view mode to see notes on clicking card
* 💾 **Persistent storage using localStorage**
* ⚡ Real-time UI updates (no page reload)
* 🌙 Dark mode
* 🔍 Search notes
* 📱 Responsive design for all screen sizes

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** CSS
* **Storage:** Browser localStorage
* **Deployment:** GitHub Pages


## 📦 Installation & Setup

```bash id="a1b2c3"
# Clone the repository
git clone https://github.com/shreya-103/Notes-App.git

# Navigate into the project folder
cd Notes-App

# Install dependencies
npm install

# Run the development server
npm run dev
```


## 📁 Project Structure

```id="z9x8y7"
Notes-App/
│── public/
│── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│── index.html
│── package.json
```

## 🧩 How It Works

* Users input a **title and content** for notes
* Notes are stored in **React state**
* Data is synced with **localStorage**, so notes persist after refresh
* Each note is rendered dynamically as a card
* Clicking ❌ deletes the selected note instantly
* Clicking 📍 pins the note and 📌 unpins it
* Clicking on card gives you note on full screen and you can edit it too

## 🙌 Learning Outcomes
This project demonstrates:

* React component structure
* State management using hooks
* Event handling
* Data persistence using localStorage
* Responsive UI design
