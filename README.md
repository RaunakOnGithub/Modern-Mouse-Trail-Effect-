
<h1 align="center">✨ Dynamic Mouse Trail Animation</h1>

<p align="center">
  An interactive and smooth cursor trail effect that creates a flow of images following your mouse movement. 
  <br>
  Built with performance and aesthetics in mind, featuring <b>Lenis</b> for buttery smooth scrolling interactions.
</p>

<div align="center">

  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />

</div>

<br />

<p align="center">
  <a href="#"><strong>➥ Live Demo</strong></a> • 
  <a href="#-features"><strong>Explore Features</strong></a> • 
  <a href="#-installation"><strong>Installation</strong></a>
</p>

---

## 📸 Preview

<div align="center"> 
  <img src="https://via.placeholder.com/800x400?text=Upload+Your+Project+Screenshot+Here" alt="Project Screenshot" width="100%" />
</div>

<br>

## 🚀 Overview

This project is a frontend experiment focusing on **micro-interactions**. It creates a trail of images that follows the user's cursor. Unlike simple trails, this one includes physics-based interactions like scattering on scroll and rotation dynamics.

It utilizes **Lenis** to ensure that the scrolling experience remains smooth, preventing the "jitter" often seen in heavy animation projects.

## ✨ Features

* **🖱️ Interactive Mouse Trail:** Images spawn and follow the cursor with a custom delay and easing.
* **🌀 Scroll Explosion:** When the user scrolls, the trail reacts dynamically, scattering images based on scroll speed.
* **🚂 Smooth Scrolling:** Integrated **Lenis** for a modern, inertia-based scrolling feel.
* **📱 Fully Responsive:** Optimized logic for both desktop cursors and mobile touch interactions.
* **🎨 Random Rotation:** Each trail image spawns with a unique rotation for a natural, chaotic look.

## 🛠️ Tech Stack

* **HTML5** - Structure
* **CSS3** - Styling & Animations (Cubic-bezier easing)
* **JavaScript (ES6+)** - Logic, DOM Manipulation, Event Listeners
* **Lenis** - Smooth Scroll Library

## 💻 Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Raunak-Chaurasiya/mouse-trail-effect.git](https://github.com/Raunak-Chaurasiya/mouse-trail-effect.git)
    ```

2.  **Navigate to the project folder:**
    ```bash
    cd mouse-trail-effect
    ```

3.  **Run the project:**
    Simply open `index.html` in your browser or use a Live Server extension in VS Code.

## 📂 Project Structure

```bash
├── assets/          # Contains image files for the trail
├── index.html       # Main HTML structure
├── style.css        # Styling and Animation keyframes
├── script.js        # Logic for Trail and Lenis setup
└── README.md        # Documentation
