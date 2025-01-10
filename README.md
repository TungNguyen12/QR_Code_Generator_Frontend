# QR Code Generator Frontend

This project is a QR Code Generator frontend built using **React**, **TypeScript**, and **Material UI**. It allows users to generate custom QR codes with various customization options, manage generated QR codes, and perform actions like downloading and deleting QR codes. The app also includes user authentication with JWT and state management using Redux Toolkit with data persistence.

Visit my <a href="https://qrcodes-junction.netlify.app/" target="_blank" rel="noopener noreferrer">QR Generator app</a>

## Features

- **User Authentication**: Secure login and registration using JWT.
- **QR Code Generation**: Generate QR codes with custom colors, titles, and logos.
- **QR Code Management**: Save generated QR codes, view history, download, and delete them.
- **State Management**: Utilizes Redux Toolkit and `redux-persist` for state management and persistence.
- **Material UI**: Styled using Material UI components and theming.

## Project Structure

```plaintext
│   App.css
│   App.tsx
│   index.css
│   index.tsx
│   theme.ts
│
├───assets
│   └───images
│           brandlogo.png
│           junction.svg
│           navbarwave.svg
│           platform.png
│           sample_qr.png
│
├───components
│   │   BackButton.tsx
│   │   Footer.tsx
│   │   InputField.tsx
│   │   NavBar.tsx
│   │   QRCodeCard.tsx
│   │   QRCodeDisplay.tsx
│   │
│   ├───layout
│   │       Layout.tsx
│   │
│   └───ui
│           StyledComponents.tsx
│
├───hooks
│       useAppDispatch.ts
│       useAppSelector.ts
│       useQrCodeForm.ts
│
├───pages
│   │   Dashboard.tsx
│   │   History.tsx
│   │
│   └───auth
│           AuthForm.tsx
│           CheckLogin.tsx
│           Login.tsx
│           Register.tsx
│
├───redux
│   │   store.ts
│   │
│   └───slices
│           authSlice.ts
│           historySlice.ts
│           qrCodeSlice.ts
│
├───types
│   │   credentials.ts
│   │   qrcode.ts
│   │   registerForm.ts
│   │
│   └───image
│           images.d.ts
│
├───utils
│       api.ts
│       common.ts
│
└───validation
        schemas.ts
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd qr_code_generator_frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file in the root directory with the following:

   ```plaintext
   PORT=3000
   BACKEND_API_URL=https://qrcodegenerator2025-a002816765f7.herokuapp.com/
   ```

4. **Run the app:**
   ```bash
   npm start
   ```

## Usage

- **Register/Login**: Access the app and register or log in with your credentials.
- **Generate QR Code**: Input URL, title, colors, and optional logo to generate a custom QR code.
- **Manage QR Codes**: View, download, and delete generated QR codes.

## Technologies Used

- **React** (18.3.1)
- **TypeScript**
- **Material UI** (MUI v6)
- **Redux Toolkit** with `redux-persist`
- **React Hook Form**
- **Yup Validation**
- **Axios**

## Scripts

- `npm start` – Runs the app in development mode.
- `npm run build` – Builds the app for production.
- `npm test` – Launches the test runner.

## License

This project is licensed under the MIT License.
