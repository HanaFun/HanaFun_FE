import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext.tsx';
import Modal from './components/common/Modal.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { HanaMain } from './pages/main/HanaMain.tsx';
import { Login } from './pages/auth/Login.tsx';
import { HanaFunMain } from './pages/main/HanaFunMain.tsx';
import { QRPay } from './pages/main/QRPay.tsx';
import MyPage from './pages/mypage/MyPage.tsx';
import { LessonCalendar } from './pages/mypage/LessonCalendar.tsx';
import { OpenLessonMain } from './pages/openLesson/OpenLessonMain.tsx';
import { RegisterHost } from './pages/openLesson/RegisterHost.tsx';
import { RegisterLesson } from './pages/openLesson/RegisterLesson.tsx';
import { MyLessonList } from './pages/mypage/MyLessonList.tsx';
import { HostPage } from './pages/mypage/HostPage.tsx';
import { HostLessonCalendar } from './pages/mypage/HostLessonCalendar.tsx';
import { LessonSearch } from './pages/search/LessonSearch.tsx';
import { LessonDetail } from './pages/search/LessonDetail.tsx';
import { PayLesson } from './pages/search/PayLesson.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/main', element: <HanaMain /> },
      { path: '/login', element: <Login /> },
      { path: '/qr-pay', element: <QRPay /> },
      { path: '/open-lesson/host', element: <RegisterHost /> },
      { path: '/open-lesson/lesson', element: <RegisterLesson /> },
      { path: '/lesson/:id', element: <LessonDetail /> },
      { path: '/pay', element: <PayLesson /> },
      {
        element: <Navbar />,
        children: [
          { index: true, element: <HanaFunMain /> },
          { path: '/search', element: <LessonSearch /> },
          { path: '/open-lesson', element: <OpenLessonMain /> },
          { path: '/mypage', element: <MyPage /> },
          { path: '/lesson-calendar', element: <LessonCalendar /> },
          { path: '/my-lesson-list', element: <MyLessonList /> },
          { path: '/host', element: <HostPage /> },
          {
            path: '/host/lesson-calendar/1',
            element: <HostLessonCalendar />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <Modal />
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>
);
