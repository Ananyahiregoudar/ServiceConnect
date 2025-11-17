import React from 'react'
import { serviceCategories } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    // Get category color class
    const getCategoryColor = (category) => {
        const colors = {
            'House Cleaning': 'bg-cleaning/20 text-cleaning',
            'Electrician': 'bg-electrician/20 text-electrician',
            'Plumbing': 'bg-plumbing/20 text-plumbing',
            'AC Repair': 'bg-ac-repair/20 text-ac-repair',
            'Appliance Repair': 'bg-appliance/20 text-appliance',
            'Gardening': 'bg-gardening/20 text-gardening'
        }
        return colors[category] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div id='speciality' className='py-16 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold text-dark mb-4 font-heading'>
                        Popular Home Services
                    </h2>
                    <p className='text-gray-600 max-w-2xl mx-auto'>
                        Discover our most requested services. All our professionals are verified and rated by customers like you.
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {serviceCategories.map((item, index) => (
                        <Link 
                            to={`/doctors/${item.category}`} 
                            onClick={() => scrollTo(0, 0)} 
                            key={index}
                            className='service-card bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:border-primary transition-all duration-300'
                        >
                            <div className='flex items-center mb-4'>
                                <div className='w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mr-4'>
                                    <img src={item.image} alt={item.category} className='w-8 h-8' />
                                </div>
                                <h3 className='text-xl font-semibold text-dark'>{item.category}</h3>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className={`category-badge ${getCategoryColor(item.category)}`}>
                                    {item.category}
                                </span>
                                <span className='text-primary font-medium flex items-center'>
                                    Explore
                                    <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className='text-center mt-12'>
                    <Link 
                        to='/doctors' 
                        className='btn-secondary inline-flex items-center'
                    >
                        View All Services
                        <svg className='w-5 h-5 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SpecialityMenu