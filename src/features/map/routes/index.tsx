import { Navigate, Route, Routes } from 'react-router-dom';

export function MapRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>지도</div>} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}
