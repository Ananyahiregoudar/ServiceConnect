// Core UI icons and logos
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

// Service category icons
import HouseCleaning from './HouseCleaning.svg'
import Electrician from './Electrician.svg'
import Plumber from './Plumber.svg'
import ACRepair from './ACRepair.svg'
import ApplianceRepair from './ApplianceRepair.svg'
import Gardening from './Gardening.svg'

// Use online images for main sections (home services themed)
const header_img = 'https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg'
const appointment_img = 'https://images.pexels.com/photos/5591719/pexels-photo-5591719.jpeg'
const about_image = 'https://images.pexels.com/photos/4239145/pexels-photo-4239145.jpeg'
const contact_image = 'https://images.pexels.com/photos/5591514/pexels-photo-5591514.jpeg'
const profile_pic = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
const group_profiles = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg'

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

// Service-specific images (used across services UI)
export const serviceImages = {
    'House Cleaning': 'https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg',
    'Electrician': 'https://images.pexels.com/photos/4794521/pexels-photo-4794521.jpeg',
    'Plumbing': 'https://images.pexels.com/photos/5854190/pexels-photo-5854190.jpeg',
    'AC Repair': 'https://images.pexels.com/photos/6474477/pexels-photo-6474477.jpeg',
    'Appliance Repair': 'https://images.pexels.com/photos/5591514/pexels-photo-5591514.jpeg',
    'Gardening': 'https://images.pexels.com/photos/4246200/pexels-photo-4246200.jpeg',
}

// Static service provider data using online images
export const doctors = [
    {
        _id: 'service1',
        name: 'Aarav Sharma',
        image: 'https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg',
        speciality: 'House Cleaning',
        degree: 'Professional Cleaner',
        experience: '5 Years',
        about: 'Professional house cleaning services with eco-friendly products. Specializing in deep cleaning, regular maintenance, and post-construction cleanup.',
        fees: 50,
        address: {
            line1: 'Flat 201, Green Residency',
            line2: 'Andheri West, Mumbai'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service2',
        name: 'Rahul Verma',
        image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg',
        speciality: 'Electrician',
        degree: 'Licensed Electrician',
        experience: '8 Years',
        about: 'Licensed electrician specializing in residential electrical installations, repairs, and safety inspections.',
        fees: 75,
        address: {
            line1: 'House No. 34, Sector 22',
            line2: 'Noida, NCR'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service3',
        name: 'Sneha Iyer',
        image: 'https://images.pexels.com/photos/5854190/pexels-photo-5854190.jpeg',
        speciality: 'Plumbing',
        degree: 'Expert Plumber',
        experience: '6 Years',
        about: 'Expert plumber for all your water-related needs. From leak repairs to complete bathroom renovations.',
        fees: 60,
        address: {
            line1: '12, Lake View Apartments',
            line2: 'Kolkata, West Bengal'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service4',
        name: 'Vikram Singh',
        image: 'https://images.pexels.com/photos/5588475/pexels-photo-5588475.jpeg',
        speciality: 'AC Repair',
        degree: 'Certified HVAC Technician',
        experience: '10 Years',
        about: 'Certified HVAC technician with expertise in AC installation, repair, and maintenance services.',
        fees: 80,
        address: {
            line1: 'Plot 8, Shanti Nagar',
            line2: 'Punjagutta, Hyderabad'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service5',
        name: 'Ananya Desai',
        image: 'https://images.pexels.com/photos/5591830/pexels-photo-5591830.jpeg',
        speciality: 'Appliance Repair',
        degree: 'Professional Appliance Repair Specialist',
        experience: '7 Years',
        about: 'Professional appliance repair specialist for washing machines, refrigerators, dishwashers, and more.',
        fees: 65,
        address: {
            line1: 'B-502, Sunrise Heights',
            line2: 'Vastrapur, Ahmedabad'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service6',
        name: 'Rohan Mehta',
        image: 'https://images.pexels.com/photos/4246201/pexels-photo-4246201.jpeg',
        speciality: 'Gardening',
        degree: 'Expert Gardener',
        experience: '12 Years',
        about: 'Expert gardener providing landscaping, lawn care, and garden maintenance services.',
        fees: 40,
        address: {
            line1: 'Farm Plot 12, Green Fields',
            line2: 'Hosur Road, Bengaluru'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service7',
        name: 'Kavya Reddy',
        image: 'https://images.pexels.com/photos/4239144/pexels-photo-4239144.jpeg',
        speciality: 'House Cleaning',
        degree: 'Reliable Cleaner',
        experience: '4 Years',
        about: 'Reliable house cleaning service with attention to detail. Specializing in move-in and move-out cleaning.',
        fees: 45,
        address: {
            line1: 'G-12, Lotus Apartments',
            line2: 'Kothrud, Pune'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service8',
        name: 'Arjun Patel',
        image: 'https://images.pexels.com/photos/4792529/pexels-photo-4792529.jpeg',
        speciality: 'Electrician',
        degree: 'Master Electrician',
        experience: '9 Years',
        about: 'Master electrician with expertise in smart home installations and electrical troubleshooting.',
        fees: 85,
        address: {
            line1: 'Shop 5, Market Road',
            line2: 'Thane West, Maharashtra'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service9',
        name: 'Neha Joshi',
        image: 'https://images.pexels.com/photos/5854195/pexels-photo-5854195.jpeg',
        speciality: 'Plumbing',
        degree: 'Experienced Plumber',
        experience: '5 Years',
        about: 'Experienced plumber focusing on emergency repairs and water system installations.',
        fees: 55,
        address: {
            line1: '21, River View Colony',
            line2: 'Gomti Nagar, Lucknow'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service10',
        name: 'Sanjay Rao',
        image: 'https://images.pexels.com/photos/6474472/pexels-photo-6474472.jpeg',
        speciality: 'AC Repair',
        degree: 'Air Conditioning Specialist',
        experience: '8 Years',
        about: 'Air conditioning specialist offering comprehensive HVAC solutions for residential properties.',
        fees: 70,
        address: {
            line1: 'Tower 3, Sky City',
            line2: 'Miyapur, Hyderabad'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service11',
        name: 'Pooja Nair',
        image: 'https://images.pexels.com/photos/5591514/pexels-photo-5591514.jpeg',
        speciality: 'Appliance Repair',
        degree: 'Skilled Appliance Technician',
        experience: '6 Years',
        about: 'Skilled appliance technician with expertise in major home appliances and troubleshooting.',
        fees: 60,
        address: {
            line1: 'Block C, Galaxy Enclave',
            line2: 'Salt Lake, Kolkata'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service12',
        name: 'Karan Malhotra',
        image: 'https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg',
        speciality: 'Gardening',
        degree: 'Professional Landscaper',
        experience: '15 Years',
        about: 'Professional landscaper specializing in sustainable gardening and eco-friendly solutions.',
        fees: 50,
        address: {
            line1: 'Plot 21, Orchard Farms',
            line2: 'Vadodara, Gujarat'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service13',
        name: 'Meera Kulkarni',
        image: 'https://images.pexels.com/photos/4239149/pexels-photo-4239149.jpeg',
        speciality: 'House Cleaning',
        degree: 'Detail-Oriented Cleaner',
        experience: '3 Years',
        about: 'Detail-oriented cleaner offering personalized cleaning services for homes and small offices.',
        fees: 40,
        address: {
            line1: 'Flat 804, Ocean View',
            line2: 'Juhu, Mumbai'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service14',
        name: 'Imran Khan',
        image: 'https://images.pexels.com/photos/4254168/pexels-photo-4254168.jpeg',
        speciality: 'Electrician',
        degree: 'Senior Electrician',
        experience: '11 Years',
        about: 'Senior electrician providing commercial and residential electrical services with safety focus.',
        fees: 90,
        address: {
            line1: 'House No. 9, Hill View',
            line2: 'Banashankari, Bengaluru'
        },
        available: true,
        slots_booked: {}
    },
    {
        _id: 'service15',
        name: 'Priya Sahu',
        image: 'https://images.pexels.com/photos/5854264/pexels-photo-5854264.jpeg',
        speciality: 'Plumbing',
        degree: 'Professional Plumber',
        experience: '7 Years',
        about: 'Professional plumber with expertise in modern plumbing technologies and eco-friendly solutions.',
        fees: 65,
        address: {
            line1: 'Plot 17, Lotus Residency',
            line2: 'Alwarpet, Chennai'
        },
        available: true,
        slots_booked: {}
    }
]
