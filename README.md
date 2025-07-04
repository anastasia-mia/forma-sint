# <img src="./client/assets/logo-light.svg" alt="Forma Sint logo" width="30"/>  Forma Sint – Fullstack Test Assignment

Fullstack test assignment for a fictional sportswear store **"Forma Sint"**.

**Online demo:** https://anastasia-mia.github.io/forma-sint/client/

## Tech Stack

### Frontend:
- **HTML**, **CSS**, **JavaScript**
- Fully **responsive** layout
- Subtle **animations** for smoother UX
- Product catalog with **lazy loading**
- **Modal windows** for product details
- **Mobile-friendly** burger navigation

### Backend:
- **Node.js** + **Express.js**
- **MongoDB Atlas** 
- Daily synchronization with **IdoSell API**
- **REST API** with CSV export for all orders and CSV/JSON export for single order
- Automated data updates with **GitHub Actions**

## Project Structure
**/client**  # Frontend code 

**/server**  # Backend code

**/.github/workflows**  # GitHub Actions for daily sync README.md .env # Env vars (not committed)

## Installation

```
git clone https://github.com/anastasia-mia/forma-sint.git
```

### Run backend code
```
cd server
npm install
npm run dev
```

## Environment Variables

Example of environment variables are located in **.env.example** file

