import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useState } from 'react'

import { heroVideo, smallHeroVideo, captionImg } from '../utils' 

const Hero = () => {
  const [imageSrc, setImageSrc] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 760 ? smallHeroVideo : heroVideo
    }
    return heroVideo 
  })

  const [isSmall, setIsSmall] = useState(
    typeof window !== 'undefined' && window.innerWidth < 760
  )

  const handleResize = () => {
    const isNowSmall = window.innerWidth < 760
    setIsSmall(isNowSmall)
    setImageSrc(isNowSmall ? smallHeroVideo : heroVideo)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
  }, [])

  return (
    <section className="w-full min-h-screen bg-black relative flex flex-col justify-between">
  <div className="flex-grow w-full flex flex-col items-center justify-center gap-1 pt-8">
    <p id="hero" className="hero-title opacity-0 transition-opacity duration-500 text-white">iPhone 16 Pro</p>

    <img
      src={captionImg}
      alt="Caption iPhone 16 Pro"
      className="w-[250px] md:w-[350px] z-10 relative mb-1"
    />

    <div className="md:w-10/12 w-11/12 relative">
      <img
        src={imageSrc}
        alt="Hero"
        className={`pointer-events-none w-full object-cover ${
          isSmall ? '' : 'max-h-[500px]'
        }`}
        key={imageSrc}
      />
    </div>
  </div>

  <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20 transition-all duration-500 pb-8 text-white">
    <a href="#highlights" className="btn">Buy</a>
    <p className="font-normal text-xl">From $199/month or $999</p>
  </div>
</section>



  )
}

export default Hero
