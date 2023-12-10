"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/styles/Navigation.css";
import Home_CourseCard from "./Home_CourseCard";

const Data = [
  {
    "title": "Cook Course",
    "image": "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvb2t8ZW58MHx8MHx8fDA%3D",
    "teacherName": "Chef Ahmed",
    "teacherRank": "Master Chef",
    "lessons": 10,
    "hours": 20,
    "description": "Learn the art of cooking from a master chef. This course covers a variety of cuisines and culinary techniques, turning you into a kitchen maestro."
  },
  {
    "title": "How to be organized",
    "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBzeWNvbG9neXxlbnwwfDB8MHx8fDA%3D",
    "teacherName": "Professor Sarah",
    "teacherRank": "Organizational Expert",
    "lessons": 8,
    "hours": 15,
    "description": "Unlock the secrets to staying organized in your personal and professional life. Professor Sarah, an expert in organization, guides you through effective strategies and tools."
  },
  {
    "title": "Street Art",
    "image": "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmVldCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
    "teacherName": "Artist Jamal",
    "teacherRank": "Street Art Specialist",
    "lessons": 12,
    "hours": 18,
    "description": "Immerse yourself in the vibrant world of street art with Jamal, a seasoned street art specialist. Explore techniques, styles, and the cultural impact of street art."
  },
  {
    "title": "Photography",
    "image": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
    "teacherName": "Photographer Lisa",
    "teacherRank": "Professional Photographer",
    "lessons": 15,
    "hours": 25,
    "description": "Capture breathtaking moments with Photographer Lisa's comprehensive photography course. From basics to advanced techniques, elevate your photography skills."
  },
  {
    "title": "Video Editing",
    "image": "https://images.unsplash.com/photo-1526698905402-e13b880ad864?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpZGVvJTIwZWRpdHxlbnwwfHwwfHx8MA%3D%3D",
    "teacherName": "Editor Mark",
    "teacherRank": "Video Editing Pro",
    "lessons": 10,
    "hours": 22,
    "description": "Dive into the world of video editing with Pro Editor Mark. Learn editing software, techniques, and storytelling to create captivating videos."
  },
  {
    "title": "Business Course",
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzc2luZXNzfGVufDB8fDB8fHww",
    "teacherName": "Entrepreneur James",
    "teacherRank": "Business Mogul",
    "lessons": 20,
    "hours": 30,
    "description": "Master the art of business with Entrepreneur James. From startup strategies to management skills, this course prepares you for the business world."
  },
  // {
  //   "title": "Mechatronics",
  //   "image": "https://plus.unsplash.com/premium_photo-1663054378169-8ffea2e11c42?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QUl8ZW58MHx8MHx8fDA%3D",
  //   "teacherName": "Engineer Fatima",
  //   "teacherRank": "Mechatronics Expert",
  //   "lessons": 18,
  //   "hours": 28,
  //   "description": "Embark on a journey into the world of Mechatronics guided by Engineer Fatima. Learn about the integration of mechanical and electronic systems in this hands-on course."
  // },
  // {
  //   "title": "How to use ChatGPT",
  //   "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fiphonesoft.fr%2Fimages%2F2023%2F01%2Fchatgpt-logo-header-banner.jpg&f=1&nofb=1&ipt=71b6734ff72bc11d4f4ae6fe7fb7913640038075c6f473cd227cc93f5e425d7d&ipo=images",
  //   "teacherName": "AI Specialist Alex",
  //   "teacherRank": "ChatGPT Guru",
  //   "lessons": 5,
  //   "hours": 10,
  //   "description": "Unlock the full potential of ChatGPT with AI Specialist Alex. Learn the ins and outs of using ChatGPT for various applications and enhance your interaction with AI."
  // }
];

const Home_CoursesList = () => {
  return (
    <div className="flex items-center justify-center h-full container gap-6 noselect">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          940: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 39,
            slidesPerGroup: 1,
          },
        }}
        className="flex items-center justify-center"
        modules={[Navigation]}
        navigation
      >
        {Data.map((item, index) => (
          <SwiperSlide key={index}>
            <Home_CourseCard
              image={item.image}
              teacher={item.teacherName}
              rank={item.teacherRank}
              description={item.description}
              hours={item.hours}
              lessons={item.lessons}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home_CoursesList;
