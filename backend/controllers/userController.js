import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
}

// API to register user
const registerUser = async (req, res) => {

    try {
        let { name, email, password } = req.body;

        // basic validation
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing details' })
        }

        // normalise email
        email = email.toLowerCase().trim()

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }

        // check if user already exists
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already registered, please login' })
        }

        // validating password length
        if (password.length < 6) {
            return res.json({ success: false, message: 'Password should be at least 6 characters' })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({ success: true, token })

    } catch (error) {
        console.log(error)

        // handle duplicate email error more nicely
        if (error.code === 11000) {
            return res.json({ success: false, message: 'Email already in use' })
        }

        return res.json({ success: false, message: error.message || 'Something went wrong' })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Missing details' })
        }

        email = email.toLowerCase().trim()

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message || 'Something went wrong' })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book a service appointment
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime, docData: clientDocData } = req.body

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: 'Missing booking details' })
        }

        let docRecord = null
        let docData = null

        // If docId looks like a real Mongo ObjectId, use DB-backed service provider
        if (docId && /^[0-9a-fA-F]{24}$/.test(docId)) {
            docRecord = await doctorModel.findById(docId).select('-password')

            // service / provider not found
            if (!docRecord) {
                return res.json({ success: false, message: 'Service not found' })
            }

            // convert to plain object so we can safely strip internal fields
            docData = docRecord.toObject()
        } else {
            // Fallback for static/front-end-only services (e.g. "service1")
            if (!clientDocData) {
                return res.json({ success: false, message: 'Invalid service selected' })
            }
            docData = clientDocData
        }

        if (!docData.available) {
            return res.json({ success: false, message: 'Service not available' })
        }

        let slots_booked = docData.slots_booked || {}

        // checking for slot availability 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = [slotTime]
        }

        const userData = await userModel.findById(userId).select("-password")

        // do not embed internal slot map in each appointment document
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data back only if this is a DB-backed provider
        if (docId && /^[0-9a-fA-F]{24}$/.test(docId)) {
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        res.json({ success: true, message: 'Service booked successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel a booked service
const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body

        if (!userId || !appointmentId) {
            return res.json({ success: false, message: 'Missing cancel details' })
        }

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: 'Booking not found' })
        }

        // verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing provider slot (only for DB-backed providers)
        const { docId, slotDate, slotTime } = appointmentData

        if (docId && /^[0-9a-fA-F]{24}$/.test(docId)) {
            const doctorData = await doctorModel.findById(docId)

            if (doctorData && doctorData.slots_booked && doctorData.slots_booked[slotDate]) {
                let slots_booked = doctorData.slots_booked
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
                await doctorModel.findByIdAndUpdate(docId, { slots_booked })
            }
        }

        res.json({ success: true, message: 'Service booking cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all booked services for a user (My Appointments page)
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body

        if (!userId) {
            return res.json({ success: false, message: 'Missing user id' })
        }

        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {

        if (!razorpayInstance) {
            return res.json({ success: false, message: 'Razorpay not configured' })
        }

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        if (!razorpayInstance) {
            return res.json({ success: false, message: 'Razorpay not configured' })
        }
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const { origin } = req.headers

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Appointment Fees"
                },
                unit_amount: appointmentData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
            cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    try {

        const { appointmentId, success } = req.body

        if (success === "true") {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe
}