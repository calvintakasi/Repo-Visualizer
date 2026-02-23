# 🚀 Repo Visualizer

A sleek, high-performance browser extension built with **WXT, React, and Tailwind CSS** that instantly reveals the tech stack and project health of any GitHub repository. 

Whether you are exploring a new open-source project or reviewing a candidate's portfolio, Repo Visualizer seamlessly injects critical insights directly into the GitHub UI and provides a beautifully designed glassmorphism dashboard in the extension popup.

## ✨ Features

* **⚡ Real-time Stack Detection:** Concurrently scans up to 8 common paths (like `frontend/package.json` and `backend/requirements.txt`) to accurately identify full-stack monorepo technologies (React, Next.js, FastAPI, Python, etc.).
* **🛡️ Shadow DOM Injection:** Injects a "Project Health" card seamlessly into the GitHub file explorer without conflicting with GitHub's native CSS.
* **💎 Premium UI/UX:** Features a modern, curved glassmorphism design with custom scrollbars and animated loading states.
* **🚀 High Performance:** Uses `Promise.all` for lightning-fast, parallel API fetching.
* **🔐 Secure API Handling:** Bypasses standard GitHub API rate limits securely via local environment variables.

## 🛠️ Built With

* **Framework:** [WXT](https://wxt.dev/) (Next-gen framework for browser extensions)
* **UI:** React 18
* **Styling:** Tailwind CSS (configured for isolated Shadow DOM and Popup)
* **Language:** TypeScript
* **Data:** GitHub REST API

## ⚙️ Local Setup & Installation

To run this extension locally in developer mode:

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/repo-visualizer.git](https://github.com/yourusername/repo-visualizer.git)
cd repo-visualizer
