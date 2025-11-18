import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  // Get category color class
  const getCategoryColor = (category) => {
    const colors = {
      'House Cleaning': 'category-cleaning',
      'Electrician': 'category-electrician',
      'Plumbing': 'category-plumbing',
      'AC Repair': 'category-ac',
      'Appliance Repair': 'category-appliance',
      'Gardening': 'category-gardening'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='flex items-center justify-between text-sm py-4 px-6 md:px-10'>
        {/* Logo */}
        <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
          <div className='w-10 h-10 rounded-lg bg-primary flex items-center justify-center mr-3'>
            <span className='text-white font-bold text-xl'>B</span>
          </div>
          <span className='text-2xl font-bold text-dark'>BookMy<span className='text-primary'>Service</span></span>
        </div>

        {/* Desktop Navigation */}
        <ul className='md:flex items-center gap-8 font-medium hidden'>
          <NavLink to='/' className={({ isActive }) => `py-1 ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}>
            <li className='flex items-center'>
              Home
              <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </li>
          </NavLink>
          <NavLink to='/doctors' className={({ isActive }) => `py-1 ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}>
            <li className='flex items-center'>
              Services
              <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </li>
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => `py-1 ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}>
            <li className='flex items-center'>
              About
              <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </li>
          </NavLink>
          <NavLink to='/contact' className={({ isActive }) => `py-1 ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}>
            <li className='flex items-center'>
              Contact
              <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </li>
          </NavLink>
        </ul>

        {/* User Actions */}
        <div className='flex items-center gap-4'>
          {
            token && userData ? (
              <div className='flex items-center gap-3 cursor-pointer group relative'>
                <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold'>
                  {userData.name.charAt(0)}
                </div>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className='min-w-48 bg-white rounded-xl shadow-lg flex flex-col gap-2 p-4 border'>
                    <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors'>My Profile</p>
                    <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors'>My Bookings</p>
                    <div className='border-t border-gray-200 my-2'></div>
                    <p onClick={logout} className='hover:text-red-500 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors'>Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className='btn-primary hidden md:block'
              >
                Sign In
              </button>
            )
          }
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setShowMenu(true)} 
            className='w-8 h-8 flex flex-col justify-center items-center md:hidden'
          >
            <span className='w-6 h-0.5 bg-dark block mb-1'></span>
            <span className='w-6 h-0.5 bg-dark block'></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between p-6 border-b'>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-lg bg-primary flex items-center justify-center mr-3'>
                <span className='text-white font-bold text-xl'>B</span>
              </div>
              <span className='text-2xl font-bold text-dark'>BookMy<span className='text-primary'>Service</span></span>
            </div>
            <button onClick={() => setShowMenu(false)} className='w-8 h-8 flex flex-col justify-center items-center'>
              <span className='w-6 h-0.5 bg-dark block rotate-45 translate-y-1'></span>
              <span className='w-6 h-0.5 bg-dark block -rotate-45 -translate-y-1'></span>
            </button>
          </div>
          
          <div className='flex-1 flex flex-col p-6'>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/' 
              className='py-4 text-lg font-medium border-b'
            >
              Home
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/doctors' 
              className='py-4 text-lg font-medium border-b'
            >
              Services
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/about' 
              className='py-4 text-lg font-medium border-b'
            >
              About
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/contact' 
              className='py-4 text-lg font-medium border-b'
            >
              Contact
            </NavLink>
            
            {token && userData ? (
              <>
                <div className='mt-8 pt-4 border-t'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg'>
                      {userData.name.charAt(0)}
                    </div>
                    <div>
                      <p className='font-medium'>{userData.name}</p>
                      <p className='text-sm text-gray-500'>{userData.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { navigate('/my-profile'); setShowMenu(false); }} 
                    className='w-full py-3 text-left px-4 rounded-lg hover:bg-gray-100 mb-2'
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { navigate('/my-appointments'); setShowMenu(false); }} 
                    className='w-full py-3 text-left px-4 rounded-lg hover:bg-gray-100 mb-2'
                  >
                    My Bookings
                  </button>
                  <button 
                    onClick={() => { logout(); setShowMenu(false); }} 
                    className='w-full py-3 text-left px-4 rounded-lg hover:bg-gray-100 text-red-500'
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => { navigate('/login'); setShowMenu(false); }} 
                className='btn-primary mt-8 w-full'
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar