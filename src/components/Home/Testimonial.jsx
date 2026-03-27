import React, { useState } from 'react'

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  .testimonial-root { font-family: 'DM Sans', sans-serif; }
  .ph { font-family: 'Playfair Display', Georgia, serif; }
  .ph em { font-style: italic; color: #4a8c2a; }
  .t-card { transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s; }
  .t-card:hover { transform: translateY(-4px); box-shadow: 0 20px 52px rgba(60,80,40,0.13) !important; border-color: #b8dfa0 !important; }
  .avatar-ring { transition: box-shadow 0.2s; }
  .t-card:hover .avatar-ring { box-shadow: 0 0 0 3px #7ab648; }
  .grain-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  }
`

const testimonials = [
  {
    name: 'Ramesh Patil',
    role: 'Sugarcane Farmer',
    location: 'Kolhapur, Maharashtra',
    avatar: 'RP',
    avatarBg: 'linear-gradient(135deg,#2d6e14,#4a8c2a)',
    rating: 5,
    crop: 'Sugarcane',
    quote: 'GreenHand predicted my yield within 4% accuracy. I sold at the right time and made ₹80,000 more than last season. It has genuinely changed how I farm.',
  },
  {
    name: 'Anita Devi',
    role: 'Vegetable Grower',
    location: 'Amritsar, Punjab',
    avatar: 'AD',
    avatarBg: 'linear-gradient(135deg,#4a8c2a,#7ab648)',
    rating: 5,
    crop: 'Vegetables',
    quote: 'The soil analysis feature told me exactly which nutrients my fields lacked. After following the recommendations, my tomato yield jumped by 30% in one season.',
  },
  {
    name: 'Suresh Kumar',
    role: 'Rice Cultivator',
    location: 'Thanjavur, Tamil Nadu',
    avatar: 'SK',
    avatarBg: 'linear-gradient(135deg,#1c3a10,#2d6e14)',
    rating: 5,
    crop: 'Paddy Rice',
    quote: 'The weather forecasts are incredibly accurate for my village. I avoided replanting after a frost warning that other apps completely missed. Saved me weeks of work.',
  },
  {
    name: 'Meera Sharma',
    role: 'Wheat & Mustard Farmer',
    location: 'Jaipur, Rajasthan',
    avatar: 'MS',
    avatarBg: 'linear-gradient(135deg,#4a8c2a,#a3e26a)',
    rating: 5,
    crop: 'Mustard',
    quote: "The AI assistant answered my question about yellow rust disease at midnight — in Hindi — and saved my entire wheat crop. I tell every farmer in my village about this app.",
  },
  {
    name: 'Vijay Naik',
    role: 'Mango Orchard Owner',
    location: 'Ratnagiri, Maharashtra',
    avatar: 'VN',
    avatarBg: 'linear-gradient(135deg,#2d5a1b,#4a8c2a)',
    rating: 4,
    crop: 'Alphonso Mango',
    quote: "Price alerts helped me time my Alphonso exports perfectly. I got ₹340 per dozen versus ₹210 the week before. The season-on-season dashboard is also very useful.",
  },
  {
    name: 'Lakshmi Reddy',
    role: 'Cotton Farmer',
    location: 'Guntur, Andhra Pradesh',
    avatar: 'LR',
    avatarBg: 'linear-gradient(135deg,#3a7a1a,#7ab648)',
    rating: 5,
    crop: 'Cotton',
    quote: "I was sceptical at first, but the crop prediction was so accurate that now I plan my entire season around it. The interface is simple enough that my father uses it too.",
  },
]

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(s => (
      <svg key={s} xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={s <= count ? '#e8a820' : '#e2daca'}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const Testimonial = () => {
  const [featured, setFeatured] = useState(0)

  return (
    <div className="testimonial-root">
      <style>{fontImport}</style>

      <section className="grain-bg w-full py-20 px-5 lg:px-10 bg-[#f7faf7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-14">
            
            <h2 className="ph text-[2.2rem] sm:text-[2.8rem] font-semibold text-[#1c3a10] leading-[1.1] mb-4"> Real farmers,<br className="hidden sm:block" /> <em>real results</em> </h2>

            <p className="text-[0.88rem] text-gray-700 max-w-md leading-relaxed"> Thousands of farmers across India trust GreenHand every season. Here is what some of them have to say. </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (

              <div key={i} className="t-card bg-[#fffdf8] rounded-2xl p-6 border border-[#e8e2d4] cursor-pointer" style={{ boxShadow: '0 2px 12px rgba(60,80,40,0.06)' }} onClick={() => setFeatured(i)}>
               
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">

                    <div className="avatar-ring w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: t.avatarBg }}> {t.avatar} </div>

                    <div>
                     
                      <p className="ph text-[0.88rem] font-semibold text-gray-700 leading-tight">{t.name}</p>
                     
                      <p className="text-[0.68rem] text-gray-700">{t.location}</p>
                    
                    </div>
                  </div>

                  <span className="text-[0.7rem] bg-green-50 border border-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium"> {t.crop} </span>

                </div>

                <StarRating count={t.rating} />

                <p className="mt-3 text-[0.8rem] text-gray-700 leading-relaxed line-clamp-4"> "{t.quote}" </p>

                <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-widest text-gray-600"> {t.role} </p>

              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-[#e2daca]" style={{ boxShadow: '0 4px 24px rgba(60,80,40,0.07)' }}>

            {[
              { value: '10,000+', label: 'Farmers Onboarded' },
              { value: '4.9 / 5', label: 'Average Rating' },
              { value: '18 States', label: 'Across India' },
              { value: '95%', label: 'Would Recommend' },
            ].map(({ value, label }, i) => (
              
              <div key={i} className="flex flex-col items-center py-7 px-4 bg-[#fffdf8] text-center border-r border-[#e2daca] last:border-r-0">
                
                <span className="ph text-[1.6rem] font-semibold text-[#2d6e14]">{value}</span>
                
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#8a9e7a] mt-1">{label}</span>
              
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonial