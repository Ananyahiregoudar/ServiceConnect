import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-4 md:px-8 py-8'>
        <div className='text-center text-2xl md:text-3xl font-bold text-dark mb-8 fade-in-up'>
            <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-12'>
            <img className='w-full md:max-w-[360px] rounded-2xl shadow-card object-cover fade-in-up' src={assets.about_image} alt="About BookMyService" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 fade-in-up'>
                <p>Welcome to BookMyService, your trusted partner in managing your home service needs conveniently and efficiently.
                    At BookMyService, we understand the challenges individuals face when it comes to scheduling home services and managing their service records.
                </p>
                <p>BookMyService is committed to excellence in home service technology.
                    We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
                    Whether you're booking your first service or managing ongoing care, BookMyService is here to support you every step of the way.
                </p>
                <b className='text-gray-800'>Our Vision</b>
                <p>Our vision at BookMyService is to create a seamless home service experience for every user.
                    We aim to bridge the gap between customers and service providers, making it easier for you to access the services you need, when you need them.
                </p>
            </div>
        </div>
        <div className='text-xl my-4 font-semibold text-dark fade-in-up'>
            <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
        </div>
        <div className='flex flex-col md:flex-row mb-20 gap-4'>
            <div className='service-card bg-white border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-2xl shadow-card'>
                <b>EFFICIENCY:</b>
                <p>Streamlined service scheduling that fits into your busy lifestyle.</p>
            </div>
            <div className='service-card bg-white border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-2xl shadow-card'>
                <b>CONVENIENCE:</b>
                <p>Access to a network of trusted service providers in your area.</p>
            </div>
            <div className='service-card bg-white border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-2xl shadow-card'>
                <b>PERSONALIZATION:</b>
                <p>Tailored recommendations and reminders to help you stay on top of your home maintenance.</p>
            </div>
        </div>
    </div>
  )
}

export default About