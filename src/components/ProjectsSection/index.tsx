'use client';

// next
import Image from "next/image";

// components
import CustomButton from "../CustomButton";

// window size
import { useWindowSize } from 'react-use';

// icons
import { CiCircleCheck } from "react-icons/ci";
import { FaFigma } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

// swiper for carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// projects section
export default function ProjectsSection(){
    const { width } = useWindowSize();

    let slidesPerView = 3;
    if (width < 640) slidesPerView = 1;
    else if (width < 768) slidesPerView = 2;

    return (
        <section
            id="projects" 
            className={`
                my-45
            `}
        >
            <h2 
                style={{ fontFamily: 'var(--font-roboto-slab)' }}
                className={`
                    font-roboto-slab 
                    text-center 
                    font-bold 
                    text-2xl sm:text-3xl 
                    underline 
                    underline-offset-8

                    mb-11
                `}
            >
                Projects
            </h2>

            <div className={`
                flex
                flex-col
                gap-4
                md:flex-row
                items-center
                justify-between
            `}>
                <div className={`
                    max-w-[100%]
                    w-100%
                    md:max-w-[50%]
                    flex
                    flex-col
                    gap-4
                `}>
                    <div className={`
                        flex
                        flex-col
                        gap-4
                    `}>
                        <div className={`
                            flex
                            flex-col
                            gap-2
                        `}>
                            <div className={`
                                flex
                                items-center
                                gap-1
                            `}>
                                <CiCircleCheck 
                                    className={`
                                        w-5.5
                                        h-5.5  
                                    `}
                                />
                                <span className={`
                                    flex
                                    items-center

                                    -top-1
                                    left-5
                                    h-4
                                    pl-1.5
                                    ml-1
                                    border-l-1
                                    border-l-white
                                `}>
                                    Constant Progress
                                </span>
                            </div>
                            <h3 
                                style={{ fontFamily: 'var(--font-roboto-slab)' }}
                                className={`
                                    font-medium
                                    text-5xl
                                    sm:text-7xl
                                `}
                            >
                                MCN API
                            </h3>
                        </div>
                        <p
                            className={`
                                text-[14px]
                                sm:text-xl
                                text-wrap
                            `}
                        >
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem libero facilis culpa dolorum? Sit eligendi iusto excepturi, beatae voluptatem magni asperiores reprehenderit eos nostrum autem! Rem adipisci nihil laboriosam veritatis.
                        </p>
                    </div>

                    <div className={`
                        flex
                        flex-col
                        gap-4
                    `}>
                        <div className={`
                            
                        `}>
                            <CustomButton variant="no-icon" backgroundColor="#346259">
                                View Deploy
                            </CustomButton>
                            <CustomButton variant="just-icon" >
                                <FaFigma />
                            </CustomButton>
                        </div>

                        <div className={`
                            
                        `}>
                            <button className={`
                                flex
                                items-center
                                gap-1
                                text-[15px]
                                font-bold
                                opacity-80

                                cursor-pointer
                            `}>
                                More info <RiArrowDropDownLine />
                            </button>
                        </div>
                    </div>
                </div>

                <aside className={`
                    w-[100%]
                    md:w-[50%]
                    h-[313px]

                    flex
                    items-center
                    justify-center
                    rounded-lg
                    shadow-lg
                    border-3
                  border-[#428b7d]
                `}>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation
                        className="w-full h-full overflow-hidden"
                    >
                        <SwiperSlide className="flex items-center justify-center h-full">
                            <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 1" layout="fill" objectFit="cover" className="rounded" />
                        </SwiperSlide>
                        <SwiperSlide className="flex items-center justify-center h-full">
                            <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 2" layout="fill" objectFit="cover" className="rounded" />
                        </SwiperSlide>
                        <SwiperSlide className="flex items-center justify-center h-full">
                            <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 3" layout="fill" objectFit="cover" className="rounded" />
                        </SwiperSlide>
                    </Swiper>
                </aside>
            </div>
            <div 
                className={`
                    mt-12
                    w-full
                    h-[200px]

                    flex
                    gap-4
                    flex-col
                    rounded-lg
                `}
            >
                <div
                    className={`
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:gap-0
                        sm:justify-between
                        sm:items-center
                    `}
                >
                    <h3
                        className={`
                            flex
                            items-center
                            gap-2
                            text-2xl
                        `}
                    >
                        <IoRocketOutline /> Featured Projects
                    </h3>
                    <CustomButton variant="default" icon={<FaGithub />}>
                        All GitHub Repositories
                    </CustomButton>
                </div>
                <Swiper
                    navigation
                    modules={ [ Pagination, Navigation ] }
                    spaceBetween={ 10 }
                    slidesPerView={ slidesPerView }
                    pagination={ { clickable: true } }

                    className={`
                        w-full 
                        h-full 
                        overflow-hidden    
                    `}
                >
                    <SwiperSlide className="flex items-center justify-center h-full">
                        <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 1" layout="fill" objectFit="cover" className="rounded" />
                        <p className="absolute text-black text-xl font-bold ml-2 mt-1">
                            Project1
                        </p>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center h-full">
                        <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 2" layout="fill" objectFit="cover" className="rounded" />
                        <p className="absolute text-black text-2xl font-bold ml-2 mt-1">
                            Project2
                        </p>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center h-full">
                        <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 3" layout="fill" objectFit="cover" className="rounded" />
                        <p className="absolute text-black text-2xl font-bold ml-2 mt-1">
                            Project3
                        </p>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center h-full">
                        <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 4" layout="fill" objectFit="cover" className="rounded" />
                        <p className="absolute text-black text-2xl font-bold ml-2 mt-1">
                            Project4
                        </p>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center h-full">
                        <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 5" layout="fill" objectFit="cover" className="rounded" />
                        <p className="absolute text-black text-2xl font-bold ml-2 mt-1">
                            Project5
                        </p>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center h-full">
                        <Image src="https://menoscloro.com.br/wp-content/uploads/2025/06/placeholder-1.png" alt="Image 6" layout="fill" objectFit="cover" className="rounded" />
                        <p className="absolute text-black text-2xl font-bold ml-2 mt-1">
                            Project6
                        </p>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};