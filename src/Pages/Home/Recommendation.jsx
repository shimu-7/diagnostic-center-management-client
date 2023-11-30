import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


const Recommendation = () => {
    const axiosPublic = useAxiosPublic()

    const { data: recommendations = [] } = useQuery({
        queryKey: ['recommendations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recommendations');
            return res.data;
        }
    })
    return (
        <div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    recommendations.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="text-center mx-auto px-24 my-10">
                            <Rating className="mx-auto" style={{ maxWidth: 250 }} value={review.rating} readOnly />
                            <svg className="mx-auto mt-8" xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" /></svg>
                            <p className="pt-2">
                                {review.description}
                            </p>
                            <h2 className="uppercase text-xl text-yellow-700">{review.
                                recommendedFor
                            }</h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Recommendation;