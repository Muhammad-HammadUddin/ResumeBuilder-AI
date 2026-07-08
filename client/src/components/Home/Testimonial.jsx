import { BookUserIcon } from "lucide-react"
import Title from "./Title"

const Testimonial = () => {

  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Briar Martin',
      handle: '@neilstellar',
      date: 'April 20, 2025'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025'
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Jordan Lee',
      handle: '@jordantalks',
      date: 'June 5, 2025'
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025'
    },
  ]

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="" />
        <div>
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72..." fill="#2196F3" />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm py-4 text-gray-800">
        Radiant made undercutting all of our competitors an absolute breeze.
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Posted on</span>
        <p>{card.date}</p>
      </div>
    </div>
  )

  return (
    <>
      <div id="testimonials" className="flex flex-col items-center my-10 scroll-mt-12">

        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
          <BookUserIcon className="size-4.5 stroke-green-600" />
          <span>Testimonials</span>
        </div>

        <Title
          title="Don't just take our words"
          description="Hear what our users say about us. We're always looking for ways to improve."
        />

        <div className="marquee-row w-full max-w-5xl overflow-hidden relative">
          <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
        </div>

        <div className="marquee-row w-full max-w-5xl overflow-hidden relative">
          <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </>
  )
}

export default Testimonial
