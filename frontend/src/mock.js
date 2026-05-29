// Mock data for Fresh Start Property Care

export const companyInfo = {
  name: "Fresh Start Property Care",
  tagline: "RELIABLE. AFFORDABLE. LOCAL.",
  slogan: "A FRESH START FOR A BETTER PROPERTY",
  owners: "Owen & Noah",
  location: "Katy, TX",
  phones: ["832-291-9876", "331-452-9543"],
  email: "owenrob8418@gmail.com",
  instagram: "@freshstartpropertycare"
};

export const services = [
  {
    id: 1,
    name: "Gutter Cleaning",
    description: "Professional gutter cleaning to prevent water damage and maintain your property's integrity. We remove debris, check for damage, and ensure proper water flow.",
    features: [
      "Complete debris removal",
      "Downspout flushing",
      "Damage inspection",
      "Before & after photos"
    ]
  },
  {
    id: 2,
    name: "Landscaping",
    description: "Transform your outdoor spaces with our comprehensive landscaping services. From lawn maintenance to complete landscape design.",
    features: [
      "Lawn mowing & edging",
      "Trimming & pruning",
      "Seasonal planting",
      "Landscape design"
    ]
  },
  {
    id: 3,
    name: "Junk Removal",
    description: "Fast and efficient junk removal service for residential properties. We handle everything from small cleanups to large haul-aways.",
    features: [
      "Same-day service available",
      "Eco-friendly disposal",
      "Heavy item removal",
      "Full property cleanout"
    ]
  },
  {
    id: 4,
    name: "Power Washing",
    description: "Restore your property's curb appeal with professional power washing. We clean driveways, sidewalks, siding, and more.",
    features: [
      "Driveway cleaning",
      "Roof & gutter washing",
      "Siding restoration",
      "Concrete cleaning"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    rating: 5,
    text: "Owen and Noah did an amazing job on our gutters and driveway! The before and after difference is incredible. Highly recommend!",
    service: "Gutter Cleaning & Power Washing",
    date: "2025-04-15"
  },
  {
    id: 2,
    name: "James Rodriguez",
    rating: 5,
    text: "Professional, affordable, and reliable! They transformed our overgrown yard into a beautiful landscape. Will definitely use again.",
    service: "Landscaping",
    date: "2025-03-22"
  },
  {
    id: 3,
    name: "Emily Chen",
    rating: 5,
    text: "Fast response and excellent service! They removed all the junk from our garage renovation. Made the whole process so easy.",
    service: "Junk Removal",
    date: "2025-05-01"
  },
  {
    id: 4,
    name: "Michael Johnson",
    rating: 5,
    text: "Best property care service in Katy! Owen and Noah are friendly, professional, and their work quality is outstanding.",
    service: "Power Washing",
    date: "2025-04-28"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    rating: 5,
    text: "They power washed our entire driveway and sidewalk. Looks brand new! Great pricing and the team was very courteous.",
    service: "Power Washing",
    date: "2025-05-10"
  },
  {
    id: 6,
    name: "David Park",
    rating: 5,
    text: "Excellent gutter cleaning service! They were thorough and even provided photos of their work. Very professional operation.",
    service: "Gutter Cleaning",
    date: "2025-05-18"
  }
];

export const galleryItems = [
  {
    id: 1,
    service: "Power Washing",
    description: "Driveway transformation",
    beforeText: "Dirty, stained driveway",
    afterText: "Clean, restored surface"
  },
  {
    id: 2,
    service: "Landscaping",
    description: "Front yard makeover",
    beforeText: "Overgrown lawn and weeds",
    afterText: "Manicured landscape"
  },
  {
    id: 3,
    service: "Gutter Cleaning",
    description: "Gutter debris removal",
    beforeText: "Clogged with leaves and debris",
    afterText: "Clean, flowing gutters"
  },
  {
    id: 4,
    service: "Power Washing",
    description: "Sidewalk cleaning",
    beforeText: "Stained concrete walkway",
    afterText: "Spotless pathway"
  },
  {
    id: 5,
    service: "Junk Removal",
    description: "Property cleanout",
    beforeText: "Cluttered yard space",
    afterText: "Clean, usable area"
  },
  {
    id: 6,
    service: "Landscaping",
    description: "Backyard refresh",
    beforeText: "Unkempt grass and bushes",
    afterText: "Beautiful outdoor space"
  }
];

// Mock bookings for admin dashboard
export const mockBookings = [
  {
    id: 1,
    name: "Jennifer Wilson",
    email: "jennifer.w@email.com",
    phone: "281-555-0123",
    service: "Gutter Cleaning",
    message: "Need gutters cleaned before the rainy season",
    status: "pending",
    date: "2025-05-20T10:30:00",
    createdAt: "2025-05-19T14:22:00"
  },
  {
    id: 2,
    name: "Robert Taylor",
    email: "rtaylor@email.com",
    phone: "832-555-0145",
    service: "Power Washing",
    message: "Driveway and front walkway power washing",
    status: "approved",
    date: "2025-05-22T09:00:00",
    createdAt: "2025-05-18T11:15:00"
  },
  {
    id: 3,
    name: "Amanda Garcia",
    email: "agarcia@email.com",
    phone: "713-555-0198",
    service: "Landscaping",
    message: "Weekly lawn maintenance needed",
    status: "completed",
    date: "2025-05-15T08:00:00",
    createdAt: "2025-05-10T16:45:00"
  },
  {
    id: 4,
    name: "Kevin Martinez",
    email: "kevin.m@email.com",
    phone: "281-555-0167",
    service: "Junk Removal",
    message: "Old furniture and appliances to remove",
    status: "pending",
    date: "2025-05-21T13:00:00",
    createdAt: "2025-05-19T09:30:00"
  },
  {
    id: 5,
    name: "Nicole Anderson",
    email: "nicole.a@email.com",
    phone: "832-555-0134",
    service: "Gutter Cleaning",
    message: "Gutters overflowing, urgent cleaning needed",
    status: "approved",
    date: "2025-05-23T10:00:00",
    createdAt: "2025-05-19T15:00:00"
  }
];