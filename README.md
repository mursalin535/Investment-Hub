# 📊 Investment Hub

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A Modern Investment Platform with Real-time Data, Community Features, and Intelligent Analytics**

[Live Demo](#) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 🎯 Overview

**Investment Hub** is a sophisticated web platform designed to empower investors with comprehensive tools for portfolio management, market insights, and community engagement. Built with cutting-edge technologies, it provides a seamless experience for both novice and experienced investors.

### Key Highlights
- 💼 **Portfolio Management** - Track and manage your investments efficiently
- 📰 **News Feed** - Real-time market updates and community discussions
- 🏢 **Company Insights** - Detailed analysis of leading companies
- 👥 **Community Groups** - Connect with fellow investors and share insights
- 📊 **Analytics Dashboard** - Visualize your investment performance
- 🔐 **Secure Authentication** - Protected user accounts and data
- ⚡ **Lightning Fast** - Optimized performance with Vite

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/investment-hub.git
cd investment-hub
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

---

## 📁 Project Structure

```
Investment Hub/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Auth/           # Authentication pages (Login, SignUp)
│   │   ├── Home/           # Landing and home page components
│   │   ├── Investment/     # Investment management features
│   │   ├── NewsFeed/       # News, posts, and community feed
│   │   ├── Profile/        # User profile components
│   │   └── About/          # About page
│   ├── redux/              # Redux state management
│   │   ├── store.js        # Redux store configuration
│   │   └── slices/         # Redux slices (companies, groups, news, posts)
│   ├── lib/                # Utility functions and helpers
│   ├── assets/             # Images and static assets
│   ├── App.jsx             # Root application component
│   ├── main.jsx            # Application entry point
│   └── index.css            # Global styles
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── eslint.config.js        # ESLint rules
└── package.json            # Project dependencies
```

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based session management
- Protected routes and user data

### 📈 Investment Management
- Create and manage investment portfolios
- Track investment performance
- Real-time market data integration

### 📰 News & Community Feed
- Live market news and updates
- Create and share investment posts
- Community engagement through discussions
- Organized content by investment groups

### 🏢 Company Insights
- Detailed company information and analytics
- Market performance tracking
- Investment recommendations

### 👥 User Profiles
- Personalized user profiles
- Investment history and statistics
- User preferences and settings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18.3.1 |
| **Build Tool** | Vite |
| **State Management** | Redux Toolkit |
| **Styling** | Tailwind CSS, HeroUI |
| **Animations** | Framer Motion, GSAP |
| **HTTP Client** | Axios |
| **UI Components** | Radix UI, Lucide React |
| **Data Visualization** | Chart.js, React Chart.js |
| **Carousel** | Embla Carousel |
| **Drag & Drop** | dnd-kit |
| **Type Safety** | TypeScript |
| **Linting** | ESLint |

---

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `@reduxjs/toolkit` - State management
- `axios` - HTTP requests
- `react-router-dom` - Client-side routing

### Styling & UI
- `tailwindcss` - Utility-first CSS framework
- `@heroui/react` - Comprehensive UI component library
- `framer-motion` - Animation library
- `gsap` - Professional animation platform
- `lucide-react` - Icon library

### Data & Visualization
- `chart.js` - Charting library
- `react-chartjs-2` - React wrapper for Chart.js
- `embla-carousel-react` - Carousel component

### Utilities
- `clsx` - Conditional className utility
- `dotenv` - Environment variable management
- `cors` - CORS middleware

---

## 🎨 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Investment Hub
```

### Tailwind CSS
Configuration available in `tailwind.config.js` for custom theme customization.

---

## 📚 Documentation

### Component Documentation
- Each component is self-contained with clear prop interfaces
- Components follow React best practices and patterns

### API Integration
- API calls are centralized using Axios
- Redux state management handles global app state
- Slice-based organization for modular store

---

## 🐛 Debugging & Development

### Development Mode
```bash
npm run dev
```

### Lint Code
```bash
npm run lint
```

### Build & Test Production
```bash
npm run build
npm run preview
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Ensure your code passes linting
- Add tests for new features if applicable

---

## 📋 Performance Optimizations

- ⚡ Vite for lightning-fast HMR and builds
- 🎯 Code splitting for optimal bundle size
- 🖼️ Image optimization in public folder
- 🔄 Redux for efficient state management
- 📦 Tree-shaking for minimal production bundles

---

## 🔒 Security

- Environment variables for sensitive data
- Protected routes with authentication
- CORS configuration for API security
- Input validation and sanitization

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

Have questions or need help? 

- 📧 Email: support@investmenthub.com
- 💬 Discord: [Join our community](#)
- 🐛 Issues: [GitHub Issues](#)

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Powered by [Redux Toolkit](https://redux-toolkit.js.org)
- Enhanced with [HeroUI](https://heroui.com)

---

<div align="center">

**[⬆ back to top](#-investment-hub)**

Made with ❤️ by the Investment Hub Team

</div>
