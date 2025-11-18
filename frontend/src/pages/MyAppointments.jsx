import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets, serviceImages } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')           // holds selected appointmentId for dummy payment
    const [paymentStatus, setPaymentStatus] = useState('idle') // 'idle' | 'processing' | 'success'

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }   

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Dummy payment handler (no real API / gateway)
    const handleDummyPayment = () => {
        if (!payment) return

        setPaymentStatus('processing')

        setTimeout(() => {
            setPaymentStatus('success')

            // Mark selected appointment as paid in local state only (no API)
            setAppointments(prev => prev.map(app => 
                app._id === payment ? { ...app, payment: true } : app
            ))
        }, 1500)
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='px-4 md:px-8 py-8'>
            <p className='pb-3 mt-4 text-2xl md:text-3xl font-bold text-dark border-b fade-in-up'>My Service Appointments</p>
            <div className='mt-4'>
                {appointments.map((item, index) => (
                    <div key={index} className='service-card bg-white rounded-2xl shadow-card border border-gray-100 p-4 sm:p-6 mb-4 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6'>
                        <div>
                            <img className='w-36 h-32 rounded-2xl object-cover bg-[#EAEFFF]' src={serviceImages[item.docData.speciality] || item.docData.image} alt={`${item.docData.speciality} service`} />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.docData.speciality} Service</p>
                            <p className='text-[#464646] font-medium mt-1'>Address:</p>
                            <p className=''>{item.docData.address.line1}</p>
                            <p className=''>{item.docData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && (
                                <button 
                                    onClick={() => { setPayment(item._id); setPaymentStatus('idle') }} 
                                    className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                                >
                                    Pay Online
                                </button>
                            )}
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <button className='sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]'>Paid</button>
                            )}

                            {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

                            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Service</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Service Cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Dummy Payment Modal */}
            {payment && (
                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4'>
                    <div className='bg-white rounded-2xl shadow-card max-w-md w-full p-6 animate-fade-in'>
                        <div className='flex justify-between items-start mb-4'>
                            <h3 className='text-xl font-semibold text-dark'>Payment Summary</h3>
                            <button 
                                onClick={() => { setPayment(''); setPaymentStatus('idle') }} 
                                className='text-gray-500 hover:text-dark'
                            >
                                ✕
                            </button>
                        </div>

                        {(() => {
                            const current = appointments.find(app => app._id === payment)
                            if (!current) return null

                            return (
                                <>
                                    <p className='text-sm text-gray-600 mb-4'>
                                        You are about to pay for <span className='font-medium'>{current.docData.speciality} Service</span> on{' '}
                                        {slotDateFormat(current.slotDate)} at {current.slotTime}.
                                    </p>

                                    <div className='border rounded-xl p-4 mb-4 bg-gray-50'>
                                        <div className='flex justify-between text-sm mb-1'>
                                            <span className='text-gray-600'>Service Price</span>
                                            <span className='font-medium'>₹{current.docData.fees || current.docData.startingPrice}</span>
                                        </div>
                                        <div className='flex justify-between text-sm mb-1'>
                                            <span className='text-gray-600'>Service Fee</span>
                                            <span className='font-medium'>₹49</span>
                                        </div>
                                        <div className='flex justify-between text-sm pt-2 border-t border-gray-200'>
                                            <span className='font-semibold'>Total</span>
                                            <span className='font-bold text-lg'>₹{(current.docData.fees || current.docData.startingPrice || 0) + 49}</span>
                                        </div>
                                    </div>

                                    {paymentStatus === 'idle' && (
                                        <button 
                                            onClick={handleDummyPayment}
                                            className='btn-primary w-full py-3'
                                        >
                                            Pay Securely
                                        </button>
                                    )}

                                    {paymentStatus === 'processing' && (
                                        <div className='flex flex-col items-center gap-3 py-4'>
                                            <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
                                            <p className='text-sm text-gray-600'>Processing your payment...</p>
                                        </div>
                                    )}

                                    {paymentStatus === 'success' && (
                                        <div className='flex flex-col items-center gap-3 py-4'>
                                            <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center'>
                                                <span className='text-green-600 text-2xl'>✓</span>
                                            </div>
                                            <p className='text-sm font-medium text-green-700'>Payment Successful</p>
                                            <button 
                                                onClick={() => { setPayment(''); setPaymentStatus('idle') }} 
                                                className='btn-secondary mt-2'
                                            >
                                                Close
                                            </button>
                                        </div>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyAppointments