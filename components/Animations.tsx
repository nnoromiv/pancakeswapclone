import Image from "next/image"
import { ASTRO_BUNNY, BNB, BOTTOM_L_BIG_ROCK, BOTTOM_L_SMALL_ROCK, BOTTOM_ROCK, BOTTOM_R_PANCAKE, BTC, CAKE, MIDDLE_R_STAR, STAR_L_2X, STAR_R_2X, TOP_R_BIG_ROCK, TOP_R_SMALL_ROCK, TOP_R_STAR, TOP_R_STAR_2X } from "./images"
import React, { useEffect } from "react"

type AnimationProps = {
    children: React.ReactElement,
    customStyle?: string
    id: string
}

const Animation = ({children, customStyle, id} : AnimationProps) => {
    useEffect(() => {
        const layer : NodeListOf<HTMLElement> = document.querySelectorAll(`#${id} > *`)
        window.addEventListener('mousemove', parallax)

        layer.forEach(item => {
            const order = item.getAttribute('data-layer');
            item.style.zIndex = (10 + Number(order)).toString();
            item.style.animationDelay = (Number(order)/2)-10 + 's';
        })

        function parallax(e : any){
            layer.forEach(item => {
                const order : any = item.getAttribute('data-layer');
                if(order !== null) {
                    const xAxis = - (e.clientX * order / 600);
                    const yAxis = - (e.clientY * order / 600);

                    item.style.left = xAxis + '%'
                    item.style.top = yAxis + '%'
                }
            })
        }

        return () => {
            window.removeEventListener('mousemove', parallax);
          };
    },[id])
    return(
        <div id={id} className={`flex relative w-[40vw] h-[40vw] max-[768px]:absolute max-[768px]:z-[1] max-[768px]:h-full max-[768px]:w-full  ${customStyle}`}>
             {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement, { id: id });
            })}
        </div>
    )
}



const AstroBunny = () => {
    return(
        <Animation customStyle="max-w-[36rem] max-h-[36rem] overflow-x-hidden" id="layer">
            <div>
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-star" src={TOP_R_STAR} data-layer="-3" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-star" src={TOP_R_STAR_2X} data-layer="-3" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={TOP_R_SMALL_ROCK} data-layer="-3" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={BOTTOM_R_PANCAKE} data-layer="-2" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={TOP_R_BIG_ROCK} data-layer="-2" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-star" src={MIDDLE_R_STAR} data-layer="-1" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={BOTTOM_L_SMALL_ROCK} data-layer="-1" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={ASTRO_BUNNY} data-layer="0" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-star" src={STAR_R_2X} data-layer="1" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={BOTTOM_ROCK} data-layer="2" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={BOTTOM_L_BIG_ROCK} data-layer="3" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-star" src={STAR_L_2X} data-layer="3" />
            </div>
        </Animation>
    )
}

const Cryptos = () => {
    return(
        <Animation customStyle="max-w-[26rem] max-h-[26rem]" id="layer">
            <div>
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={BNB} data-layer="-1" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={BTC} data-layer="0" />
                <Image fill alt="" className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none animate-layer" src={CAKE} data-layer="1" />
            </div>
        </Animation>
    )
}

export {
    AstroBunny,
    Cryptos
}