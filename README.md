# Interactive Wall Calendar Component

A beautifully crafted, interactive calendar component built with Next.js and Tailwind CSS. This component emulates a physical wall calendar with a hero image, day range selection, and an integrated notes system.

## Features

### Core Requirements
- **Wall Calendar Aesthetic**: Paper texture, pushpin detail, and elegant typography
- **Day Range Selector**: Select start and end dates with clear visual states (start, end, and in-between)
- **Integrated Notes Section**: 
  - Monthly memos that persist per month
  - Range-specific notes that save for individual date ranges
- **Fully Responsive**: Desktop (side-by-side layout) and mobile (stacked layout)

### Creative Additions
- **Holiday Markers**: Predefined holidays with emoji indicators on the calendar
- **Dynamic Hero Image**: Cycle through 4 beautiful Unsplash images
- **Today Button**: Quick navigation to current month
- **Smooth Animations**: Hover effects, transitions, and subtle bounce animations
- **Local Storage Persistence**: All notes and images are saved in your browser

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom paper texture
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **State Management**: React hooks + localStorage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/calendar-app.git
cd calendar-app