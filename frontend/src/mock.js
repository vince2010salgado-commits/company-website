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
    date: "2026-05-22"
  },
  {
    id: 2,
    name: "James Rodriguez",
    rating: 5,
    text: "Professional, affordable, and reliable! They transformed our overgrown yard into a beautiful landscape. Will definitely use again.",
    service: "Landscaping",
    date: "2026-05-19"
  },
  {
    id: 3,
    name: "Emily Chen",
    rating: 5,
    text: "Fast response and excellent service! They removed all the junk from our garage renovation. Made the whole process so easy.",
    service: "Junk Removal",
    date: "2026-05-24"
  },
  {
    id: 4,
    name: "Michael Johnson",
    rating: 5,
    text: "Best property care service in Katy! Owen and Noah are friendly, professional, and their work quality is outstanding.",
    service: "Power Washing",
    date: "2026-05-21"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    rating: 5,
    text: "They power washed our entire driveway and sidewalk. Looks brand new! Great pricing and the team was very courteous.",
    service: "Power Washing",
    date: "2026-05-26"
  },
  {
    id: 6,
    name: "David Park",
    rating: 5,
    text: "Excellent gutter cleaning service! They were thorough and even provided photos of their work. Very professional operation.",
    service: "Gutter Cleaning",
    date: "2026-05-18"
  }
];

export const galleryItems = [
  {
    id: 1,
    service: "Gutter Cleaning",
    description: "Backyard valley & gutter cleanout",
    type: "pair",
    beforeImage: "https://customer-assets.emergentagent.com/job_freshstart-book/artifacts/vne7tpi8_image.png",
    afterImage: "https://customer-assets.emergentagent.com/job_freshstart-book/artifacts/8g57oxyv_image.png",
    beforeText: "Leaves & debris piled in the roof valley",
    afterText: "Cleared, free-flowing gutters"
  },
  {
    id: 2,
    service: "Gutter Cleaning",
    description: "Side gutter line restoration",
    type: "collage",
    image: "https://customer-assets.emergentagent.com/job_freshstart-book/artifacts/cdexdreh_image.png",
    beforeText: "Clogged with leaves & debris",
    afterText: "Spotless and clear"
  },
  {
    id: 3,
    service: "Junk Removal",
    description: "Full yard waste haul-away",
    type: "single",
    image: "https://customer-assets.emergentagent.com/job_freshstart-book/artifacts/zk473bsi_image.png",
    afterText: "Bagged, organized & ready for disposal"
  }
];

// Mock bookings for admin dashboard
export const mockBookings = [
  {
    id: 1,
    name: "Jennifer Wilson",
    email: "jennifer.w@email.com",
    phone: "281-555-0123",
    services: ["Gutter Cleaning"],
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
    services: ["Power Washing"],
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
    services: ["Landscaping"],
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
    services: ["Junk Removal"],
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
    services: ["Gutter Cleaning", "Power Washing"],
    message: "Gutters overflowing, urgent cleaning needed. Also need driveway washed",
    status: "approved",
    date: "2025-05-23T10:00:00",
    createdAt: "2025-05-19T15:00:00"
  },
  {
    id: 6,
    name: "David Chen",
    email: "david.c@email.com",
    phone: "713-555-0189",
    services: ["Gutter Cleaning", "Landscaping", "Power Washing"],
    message: "Full property maintenance package",
    status: "pending",
    date: null,
    createdAt: "2025-05-20T08:30:00"
  }
];