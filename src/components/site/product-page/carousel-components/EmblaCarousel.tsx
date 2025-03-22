import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { IProduct } from '../../../../utils/interfaces';
// import "./embala.css";

type PropType = {
  product: IProduct
  slides?: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, product } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  console.log(slides);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla bg-pink-800 h-56 w-56">
      <div className="embla__viewport h-full w-full" ref={emblaRef}>
        <div className="embla__container w-full bg-white/50 h-full">
          {product?.imageUrl?.map((image, index) => (
            <>
              <div className="embla__slide h-full bg-green-300 w-full" key={index}>
                <img className="embla__slide__number object-cover h-full w-full bg-red-900" src={image?.url} />
              </div>
              <div className="embla__slide h-full bg-green-300" key={index}>
                <img className="embla__slide__number object-cover h-full w-full bg-red-900" src={image?.url} />
              </div>
              <div className="embla__slide h-full bg-green-300" key={index}>
                <img className="embla__slide__number object-cover h-full bg-red-900 w-full" src={image?.url} />
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot bg-black! w-4! aspect-square!'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
