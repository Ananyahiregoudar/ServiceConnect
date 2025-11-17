import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

// Features data
const features = [
    {
        title: "Verified Professionals",
        description: "All our service providers are thoroughly vetted and background checked.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    },
    {
        title: "Transparent Pricing",
        description: "Know exactly what you'll pay with our upfront, no-hidden-fees pricing.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "Satisfaction Guaranteed",
        description: "Not happy with the service? We'll make it right or your money back.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
        )
    },
    {
        title: "24/7 Support",
        description: "Our customer support team is available around the clock to assist you.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
        )
    }
]

// How it works data
const howItWorks = [
    {
        step: "1",
        title: "Choose Service",
        description: "Browse our categories and select the service you need."
    },
    {
        step: "2",
        title: "Book Appointment",
        description: "Select date, time, and professional that suits you."
    },
    {
        step: "3",
        title: "Professional Arrives",
        description: "Our verified professional arrives at your scheduled time."
    },
    {
        step: "4",
        title: "Enjoy Service",
        description: "Sit back and enjoy quality service at your home."
    }
]

const Home = () => {
    return (
        <div className='bg-white'>
            {/* Hero Section */}
            <div className='px-4 md:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <Header />
                </div>
            </div>

            {/* Features Section */}
            <div className='py-16 px-4 md:px-8 bg-light'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-dark mb-4 font-heading'>
                            Why Choose ServiceConnect?
                        </h2>
                        <p className='text-gray-600 max-w-2xl mx-auto'>
                            We make home services simple, reliable, and affordable with our unique approach.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className='bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center hover:shadow-card-hover transition-all duration-300'
                            >
                                <div className='w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary'>
                                    {feature.icon}
                                </div>
                                <h3 className='text-xl font-semibold text-dark mb-2'>{feature.title}</h3>
                                <p className='text-gray-600'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className='py-16 px-4 md:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-dark mb-4 font-heading'>
                            How It Works
                        </h2>
                        <p className='text-gray-600 max-w-2xl mx-auto'>
                            Getting professional home services has never been easier.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {howItWorks.map((step, index) => (
                            <div 
                                key={index} 
                                className='relative bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center service-card'
                            >
                                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg'>
                                    {step.step}
                                </div>
                                <div className='pt-8'>
                                    <h3 className='text-xl font-semibold text-dark mb-3'>{step.title}</h3>
                                    <p className='text-gray-600'>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <SpecialityMenu />

            {/* Top Providers Section */}
            <TopDoctors />

            {/* CTA Banner */}
            <Banner />

            {/* Testimonials Section */}
            <div className='py-16 px-4 md:px-8 bg-light'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-dark mb-4 font-heading'>
                            What Our Customers Say
                        </h2>
                        <p className='text-gray-600 max-w-2xl mx-auto'>
                            Don't just take our word for it. Here's what our customers have to say.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {[1, 2, 3].map((item) => (
                            <div 
                                key={item} 
                                className='bg-white rounded-2xl p-6 shadow-card border border-gray-100'
                            >
                                <div className='flex items-center mb-4'>
                                    <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4'>
                                        <span className='text-gray-600 font-bold'>U{item}</span>
                                    </div>
                                    <div>
                                        <h4 className='font-semibold text-dark'>User {item}</h4>
                                        <div className='flex text-yellow-400'>
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className='text-gray-600 italic'>
                                    "The service was exceptional! The professional arrived on time and did an amazing job. 
                                    I'll definitely be booking again."
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home