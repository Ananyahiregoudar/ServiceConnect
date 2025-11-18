import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative bg-gradient-to-r from-primary to-secondary rounded-3xl px-6 md:px-10 lg:px-20 overflow-hidden fade-in-up'>
            {/* Background pattern */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mt-32 -mr-32'></div>
                <div className='absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -mb-32 -ml-32'></div>
            </div>
            
            <div className='relative z-10 flex flex-col lg:flex-row items-center py-12 md:py-20'>
                {/* Left Content */}
                <div className='lg:w-1/2 flex flex-col items-start justify-center gap-6 py-10 text-white'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading'>
                        Professional Home <br />
                        <span className='text-accent'>Services Delivered</span>
                    </h1>
                    <p className='text-lg md:text-xl max-w-2xl opacity-90'>
                        Connect with trusted, verified professionals for all your home needs. 
                        From cleaning to repairs, we've got you covered with quality service at competitive prices.
                    </p>
                    
                    <div className='flex flex-col sm:flex-row gap-4 w-full max-w-lg'>
                        <button className='btn-primary flex-1'>
                            Book a Service
                        </button>
                        <button className='btn-secondary flex-1'>
                            How It Works
                        </button>
                    </div>
                    
                    <div className='flex items-center gap-6 mt-4'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3'>
                                <span className='text-white font-bold'>4.8</span>
                            </div>
                            <div>
                                <p className='font-semibold'>Excellent</p>
                                <p className='text-sm opacity-80'>Based on 2,500+ reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Content - Hero Image */}
                <div className='lg:w-1/2 mt-10 lg:mt-0 flex justify-center'>
                    <div className='relative float-slow'>
                        <div className='w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-white/20 backdrop-blur-sm absolute -top-6 -left-6'></div>
                        <div className='w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-white/20 backdrop-blur-sm absolute -bottom-6 -right-6'></div>
                        <div className='relative w-64 h-64 md:w-80 md:h-80 hero-image'>
                            <img 
                                src={assets.header_img} 
                                alt="Home Services" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Stats Bar */}
            <div className='relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-6 mb-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white'>
                    <div>
                        <p className='text-2xl md:text-3xl font-bold'>10K+</p>
                        <p className='text-sm opacity-80'>Happy Customers</p>
                    </div>
                    <div>
                        <p className='text-2xl md:text-3xl font-bold'>500+</p>
                        <p className='text-sm opacity-80'>Verified Pros</p>
                    </div>
                    <div>
                        <p className='text-2xl md:text-3xl font-bold'>50+</p>
                        <p className='text-sm opacity-80'>Service Types</p>
                    </div>
                    <div>
                        <p className='text-2xl md:text-3xl font-bold'>24/7</p>
                        <p className='text-sm opacity-80'>Support</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header