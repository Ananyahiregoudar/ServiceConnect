import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { serviceImages } from '../assets/assets'

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

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
        <div className='py-12 px-4 md:px-8 bg-light'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-dark mb-4 font-heading'>
                        Related Service Providers
                    </h2>
                    <p className='text-gray-600 max-w-2xl mx-auto'>
                        Check out other trusted providers offering similar services.
                    </p>
                </div>

                {relDoc.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {relDoc.slice(0, 4).map((item, index) => (
                            <div 
                                key={index} 
                                className='service-card bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100'
                            >
                                <div className='relative'>
                                    <img 
                                        className='w-full h-48 object-cover' 
                                        src={serviceImages[item.speciality] || item.image} 
                                        alt={`${item.speciality} service`} 
                                    />
                                    <div className='absolute top-4 right-4'>
                                        <div className='flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1'>
                                            <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                            </svg>
                                            <span className='text-sm font-semibold ml-1'>{item.rating || 4.8}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='p-6'>
                                    <div className='flex justify-between items-start mb-3'>
                                        <h3 className='text-xl font-semibold text-dark'>{item.speciality} Service</h3>
                                        <span className={`category-badge ${getCategoryColor(item.speciality)}`}>
                                            {item.speciality}
                                        </span>
                                    </div>
                                    
                                    <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                                        {item.about || item.description}
                                    </p>
                                    
                                    <div className='flex justify-between items-center mb-4'>
                                        <div className='flex items-center'>
                                            <svg className='w-4 h-4 text-gray-500 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                            </svg>
                                            <span className='text-sm text-gray-600'>{item.experience}</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <svg className='w-4 h-4 text-gray-500 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                            </svg>
                                            <span className='text-sm text-gray-600'>{item.reviews || 127} reviews</span>
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
                        ))}
                    </div>
                ) : (
                    <div className='bg-white rounded-2xl shadow-card border border-gray-100 p-12 text-center'>
                        <svg className='w-16 h-16 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        <h3 className='text-xl font-semibold text-dark mb-2'>No Related Providers</h3>
                        <p className='text-gray-600'>
                            We couldn't find any related service providers at the moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RelatedDoctors