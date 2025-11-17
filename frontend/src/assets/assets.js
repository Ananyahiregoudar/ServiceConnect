import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

// Service provider profile images (using existing doctor images as placeholders)
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'

// Service category icons
import HouseCleaning from './HouseCleaning.svg'
import Electrician from './Electrician.svg'
import Plumber from './Plumber.svg'
import ACRepair from './ACRepair.svg'
import ApplianceRepair from './ApplianceRepair.svg'
import Gardening from './Gardening.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const serviceCategories = [
    {
        category: 'House Cleaning',
        image: HouseCleaning
    },
    {
        category: 'Electrician',
        image: Electrician
    },
    {
        category: 'Plumbing',
        image: Plumber
    },
    {
        category: 'AC Repair',
        image: ACRepair
    },
    {
        category: 'Appliance Repair',
        image: ApplianceRepair
    },
    {
        category: 'Gardening',
        image: Gardening
    },
]

export const doctors = [
    {
        _id: 'service1',
        name: 'Sarah Johnson',
        image: doc1,
        speciality: 'House Cleaning',
        degree: 'Professional Cleaner',
        experience: '5 Years',
        about: 'Professional house cleaning services with eco-friendly products. Specializing in deep cleaning, regular maintenance, and post-construction cleanup.',
        fees: 50,
        address: {
            line1: '123 Main Street',
            line2: 'Downtown Area'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service2',
        name: 'Mike Chen',
        image: doc2,
        speciality: 'Electrician',
        degree: 'Licensed Electrician',
        experience: '8 Years',
        about: 'Licensed electrician specializing in residential electrical installations, repairs, and safety inspections.',
        fees: 75,
        address: {
            line1: '456 Oak Avenue',
            line2: 'North Side'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service3',
        name: 'Lisa Rodriguez',
        image: doc3,
        speciality: 'Plumbing',
        degree: 'Expert Plumber',
        experience: '6 Years',
        about: 'Expert plumber for all your water-related needs. From leak repairs to complete bathroom renovations.',
        fees: 60,
        address: {
            line1: '789 Pine Road',
            line2: 'East District'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service4',
        name: 'David Wilson',
        image: doc4,
        speciality: 'AC Repair',
        degree: 'Certified HVAC Technician',
        experience: '10 Years',
        about: 'Certified HVAC technician with expertise in AC installation, repair, and maintenance services.',
        fees: 80,
        address: {
            line1: '321 Elm Street',
            line2: 'West End'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service5',
        name: 'Emma Thompson',
        image: doc5,
        speciality: 'Appliance Repair',
        degree: 'Professional Appliance Repair Specialist',
        experience: '7 Years',
        about: 'Professional appliance repair specialist for washing machines, refrigerators, dishwashers, and more.',
        fees: 65,
        address: {
            line1: '654 Maple Drive',
            line2: 'Central Area'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service6',
        name: 'James Parker',
        image: doc6,
        speciality: 'Gardening',
        degree: 'Expert Gardener',
        experience: '12 Years',
        about: 'Expert gardener providing landscaping, lawn care, and garden maintenance services.',
        fees: 40,
        address: {
            line1: '987 Cedar Lane',
            line2: 'South Valley'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service7',
        name: 'Maria Garcia',
        image: doc7,
        speciality: 'House Cleaning',
        degree: 'Reliable Cleaner',
        experience: '4 Years',
        about: 'Reliable house cleaning service with attention to detail. Specializing in move-in and move-out cleaning.',
        fees: 45,
        address: {
            line1: '147 Birch Street',
            line2: 'Downtown Area'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service8',
        name: 'Robert Kim',
        image: doc8,
        speciality: 'Electrician',
        degree: 'Master Electrician',
        experience: '9 Years',
        about: 'Master electrician with expertise in smart home installations and electrical troubleshooting.',
        fees: 85,
        address: {
            line1: '258 Spruce Avenue',
            line2: 'North Side'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service9',
        name: 'Anna Martinez',
        image: doc9,
        speciality: 'Plumbing',
        degree: 'Experienced Plumber',
        experience: '5 Years',
        about: 'Experienced plumber focusing on emergency repairs and water system installations.',
        fees: 55,
        address: {
            line1: '369 Willow Road',
            line2: 'East District'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service10',
        name: 'Chris Anderson',
        image: doc10,
        speciality: 'AC Repair',
        degree: 'Air Conditioning Specialist',
        experience: '8 Years',
        about: 'Air conditioning specialist offering comprehensive HVAC solutions for residential properties.',
        fees: 70,
        address: {
            line1: '741 Aspen Drive',
            line2: 'West End'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service11',
        name: 'Sophie Davis',
        image: doc11,
        speciality: 'Appliance Repair',
        degree: 'Skilled Appliance Technician',
        experience: '6 Years',
        about: 'Skilled appliance technician with expertise in major home appliances and troubleshooting.',
        fees: 60,
        address: {
            line1: '852 Redwood Lane',
            line2: 'Central Area'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service12',
        name: 'Tony Green',
        image: doc12,
        speciality: 'Gardening',
        degree: 'Professional Landscaper',
        experience: '15 Years',
        about: 'Professional landscaper specializing in sustainable gardening and eco-friendly solutions.',
        fees: 50,
        address: {
            line1: '963 Fir Street',
            line2: 'South Valley'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service13',
        name: 'Jennifer Lee',
        image: doc13,
        speciality: 'House Cleaning',
        degree: 'Detail-Oriented Cleaner',
        experience: '3 Years',
        about: 'Detail-oriented cleaner offering personalized cleaning services for homes and small offices.',
        fees: 40,
        address: {
            line1: '159 Cypress Avenue',
            line2: 'Downtown Area'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service14',
        name: 'Mark Johnson',
        image: doc14,
        speciality: 'Electrician',
        degree: 'Senior Electrician',
        experience: '11 Years',
        about: 'Senior electrician providing commercial and residential electrical services with safety focus.',
        fees: 90,
        address: {
            line1: '357 Hemlock Road',
            line2: 'North Side'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service15',
        name: 'Nancy Wilson',
        image: doc15,
        speciality: 'Plumbing',
        degree: 'Professional Plumber',
        experience: '7 Years',
        about: 'Professional plumber with expertise in modern plumbing technologies and eco-friendly solutions.',
        fees: 65,
        address: {
            line1: '246 Magnolia Drive',
            line2: 'East District'
        },
        available: true,
        slots_booked: {}
    }
]