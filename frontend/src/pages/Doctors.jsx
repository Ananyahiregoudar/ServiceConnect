import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { serviceImages } from '../assets/assets'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)

  // Service categories
  const serviceCategories = [
    'House Cleaning',
    'Electrician',
    'Plumbing',
    'AC Repair',
    'Appliance Repair',
    'Gardening'
  ]

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

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
    <div className='px-4 md:px-8 py-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-dark mb-2 font-heading'>
            {speciality ? `${speciality} Services` : 'All Home Services'}
          </h1>
          <p className='text-gray-600'>
            {speciality 
              ? `Browse through our trusted ${speciality} service providers` 
              : 'Browse through our extensive list of trusted service providers'}
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilter ? 'block' : 'hidden lg:block'}`}>
            <div className='bg-white rounded-2xl shadow-card p-6 border border-gray-100 sticky top-24'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-dark'>Filters</h2>
                <button 
                  onClick={() => setShowFilter(false)} 
                  className='lg:hidden text-gray-500 hover:text-dark'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>

              <div className='space-y-6'>
                <div>
                  <h3 className='font-medium text-dark mb-3'>Service Categories</h3>
                  <div className='space-y-2'>
                    <button
                      onClick={() => speciality ? navigate('/doctors') : null}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        !speciality 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      All Services
                    </button>
                    {serviceCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => speciality === category ? navigate('/doctors') : navigate(`/doctors/${category}`)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${
                          speciality === category 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{category}</span>
                        <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>
                          {doctors.filter(doc => doc.speciality === category).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='font-medium text-dark mb-3'>Price Range</h3>
                  <div className='space-y-3'>
                    <div className='flex items-center'>
                      <input type='checkbox' id='under50' className='mr-2' />
                      <label htmlFor='under50' className='text-gray-700'>Under ₹50</label>
                    </div>
                    <div className='flex items-center'>
                      <input type='checkbox' id='50to100' className='mr-2' />
                      <label htmlFor='50to100' className='text-gray-700'>₹50 - ₹100</label>
                    </div>
                    <div className='flex items-center'>
                      <input type='checkbox' id='100to200' className='mr-2' />
                      <label htmlFor='100to200' className='text-gray-700'>₹100 - ₹200</label>
                    </div>
                    <div className='flex items-center'>
                      <input type='checkbox' id='over200' className='mr-2' />
                      <label htmlFor='over200' className='text-gray-700'>Over ₹200</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-medium text-dark mb-3'>Availability</h3>
                  <div className='space-y-3'>
                    <div className='flex items-center'>
                      <input type='checkbox' id='available' className='mr-2' />
                      <label htmlFor='available' className='text-gray-700'>Available Today</label>
                    </div>
                    <div className='flex items-center'>
                      <input type='checkbox' id='weekend' className='mr-2' />
                      <label htmlFor='weekend' className='text-gray-700'>Weekend Available</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-3/4'>
            {/* Mobile Filter Button */}
            <div className='lg:hidden mb-6'>
              <button
                onClick={() => setShowFilter(true)}
                className='btn-secondary w-full flex items-center justify-center'
              >
                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                </svg>
                Filter Services
              </button>
            </div>

            {/* Results Header */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
              <div>
                <p className='text-gray-600'>
                  Showing <span className='font-semibold'>{filterDoc.length}</span> service providers
                </p>
              </div>
              <div className='flex items-center'>
                <span className='text-gray-600 mr-2'>Sort by:</span>
                <select className='border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary'>
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Lowest Price</option>
                  <option>Highest Price</option>
                </select>
              </div>
            </div>

            {/* Service Providers Grid */}
            {filterDoc.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {filterDoc.map((item, index) => (
                  <div 
                    key={index} 
                    className='service-card bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100'
                  >
                    <div className='md:flex'>
                      <div className='md:w-1/3'>
                        <img 
                          className='w-full h-48 md:h-full object-cover' 
                          src={serviceImages[item.speciality] || item.image} 
                          alt={`${item.speciality} service`} 
                        />
                      </div>
                      <div className='p-6 md:w-2/3'>
                        <div className='flex justify-between items-start mb-3'>
                          <h3 className='text-xl font-semibold text-dark'>{item.speciality} Service</h3>
                          <span className={`category-badge ${getCategoryColor(item.speciality)}`}>
                            {item.speciality}
                          </span>
                        </div>
                        
                        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                          {item.about || item.description}
                        </p>
                        
                        <div className='flex flex-wrap gap-2 mb-4'>
                          {item.services && item.services.slice(0, 3).map((service, idx) => (
                            <span key={idx} className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded'>
                              {service}
                            </span>
                          ))}
                          {item.services && item.services.length > 3 && (
                            <span className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded'>
                              +{item.services.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className='flex justify-between items-center mb-4'>
                          <div className='flex items-center'>
                            <svg className='w-4 h-4 text-yellow-400 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                            <span className='text-sm font-semibold'>{item.rating || 4.8}</span>
                            <span className='text-gray-500 text-sm ml-1'>({item.reviews || 127})</span>
                          </div>
                          <div className='flex items-center'>
                            <svg className='w-4 h-4 text-gray-500 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <span className='text-sm text-gray-600'>{item.experience}</span>
                          </div>
                        </div>
                        
                        <div className='flex justify-between items-center'>
                          <div>
                            <span className='text-gray-500 text-sm'>Starting at</span>
                            <p className='text-lg font-bold text-dark'>₹{item.fees || item.startingPrice}</p>
                          </div>
                          <button 
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                            className='btn-primary py-2 px-4 text-sm'
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='bg-white rounded-2xl shadow-card border border-gray-100 p-12 text-center'>
                <svg className='w-16 h-16 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <h3 className='text-xl font-semibold text-dark mb-2'>No Service Providers Found</h3>
                <p className='text-gray-600 mb-6'>
                  We couldn't find any service providers matching your criteria. Try adjusting your filters.
                </p>
                <button 
                  onClick={() => navigate('/doctors')}
                  className='btn-primary'
                >
                  View All Services
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors