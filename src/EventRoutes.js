import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CancelledEvents from './components/CancelledEvents'
import CompletedEvents from './components/CompletedEvents'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import RegisteredEvents from './components/RegisteredEvents'

export const EventRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login mode="LOGIN"/>}/>
      <Route path="/register" element={<Login  mode="REGISTER"/>}/>
      <Route path="/" element={<PrivateRoute activeTab={"HOME"}><Home /></PrivateRoute>} />
      <Route path="/events" element={<PrivateRoute activeTab={"HOME"}><Home /></PrivateRoute>} />
      {/* <Route path="/events/all-events" element={<PrivateRoute activeTab={"ALL_EVENTS"}><Dashboard /></PrivateRoute>} /> */}
      <Route path="/events/registered-events" element={<PrivateRoute activeTab={"REGISTERED_EVENTS"}><RegisteredEvents /></PrivateRoute>} />
      <Route path="/events/completed-events" element={<PrivateRoute activeTab={"COMPLETED_EVENTS"}><CompletedEvents /></PrivateRoute>} />
      <Route path="/events/cancelled-events" element={<PrivateRoute activeTab={"CANCELLED_EVENTS"}><CancelledEvents /></PrivateRoute>} />

    </Routes>
  )
}

