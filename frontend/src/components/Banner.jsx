import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='py-16 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='bg-gradient-to-r from-primary to-secondary rounded-3xl overflow-hidden shadow-hero'>
                    <div className='flex flex-col md:flex-row items-center p-8 md:p-12 lg:p-16'>
                        <div className='md:w-1/2 mb-8 md:mb-0 md:pr-8'>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 font-heading'>
                                Ready to Transform Your Home?
                            </h2>
                            <p className='text-white/90 text-lg mb-6'>
                                Join thousands of satisfied customers who trust ServiceConnect for all their home service needs. 
                                Professional, reliable, and affordable services delivered to your doorstep.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <button 
                                    onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                                    className='btn-primary bg-white text-primary hover:bg-gray-100'
                                >
                                    Get Started
                                </button>
                                <button 
                                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                                    className='btn-secondary bg-white/20 text-white border-white hover:bg-white/30'
                                >
                                    Browse Services
                                </button>
                            </div>
                        </div>
                        
                        <div className='md:w-1/2 flex justify-center'>
                            <div className='relative'>
                                <div className='w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-white/20 backdrop-blur-sm absolute -top-4 -left-4'></div>
                                <div className='w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-white/20 backdrop-blur-sm absolute -bottom-4 -right-4'></div>
                                <div className='relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-hero'>
                                    <img 
                                        className='w-full h-full object-cover' 
                                        src={assets.appointment_img} 
                                        alt="Home Services" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner