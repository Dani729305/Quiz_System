# 📘 Quiz Website

This is a **Quiz Website** developed using **HTML, CSS, Bootstrap, and JavaScript**.
The project is designed to manage quizzes for **teachers and students**, where teachers can create quizzes and students can attempt them in a secure and structured way.

The system includes **separate login systems**, **quiz creation**, **student management**, **result tracking**, and **certificate validation**, with all data stored using **Local Storage**.

---

## 🚀 Features

### 🔐 Authentication System

* Separate **Signup and Login** forms for:

  * **Teachers**
  * **Students**
* Users must **sign up first** before signing in.
* Proper validation to prevent unauthorized access.

---

### 👨‍🏫 Teacher Dashboard

Teachers get a dedicated dashboard with the following capabilities:

* 📋 **Add Quiz Questions**

  * Teachers can add as many questions as they want.
  * Questions are displayed to students exactly as added by the teacher.
* 👨‍🎓 **Add Students for Quiz**

  * Teachers can register students using required details such as:

    * Name
    * Father’s Name
    * Date of Birth
    * Enrollment Number
    * Address
    * Other required information
  * Only registered students are allowed to attempt the quiz.
* 📊 **View Quiz Results**

  * Teachers can see:

    * Marks obtained by each student
    * Overall performance of students
* 📜 **Certificate & Result Status**

  * Teachers can view certificates based on student results.
  * Easily check whether a student is **Pass or Fail**.

---

### 👨‍🎓 Student Panel

Students can interact with the system in a simple and guided way:

* 🔑 **Enrollment Verification**

  * Students must enter their **Enrollment Number** to access the quiz.
  * If the enrollment number is not registered, a **popup message** is shown indicating:

    > “Enrollment number is not registered.”
* 📚 **Subject Selection**

  * Students can choose the subject before starting the quiz.
* ⏱️ **Timed Quiz System**

  * Each question has a **timer**, encouraging time-bound answers.
* ❓ **Dynamic Questions**

  * Students see only the questions added by the teacher.
* ✅ **Quiz Submission**

  * After submitting the quiz:

    * All quiz data is saved
    * Results become visible to the teacher

---

### 💾 Data Storage

* All data in the website is stored using **Browser Local Storage**, including:

  * Login details
  * Student records
  * Quiz questions
  * Quiz results
* No backend or database is used.

---

### 🌐 Additional Pages

The website includes multiple navigable pages such as:

* 🏠 Home
* ℹ️ About Us
* 📞 Contact Us
* 🎓 Student Login Form
* 👨‍🏫 Teacher Login Form

Users can directly access these pages through navigation links.

---

## 🛠️ Technologies Used

* **HTML5** – Structure of the website
* **CSS3** – Styling and layout
* **Bootstrap** – Responsive design and UI components
* **JavaScript** – Logic, validation, local storage handling, and dynamic behavior.