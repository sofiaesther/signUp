# Project Name

## **Overview**
This project is a multi-step sign-up form that allows users to enter their personal information, select a country and language, and submit the form. The main goal of the project was to focus on front-end development, and all data is mocked instead of being fetched from an actual API.

## **Features**
- Multi-step form with real-time validation
- Local storage support to persist user input
- Country-specific form fields
- Dynamic field validation rules
- Progress bar to track form completion
- Translations for multiple languages

## **Back-End**
All data in this project is mocked in three files in the `public` folder. Since the focus of the project was front-end development, all integrations with external APIs were simulated.

## **Tech Stack**
- **Front-End**: React, Next.js, TypeScript, Tailwind CSS
- **State Management**: React hooks
- **Form Handling**: React Final Form
- **Localization**: next-intl
- **Storage**: Local Storage

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/sofiaesther/signUp.git
cd signUp
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Run the Development Server**
```bash
npm run dev
```
This will start the project at `http://localhost:3000`.

### **4. Build for Production**
```bash
npm run build
```

## **Project Structure**
```
├── public/                 # Mocked API data
├── src/
│   ├── app/               # Next.js app structure
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom hooks
│   ├── services/          # Mocked API services
│   ├── services/          # Mocked API services
│   ├── constants.ts       # Constants used throughout the app
│   ├── middleware.ts      # Middlewares
│   ├── i18n/              # Localization files
│   └── pages/             # Page components
├── package.json           # Project dependencies
└── README.md              # Documentation
```

## **Usage**
1. **Select a country and language**: The form adapts dynamically based on the selected country.
2. **Fill in the required fields**: Each country has specific validation rules.
3. **Check the progress bar**: Tracks form completion.
4. **Submit the form**: Data will be stored and simulated as if sent to an API.

## **Customization**
- To add more countries and fields, modify the JSON files in `public/`.
- To change translations, edit the files in `src/i18n/`.
- Tailwind CSS is used for styling, allowing easy customization.

## **Contributing**
Pull requests are welcome! Please ensure any modifications maintain code consistency and readability.

## **License**
This project is licensed under the MIT License.

