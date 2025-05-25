/* /conscious-choices/page.tsx */
'use client'

import ConsciousChoiceCard from './components/ConsciousChoiceCard'

import '@/app/app.css'
import './components/conscious-choices.css'

// Conscious Choices Data
const consciousChoices = [
  {
    id: 1,
    title: 'TrueEarth Eco-Strips',
    tagline: 'Ultra-concentrated clean.',
    description:
      'Ultra-concentrated laundry detergent strips that reduce plastic waste, save space, and deliver a powerful clean with safer ingredients.',
    features: [
      'Reduces plastic waste',
      'Space-saving design',
      'Safer ingredients',
    ],
    url: 'https://www.tru.earth',
    image: ''
  },
  {
    id: 2,
    title: "S'well Bottles",
    tagline: 'Stylish hydration.',
    description:
      'Beautifully designed reusable water bottles that keep drinks cold for 36 hours or hot for 18 — replacing thousands of plastic bottles.',
    features: [
      'Keeps drinks cold for 36 hours',
      'Reduces single-use plastic',
      'Stylish and durable',
    ],
    url: 'https://www.swell.com',
    image: ''
  },
  {
    id: 3,
    title: 'Boxed Water Is Better',
    tagline: 'Plant-based packaging.',
    description:
      'Water packaged in 92% plant-based cartons — recyclable, renewable, and a cleaner alternative to single-use plastic bottles.',
    features: [
      '92% plant-based packaging',
      'Renewable and recyclable',
      'Cleaner alternative to plastic',
    ],
    url: 'https://boxedwaterisbetter.com/',
    image: ''
  },
  {
    id: 4,
    title: 'The Ocean Cleanup',
    tagline: 'Cleaning the seas.',
    description:
      "An ambitious nonprofit developing advanced technologies to rid the world's oceans of plastic.",
    features: [
      'Innovative ocean cleanup tech',
      'Global environmental impact',
      'Nonprofit organization',
    ],
    url: 'https://theoceancleanup.com/',
    image: ''
  },
]

const futureChoices = [
  {
    name: 'Who Gives A Crap',
    description: 'Eco-friendly toilet paper that helps build toilets around the world.',
    url: 'https://whogivesacrap.org',
  },
  {
    name: 'Patagonia',
    description: 'Clothing and gear brand rooted in environmental and social responsibility.',
    url: 'https://patagonia.com',
  },
  {
    name: 'Tentree',
    description: 'Apparel brand that plants 10 trees for every item sold.',
    url: 'https://tentree.com',
  },
  {
    name: 'Blueland',
    description: 'Eco-friendly cleaning products with refillable packaging.',
    url: 'https://blueland.com',
  },
  {
    name: 'Allbirds',
    description: 'Sustainable shoes and apparel made from natural materials like wool and sugarcane.',
    url: 'https://allbirds.com',
  },
]


export default function ConsciousChoicesPage() {
  return (
    <div className="bg-[#FAF8F6] min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Hero Section */}
        <section className="bg-white border border-[#1A1D1A] rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">🌿 Conscious Choices</h1>
          <p className="text-gray-500 text-lg">Small Choices. Big Shifts.</p>
        </section>

        {/* Description Section */}
        <section className="bg-white border border-[#1A1D1A] rounded-2xl p-8 text-center">
          <p className="max-w-2xl mx-auto text-gray-700">
            Discover aligned products and movements for living beautifully — and consciously.
            This is about small daily decisions that ripple outward — nurturing our health,
            communities, and shared home.
          </p>
        </section>

        {/* Featured Choices Section */}
        <section className="bg-[#F0F5F0] border border-[#1A1D1A] rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-8">♻️ Featured Choices</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {consciousChoices.map((choice) => (
              <ConsciousChoiceCard
                key={choice.id}  
                title={choice.title}
                tagline={choice.tagline}
                description={choice.description}
                features={choice.features}
                url={choice.url}
                image={choice.image}
              />
            ))}
          </div>
        </section>

        {/* Future Picks Section */}
        <section className="bg-white border border-[#1A1D1A] rounded-2xl p-8 flex flex-col items-center gap-6">
          <div className="w-full h-3 bg-[#95C8A4] rounded-full"></div>

          <p className="text-gray-400 italic text-sm">— Future Picks —</p>

          <div className="w-full flex flex-col gap-4">
            {futureChoices.map((choice, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#FAF8F6] p-4 rounded-lg border border-[#1A1D1A]"
              >
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-base">{choice.name}</h4>
                  <p className="text-gray-600 text-sm">{choice.description}</p>
                </div>
                <a
                  href={choice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 sm:mt-0 text-green-700 font-medium underline text-sm"
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <section className="bg-white border border-[#1A1D1A] rounded-2xl p-6 text-center text-gray-400 text-sm">
          📌 Optional: Save Favorites | Suggest Picks
        </section>

      </div>
    </div>
  )
}
