import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                // Fix: Check if slots_booked exists and is an object
                const bookedSlots = docInfo.slots_booked || {}
                const isSlotAvailable = bookedSlots[slotDate] && bookedSlots[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book service')
            return navigate('/login')
        }

        // Fix: Check if docSlots and selected slot exist
        if (!docSlots[slotIndex] || !docSlots[slotIndex][0]) {
            toast.error('Please select a valid service slot')
            return
        }

        if (!slotTime) {
            toast.error('Please select a service time')
            return
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

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

    return docInfo ? (
        <div className='px-4 md:px-8 py-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Breadcrumb */}
                <div className='mb-6'>
                    <nav className='text-sm'>
                        <ol className='flex items-center space-x-2'>
                            <li>
                                <a href='/' className='text-primary hover:underline'>Home</a>
                            </li>
                            <li>
                                <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                </svg>
                            </li>
                            <li>
                                <a href='/doctors' className='text-primary hover:underline'>Services</a>
                            </li>
                            <li>
                                <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                </svg>
                            </li>
                            <li className='text-gray-500'>{docInfo.name}</li>
                        </ol>
                    </nav>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Provider Info */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden'>
                            <div className='md:flex'>
                                <div className='md:w-2/5'>
                                    <img 
                                        className='w-full h-64 md:h-full object-cover' 
                                        src={docInfo.image} 
                                        alt={docInfo.name} 
                                    />
                                </div>
                                <div className='p-6 md:w-3/5'>
                                    <div className='flex flex-wrap justify-between items-start gap-4 mb-4'>
                                        <div>
                                            <h1 className='text-2xl font-bold text-dark mb-1'>{docInfo.name}</h1>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <span className={`category-badge ${getCategoryColor(docInfo.speciality)}`}>
                                                    {docInfo.speciality}
                                                </span>
                                                <div className='flex items-center'>
                                                    <svg className='w-4 h-4 text-yellow-400 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                                                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                                    </svg>
                                                    <span className='font-semibold'>{docInfo.rating || 4.8}</span>
                                                    <span className='text-gray-500 ml-1'>({docInfo.reviews || 127})</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            docInfo.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {docInfo.available ? 'Available' : 'Not Available'}
                                        </div>
                                    </div>

                                    <div className='mb-6'>
                                        <h2 className='text-lg font-semibold text-dark mb-2'>About</h2>
                                        <p className='text-gray-600'>
                                            {docInfo.about || docInfo.description}
                                        </p>
                                    </div>

                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
                                        <div className='flex items-center'>
                                            <svg className='w-5 h-5 text-primary mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                            </svg>
                                            <div>
                                                <p className='text-sm text-gray-500'>Experience</p>
                                                <p className='font-medium'>{docInfo.experience}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <svg className='w-5 h-5 text-primary mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                            </svg>
                                            <div>
                                                <p className='text-sm text-gray-500'>Reviews</p>
                                                <p className='font-medium'>{docInfo.reviews || 127}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <svg className='w-5 h-5 text-primary mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                            </svg>
                                            <div>
                                                <p className='text-sm text-gray-500'>Location</p>
                                                <p className='font-medium'>{docInfo.location || docInfo.address?.line2}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <svg className='w-5 h-5 text-primary mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                            </svg>
                                            <div>
                                                <p className='text-sm text-gray-500'>Starting Price</p>
                                                <p className='font-medium text-lg text-dark'>₹{docInfo.fees || docInfo.startingPrice}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className='text-lg font-semibold text-dark mb-2'>Services Offered</h2>
                                        <div className='flex flex-wrap gap-2'>
                                            {docInfo.services ? (
                                                docInfo.services.map((service, index) => (
                                                    <span key={index} className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'>
                                                        {service}
                                                    </span>
                                                ))
                                            ) : (
                                                <p className='text-gray-600'>General {docInfo.speciality} services</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Panel */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-2xl shadow-card border border-gray-100 p-6 sticky top-24'>
                            <h2 className='text-xl font-bold text-dark mb-6'>Book Service</h2>
                            
                            <div className='mb-6'>
                                <h3 className='font-semibold text-dark mb-3'>Select Date</h3>
                                <div className='flex gap-2 overflow-x-auto pb-2'>
                                    {docSlots.length && docSlots.map((item, index) => (
                                        <button
                                            onClick={() => setSlotIndex(index)}
                                            key={index}
                                            className={`flex-shrink-0 w-20 py-3 rounded-lg text-center transition-colors ${
                                                slotIndex === index 
                                                    ? 'bg-primary text-white' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <p className='font-medium'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                            <p className='text-sm'>{item[0] && item[0].datetime.getDate()}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='mb-6'>
                                <h3 className='font-semibold text-dark mb-3'>Select Time</h3>
                                <div className='grid grid-cols-3 gap-2'>
                                    {docSlots.length && docSlots[slotIndex]?.map((item, index) => (
                                        <button
                                            onClick={() => setSlotTime(item.time)}
                                            key={index}
                                            className={`py-2 rounded-lg text-center text-sm transition-colors ${
                                                item.time === slotTime
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {item.time.toLowerCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='border-t border-gray-200 pt-4 mb-6'>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-gray-600'>Service Price</span>
                                    <span className='font-medium'>₹{docInfo.fees || docInfo.startingPrice}</span>
                                </div>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-gray-600'>Service Fee</span>
                                    <span className='font-medium'>₹49</span>
                                </div>
                                <div className='flex justify-between items-center pt-2 border-t border-gray-200'>
                                    <span className='font-semibold'>Total</span>
                                    <span className='font-bold text-lg'>₹{docInfo.fees ? docInfo.fees + 49 : (docInfo.startingPrice || 0) + 49}</span>
                                </div>
                            </div>

                            <button
                                onClick={bookAppointment}
                                className='btn-primary w-full py-3'
                                disabled={!slotTime}
                            >
                                Confirm Booking
                            </button>

                            <div className='mt-4 text-center text-sm text-gray-500'>
                                <p>You will be charged only after the service is completed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Providers */}
                <div className='mt-12'>
                    <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
                </div>
            </div>
        </div>
    ) : null
}

export default Appointment